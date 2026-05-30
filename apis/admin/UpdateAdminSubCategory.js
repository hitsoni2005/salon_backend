const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let UpdateAdminSubCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories")
        let { id, subcategory_name, subcategory_description, status } = req.body;
        if (!id) {
            return res.status(400).send({ success: false, message: "Id is required" })
        }
        let update_fields = { updated_at: new Date() }

        if (subcategory_name) {
            update_fields.subcategory_name = subcategory_name;
        }

        if (subcategory_description) {
            update_fields.subcategory_description = subcategory_description;
        }

        if (status) {
            update_fields.status = status;
        }

        if (req.file) {
            update_fields.subcategory_image = `/uploads/subcategories/${req.file.filename}`
        }

        console.log(id)
        let updateSubCategory = await collection.updateOne({ _id: new ObjectId(id) }, { $set: update_fields })

        if (updateSubCategory.matchedCount === 0) {
            return res.status(400).send({ success: false, message: "Subcategory not found" })
        }
        return res.status(200).send({ success: true, message: "Subcategory updated successfully" })

    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { UpdateAdminSubCategory }