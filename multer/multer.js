const multer = require("multer")
let path = require("path")

// initialization
const categorystorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/categories"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})

const subcategorystorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/subcategories"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})

const servicesstorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `uploads/services`),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})

const profilestorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `uploads/profiles`),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})

const categoryUpload = multer({ storage: categorystorage })
const subcategoryUpload = multer({ storage: subcategorystorage })
const serviceUpload = multer({ storage: servicesstorage })
const profileupload = multer({ storage: profilestorage })

module.exports = {
    categoryUpload,
    subcategoryUpload,
    serviceUpload,
    profileupload
}