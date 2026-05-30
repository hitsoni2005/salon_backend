const { connectDb } = require("../../db/connection")

let GetAdminFeedbacks = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("feedbacks")
        let getFeedbacks = await collection.find({}).toArray();
        return res.status(200).send({ success: true, message: "Feedbacks Found Successfully", getFeedbacks, total: getFeedbacks.length })
    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { GetAdminFeedbacks }