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
    
    const query2 = `select User.id, User.pseudo, User.email, User.dateInscription, User.role from User`;
    
    const query3 = `select Commande.*, User.pseudo, User.email from Commande inner join User on Commande.idUser = User.id`;
    
    const query4 = `select Dialogue.*, User.pseudo from Dialogue inner join User on User.id = Dialogue.idUser`;
    
    pool.query(query1, function (error, produits, fields)
    {
        if(error) console.log(error);
        
        pool.query(query2, function (error, users, fields)
        {
            if(error) console.log(error);
            
            pool.query(query3, function(error, commandes, fields)
            {
                if(error) console.log(error);
                
                pool.query(query4, function(error, dialogues, field)
                {
                    if(error) console.log(error);
                    
                    res.render("layout.ejs",
                    {
                        template: "admin.ejs",
                        produits: produits,
                        users: users,
                        commandes: commandes,
                        dialogues: dialogues
                        
                    });
                    
                });
                
                
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

// ----------------------------------------------------

export const deleteProduit = (req,res) =>
{
    const deleteProduct = req.params.id;
    
    const query = `delete from Produit where id = ?`;
    
    pool.query(query, [deleteProduct], function(error, result, fields)
    {
        error ? console.log(error) : res.status(204).send();
    });
    
};

// ----------------------------------------------------

export const deleteClient = (req,res) =>
{
    const deleteClient = req.params.id;
    
    const query = `delete from User where id = ?`;
    
    pool.query(query, [deleteClient], function(error, result, fields)
    {
        error ? console.log(error) : res.status(204).send();
    });
    
};



// ----------------------------------------------------

export const editProduit = (req,res) =>
{
    let id = req.params.id;
    
    const editProduct =
    {
        nom: req.body.nom,
        description: req.body.description,
        category: req.body.category,
        prix: req.body.prix
    };

    const query = `update Produit set ? where id = ?`;

	pool.query(query, [editProduct, id], function (error, result, fields)
	{
	    error ? console.log(error) : res.status(204).send();

	 });
    
};

