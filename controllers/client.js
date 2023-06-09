// ==============================================
// TOOLS SET UP
// ==============================================

// -----------------------import database info 
import pool from "../config/database.js";

// -----------------------import randomiser generator for id's
import { v4 as uuidv4 } from 'uuid';

// -----------------------import the data encryptor
import bcrypt from 'bcryptjs';


// ==============================================
// CONTROLLERS
// ==============================================

export const login = (req, res) => 
{
    res.render('layout.ejs',
    {
        template: 'login.ejs'
        
    });
};


// ----------------------------------------------------


export const loginPost = (req, res) => 
{
    res.redirect("/");
    
};

