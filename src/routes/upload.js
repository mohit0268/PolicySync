const multer = require('multer');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const { uploadFile } = require('../controllers/uploadController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/');
  },
  filename: (req, file, cb) => {
  const uniqueName = file.originalname;
  cb(null, uniqueName);
}
});



const upload = multer({
    storage: storage,
});
router.post('/', upload.single('file') , uploadFile);


module.exports = router;
