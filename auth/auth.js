let jwt = require("jsonwebtoken")
require("dotenv").config();
let secret = process.env.JWTSECRET_KEY;

let AuthMiddleWare = (req, res, next) => {
    let authHeaders = req.headers["authorization"];
    if (!authHeaders) {
        return res.status(401).send({ success: false, message: "Unathorized access: headers are not provided" })
    }
    let token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
        return res.status(401).send({ success: false, message: "Unathorized access: token not provided" })
    }
    try {
        let decoded = jwt.verify(token, secret)
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).send({
            success: false,
            message: e.message
        })
    }
}

module.exports = AuthMiddleWare;