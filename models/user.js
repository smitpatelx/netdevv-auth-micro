const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    min: 2,
    max: 60,
    lowercase: true
  },
  last_name:{
    type: String,
    min: 2,
    max: 60,
    lowercase: true
  },
  access:{
    type: String,
    min:1,
    max:2,
    default: 'c'
  },
  salutation: {
    type: String,
    min: 2,
    max: 10,
    lowercase: true
  },
  address:{
    type: String,
    min: 5,
    max: 90
  },
  state:{
    type: String,
    min:2,
    max:20,
    lowercase: true
  },
  country:{
    type: String,
    min:2,
    max:40,
    lowercase: true
  },
  pin_code:{
    type: String,
    min:4,
    max:12
  },
  primary_email:{
    type: String,
    min:6,
    max:60,
    lowercase: true,
    unique: true
  },
  secondary_email:{
    type: String,
    min:6,
    max:60,
    lowercase: true
  },
  email_verified:{
    type: Boolean,
    default: false
  },
  phone:{
    type: String,
    min:10,
    max:15,
  },
  extension:{
    type: String,
    min:2,
    max:6,
  },
  avatar:{
    type: String,
    default: 'default.png'
  },
  password:{
    type: String
  },
  google_id:{
    type: String,
    sparse: true
  },
  google_token:{
    type: String
  },
  google_refresh_token:{
    type: String
  },
  github_id:{
    type: String,
    sparse: true
  },
  github_token:{
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
