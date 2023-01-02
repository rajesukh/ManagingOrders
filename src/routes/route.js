const express = require("express")
const router = express.Router()

const customerController  = require("../controllers/customerController")
const orderController = require("../controllers/orderController")

router.post("/createCustomer", customerController.createCustomer)
router.post("/createOrder", orderController.createOrder)

module.exports= router