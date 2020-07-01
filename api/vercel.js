const express = require("express");
const router = express.Router();


const ObjectID = require('mongodb').ObjectID;



//Require mongodb and import a MongoClient object;
var mongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI; //Keep like this
var databaseName = 'Kommunity';
var database;


//Connect the client using the url & client
mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    
    
    
    database = client.db(databaseName);
    
    
    //Get Tasks
    router.get("/tasks", (req, res) => {
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
    
    router.post('/Users',(request,response) => {      
        database.collection('Users').insertOne(request.body, (err, result) => {
             if (err) return console.log(err);
                // log the result of db insertion
            console.log(request.body);
            console.log('saved to database');
            // send the freshly saved record back to the front-end
            response.json(result);
        })
    });

    
    router.post('/Requests',(request,response) => {      
        database.collection('Requests').insertOne(request.body, (err, result) => {
             if (err) return console.log(err);
                // log the result of db insertion
            console.log(request.body);
            console.log('saved to database');
            // send the freshly saved record back to the front-end
            response.json(result);
        })
    });

    
    
    
    var collection = database.collection('Users');
    
    //Get user
    router.get("/:user", (req, res) => {
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
    
//  // listen for requests
//  var listener = app.listen(port, () => {
//    console.log("Your app is listening on port " + listener.address().port);
//  });

