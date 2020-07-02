const url = require('url');
const MongoClient = require('mongodb').MongoClient;

let cacheDB = null;

async function connectDatabase(uri) {
    
    if(cacheDB) {
        return cacheDB;
    }
    
    var client = await MongoClient.connect(uri);
    var db = await client.db(url.parse(uri).pathname.substr(1));
    
    cacheDB = db;
    return db;
}

module.exports = async (req, res) => {
    var myDb = await connectDatabase(process.env.MONGODB_URI);
    var myCollection = await myDb.collection("Users");
    
    var users = await myCollection.find({username: req.body.user }).toArray();
    res.status(200).json({ users });
}

