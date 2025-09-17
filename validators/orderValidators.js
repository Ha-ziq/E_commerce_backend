// Order Product Subschema
import Joi from "joi";

const orderProductSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
});

// Order Validator
export const orderSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  products: Joi.array().items(orderProductSchema).min(1).required(),
  totalAmount: Joi.number().positive().required(),
  status: Joi.string()
    .valid("pending", "shipped", "delivered", "cancelled")
    .default("pending"),
});
