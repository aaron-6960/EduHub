import mongoose from "mongoose";

const Schema = mongoose.Schema

const todoListSchema = new Schema({
    id: Schema.Types.ObjectId,
    taskName: {
        type: String,
        required: true,
    },
    taskDesc: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deadline: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const TodoList = mongoose.model("TodoList", todoListSchema)
export default TodoList