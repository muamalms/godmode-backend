const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String },
  address: { type: String },
  notes: { type: String },
  active: { type: Boolean, default: true },
  totalDebt: { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('Client', clientSchema);
