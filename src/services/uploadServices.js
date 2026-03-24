
const Agent = require('../models/agent');
const User = require('../models/user');
const Account = require('../models/account');
const LOB = require('../models/LOB');
const Carrier = require('../models/carrier');
const Policy = require('../models/policy');

const processData = async (rows) => {
  try {
    // Validate input
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error('No valid data found to process');
    }

    for (const row of rows) {
      let agent = await Agent.findOne({ agentName: row.agent });
      if (!agent) {
        agent = await Agent.create({
          agentName: row.agent
        });
      }

      let user = await User.findOne({ email: row.email });
      if (!user) {
        user = await User.create({
          fullname: row.fullname,
          dob: row.dob ? new Date(row.dob) : null,
          address: row.address,
          phone: row.phone,
          state: row.state,
          zipCode: row.zip,
          email: row.email,
          gender: row.gender,
          userType: row.userType
        });
      }

      let account = await Account.findOne({ accountName: row.account_name });

      if (!account) {
        account = await Account.create({
          accountName: row.account_name
        });
      }

      let lob = await LOB.findOne({ categoryName: row.category_name });
      if (!lob) {
        lob = await LOB.create({
          categoryName: row.category_name
        });
      }

      let carrier = await Carrier.findOne({ companyName: row.company_name });
      if (!carrier) {
        carrier = await Carrier.create({
          companyName: row.company_name
        });
      }

      const existingPolicy = await Policy.findOne({
        policyNumber: row.policy_number
      });

      if (!existingPolicy) {
        await Policy.create({
          policyNumber: row.policy_number,
          policyStartDate: row.policy_start_date
            ? new Date(row.policy_start_date)
            : null,
          policyEndDate: row.policy_end_date
            ? new Date(row.policy_end_date)
            : null,

          // references
          userId: user._id,
          carrierId: carrier._id,
          categoryId: lob._id,
        });
      }
    }

    return {
      success: true,
      message: 'Data processed and inserted successfully'
    };

  } catch (error) {
    console.error('Service Error:', error);

    throw new Error('Error processing data: ' + error.message);
  }
};

module.exports = { processData };