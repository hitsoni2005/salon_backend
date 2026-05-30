const { connectDb } = require("../../db/connection")

let GetAdminUsers = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = (await db).collection("users")
        let getUsers = await collection.find({}).toArray();
        if (!getUsers) {
            return res.status(400).send({ success: false, message: "Users Not Found" })
        }
        return res.status(200).send({ success: true, message: "Users Found Successfully", getUsers })
    } catch (e) {
        return res.status(500).send("Internal server error")
    }
}

module.exports = { GetAdminUsers }