import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useSelector } from 'react-redux';
const logo = 'https://www.superceuticals.in/src/img/logo.png';

const Sidebar = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOptionClick = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleToggleSidebar}
                            type="button"
                            className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Toggle Sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isSidebarOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6 4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4C18 4.55228 17.5523 5 17 5H7C6.44772 5 6 4.55228 6 4ZM4 9C4 8.44772 4.44772 8 5 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H5C4.44772 10 4 9.55228 4 9ZM8 14C8 13.4477 8.44772 13 9 13H17C17.5523 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H9C8.44772 15 8 14.5523 8 14ZM2 4C2 3.44772 2.44772 3 3 3H5C5.55228 3 6 3.44772 6 4C6 4.55228 5.55228 5 5 5H3C2.44772 5 2 4.55228 2 4ZM2 9C2 8.44772 2.44772 8 3 8H5C5.55228 8 6 8.44772 6 9C6 9.55228 5.55228 10 5 10H3C2.44772 10 2 9.55228 2 9ZM2 14C2 13.4477 2.44772 13 3 13H5C5.55228 13 6 13.4477 6 14C6 14.5523 5.55228 15 5 15H3C2.44772 15 2 14.5523 2 14Z"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2 4C2 3.44772 2.44772 3 3 3H17C17.5523 3 18 3.44772 18 4C18 4.55228 17.5523 5 17 5H3C2.44772 5 2 4.55228 2 4ZM2 9C2 8.44772 2.44772 8 3 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H3C2.44772 10 2 9.55228 2 9ZM2 14C2 13.4477 2.44772 13 3 13H17C17.5523 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H3C2.44772 15 2 14.5523 2 14Z"
                                    />
                                )}
                            </svg>
                        </button>
                        <div className="flex items-center ml-2 md:mr-24">
                            <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />

                        </div>
                    </div>
                </div>
            </nav>

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/CreateTask"
                                onClick={handleOptionClick}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 18"
                                >
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Create Task</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/myTasks"
                                onClick={handleOptionClick}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">My Tasks</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/manageTasks"
                                onClick={handleOptionClick}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Manage Tasks</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/allTasks"
                                onClick={handleOptionClick}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">All Tasks</span>
                            </Link>
                        </li>
                        {isAuth ? (
                            <li>
                                <div
                                    onClick={() => dispatch(logout())}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ml-3 whitespace-nowrap">Log Out</span>
                                </div>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ml-3 whitespace-nowrap">Log In</span>
                                </Link>
                            </li>
                        )}



                    </ul>
                </div>
            </aside>

            <div className="md:p-12">{props.children}</div>
        </>
    );
};

export default Sidebar;
