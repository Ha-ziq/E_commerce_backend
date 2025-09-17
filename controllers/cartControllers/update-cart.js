import Product from '../../models/Products.js';
import User from '../../models/Users.js';

export const updateCart = async (req, res) => {
  try {
    const { action, productId } = req.body;
    const userId = req.user.id;
    console.log(userId, productId, action);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'user not found' });

    if (user.cart.length === 0)
      return res.status(404).json({ message: 'cart is empty' });

    const productToUpdate = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productToUpdate === -1)
      return res.status(404).json({ message: 'product not found ' });

    if (action === 'increment') {
      user.cart[productToUpdate].quantity++;
    } else {
      user.cart[productToUpdate].quantity--;
      if (user.cart[productToUpdate].quantity <= 0) {
        user.cart.splice(productToUpdate, 1);
      }
    }
    user.save();
    res.status(200).json({ message: 'cart updated' });
  } catch (err) {
    res.status(500).json({ message: 'error ', error: err.message });
  }
};

export const removeProduct = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'user not found' });

    const productToDelete = user.cart.findIndex(
        
      (item) => item.productId.toString() === productId

     
    );
    if (productToDelete === -1)
      return res.status(404).json({ message: 'product not found ' });
    user.cart.splice(productToDelete, 1);
    await user.save();
    res.status(200).json({ message: 'cart updated' });
  } catch (err) {
    res.status(500).json({ message: 'error ', error: err.message });
  }


};
