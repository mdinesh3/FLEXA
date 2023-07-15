const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

require("dotenv").config();
dotenvs = process.env;

const mongoose = require("mongoose");
const database = "mongodb+srv://dinesh372003:"+ dotenvs.PASSWORD +"@evolvfit-backend.e7uzj.mongodb.net/?retryWrites=true&w=majority"

const Product = require('./Schema/productSchema');


mongoose.connect(database,{useNewUrlParser:true,useUnifiedTopology: true})
    .then((result)=>
    {
        console.log("MongoDB connected");
    })
    .catch((err)=>console.log(err))

app.use(bodyParser.json());
app.use(cors());

app.get('/prodlist', (req, res) => {
    Product.find()
        .then((result) => {
            res.status(200);
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.send(err);
        })
});

app.post("/addprod", (req, res) => {
    const prod = new Product();
    prod.Name = req.body.Name;
    prod.ModelNo = req.body.ModelNo;
    prod.Model = req.body.Model;
    prod.Category = req.body.Category;

    prod.save()
        .then(result => {
            res.status(200);
            res.send("added");
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.send("Duplicate Entry");
        })
});

app.post("/updprod", async(req, res) => {
    
    if (req.body.Name) {
        await Product.findOneAndUpdate(
            {
                ModelNo: req.body.ModelNo
            }, 
            {
                Name: req.body.Name
            }
        )
    } if (req.body.Model) {
        await Product.findOneAndUpdate(
            {
                ModelNo: req.body.ModelNo
            }, 
            {
                Model: req.body.Model
            }
        )
    } if (req.body.Category) {
        await Product.findOneAndUpdate(
            {
                ModelNo: req.body.ModelNo
            }, 
            {
                Category: req.body.Category
            }
        )
    }
    res.status(200);
    res.send("Updated");
});

app.post("/delprod", (req, res) => {
    Product.deleteOne({ ModelNo: req.body.ModelNo })
        .then(result => {
            console.log(result);
            res.status(200);
            res.send("Deleted")
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.send(err);
        })
})
app.listen(dotenvs.PORT || 5000);
console.log("Listening on Port 5000");