const User = require('../models/user');
const Policy = require('../models/policy');


exports.searchPolicy = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required"
      });
    }


    const user = await User.findOne({
  firstname: { $regex: `^${username}$`, $options: "i" }
});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }


    const policies = await Policy.find({
      userId: user._id
    })
      .populate('carrierId')  
      .populate('lobId');      

    return res.status(200).json({
      success: true,
      count: policies.length,
      data: policies
    });

  } catch (error) {
    console.error("Search Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




exports.aggregatePolicies = async (req, res) => {
  try {

    const result = await Policy.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPolicies: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          userName: "$userDetails.firstname",
          totalPolicies: 1
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Aggregation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};