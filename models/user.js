const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: true
  },
  passeord: {
    type: String,
    default: true
  },
  createAt: {
    type: String,
    default: Date.now
  },
})

module.exports = mongoose.model('User', userSchema)