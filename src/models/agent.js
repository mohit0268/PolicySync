const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true }
}, { timestamps: true });

const Agent = mongoose.model('Agent',agentSchema);
module.exports = Agent;