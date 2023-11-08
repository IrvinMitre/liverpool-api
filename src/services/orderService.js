Order = require("../models/order");

module.exports = class clientService {
  static async getAllOrders() {
    try {
      const Orders = await Order.find();
      return Orders;
    } catch (error) {
      console.log(`Could not fetch orders ${error}`);
    }
  }
  static async createNewOrder() {
    try {
      const newOrder = {
        description: 'algo',
        created_at: Date.now(),
        down_at: Date.now(),
        user: 'user',
      };
      const response = await Order.create(newOrder)
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateOneOrder() {
    return;
  }

  static async deleteOneOrder() {
    return;
  }
};
