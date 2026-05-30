const { ObjectId } = require("bson");
const { connectDb } = require("../../db/connection")

let GetServices = async (req, res) => {
    try {
        let { category_id, subcategory_id, min_price, max_price } = req.query;
        console.log(category_id)
        console.log(subcategory_id)
        console.log(min_price)
        console.log(max_price)

        let filter = { status: "Active" }

        if (category_id) {
            filter.category_id = ObjectId.createFromHexString(category_id);
        }

        if (subcategory_id) {
            filter.subcategory_id = ObjectId.createFromHexString(subcategory_id);
        }

        if (min_price || max_price) {
            filter.price = {}
            if (min_price) {
                filter.price.$gt = parseFloat(min_price);
            }
            if (max_price) {
                filter.price.$lt = parseFloat(max_price);
            }
            if (min_price && max_price) {
                filter.price.$gt = parseFloat(min_price);
                filter.price.$lt = parseFloat(max_price);
            }
        }

        let db = await connectDb();
        let collection = db.collection("services");
        let services = await collection.find(filter).toArray();

        return res.status(200).send({
            status: true,
            message: "Service found",
            services,
            total: services.length
        })
    } catch (e) {
        return res.status(400).send({ status: false, message: "Internal server error" })
    }
}

module.exports = { GetServices };