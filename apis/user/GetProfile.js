const { ObjectId } = require("mongodb");
const { connectDb } = require("../../db/connection")

let GetProfile = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("users")
        let profile = await collection.findOne({ _id: new ObjectId(req.user.id) }, { projection: { password: 0 } })
        if (!profile) {
            return res.status(400).send({ success: false, message: "User not found" })
        }
        return res.status(200).send({ success: true, message: "User profile found", profile })
    } catch (e) {
        console.log(e)
        return res.status(500).send({ success: false, message: "Internal server error." })
    }
}

module.exports = { GetProfile }