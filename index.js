const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');

// Load environment variables (.env)
try {
  require('dotenv').config();
} catch (e) {
  if (process.loadEnvFile) process.loadEnvFile();
}

const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("__method"));
const { error } = require('console');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const Connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'Learning_app',
  password: process.env.DB_PASSWORD
});

// let q = "INSERT INTO user (id, username , email, password) VALUES ?";

// let createRandomUser = ()=> {
//   return [
//      faker.string.uuid(),
//      faker.internet.username(),
//     faker.internet.email(),
  
//    faker.internet.password(),
    
//   ];
// }

// let data = [];

// for (let i = 0; i<=100; i++){
//         data.push((createRandomUser()));
// }


// Home Route
app.get("/" , (req,res)=>{
  let q = `SELECT count(*) FROM user`;
  
   try{
    Connection.query(q, (err, result)=>{
     if(err) throw err;
    console.log(result);
    let count = result[0]["count(*)"];
    res.render("home.ejs", {count});
    });

  }catch(err){
    res.send("<h1>some internal error occured</h1>");
  }
})

//SHOW ROUTE
app.get("/user", (req,res)=>{
  let q = `SELECT * FROM user`;

  try{
    Connection.query(q, (err, users)=>{
      if(err) throw err;
      res.render("show-users.ejs", {users});
    })
  }catch(err){
    res.send("<h1>Some internal error has occured</h1>");
  }

})
// Get Edit route
app.get("/user/:id/edit", (req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = ?`
  
  try{
    Connection.query(q, [id] , (err, result)=>{
      if(err) throw err;
      let user = result[0];
        
      res.render("edit.ejs", {user});
    })
  }catch(err){
    console.log(err);
    res.send("<h1>Some internal error has occured</h1>");
  }

  
})

//UPDATE route

app.patch("/user/:id", (req,res)=>{
    let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = ?`
    let {username:newUser, password:formsPass, } = req.body;
  try{
    Connection.query(q, [id] , (err, result)=>{
      if(err) throw err;
      let user = result[0];
      if(formsPass != user.password){
        res.send("<h1>Incorrect Password</h1>");
      }
       else{ 
        let q2 = `UPDATE user SET username = ? WHERE id = ?`;
        Connection.query(q2, [newUser, id],  (err, result)=>{
          if(err) throw err;
          res.redirect("/user");
        })
      
       };
    })
  }catch(err){
    console.log(err);
    res.send("<h1>Some internal error has occured</h1>");
  }});
 
  // ADD USER route
  app.get("/user/add", (req,res)=>{
     res.render("add.ejs");
  })

  app.post("/user", (req,res)=>{
    let iD = faker.string.uuid();
    let {username, mail, password} = req.body;
    
    // res.send(req.body["username"]);
    let q = `SELECT * FROM user WHERE email = ?`;
   
try{
    Connection.query(q, [req.body["mail"]] , (err, result)=>{
      if(true){
        res.send("<h1>Email Already registered");
      }
       else{ 
        let q2 = `INSERT INTO user (id,username, email, password )  VALUES (?,?,?,?)`;
        Connection.query(q2, [iD, req.body["username"], req.body["mail"], req.body["password"]],  (err, result)=>{
          if(err) throw err;
          res.redirect("/user");
        })
      
       };
    })
  }catch(err){
    console.log(err);
    res.send("<h1>Some internal error has occured</h1>");
  }});
    
  //DELETE ROUTE
  app.delete("/user/:id", (req,res)=>{
  let {id} = req.params;
  let q =  `DELETE FROM user WHERE id = ?`
  
  try{
    Connection.query(q, [id] , (err, result)=>{
      if(err) throw err;
      res.redirect("/user");
    })
  }catch(err){
    console.log(err);
    res.send("<h1>Some internal error has occured</h1>");
  }

  
 })


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`App is listening on ${port}`)});


  