const { connectDb } = require("../../db/connection")

let GetCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_categories")
        let categories = await collection.find({ status: "Active" }).toArray();
        return res.status(200).send({
            status: true,
            message: "Categories found",
            categories, 
        })
    } catch (e) {
        return res.status(400).send({ status: false, message: "Internal server error" })
    }
}

module.exports = { GetCategory };