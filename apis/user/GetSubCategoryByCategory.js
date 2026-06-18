const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let GetSubCategoryByCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories")
        let { category_id } = req.params;

        let subCategoryByCategory = await collection.find({ category_id: new ObjectId(category_id) }).toArray();
        if (subCategoryByCategory.length === 0) {
            return res.status(400).send({ success: false, message: "SubCategory By category not found" })
        }
        return res.status(200).send({ success: true, message: "Data Found", subCategoryByCategory })
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { GetSubCategoryByCategory }