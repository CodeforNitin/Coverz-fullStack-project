const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
},{ timestamps: true });

userSchema.statics.signup = async function (email, password) {

    //validation
    const exists = await this.findOne({email})
  
    if (exists){
      throw Error ('Email already exists')
    }
    else{
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
  
      const user = await this.create({email, password:hash})
  
      return user
    }
}

userSchema.statics.login = async function (email, password) {

    //validation
    const user = await this.findOne({email})
  
    if (!user){
      throw Error ('Incorrect email')
    }
    else{
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) throw Error ('Incorrect password')
  
      return user
    }
  }
  
const User = mongoose.model('User', userSchema);

module.exports = User;