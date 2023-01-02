const { default: mongoose } = require("mongoose")
const congoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId

const orderSchema= new mongoose.Schema({

    customerId:{
        type: objectId,
        ref: "customer"
    },
    product:{
        type:String,
        require:true
    },
    price:{
        type:Number,

    },
    orderId:{
        type:Number
    }
},{timestamps:true})

module.exports = mongoose.model("order", orderSchema)