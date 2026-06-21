const mongoose = require('mongoose');
const saleItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String, price: Number, quantity: Number, subtotal: Number
});
const saleSchema = new mongoose.Schema({
  invoiceNo: { type: String, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  rep: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [saleItemSchema],
  total: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending','paid','overdue'], default: 'pending' },
  notes: String,
  whatsappSent: { type: Boolean, default: false },
  whatsappSentAt: Date,
  reminderSent: { type: Boolean, default: false },
  reminderSentAt: Date
}, { timestamps: true });
saleSchema.pre('save', async function(next) {
  if (!this.invoiceNo) {
    const count = await mongoose.model('Sale').countDocuments();
    this.invoiceNo = 'INV-' + String(count + 1).padStart(4, '0');
  }
  next();
});
module.exports = mongoose.model('Sale', saleSchema);
