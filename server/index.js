const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const fins_fernsModel = require('./models/fins-ferns.js')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/fins-ferns', )

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    fins_fernsModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }else{
                res.json("password incorrect")
            }
        }else{
            res.json("user not found")
        }
    })
})

app.post('/register', (req,res)=>{
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    // Check if email already exists
    fins_fernsModel.findOne({email:email})
    .then(user=>{
        if(user){
            return res.status(400).json({message: "Email already exists"});
        } else {
            // Create new user if email is unique
            fins_fernsModel.create({name, email, password})
            .then(newUser => res.status(201).json(newUser))
            .catch(err => res.status(500).json({message: "Internal server error"}));
        }
    })
    .catch(err => res.status(500).json({message: "Internal server error"}));
})

app.listen(3001, () => {
    console.log('Server is running ...')
})
