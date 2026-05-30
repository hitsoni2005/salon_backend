const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let UpdateAdminCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_categories")
        let { category_id, category_name, category_description, status } = req.body;
        if (!category_id) {
            return res.status(400).send({ success: false, message: "Category Id Is Not Provided" })
        }

        let update_fields = { updated_at: new Date() }

        if (category_name) {
            update_fields.category_name = category_name;
        }

        if (category_description) {
            update_fields.category_description = category_description;
        }

        if (status) {
            update_fields.status = status;
        }

        if (req.file) {
            update_fields.category_image = `/uploads/categories/${req.file.filename}`
        }
        console.log(category_id)
        let updateCategory = await collection.updateOne({ _id: new ObjectId(category_id) }, { $set: update_fields })

        if (updateCategory.matchedCount === 0) {
            return res.status(400).send({ success: false, message: "Category Not Found" })
        }
        return res.status(200).send({ success: true, message: "Category updated successfully." })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { UpdateAdminCategory }