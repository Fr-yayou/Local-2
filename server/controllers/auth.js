const User = require("../models/user");
const jwt = require("jsonwebtoken"); //SIGNED TOKEN
const expressJwt = require("express-jwt");  // FOR AUTHORIZATION 
const { errorHandler } = require("../helpers/dbErrorHandler");


//SIGN UP

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};
//SIGN UP//


exports.signin = (req, res) => {

      //FIND USER BASED ON EMAIL //
    
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
        }
          //IF USUER IS FOUND MAKE SURE EMAIL AND PASSWORD MATCH//

        //AUTHENTIFICATION METHODE//

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password dont match"
            });
        }
        //CREATE A SIGNED TOKEN WITH USER ID 

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

       //KEEP THE TOKEN IN COOKIE WITH EXPIRE DATE
        
        res.cookie("t", token, { expire: new Date() + 9999 });

         //RETURN RESPONSE TO FRONTEND CLIENT//
        
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

//SIGN OUT//

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
};

// // //REQUEST SIGN IN//

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};
