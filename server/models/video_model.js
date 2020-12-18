const mongoose = require('mongoose')


const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, 
 {
  collection: 'movie'
})
module.exports = mongoose.model('VideoSchema', videoSchema)