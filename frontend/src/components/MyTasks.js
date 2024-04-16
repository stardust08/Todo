import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterMyTasks } from '../utils/filterTasks';
import { updateTaskStatusApi } from '../store/taskSlice';
import Spinner from './Spinner';

const MyTasks = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const userId = useSelector((state) => state.auth.user?._id);
    const isLoading = useSelector((state) => state.tasks.isLoading);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        if (!tasks.length) {
            return <h1>No Tasks for You..!</h1>;
        }
        setFilteredTasks(filterMyTasks(tasks, userId));
    }, [tasks, userId]);

    const handleStatusChange = (taskId, event) => {
        console.log(event.target);
        console.log(event.target.value);
        const status = event.target.value;
        dispatch(updateTaskStatusApi({ taskId, status }));
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
        <div className="mt-8 task-table-container  flex justify-center items-center ">
            <table className="table-auto w-[80%]">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Change Status</th>
                        <th className="px-4 py-2">Assigned By</th>
                        <th className="px-4 py-2">Due Date</th>
                        <th className="px-4 py-2">Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr className={`${(task.status=='DONE')?'line-through':'no-underline' }`} key={task._id}>
                            <td className="border px-4 py-2">{task?.title}</td>
                            <td className="border px-4 py-2">{task?.description}</td>
                            <td className="border px-4 py-2">{task?.status}</td>
                            <td className="border px-4 py-2">
                                <select
                                    {...(task.status === 'DONE' && { disabled: true })}
                                    value={task.status}
                                    onChange={(event) => handleStatusChange(task._id, event)}
                                    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="TODO">TODO</option>
                                    <option value="INPROGRESS">INPROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </td>
                            <td className="border px-4 py-2">{task?.assignedBy?.firstname}</td>
                            <td className="border px-4 py-2">{task?.dueDate}</td>
                            <td
                                className={`border px-4 py-2 ${getPriorityColor(task?.priority)}`}
                            >
                                {task?.priority}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTasks;
