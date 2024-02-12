const express = require("express");
const isAdmin = require("../middlewares/isAdmin");
const {
  validatePlaceOrderSchema,
  validateAddItemSchema,
  validateRemoveItemSchema,
  validateUpdateItemSchema,
} = require("../middlewares/validate");
const Data = require("../Data");
const data = new Data().getInstance();

const router = express.Router();

router.get("/items", isAdmin, (req, res) => {
  try {
    return res.send(data.getItems());
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/item", [isAdmin, validateAddItemSchema], (req, res) => {
  try {
    const { body } = req;
    return res.status(201).send(data.addItem(body));
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/item", [isAdmin, validateRemoveItemSchema], (req, res) => {
  try {
    const { body } = req;
    return res.send(data.removeItem(body));
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/item", [isAdmin, validateUpdateItemSchema], (req, res) => {
  try {
    const { body } = req;
    return res.send(data.updateItem(body));
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/order/:orderId", (req, res) => {
  try {
    const { orderId } = req.params;
    const order = data.getOrderDetails(orderId);
    if (order == undefined) {
      return res.status(404).send("Resource Not Found");
    }
    return res.send(order);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/order", validatePlaceOrderSchema, (req, res) => {
  try {
    const { body } = req;
    const { cart } = body;
    const orderId = data.placeOrder(cart);
    return res.status(201).send({
      orderId,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
