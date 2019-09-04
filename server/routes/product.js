const express = require("express");
const router = express.Router();

//METHODE CREATE NEW PRODUCT BASE ON SCHEMA//

const { create, productById, read, remove, update , list, listRelated, listCategories,listBySearch, photo } = require("../controllers/product");

//METHODE SIGN UP AUTH AND ADMIN//

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//GET ALL PRODUCT//

router.get("/products", list)

//GET PRODUCT RELATED

router.get('/products/related/:productId', listRelated)

//GET ALL CATEGORIES USE BY PRODUCT//

router.get('/products/categories', listCategories)

//ROUTE GET PRODUCT BY ID//
router.get('/product/:productId', read)

//DELETE PRODUCT//
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove)

//UPDATE PRODUCT//
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update,)

//ROUTE POST NEW PRODUCT//

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

//ROUTE SEARCHING BAR//

router.post("/products/by/search", listBySearch);

// GET PHOTO FOR PRODUCTS

router.get('/products/photo/:productId', photo)

router.param("userId", userById);
router.param("productId", productById);


module.exports = router;