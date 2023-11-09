const OrderService = require("../services/orderService");

module.exports = class OrderClass {
  static async getAllOrders(req, res) {
    const { limit, offset } = req.query;
    try {
      const allOrders = await OrderService.getAllOrders(limit, offset);
      const response = {
        limit: limit,
        offset: offset,
        count: allOrders.totalCount,
        orders: allOrders.orders,
      }
      return res.send(response);
    } catch (error) {
      const message = { message: "Error Get all orders" };
      return res.status(400).send(message);
    }
  }

  static async createNewOrder(req, res) {
    let message = {};
    try {
      if (req.file.mimetype !== "text/csv") {
        const message = { message: "Invalid file type." };

        return res.status(400).send(message);
      }
      const hexBuffer = req.file.buffer;
      const csvData = hexBuffer.toString();
      const lines = csvData.split("\n");

      const orders = lines.map((line) => line.split(",").splice(1));
      await OrderService.createOrders(orders);

      message = { message: "Orders created" };
      return res.send(message);
    } catch (error) {
      message = { message: "Invalid format order" };
      return res.status(400).send(message);
    }
  }

  static async updateOneOrder(req, res) {
    let message = {};
    try {
      await OrderService.updateOneOrder(req.body.id);
      message = { message: "Update order" };
      return res.send(message);
    } catch (error) {
      message = { message: "Error Update order" };
      return res.status(400).send(message);
    }
  }

  static async deleteOneOrder(req, res) {
    let message = {};
    try {
      await OrderService.deleteOneOrder(req.body.id);
      message = { message: "Delete order" };
      return res.send(message);
    } catch (error) {
      message = { message: "Error Delete order" };
      return res.status(400).send(message);
    }
  }
};
