const mongoose = require('mongoose')

mongoose.connect("",{
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
