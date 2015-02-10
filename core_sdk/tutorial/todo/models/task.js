var DocumentDBClient = require('documentdb').DocumentClient;
var utils = require('./utils.js');

module.exports = Task;

function Task(documentDBClient, databaseId, collectionId){   
    this.client = documentDBClient;
    this.database = null;
    this.collection = null;

    var self = this;
    utils.getOrCreateDatabase(self.client, databaseId, function (err, db) {
        if (err) {
            throw (err);
        }
        
        self.database = db;
        utils.getOrCreateCollection(self.client, self.database._self, collectionId, function (err, coll) {
            if (err) {
                throw (err);
            }
            
            self.collection = coll;            
        })
    });    
}

Task.prototype = {
    find: function (querySpec, callback) {
        var self = this;
        
        
        //problem, sometimes self.collection == null when we get here!!
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results);
            }
        });
    },
    
    addItem: function (item, callback) {
        var self = this;
        item.date = Date.now();
        item.completed = false;
        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);
            } else {                
                callback(null);
            }
        });
    },

    updateItem: function (itemId, callback){
        var self = this;

        self.getItem(itemId, function (err, doc) {
            if (err) {
                callback(err);
            } else {
                doc.completed = true;
                self.client.replaceDocument(doc._self, doc, function (err, replaced) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
            }
        });
    },

    getItem: function (itemId, callback){
        var self = this;
        
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [
                {
                    name: '@id',
                    value: itemId
                }
            ]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {                
                callback(null, results[0]);
            }
        });
    }
}