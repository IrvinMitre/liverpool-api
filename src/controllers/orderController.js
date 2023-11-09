const orderService = require("../services/orderService");
const mongoose = require("mongoose");
const { parseDate } = require("../utils/date");
const Order = require("../models/order");

module.exports = class orderClass {
  static async getAllOrders(req, res) {
    try {
      const allOrders = await orderService.getAllOrders();
      return res.send(allOrders);
    } catch (error) {
      return res.status(400).send("Error Request");
    }
  }

  static async createNewOrder(req, res) {
    const hexBuffer = req.file.buffer;
    try {
      if (req.file.mimetype !== "text/csv") {
        return res
          .status(400)
          .send("Invalid file type. Only CSV files are allowed.");
      }
      const csvData = hexBuffer.toString();
      const lines = csvData.split("\n");

      const orders = lines.map((line) => line.split(",").splice(1));
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
          };
        });

        await database.collection("orders").insertMany(ordersToInsert);
      });

      return res.send("Orders created");
    } catch (error) {
      return res.status(400).send("Invalid format");
    }
  }

  static async updateOneOrder(req, res) {
    try {
      await orderService.updateOneOrder(req.body.id);
      return res.send("Update order");
    } catch (error) {
      return res.status(400).send("Error Update");
    }
  }

  static async deleteOneOrder(req, res) {
    try {
      await orderService.deleteOneOrder(req.body.id);
      return res.send("Delete order");
    } catch (error) {
      return res.status(400).send("Error Deleted");
    }
  }
};
