import express from 'express'
import Question from '../models/Question.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.get('/',async (req,res) => {
    try{
        await Question.find({}).limit(10).sort({'_id': -1}).populate('author').then((questions) => {
            res.json(questions).status(200)
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/user', async(req,res) => {
    try {
        const _id = req.headers.authorization
        await Question.find({author: new ObjectId(_id)}).sort({'_id': -1}).populate('author').then((questions) => {
            res.json(questions).status(200)
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/new',async (req,res) => {
    const reqBody = req.body
    try {
        const question = new Question({
            question: reqBody.question,
            author: new ObjectId(reqBody.author),
            comments: []
        })
        await question.save()
        res.json({"id":question._id})
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id',async (req,res) => {
    const id = req.params.id
    try {
        const question = await Question.findById(id).populate('author').populate({
            path: 'comments.author',
            model: 'User'
        })
        if (question) {
            res.json(question).status(200)
        } else {
            res.json({"error":"Question not found"}).status(404)
        }
    } catch (err) {
        console.log(err)
    }
})

router.patch('/:id', async (req,res) => {
    const id = req.params.id
    try {
        let question = await Question.findById(id)
        question.comments.push({
            comment: req.body.comment,
            author: new ObjectId(req.body.author)
        })
        await question.save()
        await Question.findOne({_id:id}).populate('author').populate({
            path: 'comments.author',
            model: 'User'
        })
        .then(question => {
            res.json(question)
        })

    } catch (err) {
        console.log(err)
    }
})

export default router