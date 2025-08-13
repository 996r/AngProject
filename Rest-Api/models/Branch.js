

const mongoose = require('mongoose');


const branchSchema = new mongoose.Schema({
  branch_name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  branch_code: {
    type: String,
    required: true,
    unique: true
  },
  numberOfPrinters: {
    type: Number,
    default: 0
  },
  numberOfPeoples: { 
    type: Number,
    default: 0
  },
  
  printer_serial_numbers: [
    {
      type: String,
      ref: 'Printer'
    }
  ]
});

module.exports = mongoose.model('Branch', branchSchema);
