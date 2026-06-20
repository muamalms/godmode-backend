const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cron = require('node-cron');
require('dotenv').config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/users',     require('./routes/users'));
app.use('/api/products',  require('./routes/products'));
app.use('/api/clients',   require('./routes/clients'));
app.use('/api/sales',     require('./routes/sales'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/whatsapp',  require('./routes/whatsapp'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
cron.schedule('0 9 * * *', async () => {
  try { const { sendDueReminders } = require('./utils/reminders'); await sendDueReminders(); }
  catch(e) { console.error('Cron:', e.message); }
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB متصل');
    app.listen(process.env.PORT || 5000, () => console.log(' الخادم يعمل على المنفذ 5000'));
  })
  .catch(err => { console.error('', err.message); process.exit(1); });
