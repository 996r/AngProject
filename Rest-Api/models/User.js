const mongoose = require("mongoose");
const { hashPassword } = require('../utils/auth');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, "Username should be at least 5 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password should be at least 5 characters"],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/g.test(v);
      },
      message: (props) =>
        `${props.value} must contains only latin letters and digits!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  branch_code: {
    type: String,
    required: true,
  }
});

userSchema.pre ('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await hashPassword(this.password);
    next();
})

module.exports = mongoose.model('User', userSchema);
