const { ObjectId, MongoBatchReExecutionError } = require("mongodb");
const { connectDb } = require("../../db/connection")

let UpdateAdminBooking = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("bookings")
        let { booking_id, booking_status, payment_status, booking_date, time_slot, total_amount } = req.body;
        if (!booking_id) {
            return res.status(400).send({ success: false, message: "Booking Id Is Required." })
        }

        let updateData = { updated_at: new Date() }

        if (booking_status) {
            updateData.booking_status = booking_status;
        }

        if (payment_status) {
            updateData.payment_status = payment_status;
        }

        if (booking_date) {
            updateData.booking_date = booking_date;
        }

        if (time_slot) {
            updateData.time_slot = time_slot;
        }

        if (total_amount) {
            updateData.total_amount = total_amount;
        }

        let updateBooking = await collection.updateOne({ _id: new ObjectId(booking_id) },
            { $set: updateData })

        if (updateBooking.modifiedCount > 0) {
            return res.status(200).send({ success: true, message: "Booking Updated Succesfully." })
        }

        return res.status(400).send({ success: false, message: "No Changes Made." })

    } catch (error) {
        console.log(error);
        
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { UpdateAdminBooking }