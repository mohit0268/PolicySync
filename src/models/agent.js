const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  agentName: { type: String, required: true, unique:true }
}, { timestamps: true });

const Agent = mongoose.model('Agent',agentSchema);
module.exports = Agent;