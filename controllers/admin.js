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


export const profileAdmin = (req, res) =>
{
    const query1 = `select * from Produit`;
    
    const query2 = `select * from User`;
    
    pool.query(query1, function (error, produits, fields)
    {
        if(error) console.log(error);
        
        pool.query(query2, function (error, clients, fields)
        {
            if(error) console.log(error);
            
            res.render("layout.ejs",
            {
                template: "admin.ejs",
                produits: produits,
                clients: clients
            });
        });
    });
    
};

// ----------------------------------------------------

export const addProductPost = (req,res) =>
{
    const newProduct =
    {
        id: uuidv4(),
        nom: req.body.name,
        description: req.body.description,
        category: req.body.category,
        prix: req.body.price
    };
    
    const query = `insert into Produit set ?`;
    
    pool.query(query,[newProduct], function(error, result, fields)
    {
        error ? console.log(error) : res.redirect("/admin");
    });
};