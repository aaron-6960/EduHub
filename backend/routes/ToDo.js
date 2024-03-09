import express from 'express'
import TodoList from '../models/TodoList.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.post('/', async (req,res) => {
    try{
        const user = JSON.parse(req.headers.authorization)
        const {taskDesc, taskName, deadline} = req.body;
        const task = new TodoList({
            taskDesc:taskDesc,
            taskName: taskName,
            deadline: deadline,
            author: new ObjectId(user._id)
        })
        await task.save()

        return res.json(task)
    } catch (err) {
        console.log(err)
    }
})

router.get('/', async(req,res) => {
    try{
        const user = JSON.parse(req.headers.authorization)
        const currentDate = new Date()
        var dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 3)

        const tasks = await TodoList.find({
            author: new ObjectId(user._id),
            completed:false,
            deadline: {
                $gte: currentDate,
                $lt: dueDate
            }
        }).populate('author')
        return res.json(tasks)
    } catch (e) {
        console.log(e)
    }
})

router.get('/all', async(req,res) => {
    try {
        const user = JSON.parse(req.headers.authorization)
        const tasks = await TodoList.find({author: new ObjectId(user._id)}).populate('author')
        return res.json(tasks)
    } catch (error) {
        console.log(error)
    }
})

router.patch('/:id',async(req,res) => {
    try {
        const user = JSON.parse(req.headers.authorization)
        const taskId = req.params.id
        const newTodo = req.body
        await TodoList.findOneAndUpdate({
            author: new ObjectId(user._id),
            _id:new ObjectId(taskId)
        },newTodo) 
        return res.json({message:`Task with ID ${taskId} has been updated`}).status(200)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id',async(req,res) => {
    try {
        const user = JSON.parse(req.headers.authorization)
        const taskId = req.params.id
        await TodoList.findOneAndDelete({
            author: new ObjectId(user._id),
            _id:new ObjectId(taskId)
        })
        return res.json({message:`Task with ID ${taskId} has been deleted`}).status(200)
    } catch (error) {
        console.log(error)
    }
})
export default router