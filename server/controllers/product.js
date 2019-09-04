const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");


//PRODUCT BY ID METHODE//

exports.productById = (req, res, next,id ) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // CHECK ALL THE FIELD//   ///verify validation 

        // const { name, description, price, category, quantity, shipping, } = fields
        
        // if (!name || !description || !price || !category || !quantity || !shipping) {
        //     return res.status(400).json({
        //         error: "All field require"
        //     });
            
        // }
        let product = new Product(fields);
        console.log(product)

        

        if (files.photo) {
            console.log('files Photo', files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                error: "Image should be less than 1MB size "
            });
            }
            
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

//DELETE  PRODUCT METHODE//

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            "message":"product deleted sucessfully"
        })
    })
}
//UPDATE PRODUCT METHODE //

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // CHECK ALL THE FIELD//   ///verify validation 

        // const { name, description, price, category, quantity, shipping, } = fields
        
        // if (!name || !description || !price || !category || !quantity || !shipping) {
        //     return res.status(400).json({
        //         error: "All field require"
        //     });
            
        // }
        let product = req.product
        product = _.extend(product, fields);
        console.log(product)

        

        if (files.photo) {
            console.log('files Photo', files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                error: "Image should be less than 1MB size "
            });
            }
            
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

//RETURN POPULAR PRODUCT OR NEW PRODUCT//

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(products);
        });
};

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product not found"
                    
                });
            }
            res.json(product);
            
        });
    

}




 
