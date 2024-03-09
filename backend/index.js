import express from "express";
import questionsRouter from './routes/Questions.js'
import authRouter from './routes/Auth.js'
import todoRouter from './routes/ToDo.js'
import graphRouter from './routes/Graph.js'
import msgRouter from './routes/Msg.js';
import grpRouter from './routes/Grps.js';
import userRouter from './routes/User.js'
import cors from 'cors';
import dotenv from 'dotenv'
import { Server } from "socket.io";
import connectToDB from "./utils/connectToDB.js";
import http from 'http'
import path from "path";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/questions',questionsRouter)
app.use('/api/todo',todoRouter)
app.use('/api/graph',graphRouter)
app.use('/api/group',grpRouter);
app.use('/api/chat',msgRouter);
app.use('/api/user', userRouter)


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log('User connected')
  socket.on("join", (room) => socket.join(room));
  socket.on("send-message", (message, grp, sender) => {
    console.log(message);
    socket
      .to(grp)
      .emit("receive-message", { content: message, sender: sender });
  });
});

app.get('/api',(req,res) => {
  return res.status(200).send('MECLABS EDUPROJECT API')
});

if (process.env.PRODUCTION === "true") {
  app.use(express.static('../frontend/dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../frontend/dist', 'index.html'));
  });
}

server.listen(5000, async () => {
  await connectToDB()
  console.log('App running at port 5000');
})