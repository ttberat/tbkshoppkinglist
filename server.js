const express = require('express')
const path = require('path')
const ShoppingListRouter = require('./api-routers/listrouter')
const UserRouter = require('./api-routers/userrouter')
require('./db/config')


const port = process.env.PORT || 3001
const app = express()


app.use(express.json())
app.use(ShoppingListRouter)
app.use(UserRouter)

if (process.env.NODE_ENV==='production'){

    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname+'/client/build/index.html'))
    })
}


app.listen(port, () =>{
    console.log('Server side is on at port '+port)
})




