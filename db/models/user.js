const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if (validator.isEmpty(value) || !validator.isEmail(value)){
                throw new Error('Enter a correct email!')
            }
        }
    },
    name:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(validator.isEmpty(value) || validator.isNumeric(value)){
                throw new Error('Enter a correct name!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            if(validator.isEmpty(value) || value.toLowerCase().includes('password')){
                throw new Error('Wrong password type!')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

UserSchema.methods.toJSON =  function(){

    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

UserSchema.statics.findCridentials = async function(email,password){
    const user = await User.findOne({email:email})
    if (!user){throw new Error('WRONG!')}
    const isvalid = await bcrypt.compare(password,user.password)
    if (!isvalid){throw new Error('WRONG!')}
    return user
}

UserSchema.methods.generateToken = async function () {
    
    const token = jwt.sign({_id: this._id.toString()},"?FDjvZ<Z5P=z8J2GSA8bL=JT*a")
    this.tokens = this.tokens.concat({token:token})
    await this.save()
    return token
}



UserSchema.pre('save', async function(next){

    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

const User = mongoose.model('User',UserSchema)


module.exports = User