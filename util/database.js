const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback =>{
   // mongodb+srv://JimTang:love0621@cluster0.hy1kl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    MongoClient.connect('mongodb+srv://JimTang:love0621@cluster0.hy1kl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client =>{
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err =>{
        console.log(err);
        throw err;
    }); 
};

const getDb =() =>{
    if(_db){
        return _db;
    }
    throw 'No dataase fount!';
};



module.mongoConnect = mongoConnect;
module.getDb = getDb;