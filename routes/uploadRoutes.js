const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const { uploadToS3, deleteFile } = require("./../utils/amazonS3");

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});

const upload = multer({ storage }).single("file");

router.route("/").post(upload, async (req, res) => {
  try {
    let [fileName] = req.file.originalname.split(".");
    console.log(fileName);

    // Resize image
    imgBuffer = await sharp(req.file.buffer).resize(768).png().toBuffer();

    // Upload image to S3
    const data = await uploadToS3(req.file.buffer);

    return res.status(201).json({ status: "success", data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Fail", message: err });
  }
});

router.route("/:name").delete(async (req, res) => {
  try {
    await deleteFile(req.params.name);
    res
      .status(200)
      .json({ status: "success", message: `${req.params.name} deleted.` });
  } catch (err) {
    return res.status(500).json({ status: "Fail", message: err });
  }
});

module.exports = router;
