const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  companyName: String
});

const Carrier = mongoose.model('Carrier', carrierSchema);
module.exports = Carrier;