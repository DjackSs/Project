// ==============================================
// ROUTER SET UP
// ==============================================

import express from "express";

const router = express.Router();


// ==============================================
// CONTROLLERS SET UP
// ==============================================

import {home, art_page1, art_page2, inscriptionPost} from "../controllers/home.js";

import {login, loginPost, profile, logout, shoppingAdd, shoppingDelete, customOrder, clientDialogue} from "../controllers/client.js";

import {profileAdmin, addProductPost, deleteProduit, editProduit, deleteClient, adminDialogue} from "../controllers/admin.js";






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

router.post("/clientDialogue/:id", clientCheck, clientDialogue);

//SHOPPING PAGE

router.post("/addToBasket/:id", clientCheck, shoppingAdd);

router.delete("/deleteProduitPanier/:id", clientCheck, shoppingDelete);

router.post("/order/:id", clientCheck, customOrder);




//ADMIN PAGE

router.get("/admin", adminCheck, profileAdmin);

router.post("/addProductPost", adminCheck, addProductPost);

router.delete("/deleteProduct/:id", adminCheck, deleteProduit);

router.delete("/deleteClient/:id", adminCheck, deleteClient);

router.put("/editProduct/:id", adminCheck, editProduit);

router.post("/adminDialogue/:id", adminCheck, adminDialogue);


export default router;