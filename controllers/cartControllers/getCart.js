import Product from '../../models/Products.js';
import User from '../../models/Users.js';

export const getCart = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  let cartItems = [];

  if (!user) return res.status(404).json({ message: 'user not found' });
  if (user.cart.length===0)
    return res.status(404).json({ message: 'cart is empty' });
 
  user.cart.forEach((item) => {
    cartItems.push({
      productid: item.productId,
      quantity: item.quantity,
    });
  });

  const productDetail = await Promise.all(
    user.cart.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) return null; // safeguard for deleted/missing products

      return {
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        quantity: item.quantity,
      };
    })
  );

  // Filter out nulls if some products don't exist anymore
  const validItems = productDetail.filter((p) => p !== null);
  const totalPrice = validItems.reduce((acc, item) => {
    
  return acc + item.price * item.quantity;
}, 0);

  res.status(200).json({
    message: 'Cart Items',
    items: validItems,
    totalPrice:totalPrice
  });
};
