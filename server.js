// ==============================================
// TOOLS
// ==============================================

// -------------import express framework
import express from "express";
const app = express();

// -------------import the session's management tool
import session from "express-session";

// -------------import the routes managment file
import router from './routes/router.js';


// ==============================================
// MIDDLEWARE
// ==============================================

// -------------enable the use of json to recieve data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// -------------set public as static folder where ejs retrieve assets
app.use(express.static("public"));

// -------------set views as ejs template
app.set("views", "./views");

// -------------set the router call
app.use("/", router);


// -------------session management middleware
app.use(function (req,res,next)
{
    
    next();
    
});


// ==============================================
// SERVER LAUNCHING
// ==============================================

const PORT = 3000;

app.listen(PORT,()=>
{
    console.log("serveur listening port"+PORT+"/");
});


// http://nathanhamon.ide.3wa.io:3000/