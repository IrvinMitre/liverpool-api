const Order = require("../models/order");

module.exports = class clientService {
  static async getAllOrders() {
    return await Order.find();
  }

  static async createNewOrder(description, user) {
    const newOrder = {
      description: description,
      created_at: Date.now(),
      down_at: Date.now(),
      user: user,
    };
    const response = await Order.create(newOrder);
    return response;
  }

  static async updateOneOrder(id) {
    return Order.findOneAndUpdate({ _id: id }, { down_at: Date.now() });
  }

  static async deleteOneOrder(id) {
    return await Order.deleteOne({ _id: id });
  }
};
