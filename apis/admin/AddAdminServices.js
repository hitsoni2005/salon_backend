const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let AddAdminServices = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("services")
        let { category_id, subcategory_id, service_name, service_description, price, duration_mins, status } = req.body;
        let service_image = req.file ? `/uploads/services/${req.file.filename}` : "";

        let insertService = await collection.insertOne({ category_id: new ObjectId(category_id), subcategory_id: new ObjectId(subcategory_id), service_name, service_description, price, duration_mins, service_image, status, created_at: new Date() })

        if (insertService.acknowledged) {
            return res.status(200).send({ success: true, message: "Service Added Successfully" })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { AddAdminServices }