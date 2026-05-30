const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let BookService = async (req, res) => {
    try {
        let db = await connectDb();
        let serviceCollection = db.collection("services");
        let { service_id, booking_date, notes } = req.body;
        if (!service_id || !booking_date) {
            return res.status(400).send("Service id and bookig date is not provided.")
        }

        let service = await serviceCollection.findOne({ _id: ObjectId.createFromHexString(service_id), status: "Active" })

        if (!service) {
            return res.status(400).send({ success: false, message: "Service not found." })
        }

        let bookingCollection = db.collection("bookings")

        let bookService = await bookingCollection.insertOne({
            user_id: ObjectId.createFromHexString(req.user.id),
            service_id: ObjectId.createFromHexString(service_id),
            booking_date,
            time_slot: "",
            total_amount: service.price,
            booking_status: "Pending",
            payment_status: "Pending",
            updated_at: new Date(),
            created_at: new Date()
        })

        if (bookService.acknowledged) {
            return res.status(200).send({ success: true, message: "Service Booked Successfully.", booking_id: bookService.insertedId })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { BookService }