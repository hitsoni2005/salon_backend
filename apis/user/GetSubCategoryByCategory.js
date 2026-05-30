const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let GetSubCategoryByCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories")
        let { category_id } = req.params
        console.log(category_id);
        ;
        let subCategoryByCategory = await collection.findOne({ category_id: ObjectId.createFromHexString(category_id) })
        if (!subCategoryByCategory) {
            return res.status(400).send({ success: false, message: "SubCategory By category not found" })
        }
        return res.status(200).send({ success: true, message: "Data Found", subCategoryByCategory })
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { GetSubCategoryByCategory }