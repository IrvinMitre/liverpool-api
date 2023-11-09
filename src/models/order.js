const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = Schema({
  description: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  down_at: {
    type: Date,
    default: Date.now,
  },
  user: String,
  status: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;