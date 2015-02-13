var DocumentDBClient = require('documentdb').DocumentClient;
var utils = require('./utils.js');

module.exports = Task;

function Task(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;
    
    this.database = null;
    this.collection = null;
}

Task.prototype = {
    init: function (callback) {
        var self = this;
        
        utils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
                callback(err);
            }
            
            self.database = db;
            utils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                if (err) {
                    callback(err);
                }
                
                self.collection = coll;
                callback(null);
            })
        });
    },
    
    find: function (querySpec, callback) {
        var self = this;
        
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
    
    updateItem: function (itemId, callback) {
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
    
    getItem: function (itemId, callback) {
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
            } 
            
            else {
                callback(null, results[0]);
            }
        });
    }
}