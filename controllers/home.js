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
    
    let query = `select Produit.* from Produit where category in("scrapbooking") order by Produit.nom`;
    
    if(req.session.user)
    {
        query = `select Produit.*, Panier.idUserPanier from Produit left join Produit_Panier on idProduit = Produit.id left join Panier on Produit_Panier.idPanier = Panier.id where category in ("scrapbooking") order by Produit.nom`;
    }

    
    pool.query(query, function(error, produits, fields)
    {
        if(error) console.log(error);
        
        let sortedProduits = produits;
        
        if(req.session.user)
        {
            sortedProduits = processData (produits, req.session.idClient);
        }
        
        

        
        res.render('layout.ejs',
        {
            template: 'scrapbooking.ejs',
            produits: sortedProduits
        
        });
        
    });
    
    
};


// ----------------------------------------------------


export const art_page2 = (req, res) =>
{
    
    let query = `select Produit.* from Produit where category in("digital_art") order by Produit.nom`;
    
    if(req.session.user)
    {
        query = `select Produit.*, Panier.idUserPanier from Produit left join Produit_Panier on idProduit = Produit.id left join Panier on Produit_Panier.idPanier = Panier.id where category in ("digital_art") order by Produit.nom`;
    }
    
    pool.query(query, function(error, produits, fields)
    {
        if(error) console.log(error);
        
        let sortedProduits = produits;
        
        if(req.session.user)
        {
            sortedProduits = processData (produits, req.session.idClient);
        }
        
        res.render('layout.ejs',
        {
            template: 'digital_art.ejs',
            produits: sortedProduits
        
        });
        
    });
};


// ----------------------------------------------------


export const inscriptionPost = (req, res) =>
{
    // ----------------------------------------------------data's validation

    
    let errorForm = {};
    
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // https://www.w3resource.com/javascript/form/email-validation.php
    
    let regexMdp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    // https://www.w3resource.com/javascript/form/password-validation.php
    // To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    
    //  ------------------------------empty fields or invalid with regex
    
    if(!req.body.pseudo.trim())
    {
        errorForm.name = "Nom invalide";
    }
    
    if(!req.body.email.trim() || !regexEmail.test(req.body.email))
    {
        errorForm.email = "Address email invalide";
    }
    
    if(!req.body.mdp.trim() || !regexMdp.test(req.body.mdp))
    {
        errorForm.mdp = "Mots de passe invalide";
    }
    
    
    
    //  ------------------------------user already existe
    
    const queryUser = `select User.* from User where User.email = ?`;
   
    pool.query(queryUser, [req.body.email], function(error, userCheck, fields)
    {
        if(error) console.log(error);
        
        if(userCheck.length != 0) 
        {
            errorForm.email = "Ce compte existe déja";
        }
        
        console.log(errorForm);
        
        // ----------------------------------------------------if an error occured, redirect for a retry
    
        if(Object.keys(errorForm).length != 0)
        {
            return res.render('layout.ejs',
            {
                template: 'login.ejs',
                errorForm : errorForm
                    
            });
            
        }
        
        
        // ----------------------------------------------------if datas are ok, then proceed to the registration
                
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
                    
                const newCard =
                	{
                		id: uuidv4(),
                		idUserPanier: newClient.id,
                		prixPanier: 0,
                		statut: "cree"
                	};
                	
                    
                const query1 = "insert into User (id, pseudo, email, mdp, role, dateInscription) value (?, ?, ?, ?, ?, NOW())";
                
                const query2 =`insert into Panier (id, idUserPanier, prixPanier, statut, dateCreation) value (?, ?, ?, ?, NOW())`;
        
        
                pool.query( query1, [newClient.id, newClient.pseudo, newClient.email, newClient.mdp, newClient.role], function (error, result1, fields) 
                {
                    if(error) console.log(error); 
                    
                    pool.query(query2, [newCard.id, newCard.idUserPanier,newCard.prixPanier, newCard.statut], function (error,result2, fields)
                    {
                        if(error) console.log(error);
                        
                        req.session.user =
    		                {
    			                   id: newClient.id,
    			                   pseudo: newClient.pseudo,
    			                   email: newClient.email,
    			                   role: newClient.role
    		                };
    		                
    		            res.redirect(`/profile/${newClient.id}`);
                        
                    });
                    
            	        
            	});
                
            }    
     
        });
                
                
    });
            
    
    
    
    
    
};








// ---------------------------This function process initial query on Produit.* / Produit_Panier.idPanier. If one product is in many client's card, this function find the current client's idPanier so that we don't display many copies of the same product on the page.
        
        function processData (array, idUser)
        {
            let newArray = [];
            let nameArray = [];
            let user = idUser;
            
            array.forEach((element)=>
            {
                if(nameArray.includes(element.nom))
                {
                    nameArray.push(element.nom);
                    
                    if(element.idUserPanier === user)
                    {
                        newArray.pop();
                        
                        newArray.push(element);
                    }
                    
                }
                else
                {
                    nameArray.push(element.nom);
                    
                    newArray.push(element);
                }
                
            });
            
            return newArray;
            
        }
        
// ---------------------------------------------------