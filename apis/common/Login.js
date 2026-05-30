const { connectDb } = require("../../db/connection")
const jwt = require("jsonwebtoken")
require("dotenv").config();
let jwt_secret = process.env.JWTSECRET_KEY;

let Login = async (req, res) => {
    try {
        let db = await connectDb();
        let collection = db.collection("users")
        let { email, password } = req.body;
        let user = await collection.findOne({ email, password })
        let newUser = {
            id: user._id,
            email: user.email,
            mobile_no: user.mobile_no,
            role: user.role,
            status: user.status
        }

        let token = jwt.sign(newUser, jwt_secret, { expiresIn: '1h' })

        if (user) {
            return res.status(200).send({ success: true, message: "Login Successfull", token, role: user.role })
        } else {
            return res.status(400).send({ success: false, message: "Invalid Details" })
        }

    } catch (e) {
        return res.status(400).send({ success: false, message: "Internal server error" })
    }
}

module.exports = { Login }