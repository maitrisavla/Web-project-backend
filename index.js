
const express = require("express");
const cors = require("cors");
require("./db/config");
const user = require('./db/user');
const app = express();

app.use(express.json());
app.use(cors());


app.post("/register", async (req, resp)=> {

    let users = await user.findOne(req.body).select("emailid")
    if(users){
        resp.send("User already exist")
    }

    else{

        let newusers = new user(req.body);
        let result = await newusers.save();
        resp.send(result);
    }
   
})

app.post("/login", async (req, resp)=> {

    if(req.body.pass && req.body.emailid)
    {
        let users = await user.findOne(req.body).select("-pass")
    if(users)
    {
        resp.send(users)
    }

    else{
        resp.send("User not found")
    }
  }
    
})

app.listen(5000);