const { connectDb } = require("../../db/connection")

let GetAdminCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_categories")
        let categories = await collection.find({}).toArray();
        return res.status(200).send({ success: true, message: "Categories found", categories })
    } catch (e) {
        return res.status(500).send("Internal server error")
    }
}

module.exports = { GetAdminCategory }