const { connectDb } = require("../../db/connection")

let GetAdminServices = async (req, res) => {
    try {
        let db = await connectDb()
        let collection = db.collection("services")
        let getServices = await collection.find({}).toArray()
        return res.status(200).send({ success: true, message: "Services Found Successfully.", getServices })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { GetAdminServices }