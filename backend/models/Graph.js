import mongoose,{Schema} from 'mongoose'

const graphSchema = new Schema({
    subject: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: [String],
    percentage: [String],
    borderColor: String
})

const Graph = mongoose.model("Graph", graphSchema)
export default Graph