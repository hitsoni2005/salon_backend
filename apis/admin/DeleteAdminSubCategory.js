const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let DeleteAdminSubCategories = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories")
        let { subcategory_id } = req.params;
        let deleteSubCategory = await collection.deleteOne({ _id: ObjectId.createFromHexString(subcategory_id) })
        if (deleteSubCategory.deletedCount > 0) {
            return res.status(200).send({ success: true, message: "Subcategory deleted successfully." })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { DeleteAdminSubCategories }
