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
    
    const query = `select Produit.*,idProduit from Produit left join Produit_Panier on idProduit = Produit.id where category in ("scrapbooking")`;
    
    pool.query(query, function(error, produits, fields)
    {
        if(error) console.log(error);
        
        res.render('layout.ejs',
        {
            template: 'scrapbooking.ejs',
            produits: produits
        
        });
        
    });
    
    
};


// ----------------------------------------------------


export const art_page2 = (req, res) =>
{
    const query = `select Produit.*,idProduit from Produit left join Produit_Panier on idProduit = Produit.id where category in ("digital_art")`;
    
    pool.query(query, function(error, produits, fields)
    {
        if(error) console.log(error);
        
        res.render('layout.ejs',
        {
            template: 'digital_art.ejs',
            produits: produits
        
        });
        
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
                
            const newBasket =
            	{
            		id: uuidv4(),
            		idUserPanier: newClient.id,
            		prixPanier: 0,
            		statut: "Cree"
            	};
                
            const query1 = "insert into User (id, pseudo, email, mdp, role, dateInscription) value (?, ?, ?, ?, ?, NOW())";
            
            const query2 =`insert into Panier (id, idUserPanier, prixPanier, statut, dateCreation) value (?, ?, ?, ?, NOW())`;
    
    
            pool.query( query1, [newClient.id, newClient.pseudo, newClient.email, newClient.mdp, newClient.role], function (error, result1, fields) 
            {
                if(error) console.log(error); 
                
                pool.query(query2, [newBasket.id, newBasket.idUserPanier,newBasket.prixPanier, newBasket.statut], function (error,result2, fields)
                {
                    error ? console.log(error) : res.redirect("/");
                    
                });
                
        	        
        	});
            
        }    
 
    });
    
};
    