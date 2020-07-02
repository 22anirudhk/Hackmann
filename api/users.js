const url = require('url');
const MongoClient = require('mongodb').MongoClient;

let cacheDB = null;

async function connectDatabase(uri) {
    
    if(cacheDB) {
        return cacheDB;
    }
    
    var client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    var db = await client.db(url.parse(uri).pathname.substr(1));
    
    cacheDB = db;
    return db;
}

module.exports = async (req, res) => {
    var myDb = await connectDatabase(process.env.MONGODB_URI);
    var myCollection = await myDb.collection("Users");
    var tasks = await myCollection.find({username: req.body.username, password: req.body.password }).toArray();
    
    
    if(tasks.length == 0) {
        console.log("No users found with username " + req.body.username + ".");
        res.status(403).send("invalid");
    }
    else {
        console.log("Found user: " + JSON.stringify(tasks[0]));       
        var name = tasks[0].name;
        var location = tasks[0].location;
        res.status(200).send({username: req.body.username, name: name, location: location});
    }
}
