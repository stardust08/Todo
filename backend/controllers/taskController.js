const mongoose = require('mongoose');
const Task = require('../models/taskModel');


const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find()
            .populate('assignedTo', 'firstname lastname') // Populate assignedTo with firstname and lastname
            .populate('assignedBy', 'firstname lastname');
        res.status(200).json({ tasks: tasks })
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}

const getMyTasks = async (req, res) => {

    try {
        const tasks = await Task.find({ assignedTo: req.user.id });
        res.status(200).json({ tasks: tasks })
    }
    catch (error) {
        res.status(400).json({ error: error })
    }

}


const createTask = async (req, res) => {
    try {
        let data = req.body;
        data.assignedBy = req.user.id;
        const task = new Task(data);

        await task.save();



        await task.populate('assignedTo', 'firstname lastname')
        await task.populate('assignedBy', 'firstname lastname')

        const socketId = req.socketId;
        req.app.get('io').to(socketId).emit('taskCreated', task);
        res.status(200).json({ task, message: "Task added successfully !" })

    }
    catch (error) {
        
        res.status(400).json({ error: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user.id;
        // const task = await Task.findById(id);
        // if (task.assignedBy != user) {
        //     return res.status(400).json({ error: "You are not authorized to delete this task !" })
        // }

        const result= await Task.findByIdAndDelete(id);
        const socketId = req.socketId;
        req.app.get('io').to(socketId).emit('taskDeleted', id);
        res.status(200).json({ _id: id, message: "Task deleted successfully !" })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error })
    }
}

const updateTaskStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user.id;
        const { status } = req.body;

        await Task.updateOne({ _id: id }, { $set: { status: status } });
        const task = await Task.findById(id);

        await task.populate('assignedTo', 'firstname lastname')
        await task.populate('assignedBy', 'firstname lastname')
        const socketId = req.socketId;
        req.app.get('io').to(socketId).emit('taskStatusUpdated', task);

        res.status(200).json({ task, message: "Task updated successfully !" })
    }
    catch (error) {
        res.status(400).json({ error: error })
    }
}



const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user.id;
        const updates = req.body;

         delete updates.taskId
        console.log(updates,id)
        await Task.updateOne({ _id: id }, { $set: updates });
        const task = await Task.findById(id);

        await task.populate('assignedTo', 'firstname lastname')
        await task.populate('assignedBy', 'firstname lastname')
        const socketId = req.socketId;
        req.app.get('io').to(socketId).emit('taskUpdated', task);

        res.status(200).json({ task, message: "Task updated successfully !" })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}




module.exports = { getTasks, createTask, deleteTask, updateTaskStatus, getMyTasks,updateTask }