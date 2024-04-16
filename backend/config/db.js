
const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect('mongodb+srv://vishnu-vashishth:Vish98733@cluster0.x3jya.mongodb.net/tasks');
        console.log('Connected to the database');
        }
    
    catch(err){
        console.log('Failed to connect to the database', err);
    }
}

module.exports = connectDB;