const mongoose = require('mongoose');
const policySchema = mongoose.Schema({
    policyNumber: {
        type: String,
        required: true,
    },
    policyHolderName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;