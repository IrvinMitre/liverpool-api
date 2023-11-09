const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");
const multer = require('multer');
const upload = multer();


router.get("/", orderController.getAllOrders);

router.post("/", upload.single('file'), orderController.createNewOrder);

router.post("/update", orderController.updateOneOrder);

router.post("/delete", orderController.deleteOneOrder);

module.exports = router;
