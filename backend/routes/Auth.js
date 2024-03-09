import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/login',async (req,res) => {
    try {
        const username = req.body.username
        if (username){
            let user = await User.findOne({username:username})
            if (!user) {
                user = new User({username: username})
                user.save()
            }
            res.json(user).status(200)

        } else {
            res.json({error: 'Invalid username'}).status(401)
        }
 
    } catch (err) {
        console.log(err)
    }
})

export default router