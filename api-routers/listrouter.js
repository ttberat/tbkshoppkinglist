const express = require('express')
const auth = require('../middlewares/auth')
const List = require('../db/models/shoppinglist')
const router  = express.Router()
/*
    list add V      X
    list delete V   X
    list update V   X
    item add V      X
    item delete V   X
    item update V   X
    
    GET Full lists for homepage V   X
    }
*/
router.get('/a',async (req,res)=>{
    try {
        const data = await List.find({_id:'5e78085161504f318ee6bbea'})
        res.status(200).json(data) 
    } catch (error) {
        res.status(400).json({err:'can not get lists!'})
    }
})

router.post('/list/add',auth, async (req,res)=>{
    try {
        const list = new List({
            ...req.body,
            owner:req.user._id
        })
        await list.save()
        const wholelist = await List.find({owner:req.user._id})
        res.status(201).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Not updated list!'})
    }
})

router.delete('/list/delete',auth, async (req,res)=>{
    try {
        await List.findByIdAndDelete({_id:req.body.list_id})
        res.status(200).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Not updated list!'})
    }
})

router.patch('/list/update',auth, async (req,res)=>{
    try {
        await List.findByIdAndUpdate({_id:req.body.list_id},{$set:{productlist:req.body.productlist}})
        res.status(200).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Not updated list!'})
    }
})

router.post('/item/add', async (req,res)=>{
    try{
        const chosenlist = await List.findOne({_id:req.body.list_id})
        await chosenlist.addItem(req.body.items)
        const data = await List.findOne({_id:req.body.list_id,items:{$elemMatch:{"items.item":req.body.items.item,"items.count":req.body.items.count}}})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({err:'Not updated item!'})
    }
})

router.delete('/item/delete', async (req,res)=>{
    try {
        const chosenlist = await List.findOne({_id:req.body.list_id})
        await chosenlist.deleteItem(req.body.item_id)
        const newlist = await List.findOne({_id:req.body.list_id}) 
        res.status(200).json(newlist)
    } catch (error) {
        res.status(400).json({err:'Not updated item!'})
    }
})

router.patch('/item/update',auth, async (req,res)=>{
    try {
         const chosenlist = await List.findOne({_id:req.body.list_id})
         await chosenlist.updateItem(req.body)
        res.status(200).json({success: TRUE})
    } catch (error) {
        res.status(400).json({err:'Not updated item!'})
    }
})

module.exports = router