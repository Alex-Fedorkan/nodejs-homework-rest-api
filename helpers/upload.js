const path = require("path");
const multer = require("multer");
const { uploadDir } = require("./constants");

const UPLOAD_DIR = path.join(process.cwd(), uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
});

module.exports = upload;
