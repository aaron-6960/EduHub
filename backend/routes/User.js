import User from '../models/User.js'
import express from 'express'

const router = express.Router()

router.post('/getUsersByCollege', async (req,res) => {
    try {
        if (req.body.college) {
            const data = await User.find({college: req.body.college, _id: {$ne: req.body._id}})
            console.log(data)
            res.status(200).json(data)
        } else {
            res.status(404).json({message:"no data"})
        }
    } catch (error) {
        console.log(error)
    }
})

router.patch('/update', async (req,res) => {
    try {
        const newData = req.body
        await User.findByIdAndUpdate(newData._id, newData)
        res.json({"message":"Updated successfully"}).status(200)
    } catch (error) {
        console.log(error)
    }
    
})

export default router