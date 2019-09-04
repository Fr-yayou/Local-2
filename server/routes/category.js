const express = require("express");
const router = express.Router();

//METHODE CREATE NEW CATEGORY BASE ON SCHEMA//
const { create , categoryById, read, update, remove, list} = require("../controllers/category");
//METHODE SIGN UP AUTH AND ADMIN//
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//ROUTE POST NEW CATEGORY//

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//GET CATEGORY BY ID//

router.get("/category/:categoryId", read)

//UPDATE CATEGORY//
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update)

//DELETE CATEGORY//
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove)

//GET LIST CATEGORY

router.get("/categories", list)


router.param('categoryId',categoryById)
router.param("userId", userById);


module.exports = router;