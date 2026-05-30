const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let DeleteAdminCategories = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_categories");
        let { category_id } = req.params;
        let removeCategory = await collection.deleteOne({ _id: ObjectId.createFromHexString(category_id) })
        if (removeCategory.deletedCount > 0) {
            return res.status(200).send({ success: true, message: "Category Removed" })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { DeleteAdminCategories }