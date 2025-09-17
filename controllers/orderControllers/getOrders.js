import Order from '../../models/Order.js';

export const getOrders = async (req, res) => {
  const { id, role } = req.user;
  let order = [];
  try {

    if (role === 'admin') {
      order = await Order.find();
    } else {
      order = await Order.find({ userId: id });
    }

    if (order.length === 0) {
      res.status(404).json({ message: 'No orders placed' });
    } else {
      res.status(200).json({
        message: role === 'admin' ? 'All orders' : 'user arders',
        order: order,
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'ERROR', error: err.message });
  }
};
