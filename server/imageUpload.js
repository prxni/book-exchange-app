const multer = require('multer');
const { cloudinary } = require('./utils');

const uploadPhoto = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20_000_000 }, // 20 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Not an image! Please upload only images'), false);
  }
});

const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(buffer);
  });
};

const resizeAndUploadImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const result = await uploadToCloudinary(req.file.buffer, {
      transformation: [
        { width: 400, height: 400, crop: "limit" },
        { quality: "100" },
        { format: "jpg" }
      ],
    });

    if (!result || !result.url) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    req.imageUrl = result.url;
    next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    next(error);
  }
};

module.exports = { uploadPhoto, resizeAndUploadImage };
