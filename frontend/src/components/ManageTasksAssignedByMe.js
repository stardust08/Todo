import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterAssignedToOthers } from '../utils/filterTasks';
import { updateTaskStatusApi, deleteTaskApi, updateTaskApi } from '../store/taskSlice';
import Spinner from './Spinner';

const EditTaskPopup = ({ task, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleUpdateTask = () => {
        const updatedTask = {
            taskId: task._id,
            title: title,
            description: description,
            priority: priority,
            dueDate: dueDate
        };

        // Filter out empty fields
        const filteredTask = Object.keys(updatedTask).reduce((filtered, key) => {
            if (updatedTask[key]) {
                filtered[key] = updatedTask[key];
            }
            return filtered;
        }, {});

        dispatch(updateTaskApi(filteredTask));
        onClose();
    };

    return (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg min-w-[35%]">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={handlePriorityChange}
                        className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
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
                        value={dueDate}
                        onChange={handleDueDateChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>


                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleUpdateTask}
                    >
                        Update
                    </button>
                    <button
                        className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const MyTasks = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks?.tasks);
    const userId = useSelector((state) => state.auth?.user?._id);
    const isLoading = useSelector((state) => state.tasks.isLoading);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const optionsRef = useRef(null);

    useEffect(() => {
        if (!tasks) {
            return <h1>No Tasks for You..!</h1>;
        }

        setFilteredTasks(filterAssignedToOthers(tasks, userId));
    }, [tasks, userId]);

    const toggleOptions = (taskId, event) => {
        event.stopPropagation();
        setSelectedTask(selectedTask === taskId ? null : taskId);
    };

    const handleStatusChange = (taskId, event) => {
        const status = event.target.value;
        dispatch(updateTaskStatusApi({ taskId, status }));
    };

    const handleDeleteTask = (taskId) => {
        console.log(taskId)
        dispatch(deleteTaskApi(taskId));
    };

    const handleEditTask = (task) => {
        setSelectedTask(task._id);
        setEditPopupOpen(true);
    };

    const handleCloseEditPopup = () => {
        setSelectedTask(null);
        setEditPopupOpen(false);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'LOW':
                return 'bg-blue-100';
            case 'MEDIUM':
                return 'bg-yellow-100';
            case 'HIGH':
                return 'bg-red-100';
            default:
                return 'bg-white';
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="mt-8 task-table-container flex justify-center items-center">
            <table className="table-auto w-[80%]">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Priority</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task._id}>
                            <td className="border px-4 py-2">{task?.title}</td>
                            <td className="border px-4 py-2">{task?.description}</td>
                            <td className="border px-4 py-2">{task?.status}</td>
                            <td className={`border px-4 py-2 ${getPriorityColor(task?.priority)}`}>
                                {task?.priority}
                            </td>
                            <td className="border px-4 py-2">
                                <div className="relative inline-block text-left">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full p-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50"
                                        onClick={(event) => toggleOptions(task._id, event)}
                                    >
                                        ...
                                    </button>
                                    {selectedTask === task._id && (
                                        <div
                                            ref={optionsRef}
                                            className={`  origin-top-left  z-50 absolute left-0 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                        >
                                            <div className="py-1" role="none">
                                                <button
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    onClick={() => handleEditTask(task)}
                                                    role="menuitem"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                                    onClick={() => handleDeleteTask(task._id)}
                                                    role="menuitem"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditPopupOpen && (
                <EditTaskPopup
                    task={tasks.find((task) => task._id === selectedTask)}
                    onClose={handleCloseEditPopup}
                />
            )}
        </div>
    );
};

export default MyTasks;
