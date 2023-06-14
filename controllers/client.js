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
    
    const login =
    {
        email: req.body.email,
        mdp: req.body.mdp
    };
    
    const query = `select * from User where email = ?`;
    
    pool.query(query,[login.email], function (error, result, fields) 
    {
            if (error) console.log(error);
            
	       
	            bcrypt.compare(login.mdp, result[0].mdp, function (error, isAllowed)
	            {
	            	if(isAllowed)
	            	{
	            		// -----------------Setting up session's profile for each role:
	            		
	            		if(result[0].role === "client")
		                {
		                   req.session.isClient = true;
		                   req.session.idClient = result[0].id;
		                   
		                   res.redirect(`/profile/${result[0].id}`);
		                    
		                }
		                else if(result[0].role === "admin")
		                {
		                    req.session.isAdmin = true;
		                    
		                    res.redirect("/admin");
		                }
		                
	            	}
	            	else
	            	{
	            		res.redirect('/login'); 
	            	}
	            	
	            });

	  });
    
};

// ----------------------------------------------------


export const profile = (req, res) => 
{

	const userId = req.params.id;
	
	const query1 = `select Produit.* from Produit inner join Produit_Panier on idProduit = Produit.id inner join Panier on idPanier = Panier.id where idUserPanier = ?`;
	
	const query2= `update Panier set prixPanier = ? where idUserPanier = ?`;
	
	pool.query(query1, [userId], function(error, produits, fields)
	{
	
		if(error) console.log(error);
		
		let totalPrice= 0;
		
		for(let produit of produits)
		{
			totalPrice += produit.prix;
		}
		
		
		pool.query(query2, [totalPrice, userId], function(error, result, fields)
		{
			if(error) console.log(error);
			
			res.render('layout.ejs',
			{
		    	template: 'profile.ejs',
		    	produits: produits,
		    	prixPanier: totalPrice
		    	
		        
		    });
			
		});

	});
    
};


// ----------------------------------------------------


export const logout = (req, res) =>
{
	req.session.destroy((error) =>
	{
		error ? console.log(error) : res.redirect("/");
		
	});
};

// ----------------------------------------------------

export const shoppingAdd = (req,res) =>
{
	
	
	const shopItem =
	{
		idUserPanier: req.params.id,
		idProduit: req.body.idProduit
	};
	
	const query = `insert into Produit_Panier (idPanier, idProduit) values ((select id from Panier where idUserPanier = ?), ?)`;
	
	
	pool.query(query,[shopItem.idUserPanier, shopItem.idProduit], function(error, result, fields)
	{
		error ? console.log(error) : res.status(204).send();
	});
	
};

// ----------------------------------------------------

export const shoppingDelete = (req,res) =>
{
	const idProduit = req.params.id;
	
	const query = "delete from Produit_Panier where idProduit = ?";
	
	pool.query(query, [idProduit], function(error, result, fields)
	{
		error ? console.log(error) : res.status(204).send();
	});
};