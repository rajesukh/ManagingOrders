const cron = require("node-cron")
const mongoose = require("mongoose")
const customerModel = require("../models/customerModel")
const orderModel = require("../models/orderModel")



const createOrder = async (req, res) => {
    try {
        let data = req.body
        await orderModel.updateMany()
        let { customerId, price, product } = data
        if (!customerId || !price || !product) {
            return res.status(400).json({ status: false, msg: "data missing" })
        }
        if (!mongoose.isValidObjectId(customerId)) {
            return res.status(400).send({ status: false, msg: "customerid is invalid" })
        }

        let existCustomer = await customerModel.findById({ _id: customerId })
        if (!existCustomer) {
            return res.status(400).send({ status: false, msg: "Customer didn't find" })
        }

        let discount = 0
        let numberOfOrders = await orderModel.find({ customerId: data.customerId })
        let totalOrder = numberOfOrders.length + 1
        

        data.totalOrder = totalOrder
        if (totalOrder == 9) {
        //alerting customer abt Gold category
            cron.schedule('* * * * *', () => {
                console.log(" great! you have only one order left to become gold customer hurry up and get 10% discount on every order ")
            })
        }

        if (totalOrder == 10) {
            await customerModel.findOneAndUpdate({ _id: data.customerId }, {  category: "Gold" }, { new: true })
        }

        if (totalOrder > 10 && totalOrder < 20) {
            discount = price * 10 / 100
            price = price - discount
        }
        if (totalOrder == 19) {
                cron.schedule('* * * * *', () => {
                console.log(" great! you have only one order left to become platinum customer hurry up and get 20% discount on every order ")
            })

        }

        if (totalOrder == 20) {
            await customerModel.findOneAndUpdate({ _id: data.customerId }, { category: "platinum" }, { new: true })
        }
        if (totalOrder > 20) {
            discount = price * 20 / 100
            price = price - discount
        }
        data.discount = discount
        data.price = price

        let order = await orderModel.create(data)
        return res.status(201).send({ status: true, data: order })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports = { createOrder }