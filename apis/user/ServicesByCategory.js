const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let ServicesByCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = (await db).collection("services")
        let { category_id } = req.params;
        console.log(category_id)
        let servicesByCategory = await collection.findOne({ category_id: ObjectId.createFromHexString(category_id) })
        if (!servicesByCategory) {
            return res.status(400).send({ success: false, message: "Service Not Found" })
        }
        return res.status(200).send({ success: true, message: "Service Found", servicesByCategory })

    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { ServicesByCategory }