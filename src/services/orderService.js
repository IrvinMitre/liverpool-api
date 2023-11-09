const Order = require("../models/order");
const mongoose = require("mongoose");
const { parseDate } = require("../utils/date");
const { StatusCompleted, StatusPending } = require("../constants/order");

module.exports = class ClientService {
  static async getAllOrders(limit, offset) {
    const orders =  await Order.find().skip(offset).limit(limit);
    const totalCount = await Order.countDocuments();
    return { orders, totalCount };
  }

  static async createOrders(orders) {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const database = session.client.db("liverpool");
      const ordersToInsert = orders.slice(1).map((element) => {
        const created_at = parseDate(element[1]);
        const down_at = parseDate(element[2]);
        return {
          description: element[0],
          created_at,
          down_at,
          user: element[3],
          status: StatusPending,
        };
      });

      await database.collection("orders").insertMany(ordersToInsert);
    });
  }

  static async updateOneOrder(id) {
    return Order.findOneAndUpdate({ _id: id }, { status: StatusCompleted });
  }

  static async deleteOneOrder(id) {
    return await Order.deleteOne({ _id: id });
  }
};
