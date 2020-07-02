const express = require("express");
const router = express.Router()
const app = express();

//Require mongodb and import a MongoClient object;
var mongoClient = require('mongodb').MongoClient;
var uri = process.env.MONGODB_URI; //Keep like this
var databaseName = 'Kommunity';



module.exports = function(app) {
    mongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    
    
    database = client.db(databaseName);
    
    
    //
    app.get('/', function(req, res) {
        database.collection('Users').find({ })
        .toArray((err, result) => {
            if (err) {
                // if an error happens
                res.send("Error in GET req.");
            } else {
                // if all works
                res.send(result); 
            }
        });
    });
    
    //Get Tasks
    app.get("/tasks", (req, res) => {
        database.collection('Requests').find({ })
        .toArray((err, result) => {
            if (err) {
                // if an error happens
                res.send("Error in GET req.");
            } else {
                // if all works
                res.send(result); 
            }
        });
    });
    
    app.post('/Users',(req,res) => {      
        database.collection('Users').insertOne(req.body, (err, result) => {
             if (err) return console.log(err);
                // log the result of db insertion
            console.log(req.body);
            console.log('saved to database');
            // send the freshly saved record back to the front-end
            res.send(result);
        })
    });

    
    app.post('/Requests',(req,res) => {      
        database.collection('Requests').insertOne(req.body, (err, result) => {
             if (err) return console.log(err);
                // log the result of db insertion
            console.log(req.body);
            console.log('saved to database');
            // send the freshly saved record back to the front-end
            res.send(result);
        })
    });

    
    
    
    var collection = database.collection('Users');
    
    //Get user
    app.get("/:user", (req, res) => {
        // Search for user
        collection.find({ username: req.params.user })
        .toArray((err, result) => {
        if (err) {
            res.send("Error in GET req.");
        } else {
            // if all works
            res.send(result); // Send users with matching username
        }
        });
    });

});
}
