const { connectDb } = require("../../db/connection")

let GetAdminSubCategory = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("service_subcategories")
        let subcategories = await collection.find({}).toArray();
        return res.status(200).send({ success: true, message: "SubCategories found", subcategories })
    } catch (e) {
        return res.status(500).send("Internal server error")
    }
}

module.exports = { GetAdminSubCategory }