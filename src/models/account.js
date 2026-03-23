const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountName: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;