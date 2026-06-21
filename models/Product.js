const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 10 },
  unit: { type: String, default: 'قطعة' },
  icon: { type: String, default: '📦' },
  active: { type: Boolean, default: true }
}, { timestamps: true });
productSchema.virtual('lowStock').get(function() { return this.stock <= this.minStock; });
productSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Product', productSchema);
