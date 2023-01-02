const customerModel = require("../models/customerModel")
const orderModel = require("../models/orderModel")
const Alert = require("./Alert")


const createOrder = async (req, res) => {
    try {
        let data = req.body
        console.log(data.customerId)
        let existCustomer = await customerModel.findById({ _id: data.customerId })
        if (!existCustomer) {
            return res.status(400).send({ status: false, msg: "Customer not exist" })
        }

        let numberOfOrders = await orderModel.find({ customerId: data.customerId })
        let totalOrder = numberOfOrders.length+1
        console.log(totalOrder)

        data.orderId = totalOrder
        console.log(data)

        if (totalOrder == 9) {
           Alert.AlertGold()
            
        }

        if (totalOrder == 10) {
            await customerModel.findOneAndUpdate({ _id: data.customerId }, { catageroy: "Gold" }, { new: true })
        }

        if (totalOrder == 19) {
            Alert.AlertPlatinum()
           
        }

        if (totalOrder == 20) {
            await customerModel.findOneAndUpdate({ _id: data.customerId }, { catageroy: "platinum" }, { new: true })
        }
        let order = await orderModel.create(data)
        return res.status(201).send({ status: true, data: order })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports = { createOrder }