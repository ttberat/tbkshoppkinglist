const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://tokay:Supradyn1-@cluster0-s1arx.mongodb.net/ShoppingList?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true   
}
).then(()=>{
    console.log("DB connected!")
}).catch(()=>{
    console.log("DB connection failed!")
})