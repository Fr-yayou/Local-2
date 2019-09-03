const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

//ROUTE SIGNUP//

router.post("/signup", userSignupValidator, signup);

//ROUTE SIGNIN//

router.post("/signin", signin);

//ROUTE SIGN OUT//

router.get("/signout", signout);

module.exports = router;
