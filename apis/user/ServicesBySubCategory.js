const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let ServicesBySubCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = await db.collection("services");
        let { subcategory_id } = req.params;
        let servicesBySubCategory = await collection.findOne({ subcategory_id: ObjectId.createFromHexString(subcategory_id) })
        if (!servicesBySubCategory) {
            return res.status(400).send({ success: false, message: "Service not found" })
        }
        return res.status(200).send({ success: true, message: "Serices Found", servicesBySubCategory })
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { ServicesBySubCategory }