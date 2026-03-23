const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
  categoryName: String
});

const lob = mongoose.model('LOB', lobSchema);
module.exports = lob;