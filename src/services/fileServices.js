const xlsx = require("xlsx");
const fs = require("fs");

const parseData = async (filepath) => {
  try {
    const workbook = xlsx.readFile(filepath);
    const sheetNames = workbook.SheetNames[0];
    const datasheet = workbook.Sheets[sheetNames];
    const jsonData = xlsx.utils.sheet_to_json(datasheet);


  if (jsonData.length === 0) {
    throw new Error("Excel file is empty");
  }
  return jsonData;
  
  } catch (error) {
    console.error("Error processing file:", error.message);
  }

};


const formatData = (data) => {
  if (!Array.isArray(data)) {
    throw new Error("formatData expects an array");
  }

  return data.map((row) => ({
    policyNumber: row["Policy Number"] || row.policy_number,
    firstName : row.firstname,
    agent: row["Agent"] || row.agent,
    account: row["Account"] || row.account_name,
    carrier: row["Carrier"] || row.company_name,
    lob: row["LOB"] || row.category_name,
    premium: row["Premium"] || row.premium_amount,
    startDate: row.policy_start_date ? new Date(row.policy_start_date) : null,
    endDate: row.policy_end_date ? new Date(row.policy_end_date) : null,
  }));
};


module.exports = {
  parseData,
  formatData
};