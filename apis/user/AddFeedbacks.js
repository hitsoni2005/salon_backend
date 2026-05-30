const { connectDb } = require("../../db/connection")

let AddFeedbacks = async (req, res) => {
    try {
        let db = connectDb();
        let collection = (await db).collection("feedbacks")
        let { feedback_message, rating } = req.body;
        if (!feedback_message || !rating) {
            return res.status(400).send({ success: false, message: "All fields are required" })
        }

        let insertFeedback = await collection.insertOne({ feedback_message, rating })
        if (insertFeedback.acknowledged) {
            return res.status(200).send({ success: true, message: "Feedback Added Successfully" })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { AddFeedbacks }