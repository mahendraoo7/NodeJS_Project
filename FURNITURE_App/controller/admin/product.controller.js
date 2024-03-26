const ProductServices = require('../../Services/product.service');
const productService = new ProductServices();

exports.addNewProduct = async (req,res) => {
    try {
        let product = await productService.getProduct({title : req.body.title, isDelete : false});
        if(product) {
            return res.status(400).json ({message :'Product Is already exits'});
        }
        product = await productService.addNewProduct({...req.body});
        res.status(201).json({product,message : 'Product Is added'});
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
exports.getAllProducts = async (req, res) => {
    try {
        let products = await productService.getAllProduct(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json ({ message : "Internal Server Error"});
    }
};

exports.getProduct = async (req,res) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if(!product) {
            return res.status(400).json({ message : 'Product is Not Found'});
        }
        res.status(400).json(product);
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

exports.updateProduct = async(req,res) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if(!product) {
            return res.status(400).json({message : 'product Is not found '});
        }
        product = await productService.updateProduct(product._id, {...req.body});
        res.status(202).json({product,message : 'Product Is Added'});
    } catch (error) {
        console.log(error);
        return error.messsage;
    }
};

exports.deleteProduct = async(req,res) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if(!product) {
            return res.status(400).json({ message : 'Product Is not Found'})
        }
        product = await productService.updateProduct(product._Id, {isDelete : false});
        res.status(200).json({ message : 'Product is deleted'})
    } catch (error) {
        console.log(error);
        return error.message;
    }
};