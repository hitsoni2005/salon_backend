const { connectDb } = require("../../db/connection")

let GetSubCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories")
        let categories = await collection.find({ status: "Active" }).toArray();
        return res.status(200).send({
            status: true,
            message: "SubCategories found",
            categories,
        })
    } catch (e) {
        return res.status(400).send({ status: false, message: "Internal server error" })
    }
}

module.exports = { GetSubCategory };