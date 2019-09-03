const express = require("express");
const router = express.Router();

//METHODE CREATE NEW PRODUCT BASE ON SCHEMA//

const { create } = require("../controllers/product");
//METHODE SIGN UP AUTH AND ADMIN//

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//ROUTE POST NEW CATEGORY//

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById);


module.exports = router;