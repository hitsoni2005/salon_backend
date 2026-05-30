const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let UpdateAdminService = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("services")
        let { id, service_name, service_description, price, duration_mins, status } = req.body;
        if (!id) {
            return res.status(400).send({ success: false, message: "Id is required" })
        }

        let update_fields = { updated_at: new Date() }

        if (service_name) {
            update_fields.service_name = service_name;
        }

        if (service_description) {
            update_fields.service_description = service_description;
        }

        if (price) {
            update_fields.price = price;
        }

        if (duration_mins) {
            update_fields.duration_mins = duration_mins;
        }

        if (status) {
            update_fields.status = status;
        }

        if (req.file) {
            update_fields.service_image = `/uploads/services/${req.file.filename}`
        }

        let updateServices = await collection.updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: update_fields })

        if (updateServices.matchedCount === 0) {
            return res.status(400).send({ success: false, message: "Service not found" })
        }
        return res.status(200).send({ success: true, message: "Service updated successfully" })

    } catch (error) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { UpdateAdminService }