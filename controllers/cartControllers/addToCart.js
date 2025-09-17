import Product from '../../models/Products.js';
import User from '../../models/Users.js';

export const addToCart = (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).json({ message: 'user not found' });
      console.log(user.cart)
      

      const index = user.cart.findIndex(
        (product) => product.productId.toString() === productId.toString()

      );

      let cartItem = [];
      if (index >= 0) {
        user.cart[index].quantity++;
        cartItem = user.cart[index];
      } else {
        user.cart.push({ productId: productId, quantity: quantity || 1 });
        console.log('pushed');
        cartItem = user.cart[user.cart.length - 1];
      }

      user
        .save()
        .then((user) => {
          res.status(200).json({
            message: index >= 0 ? 'cart updated' : 'product added in cart',
            cart: user.cart,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: 'error saving cart', error: err.message });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'error getting user', error: err.message });
    });
};
