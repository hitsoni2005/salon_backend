const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let GetInquiries = async (req, res) => {
    try {
        let db = connectDb();
        let collection = (await db).collection("general_inquiries")
        let { user_id } = req.params;
        let getInquiries = await collection.find({ user_id: ObjectId.createFromHexString(user_id) }).toArray();
        if (!getInquiries) {
            return res.status(400).send({ success: false, message: "Inquiries not found" })
        }
        return res.status(200).send({ success: true, message: "Inquiries Found Successfully", getInquiries, total: getInquiries.length })
    } catch (error) {
        return res.status(500).send("Internal server error.")
    }
}

module.exports = { GetInquiries }