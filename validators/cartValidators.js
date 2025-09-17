// Cart Validator

import Joi from 'joi';

export const cartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(), // ObjectId format
  quantity: Joi.number().integer().min(1).required(),
});

export const cartRemoveSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(), // ObjectId format
  // quantity: Joi.number().integer().min(1).required(),
});

export const cartUpdateSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(), // ObjectId format
  action: Joi.string().required(),
});
