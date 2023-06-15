


// ======================================================
    // ADMIN FETCH 
// ======================================================


// DELETE PRODUCT FETCH

const deleteProductButtons = document.querySelectorAll(".js-removeProduit-button");

if (deleteProductButtons.length != 0)
{
    for(let button of deleteProductButtons)
    {
        button.addEventListener("click", (e)=>
        {
            (e).preventDefault();
            
            // ----------------------fecth settings
            
            const id = button.getAttribute("data-produit");
            
            const url = `/deleteProduct/${id}`;
            
            const options =
            {
                method: "delete",
                header: {"Content-Type": "application/json"}
                
            };
            
            // ----------------------fecth actions
            
            fetch(url, options)
            .then(res =>
            {
                const product = document.querySelector(`#productTable tr[id="${id}`);
                
                product.remove();
                
            })
            .catch(err => console.error(err));
            
        });
    }
    
}

// DELETE CLIENT FETCH

const deleteClientButtons = document.querySelectorAll(".js-removeClient-button");

if (deleteClientButtons.length != 0)
{
    for(let button of deleteClientButtons)
    {
        button.addEventListener("click", (e)=>
        {
            (e).preventDefault();
            
            // ----------------------fecth settings
            
            const id = button.getAttribute("data-client");
            
            const url = `/deleteClient/${id}`;
            
            const options =
            {
                method: "delete",
                header: {"Content-Type": "application/json"}
                
            };
            
            // ----------------------fecth actions
            
            fetch(url, options)
            .then(res =>
            {
                const client = document.querySelector(`#clientTable tr[id="${id}`);
                
                client.remove();
                
            })
            .catch(err => console.error(err));
            
        });
    }
    
}

// PUT PRODUCT FETCH

const editProductButtons = document.querySelectorAll(".js-editProduit-button");

if (editProductButtons.length != 0)
{
    for(let button of editProductButtons)
    {
        button.addEventListener("click", (e)=>
        {
            (e).preventDefault();
            
            const id = button.getAttribute("data-produit");
            
            // ----------------------DOM settings
            
            const oldName = document.querySelector(`#productTable tr[id="${id}"] td:first-child`);
                
            const oldDescription = document.querySelector(`#productTable tr[id="${id}"] td:nth-child(2)`);
            
            const oldCategory = document.querySelector(`#productTable tr[id="${id}"] td:nth-child(3)`);
            
            const oldPrice = document.querySelector(`#productTable tr[id="${id}"] td:nth-child(4)`);
            
            const oldButtons = document.querySelector(`#productTable tr[id="${id}"] td:last-child`);
            
            const oldButtonList = document.querySelectorAll(`#productTable tr[id="${id}"] td:last-child button`);
            
            // ----------------------
            
            const newName = document.createElement('input');
                newName.type="text";
                newName.name="editName";
                newName.value= oldName.innerText;
                
            const newDescription = document.createElement('input');
                newDescription.type="text";
                newDescription.name="editDescription";
                newDescription.value= oldDescription.innerText;
            
            const newCategory = document.createElement("select");
                newCategory.name="editCategory";
                
                const newOption1 = document.createElement("option");
                    newOption1.text="scrapbooking";
                    newOption1.value="scrapbooking";
                    
                const newOption2 = document.createElement("option");
                    newOption2.text="digital_art";
                    newOption2.value="digital_art";
                    
            const newPrice = document.createElement('input');
                newPrice.type="text";
                newPrice.name="editPrice";
                newPrice.value= oldPrice.innerText;
                
            const newButton = document.createElement("input");
                newButton.type="submit";
                newButton.name="Enregistrer";
                
                
            oldName.innerHTML="";
            oldName.append(newName);
            
            oldDescription.innerHTML="";
            oldDescription.append(newDescription);
            
            oldCategory.innerHTML="";
                newCategory.append(newOption1);
                newCategory.append(newOption2);
            oldCategory.append(newCategory);
            
            oldPrice.innerHTML="";
            oldPrice.append(newPrice);
            
            oldButtons.innerHTML="";
            oldButtons.append(newButton);
            
            // ----------------------fecth settings
            
            newButton.addEventListener("click",(e)=>
            {
                e.preventDefault();
                
                const url = `/editProduct/${id}`;
                
                
                const newProductData =
                {
                    nom: newName.value,
                    description: newDescription.value,
                    category: newCategory.value,
                    prix: newPrice.value
                };
            
               const options = 
               {
                    method: 'put',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(newProductData)
                };
                
                fetch(url, options)
                .then(res =>
                {
                    
                    oldName.removeChild(newName);
                    oldName.append(newName.value);
                    
                    oldDescription.removeChild(newDescription);
                    oldDescription.append(newDescription.value);
                    
                    oldCategory.removeChild(newCategory);
                    oldCategory.append(newCategory.value);
                    
                    oldPrice.removeChild(newPrice);
                    oldPrice.append(newPrice.value);
                    
                    oldButtons.removeChild(newButton);
                    
                    for(let oldbutton of oldButtonList)
                    {
                        oldButtons.append(oldbutton);
                        
                    }
                    
                    
                })
                .catch(err => console.error(err));
                
                    
            });
            
            
        });
    }
}

// ======================================================
    // CLIENT FETCH
// ======================================================


// ADD TO BASKET FETCH

const addProductButtons = document.querySelectorAll(".js-addProduit-button");

if(addProductButtons.length != 0)
{
    for(let button of addProductButtons )
    {
        button.addEventListener("click", (e)=>
        {
            (e).preventDefault();
            
              // ----------------------fecth settings
            
            const idClient = button.getAttribute("data-addClient");
            
            const idProduct = button.getAttribute("data-addProduct");
            
 
            const url = `/addToBasket/${idClient}`;
            
            const data =
            {
                idUserPanier: idClient,
                idProduit: idProduct
            };
            
            
            const options = 
               {
                    method: 'post',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(data)
                };
            
            // ----------------------fecth actions
            
            fetch(url, options)
            .then(res =>
            {
                
                const articleProduit = document.getElementById(`${idProduct}`);
                
                button.remove();
                
                articleProduit.append("Ajouté!");
                
               
                
            })
            .catch(err => console.error(err));
            
            
            
        });
    }
}


// DELETE FROM BASKET FETCH

const deleteProductBasketButtons = document.querySelectorAll(".js-removeProduitPanier-button");


if(deleteProductBasketButtons.length != 0)
{
    for(let button of deleteProductBasketButtons)
    {
        button.addEventListener("click", (e)=>
        {
            // ----------------------fecth settings
            
            const id = button.getAttribute("data-produit");
            
            const url = `/deleteProduitPanier/${id}`;
            
            const options =
            {
                method: "delete",
                header: {"Content-Type": "application/json"}
                
            };
            
            // ----------------------fecth actions
            
            fetch(url, options)
            .then(res =>
            {
                // ---------------reload the page to update the total price in Database
                window.location.reload();
                
            })
            .catch(err => console.error(err));
            
        });
    }
}

// ======================================================
    // DIALOGUE FETCH
// ======================================================

// ADMIN SIDE

const adminDialogueButtons = document.querySelectorAll(".js-adminDialogue-button");

if(adminDialogueButtons.length != 0)
{
    for(let button of adminDialogueButtons)
    {
        button.addEventListener("click", (e)=>
        {
            (e).preventDefault();
            
            // ----------------------fecth settings
            
            const id = button.getAttribute("data-commande");
            
            const reply = 
            {
                comment: document.querySelector(`article[id="${id}"] textarea`).value,
                idUser: button.getAttribute("data-client"),
                idTransmitter: button.getAttribute("data-transmitter")
            };
            
            
            const url = `/adminDialogue/${id}`;
            
                const options = 
                {
                    method: 'post',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(reply)
                };
            
            // ----------------------fecth actions
            
            fetch(url, options)
            .then(res =>
            {
                
               
                
            })
            .catch(err => console.error(err));
            
            
        });
    }
}


// CLIENT SIDE

const clientDialogueButtons = document.querySelectorAll(".js-clientDialogue-button");

if(clientDialogueButtons.length != 0)
{
    for(let button of clientDialogueButtons)
    {
        button.addEventListener("click", (e)=>
        {
            (e).preventDefault();
            
            // ----------------------fecth settings
            
            const id = button.getAttribute("data-commande");
            
            const reply = 
            {
                comment: document.querySelector(`article[id="${id}"] textarea`).value,
                idUser: button.getAttribute("data-client"),
                idTransmitter: button.getAttribute("data-transmitter")
            };
            
            
            const url = `/clientDialogue/${id}`;
            
                const options = 
                {
                    method: 'post',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(reply)
                };
            
            // ----------------------fecth actions
            
            fetch(url, options)
            .then(res =>
            {
                
               
                
            })
            .catch(err => console.error(err));
            
            
        });
    }
}
