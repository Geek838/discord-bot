const mongoClient = require('mongodb').MongoClient;
const config = require('../config/config');

function MongoDao () {
    if (arguments.callee._singletonInstance) {
        return arguments.callee._singletonInstance;
    }

    let me = this;
    mongoClient.connect(config.dbUrl, (err, database) => {
        if (err) {
            console.error(err);
            throw Error('connection filed')
        } else {
            me.db = database;
        }
    });
}

MongoDao.prototype.insertManga = function () {
    this.__insertDocument();
};

MongoDao.prototype.__insertDocument = function(collection, doc, callback) {
    this.db.collection(collection).insert(doc, callback);
};


module.exports = MongoDao;
