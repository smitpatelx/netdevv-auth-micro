const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const authTokenSchema = new mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  refresh_token:{
    type: String
  }
}, {
  timestamps: true
});

authTokenSchema.plugin(findOrCreate);

const AuthToken = mongoose.model('AuthToken', authTokenSchema);

module.exports = AuthToken;