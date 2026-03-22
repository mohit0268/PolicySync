const xlsx = require("xlsx");
const fs = require("fs");

const processFile = async (filepath) => {
  try {
    const workbook = xlsx.readFile(filepath);
    const sheetNames = workbook.SheetNames[0];
    const datasheet = workbook.Sheets[sheetNames];

    const jsonData = xlsx.utils.sheet_to_json(datasheet);
    console.log(jsonData);
    if (!jsonData || jsonData.length === 0) {
      console.log("No data found in the file");
    }
    return jsonData;
  } catch (error) {
    console.error("Error processing file:", error.message);
  }
};


module.exports = {
  processFile,
};