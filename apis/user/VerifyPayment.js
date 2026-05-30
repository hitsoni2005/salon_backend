const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")
require("dotenv").config()
let crypto = require("crypto")

let VerifyPayment = async (req, res) => {
    try {
        let { booking_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        if (!booking_id || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).send({ success: false, message: "All Fields Are Required*" })
        }
        const generateSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

        if (generateSignature != razorpay_signature) {
            return res.status(400).send({ success: false, message: "Payment Failed." })
        }

        let db = await connectDb();
        let booking_collection = db.collection("bookings")
        let booking = await booking_collection.findOne({ _id: ObjectId.createFromHexString(booking_id), user_id: ObjectId.createFromHexString(req.user.id) })

        if (!booking) {
            return res.status(400).send({ success: false, message: "Booking Not Found." })
        }

        if (booking.payment_status == "Paid") {
            return res.status(200).send({ success: true, message: "Booking Is Allredy Paid" })
        }

        let payment_collection = db.collection("payments")
        let insertPayment = await payment_collection.insertOne({
            user_id: ObjectId.createFromHexString(req.user.id),
            booking: ObjectId.createFromHexString(booking_id),
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount: booking.total_amount,
            payment_status: "Paid",
            payment_date: new Date()
        })

        if (insertPayment.acknowledged) {
            let updateStatus = await booking_collection.updateOne({
                _id: ObjectId.createFromHexString(booking_id),
                user_id: ObjectId.createFromHexString(req.user.id)
            }, { $set: { booking_status: "Booked", payment_status: "Paid" } })
            return res.status(200).send({ success: true, message: "Payment successfull." })
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { VerifyPayment }