const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  name: {type:String}
});

const Carrier = mongoose.model('Carrier', carrierSchema);
module.exports = Carrier;