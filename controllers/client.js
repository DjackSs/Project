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
    
    const query = `select * from User where email = "${login.email}" `;
    
    pool.query(query, function (error, result, fields) 
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
		                   
		                   return res.redirect(`/profile/${result[0].id}`);
		                    
		                }
		                else if(result[0].role === "admin")
		                {
		                    req.session.isAdmin = true;
		                    
		                    return res.redirect("/admin");
		                }
		                
	            	}
	            	else
	            	{
	            		return res.redirect('/login'); 
	            	}
	            	
	            });
		            		

	  });
    
    
};

// ----------------------------------------------------


export const profile = (req, res) => 
{
    res.render('layout.ejs',
    {
        template: 'profile.ejs'
        
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