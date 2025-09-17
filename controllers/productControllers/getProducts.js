import Product from '../../models/Products.js';

export const getProducts = (req, res) => {
  Product.find({ isActive: true })
    .then((products) => {
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      } else {
        res.status(200).json(products);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'error fetching products', error: error.message });
    });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: 'Product not found' });

      res.status(200).json(product);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'error fetching products', error: error.message });
    });
};
