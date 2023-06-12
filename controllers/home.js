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


export const home = (req, res) => 
{
    res.render('layout.ejs',
    {
        template: 'home.ejs'
        
    });
};


// ----------------------------------------------------


export const art_page1 = (req, res) =>
{
    res.render('layout.ejs',
    {
        template: 'scrapbooking.ejs'
        
    });
    
};


// ----------------------------------------------------


export const art_page2 = (req, res) =>
{
    res.render('layout.ejs',
    {
        template: 'digital_art.ejs'
        
    });
    
};


// ----------------------------------------------------


export const inscriptionPost = (req, res) =>
{
    bcrypt.hash(req.body.mdp, 10, function (error, hash)
    {
        if(error)
        {
            console.log("error bcrypt");
        }
        else
        {
            const newClient =
                {
                    id: uuidv4(),
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    mdp: hash,
                    role: "client"
                };
                
            const query = "insert into User (id, pseudo, email, mdp, role, dateInscription) value (?, ?, ?, ?, ?, NOW())";
    
    
            pool.query( query, [newClient.id, newClient.pseudo, newClient.email, newClient.mdp, newClient.role], function (error, result, fields) 
            {
                error ? console.log(error) : res.redirect("/");
        	        
        	});
            
        }    
 
    });
    
};
    