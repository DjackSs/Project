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
    const query1 = `select Produit.* from Produit order by Produit.nom`;
    
    const query2 = `select User.id, User.pseudo, User.email, User.dateInscription, User.role from User order by User.dateInscription`;
    
    const query3 = `select Commande.*, User.pseudo, User.email from Commande inner join User on Commande.idUser = User.id order by Commande.dateCommande`;
    
    const query4 = `select Dialogue.*, User.pseudo from Dialogue inner join User on User.id = Dialogue.idUser order by Dialogue.dateDialogue`;
    
    const query5 = `select Produit.*, Panier.*, User.pseudo, User.email from Produit inner join Produit_Panier on Produit.id = Produit_Panier.idProduit inner join Panier on Produit_Panier.idPanier = Panier.id inner join User on Panier.idUserPanier = User.id where Panier.statut = "paye" order by User.email`; 
    
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
                    
                    pool.query(query5, function(error, achats, fields)
                    {
                        if(error) console.log(error);
                        
                        const processedAchats = processAchats(achats);
                        
                        res.render("layout.ejs",
                        {
                            template: "admin.ejs",
                            produits: produits,
                            users: users,
                            commandes: commandes,
                            achats: processedAchats,
                            dialogues: dialogues
                            
                        });
                        
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
        prix: req.body.price,
        statut: "free"
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
        prix: req.body.prix,
        statut: "free"
    };

    const query = `update Produit set ? where id = ?`;

	pool.query(query, [editProduct, id], function (error, result, fields)
	{
	    error ? console.log(error) : res.status(204).send();

	 });
    
};

// ----------------------------------------------------

export const closeBuying = (req,res) =>
{
    const id = req.params.id;
    
    const panierStatus = "livre";
    
    const query = `update Panier set dateCloture = NOW(), statut = ? where id = ?`;
    
    const query2 = `update Produit inner join Produit_Panier on Produit.id = Produit_Panier.idProduit inner join Panier on Produit_Panier.idPanier = Panier.id set Produit.statut = Panier.statut where Panier.id = ?`;

	pool.query(query, [panierStatus, id], function (error, result, fields)
	{
	    if(error) console.log(error);
	    
	    pool.query(query2,[id], function(error, result2, fields)
	    {
	        error ? console.log(error) : res.status(204).send();
	  
	    });
	    

	 });
    
};






// ----------------------------------------------------



function processAchats (array)
{
  let newArray= [];
  let panierArray= [];
  let produits = [];
  
  
  for(let item of array)
  {
    
    let newObject =
    {
      idPanier:item.id,
      idClient:item.idUserPanier,
      pseudoClient: item.pseudo,
      email: item.email,
      prixPanier: item.prixPanier,
      produits:produits
   
    };
  
  let newProduit =
    {
      nom: item.nom,
      description:item.description,
      category:item.category,
      prix:item.prix,
    };
    
    
    
    if(panierArray.includes(item.id))
    {
      produits.push(newProduit);
    }
    else
    {
      
      produits = [];
      
      produits.push(newProduit);
      
      newObject.produits = produits;
      
      newArray.push(newObject);
      
      
    }
    
  panierArray.push(item.id);
    
    
  }
  
  
  return newArray;
  
}
