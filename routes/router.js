// ==============================================
// ROUTER SET UP
// ==============================================

import express from "express";

const router = express.Router();


// ==============================================
// CONTROLLERS SET UP
// ==============================================

import home from "../controllers/home.js";






// -----------------------routes protection's middleware





// ==============================================
// ROUTES
// ==============================================

//HOME PAGE
router.get("/", home);


export default router;