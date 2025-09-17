import Product from '../../models/Products.js'

export const deleteProduct =(req,res)=>{

const {id}=req.params;

Product.findByIdAndDelete(id)
.then(product=>{
    if(!product) return res.status(404).json({message:"Can't find product"})
    
    res.status(200).json({message:"Product deleted" , product:product})
}).catch(err=>{
    res.status(500).json({message:"Error deleting product",error:err})
})

}