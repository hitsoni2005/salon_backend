const { connectDb } = require("../../db/connection")

let ChangePassword = async (req, res) => {
    try {
        let db = await connectDb();
        let { email, new_password } = req.body;
        if (!email || !new_password) {
            return res.status(400).send({ success: false, message: "Email and new password is required" })
        }
        let userCollection = db.collection("users")
        let existingEmail = await userCollection.findOne({ email })
        if (!existingEmail) {
            return res.status(400).send({ success: false, message: "Email doesn't exists" })
        }

        let updatePassword = await userCollection.updateOne({ email }, { $set: { password: new_password, updated_at: new Date() } })

        if (updatePassword.modifiedCount > 0) {
            return res.status(200).send({ success: true, message: "Password Changed Successfully." })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { ChangePassword }