const { parentPort, workerData } = require("worker_threads");
const xlsx = require("xlsx");
const mongoose = require("mongoose");
const { parseData, formatData } = require("../services/fileServices.js");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    try {
      const processedData =await parseData(workerData.filepath);
      const formattedData = formatData(processedData);
      console.log(formattedData[0]);

      parentPort.postMessage({
        message: "Worker executed successfully",
        totalRows: formattedData.length,
      });

    } catch (error) {
      parentPort.postMessage({ error: error.message });
    }
  })
  .catch((err) => {
    parentPort.postMessage({ error: err.message });
  });
