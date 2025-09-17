import Order from '../../models/Order.js';
import Product from '../../models/Products.js';
import User from '../../models/Users.js';

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'user not found' });
    if (user.cart.length === 0)
      return res.status(404).json({ message: 'cart is empty' });
    let cartItems = [];

    user.cart.forEach((item) => {
      cartItems.push({
        productid: item.productId.toString(),
        quantity: item.quantity,
      });
    });
    const productDetail = await Promise.all(
      user.cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) return null; // safeguard for deleted/missing products

        return {
          productId: product._id,
          priceAtPurchase: product.price,
          quantity: item.quantity,
        };
      })
    );

    const totalPrice = productDetail.reduce((acc, item) => {
      console.log(item.quantity);
      return acc + item.priceAtPurchase * item.quantity;
    }, 0);

    console.log(productDetail);
    const newOrder = await Order.create({
      userId,
      items: productDetail,
      totalPrice,
    });
    res.status(200).json({ message: 'order placed', details: newOrder });

    user.cart = [];
    user.save();
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error placing order', error: err.message });
  }
};
