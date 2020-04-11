const express = require('express')
const User = require('../db/models/user')
const auth = require('../middlewares/auth')
const router  = express.Router()

/*
    user sign in V  X
    user delete V   X
    user update V   X
    user log in V   X
    user log out V  X
*/

router.post('/user/signin', async (req,res)=>{
    try {
        const user = new User(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(201).json({success: TRUE})
    } catch (error) {
        res.status(400).send('Something went wrong!')
    }
    
})

router.post('/user/login', async (req,res)=>{
    try {
        const user = await User.findCridentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.status(200).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Something went wrong!'})
    }
})

router.delete('/user/delete',auth, async (req,res)=>{
    try {
        await req.user.remove()
        res.status(200).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Something went wrong!'})
    }
})

router.patch('/user/update',auth, async (req,res)=>{
    const list = Object.keys(req.body)
    try {
        list.map((value)=>req.user[value]=req.body[value])
        await req.user.save()
        res.status(200).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Something went wrong!'})
    }
})

router.get('/user/logout',auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((value)=>req.token!==value.token)
        await req.user.save()
        res.status(200).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Something went wrong!'})
    }
})

module.exports = router