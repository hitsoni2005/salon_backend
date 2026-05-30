const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let CloseAdminInquiry = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("general_inquiries")
        let { inquiry_id } = req.body;
        if (!inquiry_id) {
            return res.status(400).send({ success: false, message: "Inquiry Id Required." })
        }

        let closeInquiry = await collection.updateOne({ _id: new ObjectId(inquiry_id) },
            { $set: { status: "Closed", closed_at: new Date(), updated_at: new Date() } })

        if (closeInquiry.matchedCount === 0) {
            return res.status(400).send({ success: false, message: "Inquiry Not Found." })
        }

        return res.status(200).send({ success: true, message: "Inquiry Closed Successfully." })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { CloseAdminInquiry }