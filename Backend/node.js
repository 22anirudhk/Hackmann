const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const app = express(); // instantiate express

const bodyParser = require("body-parser");//To parse body of post requests
app.use(bodyParser.json());


// listen for requests on port 4567
const port = 4567;

app.use(require("cors")()) // allow Cross-domain requests 
app.use(require('body-parser').json()) // When someone sends something to the server, we can recieve it in JSON format


//Require mongodb and import a MongoClient object;

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017'; //Keep like this
var databaseName = 'Hackmann';
var database;
    
//Connect the client using the url & client
mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    
    database = client.db(databaseName);
    

    app.get("/", (req, res) => {
      res.render("index.html");
    })
    
    
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
    
    app.post('/Users',(request,response) => {      
        database.collection('Users').insertOne(request.body, (err, result) => {
             if (err) return console.log(err);
                // log the result of db insertion
            console.log(request.body);
            console.log('saved to database');
            // send the freshly saved record back to the front-end
            response.json(result);
        })
    });

    
    app.post('/Requests',(request,response) => {      
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




  // listen for requests
  var listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
