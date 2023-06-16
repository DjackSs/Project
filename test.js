const produits =
[
  {
    id: '2373963d-35ce-41a9-b22c-5ab6e48d80ff',
    nom: 'nom1',
    description: 'description',
    category: 'scrapbooking',
    prix: 15,
    idUserPanier: '2e5c309d-70bd-4bf6-8d8c-d8c99ef3a95c'
  },
  {
    id: '2373963d-35ce-41a9-b22c-5ab6e48d80ff',
    nom: 'nom1',
    description: 'description',
    category: 'scrapbooking',
    prix: 15,
    idUserPanier: 'caa65ca8-c425-4f06-9ce4-06e3673b180a'
  },
  {
    id: '6832e128-ae14-492f-9765-f51829d3e57f',
    nom: 'nom5',
    description: 'description5',
    category: 'scrapbooking',
    prix: 35,
    idUserPanier: null
  },
  {
    id: '6d31b177-5933-4011-9708-f00374c984c1',
    nom: 'nom4',
    description: 'description4',
    category: 'scrapbooking',
    prix: 30,
    idUserPanier: 'caa65ca8-c425-4f06-9ce4-06e3673b180a'
  },
  {
    id: 'cd289c1b-8f43-4466-b635-28fe408d7058',
    nom: 'nom3',
    description: 'description3',
    category: 'scrapbooking',
    prix: 40,
    idUserPanier: '2e5c309d-70bd-4bf6-8d8c-d8c99ef3a95c'
  }
];






const processProduits = processData(produits);


function processData (array)
{
    let newArray = [];
    let nameArray = [];
    
    let idRef = "caa65ca8-c425-4f06-9ce4-06e3673b180a";
    
    for(let item of array)
    {
      
      if(nameArray.includes(item.nom))
      {
        nameArray.push(item.nom);
        
        if(item.idUserPanier === idRef)
        {
          newArray.pop();
          
          newArray.push(item);
        }
      }
      else
      {
        nameArray.push(item.nom);
        
        newArray.push(item);
      }
        
       
    }
    
    return newArray;
  
}

console.log(processProduits);
