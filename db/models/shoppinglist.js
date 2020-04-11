const mongoose = require('mongoose')
const validator = require('validator')

const ListSchema = new mongoose.Schema ({
    productlist:{
        type:String,
        unique:true,
        maxlength:30,
        required:true,
        trim:true,
        validate(value){
            if(validator.isNumeric(value) || validator.isEmpty(value)){
                throw new Error('Enter a correct productlist name!')
            }
        }
    },
    items:[{
        item:{
            type:String,
            maxlength:30,
            unique:true,
            trim:true,
            validate(value){
                if(validator.isNumeric(value) || validator.isEmpty(value)){
                    throw new Error('Enter a correct product name!')
                }
            }
        },
        count:{
            type:Number,
            default:1,
            validate(value){
                if(value <= 0){
                    throw new Error('Enter a correct numeric digit!')
                }
            }
        },
        completed:{
            type:Boolean,
            default:false
        }
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})


ListSchema.methods.addItem = async function(items){
    
    items.map((value)=>{this.items = this.items.concat({...value})})
    await this.save()
    return items
}


ListSchema.methods.deleteItem = async function(id){
    
    const newitems = this.items.filter((item)=>item._id.toString()!==id.toString())
    this.items = newitems
    await this.save()
    return 

}


ListSchema.methods.updateItem = async function (value) {

    let item = Object.keys(value)
    let olditem = this.items.filter((iter)=>iter._id.toString()===value.item_id.toString())
    olditem = olditem[0]
    item = item.filter((x) => (x!=='list_id' && x!=='item_id'))
    item.map((data)=>olditem[data]=value[data])
    this.items.map((indexitem)=>{if(indexitem._id.toString() === olditem._id.toString()){ this.items[indexitem]=olditem}})
    await this.save()
    return
}



const List = mongoose.model("List",ListSchema)

module.exports = List