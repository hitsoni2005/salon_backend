const { ObjectId } = require("bson");
const { connectDb } = require("../../db/connection");

let GetServiceDetails = async (req, res) => {
    try {
        let { id } = req.params;
        let db = await connectDb();
        let collection = db.collection("services")
        let serviceDetails = await collection.findOne({ _id: ObjectId.createFromHexString(id), status: "Active" })

        if (!serviceDetails) {
            return res.status(200).send({ success: false, message: "Services details not found" })
        }
        return res.status(200).send({
            success: true,
            message: "Services details found",
            serviceDetails
        })
    } catch (e) {
        return res.status(400).send({ status: false, message: "Internal server error" })
    }
}

module.exports = { GetServiceDetails }