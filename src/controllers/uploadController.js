const xlsx = require("xlsx");
const fs = require("fs");
const { processFile } = require("../services/fileServices");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return await res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const data = await processFile(req.file.path);
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "File parsed successfully",
      totalRecords: data.length,
      sample: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  uploadFile,
};
