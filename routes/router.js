// ==============================================
// ROUTER SET UP
// ==============================================

import express from "express";

const router = express.Router();


// ==============================================
// CONTROLLERS SET UP
// ==============================================

import {home, art_page1, art_page2, inscription, inscriptionPost} from "../controllers/home.js";

import {login, loginPost} from "../controllers/client.js";






// -----------------------routes protection's middleware

const adminCheck = function (req, res, next) {

    if(req.session.isAdmin) 
    {
        next();
    } 
    else 
    {
        res.redirect('/loginform');
    }
};



// ==============================================
// ROUTES
// ==============================================

//HOME PAGE
router.get("/", home);

router.get("/scrapbooking", art_page1);

router.get("/art_numerique", art_page2);


//SIGN IN PAGE
router.get("/sign_in", inscription);

router.post("/sign_in/post", inscriptionPost);

//LOGIN PAGE
router.get("/login", login);

router.post("/login/post", loginPost);


//ADMIN PAGE


export default router;