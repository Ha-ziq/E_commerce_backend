import Product from '../../models/Products.js'

export const createProducts = (req, res) => {


    const { name, price, category, stock, description, imageUrl } = req.body;
    if (!name || !price || !category || !stock) return res.status(400).json("empty fields")

    Product.create({ name, price, category, stock, description, imageUrl, isActive: true })
        .then(product => {
            const cleanProduct = {
                id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                imageUrl: product.imageUrl,
                isActive: product.isActive
            };
            res.status(201).json({ message: "product added successfully",product: cleanProduct })
        }).catch(err => {
            res.status(500).json({ message: "Can't add product", err: err.message })
        })

}