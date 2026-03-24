const { Worker } = require('worker_threads');
const path = require('path');

const uploadFile = async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const worker = new Worker(
      path.join(__dirname, '../workers/fileWorker.js'),
      {
        workerData: {
          filepath: req.file.path
        }
      }
    );

    worker.on('message', (msg) => {
      console.log("Worker Response:", msg);
    });

    worker.on('error', (err) => {
      console.error("Worker Error:", err.message);
    });

    worker.on('exit', (code) => {
      console.log(`Worker exited with code ${code}`);
    });

    return res.status(202).json({
      success: true,
      message: "File uploaded & processing started in background",
    });

  } catch (error) {
    console.error("Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadFile };