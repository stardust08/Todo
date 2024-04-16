const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter your title']
    },
    description: {
        type: String,
        required: [true, 'Please enter your description']
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

   assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    status: {
        type: String,
        required: [true, 'Please enter your status'],
        default: 'TODO'

    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
    ,
    priority: {
        type: String,
        required: [true, 'Please enter your priority'],
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'LOW'
    },
    dueDate: {
        type: Date,
        required: [true, 'Please enter your dueDate']
    }
    ,
   
    


})



module.exports = mongoose.model('Task', taskSchema)