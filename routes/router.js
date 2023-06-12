// ==============================================
// ROUTER SET UP
// ==============================================

import express from "express";

const router = express.Router();


// ==============================================
// CONTROLLERS SET UP
// ==============================================

import {home, art_page1, art_page2, inscriptionPost} from "../controllers/home.js";

import {login, loginPost, profile, logout} from "../controllers/client.js";

import {profileAdmin, addProductPost} from "../controllers/admin.js";






// -----------------------routes protection's middleware

const adminCheck = function (req, res, next) {

    if(req.session.isAdmin) 
    {
        next();
    } 
    else 
    {
        res.redirect('/login');
    }
};

const clientCheck = function (req, res, next) {

    if(req.session.isClient) 
    {
        next();
    } 
    else 
    {
        res.redirect('/login');
    }
};



// ==============================================
// ROUTES
// ==============================================

//HOME PAGE
router.get("/", home);

router.get("/scrapbooking", art_page1);

router.get("/art_numerique", art_page2);


//SIGN IN PAGE / LOGIN PAGE

router.get("/login", login);

router.post("/login/post", loginPost);

router.post("/sign_in/post", inscriptionPost);

//PROFILE PAGE

router.get("/profile/:id", clientCheck, profile);

router.post("/logout", logout);


//ADMIN PAGE

router.get("/admin", adminCheck, profileAdmin);

router.post("/addProductPost", adminCheck, addProductPost);


export default router;