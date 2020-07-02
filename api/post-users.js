const url = require("url");
const MongoClient = require("mongodb").MongoClient;

let cacheDB = null;

async function connectToDatabase(uri) {
    if(cacheDB) {
        return cacheDB;
    }
    
    const client = await MongoClient.connect(uri);
    const db = await client.db(url.parse(uri).pathname.substr(1));
    
    cacheDB = db;
    return db;
}

module.exports = (req, res) => {
    var myDB = await connectDatabase(process.env.MONGODB_URI);
    var myCollection = await myDB.collection("Users");
    myCollection.insertOne(req.body, (err, result) => {
        if(err) return console.log(err);
        res.json(result);
    })
}