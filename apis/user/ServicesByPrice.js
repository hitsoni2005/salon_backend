const { parse } = require("dotenv");
const { connectDb } = require("../../db/connection")

let ServicesByPrice = async (req, res) => {
    try {
        let { min_price, max_price } = req.query;
        let filter = { status: "Active" }
        if (min_price || max_price) {
            filter.price = {}
            if (min_price) {
                filter.price.$gt = parseFloat(min_price)
            }
            if (max_price) {
                filter.price.$lt = parseFloat(max_price)
            }
            if (min_price && max_price) {
                filter.price.$gt = parseFloat(min_price)
                filter.price.$lt = parseFloat(max_price)
            }
        }

        let db = await connectDb();
        let collection = db.collection("services")
        let servicesByPrice = await collection.find(filter).toArray();

        return res.status(200).send({ success: true, message: "Service Found", servicesByPrice, total: servicesByPrice.length })
    } catch (e) {
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { ServicesByPrice }