const express = require("express");
const router = express.Router();
const OrderController = require("../../controllers/orderController");
const multer = require('multer');
const upload = multer();


router.get("/", OrderController.getAllOrders);

router.post("/", upload.single('file'), OrderController.createNewOrder);

router.post("/update", OrderController.updateOneOrder);

router.post("/delete", OrderController.deleteOneOrder);

module.exports = router;
