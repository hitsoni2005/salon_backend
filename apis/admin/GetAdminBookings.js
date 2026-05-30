const { connectDb } = require("../../db/connection")

let GetAdminBooking = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("bookings")
        let getBookings = await collection.find({}).toArray();
        return res.status(200).send({ succes: true, message: "Bookings Found Successfully", getBookings, total: getBookings.length })
    } catch (error) {
        return res.status(500).send({ succes: false, message: "Internal server error" })
    }
}

module.exports = { GetAdminBooking }