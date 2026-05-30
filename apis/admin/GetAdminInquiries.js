const { connectDb } = require("../../db/connection")

let GetAdminInquiries = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("general_inquiries")
        let getInquiries = await collection.find({}).toArray();
        return res.status(200).send({ success: true, message: "Inquiries fetched successfully", getInquiries, total: getInquiries.length })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { GetAdminInquiries }