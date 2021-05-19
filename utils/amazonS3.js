const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
require("dotenv/config");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

exports.uploadToS3 = (imgBuffer) => {
  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Key: `${uuidv4()}.png`,
      Body: imgBuffer,
    })
      .promise()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

exports.deleteFile = (name) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Key: name,
    })
      .promise()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};
