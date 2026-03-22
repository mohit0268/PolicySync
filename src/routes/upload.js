const multer = require('multer');
const express = require('express');
const router = express.Router();

const { uploadFile } = require('../controllers/uploadController');

const upload = multer({dest: 'files/'});
router.post('/', upload.single('file') , uploadFile);


module.exports = router;
