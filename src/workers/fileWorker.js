const { parentPort, workerData } = require("worker_threads");
const xlsx = require("xlsx");
const mongoose = require("mongoose");
const { parseData, formatData } = require("../services/fileServices.js");

const Policy = require("../models/policy");
const Agent = require("../models/agent");
const Account = require("../models/account");
const Carrier = require("../models/carrier");
const LOB = require("../models/LOB");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    try {
      const processedData = await parseData(workerData.filepath);
      const formattedData = formatData(processedData);

      //caching it for optimization
      const agentSet = new Set();
      const accountSet = new Set();
      const carrierSet = new Set();
      const lobSet = new Set();

      for (const row of formattedData) {
        if (row.agent) agentSet.add(row.agent);
        if (row.account) accountSet.add(row.account);
        if (row.carrier) carrierSet.add(row.carrier);
        if (row.lob) lobSet.add(row.lob);
      }

      await Agent.bulkWrite(
        [...agentSet].map((name) => ({
          updateOne: {
            filter: { name },
            update: { $set: { name } },
            upsert: true,
          },
        })),
      );

      await Account.bulkWrite(
        [...accountSet].map((name) => ({
          updateOne: {
            filter: { name },
            update: { $set: { name } },
            upsert: true,
          },
        })),
      );

      await Carrier.bulkWrite(
        [...carrierSet].map((name) => ({
          updateOne: {
            filter: { name: name || "Unknown" },
            update: { $set: { name: name || "Unknown" } },
            upsert: true,
          },
        })),
      );

      await LOB.bulkWrite(
        [...lobSet].map((name) => ({
          updateOne: {
            filter: { name },
            update: { $set: { name } },
            upsert: true,
          },
        })),
      );

      const agents = await Agent.find();
      const accounts = await Account.find();
      const carriers = await Carrier.find();
      const lobs = await LOB.find();

      const agentMap = new Map(agents.map((a) => [a.name, a._id]));
      const accountMap = new Map(accounts.map((a) => [a.name, a._id]));
      const carrierMap = new Map(carriers.map((a) => [a.name, a._id]));
      const lobMap = new Map(lobs.map((a) => [a.name, a._id]));

      const policyOps = [];

      for (const row of formattedData) {
        if (!row.policyNumber || !row.agent) continue;

        policyOps.push({
          updateOne: {
            filter: { policyNumber: row.policyNumber },
            update: {
              $setOnInsert: {
                policyNumber: row.policyNumber,
                premium: row.premium,
                startDate: row.startDate,
                endDate: row.endDate,
                policyHolderName: row.firstName || "Unknown",

                agent: agentMap.get(row.agent),
                account: accountMap.get(row.account),
                carrier: carrierMap.get(row.carrier || "Unknown"),
                lob: lobMap.get(row.lob),
              },
            },
            upsert: true,
          },
        });
      }

      await Policy.bulkWrite(policyOps);

      parentPort.postMessage({ message: "Bulk processing completed" });
    } catch (error) {
      parentPort.postMessage({ error: error.message });
    }
  })
  .catch((err) => {
    parentPort.postMessage({ error: err.message });
  });
