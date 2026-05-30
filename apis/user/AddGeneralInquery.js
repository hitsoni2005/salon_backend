const { connectDb } = require("../../db/connection")

let AddGeneralInquery = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("general_inquiries")
        let { inquiry_message, inquiry_subject } = req.body;
        if (!inquiry_message || !inquiry_subject) {
            return res.status(400).send({ success: false, message: "All fields are required" })
        }
        let insertInquery = await collection.insertOne({ user_id: req.user.id, inquiry_message, inquiry_subject, inquiry_date: new Date(), status: "Pending" })
        if (insertInquery.acknowledged) {
            return res.status(201).send({ success: true, message: "Inquery added successfully" })
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { AddGeneralInquery }