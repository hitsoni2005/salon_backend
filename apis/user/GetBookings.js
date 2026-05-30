const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let GetBookings = async (req, res) => {
    let db = connectDb();
    let collection = (await db).collection("bookings")
    let { user_id } = req.params;
    let getBookings = await collection.find({ user_id: ObjectId.createFromHexString(user_id) }).toArray();
    if (!getBookings) {
        return res.status(400).send({ success: false, message: "Bookings Not Found" })
    }
    return res.status(200).send({ success: true, message: "Bookings Found Successfully", getBookings, total: getBookings.length })
}

module.exports = { GetBookings }