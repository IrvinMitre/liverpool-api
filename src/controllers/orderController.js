const orderService = require("../services/orderService");

module.exports = class orderClass{

static async getAllOrders (req, res) {
  try {
    const allOrders = await orderService.getAllOrders();
    console.log(allOrders);
    res.send(allOrders);
  } catch (error) {
    console.error(error);
  }
};

static async createNewOrder (req, res) {
    try {
        const allOrders = await orderService.createNewOrder();
        console.log(allOrders);
        res.send(allOrders);
      } catch (error) {
        console.error(error);
      }
};

static async updateOneOrder (req, res) {
  res.send("Update an existing order");
};

static async deleteOneOrder (req, res) {
  res.send("Delete an existing order");
};
}
