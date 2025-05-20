const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['movie', 'book', 'game'], 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: String,
}, { timestamps: true }); 

module.exports = mongoose.model('Media', mediaSchema);