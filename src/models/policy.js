const mongoose = require('mongoose');
const policySchema = mongoose.Schema({
    policyNumber: {
        type: String,
        required: true,
        unique:true
    },
    policyHolderName: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    carrierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrier',
    },
    lobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LOB',
    },
    
},{timestamps: true});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;