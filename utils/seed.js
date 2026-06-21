require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Client = require('../models/Client');
const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Promise.all([User.deleteMany(), Product.deleteMany(), Client.deleteMany()]);
  await User.create([
    { name: "أحمد المدير", email: "admin@godmode.iq", password: "123456", role: "admin", phone: "+9647801000001" },
    { name: "علي حسن", email: "ali@godmode.iq", password: "123456", role: "rep", phone: "+9647801000003" },
    { name: "محمد كاظم", email: "mohammed@godmode.iq", password: "123456", role: "rep", phone: "+9647801000004" }
  ]);
  await Product.create([
    { name: "سكر 1 كغم", category: "غذائي", icon: "🍬", price: 45000, stock: 120, minStock: 20 },
    { name: "زيت نخيل 1 لتر", category: "غذائي", icon: "🫙", price: 85000, stock: 60, minStock: 15 },
    { name: "أرز بسمتي 5 كغم", category: "غذائي", icon: "🌾", price: 220000, stock: 35, minStock: 10 }
  ]);
  await Client.create([
    { name: "أبو محمد", phone: "+9647801234567", city: "كربلاء" },
    { name: "حسين الوائلي", phone: "+9647829876543", city: "النجف" }
  ]);
  console.log("✅ تم إدخال البيانات!");
  console.log("admin@godmode.iq / 123456");
  process.exit(0);
};
seed().catch(err => { console.error(err); process.exit(1); });
