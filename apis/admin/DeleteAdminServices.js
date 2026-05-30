const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let DeleteAdminServices = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("services")
        let { id } = req.params;
        let deleteService = await collection.deleteOne({ _id: new ObjectId(id) })
        if (deleteService.deletedCount > 0) {
            return res.status(200).send({ success: true, message: "Service deleted successfully" })
        }
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { DeleteAdminServices }