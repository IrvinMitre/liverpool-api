const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");

router.get("/", orderController.getAllOrders);

router.post("/", orderController.createNewOrder);

router.patch("/:orderId", orderController.updateOneOrder);

router.delete("/:orderId", orderController.deleteOneOrder);

module.exports = router;
