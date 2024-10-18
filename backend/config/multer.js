const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "avatarUser") {
      callback(null, "pictures/users");
    } else {
      callback(null, "pictures/albums");
    };
  },

  filename: (req, file, callback) => {
    const fileExtension = MIME_TYPES[file.mimetype];
    let fileName = "";
    if (file.fieldname === "avatarUser") {
      fileName = req.body.lastName + "_" + Date.now() + "." + fileExtension;
    } else {
      fileName = req.body.albumId + "_" + Date.now() + "." + fileExtension;
    };
    callback(null, fileName);
  },
});

module.exports = multer({ storage: storage }).fields([
  { name: "avatarUser", maxCount: 1 },
  { name: "newPicture", maxCount: 1 },
]);
