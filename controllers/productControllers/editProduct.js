import Product from '../../models/Products.js'

export const editProducts = (req, res) => {

    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: "product not found" })
            }
            const allowedUpdates = ["name", "price", "description", "stock"];
            Object.keys(req.body).forEach(key => {
                if (allowedUpdates.includes(key)) {

                    product[key] = req.body[key]
                }
            })
            product.save()
                .then(updatedProduct => {
                    res.status(200).json({ message: "product updated", product: updatedProduct })
                }).catch(err => {
                    res.status(500).json({ message: "error updating the product", error: err.message })
                })

        }).catch(err => {
            res.status(500).json({ message: "error fetching  the product", error: err.message })
        })
}