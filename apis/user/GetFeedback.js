const { connectDb } = require("../../db/connection")

let GetFeedback = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("feedbacks")
        let getFeedback = await collection.find({}).toArray();
        if (!getFeedback) {
            return res.status(400).send({ success: false, message: "Feedbacks not found" })
        }
        return res.status(200).send({ success: true, message: "Feedbacks found", getFeedback, total: getFeedback.length })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { GetFeedback }