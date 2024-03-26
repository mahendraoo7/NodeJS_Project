const Product = require('../model/product.model');
module.exports = class ProductServices {
    // add New Product
    async addNewProduct(body) {
        try {
             return await Product.create(body);    
        } catch (error) {
            console.log(error);
            return error.message ;
        }
    };
        
    // Get Single Product
    async getProduct(body){
        try {
            return await Product.findOne(body);      
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Single Product by id
    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get All Product
    async getAllProduct(query) {
        try {
         let categoryWish = query.category && query.category !== "" ? [
            { $match: {category : query.category} }
         ] : [];
         let find =[
           { $match : {isDelete : false}},
           ...categoryWish
         ];
         let result = await Product.aggregate(find);
         return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Update Product
    async updateProduct(id,body) {
        try {
            return await Product.findByIdAndUpdate(id,{$set : body},{new: true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
}