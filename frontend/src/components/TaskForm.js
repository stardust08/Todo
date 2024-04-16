import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskApi } from '../store/taskSlice';
import Spinner from './Spinner';

const TaskForm = () => {
  const isLoading = useSelector(state => state.tasks.isLoading);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: '',
  });

  useEffect(() => {
    // Fetch the list of users from the API
    // and update the users state
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://taskmanagement-7yjx.onrender.com/api/user/getAllUsers'); // Replace with your API endpoint for fetching users
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTaskApi(formData));
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
    });
  };

  if (!users.length) return <Spinner />;
  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center">
      <div className="mt-8 mx-auto w-full md:max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="description"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">
              Assigned To
            </label>
            <select
              className="appearance-none block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              {users.map((user) => (
                <option key={user?._id} value={user?._id}>
                  {user?.firstname} {user?.lastname}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
              Priority
            </label>
            <select
              className="appearance-none block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select a priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
              Due Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="dueDate"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
