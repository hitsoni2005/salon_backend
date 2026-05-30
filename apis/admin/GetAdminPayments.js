const { connectDb } = require("../../db/connection")

let GetAdminPayments = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("payments")
        let getPayments = await collection.find({}).toArray();
        return res.status(200).send({ success: true, message: "Payments fetched succesfully", getPayments, total: getPayments.length })
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { GetAdminPayments }