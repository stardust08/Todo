const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { createServer } = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
app.use( cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


connectDB();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  // console.log(socket.id);
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/task', require('./routes/taskRoutes'));
app.use('/api/user', require('./routes/userRoute'));

httpServer.listen(6000, () => {
  console.log('Server is running on port 5000');
});
