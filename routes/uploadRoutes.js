const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("file");

router.route("/").post((req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ status: "Fail", message: err });
    }
    return res.status(201).json(req.file);
  });
});

module.exports = router;
