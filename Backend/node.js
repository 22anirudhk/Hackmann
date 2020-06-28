const ObjectID = require('mongodb').ObjectID;
const express = require('express'); 
const app = express(); // instantiate express

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
    
    
    var collection = database.collection('Users');
    
    // Responds to GET requests with the route parameter being the username.
  // Returns with the JSON data about the user (if there is a user with that username)
  // Example request: https://mynodeserver.com/myusername
  app.get("/:user", (req, res) => {
    // search the database (collection) for all users with the `user` field being the `user` route paramter
    collection.find({ username: req.params.user })
    .toArray((err, result) => {
      if (err) {
        // if an error happens
        res.send("Error in GET req.");
      } else {
        // if all works
        res.send(result); // send back all users found with the matching username
      }
    });
  });

  // this doesn't create a new user but rather updates an existing one by the user name
  // a request looks like this: `https://nodeserver.com/username23` plus the associated JSON data sent in
  // the `body` property of the PUT request
  // app.put("/:user", (req, res) => {
  //   collection.find({ user: req.params.user }).toArray((err, docs) => {
  //     if (err) {
  //       // if and error occurs in finding a user to update
  //       res.send("Error in PUT req.");
  //     } else {
  //       collection.updateOne(
  //         {"_id": ObjectID(req.params.id)}, 
  //         { $set: {"points": req.body.points} }, 
  //         function(err, doc) {
  //           if (err) {
  //             // if error occurs in actually updating the data in the database
  //             console.log("Error in updating database information");
  //           } else {
  //             // everything works! (hopefully)
  //             res.send("Updated successfully");
  //           }
  //         }
  //       );
  //     }
  //   });


  // listen for requests
  var listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
