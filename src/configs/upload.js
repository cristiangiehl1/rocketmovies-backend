/*
    dont forget to install the multer lib:
    > npm install multer
*/

// libs
const path = require("path");
const multer = require("multer");
const crypto = require("crypto")


// create temporary folder
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

// create uploads folder
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}