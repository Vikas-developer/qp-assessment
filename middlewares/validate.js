const Joi = require("joi");

const addItemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const removeItemSchema = Joi.object({
  name: Joi.string().required(),
});

const updateItemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
});

const placeOrderSchema = Joi.object({
  cart: Joi.array().required(),
});

const validateAddItemSchema = (req, res, next) => {
  const { error } = addItemSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Request");
  }
  next();
};

const validateRemoveItemSchema = (req, res, next) => {
  const { error } = removeItemSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Request");
  }
  next();
};

const validateUpdateItemSchema = (req, res, next) => {
  const { error } = updateItemSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Request");
  }
  next();
};

const validatePlaceOrderSchema = (req, res, next) => {
  const { error } = placeOrderSchema.validate(req.body);
  if (error) {
    return res.status(400).send("Bad Request");
  }
  next();
};

module.exports = {
  validateAddItemSchema,
  validateRemoveItemSchema,
  validateUpdateItemSchema,
  validatePlaceOrderSchema,
};
