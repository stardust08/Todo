import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskForm from './components/TaskForm';
import AllTasksTable from './components/AllTasksTable';

import { checkTokenInCookies } from './store/authSlice';
import { getTasksApi } from './store/taskSlice';
import {addTask,updateTask} from './store/taskSlice'
import MyTasks from './components/MyTasks';
import ManageTasksAssignedByMe from './components/ManageTasksAssignedByMe';
import HomePage from './components/Home';


const ProtectedRoute = ({ element: Element, ...props }) => {
  const isAuth = useSelector(state => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (<Element />);
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('https://taskmanagement-7yjx.onrender.com');

    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('taskStatusUpdated', data => {
      dispatch(updateTask(data));
      console.log(data)
    });

    socket.on('taskCreated', data => {
      dispatch(addTask(data));
    });

    dispatch(checkTokenInCookies());
    dispatch(getTasksApi());

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Signup />} />
        <Route path="/*" element={<MainContentWithSidebar />} />
      </Routes>
    </Router>
  );
};

const MainContentWithSidebar = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" flex-1 lg:p-12 pt-12 pl-0 ">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path = '/myTasks' element={<ProtectedRoute element={MyTasks} />} />
          < Route path="/createTask" element={<ProtectedRoute element={TaskForm} />} />
          < Route path="/allTasks" element={<ProtectedRoute element={AllTasksTable} />} />
          < Route path="/manageTasks" element={<ProtectedRoute element={ManageTasksAssignedByMe} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
