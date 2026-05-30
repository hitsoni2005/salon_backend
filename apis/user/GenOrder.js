const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")
require("dotenv").config();
const Razorpay = require("razorpay")

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

let GenOrder = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("bookings")
        let { booking_id } = req.body;

        let booking = await collection.findOne({ _id: ObjectId.createFromHexString(booking_id) })

        if (!booking) {
            return res.status(400).send({ success: false, message: "Booking not found" })
        }

        const order = await razorpay.orders.create({
            amount: Math.round(booking.total_amount * 100),
            currency: "INR",
            receipt: `receipt_${booking_id}`,
        })

        if (order) {
            return res.status(200).send({ success: true, message: "Order Generated", data: { order_id: order.id, currency: order.currency, total_amount: order.amount }, booking_id })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { GenOrder }