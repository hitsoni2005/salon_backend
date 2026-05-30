const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let AddAdminSubCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories")
        let { category_id, subcategory_name, subcategory_description, status } = req.body;
        let subcategory_image = req.file ? `/uploads/subcategories/${req.file.filename}` : "";

        let insertSubCategory = await collection.insertOne({ category_id: new ObjectId(category_id), subcategory_name, subcategory_description, subcategory_image, status, created_at: new Date() })

        if (insertSubCategory.acknowledged) {
            return res.status(200).send({ success: true, message: "SubCategory added successfully" })
        }
    } catch (e) {
        console.log(e);

        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { AddAdminSubCategory }