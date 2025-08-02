const { MongoOIDCError } = require("mongodb");
// const { default: mongoose } = require("mongoose")

const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
    model:{
        type: String,
        required: true
    },
    serialNumber: {
    type: String,
    required: true,
    unique: true
  },
    address: {
        type: String,
        required: true
    },
    ipAddress: {
    type: String,
    required: true
  },
  macAddress: {
    type: String,
    required: true
  },
  totalCounter: {
    type: Number,
    default: 0
  },
  
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  branch_code: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Printer', printerSchema);