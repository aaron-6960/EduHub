import express, { response } from 'express'
import Graph from '../models/Graph.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.post('/', async(req,res) => {
    try {
        const body = req.body
        const percentage = String(Math.round(body.marksObtained/body.totalMarks*100))
        const graph = await Graph.findOne({
            author: new ObjectId(body.user),
            subject: body.subject
        })
        if (graph) {
            graph.date.push(body.date)
            graph.percentage.push(percentage)
            await graph.save()
            res.json(graph).status(200)
        } else {
            const newGraph = Graph({
                subject: body.subject,
                author: new ObjectId(body.user),
                date: [body.date],
                percentage: [percentage],
                borderColor: body.borderColor
            })
            await newGraph.save()
            res.json(newGraph).status(201)
        }
    }catch(err){
        console.log(err)
    }
})

router.get('/', async(req,res) => {
    try {
        const user = JSON.parse(req.headers.authorization)
        const graphData = await Graph.find({author: new ObjectId(user._id)})
        if (graphData && graphData.length > 0) {
            let response={
                labels:[],
                datasets:[]
            }
            response.labels = graphData[0].date
            for (let i = 0; i < graphData.length; i++) {
                let subjectData = {}
                subjectData.label = graphData[i].subject
                subjectData.data = graphData[i].percentage
                subjectData.borderColor = graphData[i].borderColor
                response.datasets.push(subjectData)
            }
            res.json(response).status(200)
        } else {
            res.json({message: 'User does not have any data'}).status(404)
        }
    } catch (error) {
        console.log(error)
    }
})

router.patch('/:user_id', async(req, res) => {
    try {
        const user = JSON.parse(req.headers.authorization)
        const newGraphData = req.body
        await Graph.findOneAndUpdate({
            author: new ObjectId(user._id)
        }, newGraphData)
        return res.json({message: `Graph data of user with ID ${user._id} has been updated`}).status(200)
    } catch (error) {
        console.log(error)
    }
})

export default router