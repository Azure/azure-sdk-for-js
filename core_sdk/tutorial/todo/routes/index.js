// import the modules we will use
var DocumentDBClient = require('documentdb').DocumentClient;
var nconf = require('nconf');

// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });

// create some global variables which we will use later to hold instances of the DocumentDBClient, Database and Collection
var host = nconf.get("HOST");
var authKey = nconf.get("AUTH_KEY");
var databaseId = nconf.get("DATABASE");
var collectionId = nconf.get("COLLECTION");
// create an instance of the DocumentDB client
var client = new DocumentDBClient(host, { masterKey: authKey });

exports.index = function (req, res) {
    // before we can query for Items in the document store, we need to ensure we 
    // have a database with a collection then use the collection to read the documents
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {
            listItems(collection, function (items) {
                res.render('index', { title: 'My ToDo List', tasks: items });
            });
        });
    });
};

exports.createOrUpdateItem = function (req, res) {
    //first have to set the database & collection context so that we have the self links   
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {
            
            //if we find an item on the form, we'll create it in the database
            var item = req.body.item;
            if (item) {
                createItem(collection, item, function () {
                    res.redirect('/');
                });

            //else let's look for items marked as completed, 
            //and update that item in the database
            } else {
                var completed = req.body.completed;
                
                //check if completed is actually an Array, if not make it one. 
                //this happens when you select only one item            
                if (!completed.forEach)
                    completed = [completed];
                
                //use a recursive function to loop through items in 
                //array calling updateItem each time through                                    
                function updater(i) {
                    if (i < completed.length) {
                        updateItem(collection, completed[i], function () {
                            updater(i + 1);
                        });
                    } else {
                        res.redirect('/');
                    }
                }
                
                //kick off the recursion
                updater(0);
            }
        });
    });
}

// update item
var updateItem = function (collection, itemId, callback) {
    //first fetch the document based on the id
    getItem(collection, itemId, function (doc) {
        //now replace the document with the updated one
        doc.completed = true;
        client.replaceDocument(doc._self, doc, function (err, replacedDoc) {
            if (err) {
                throw (err);
            }
            
            callback();
        });
    });
}

// get item
var getItem = function (collection, itemId, callback) {
    client.queryDocuments(collection._self, 'SELECT * FROM root r WHERE r.id="' + itemId + '"').toArray(function (err, results) {
        if (err) {
            throw (err);
        }
        
        callback(results[0]);
    });
}

// create new item
var createItem = function (collection, documentDefinition, callback) {
    documentDefinition.completed = false;
    client.createDocument(collection._self, documentDefinition, function (err, doc) {
        if (err) {
            throw (err);
        }
        
        callback();
    });
}

// query the provided collection for all non-complete items
var listItems = function (collection, callback) {
    client.queryDocuments(collection._self, 'SELECT * FROM root r WHERE r.completed=false').toArray(function (err, docs) {
        if (err) {
            throw (err);
        }
        
        callback(docs);
    });
}

// if the database does not exist, then create it, else return the database object
var readOrCreateDatabase = function (callback) {
    client.queryDatabases('SELECT * FROM root r WHERE r.id="' + databaseId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            client.createDatabase({ id: databaseId }, function (err, createdDatabase) {
                callback(createdDatabase);
            });
        } else {
            // we found a database
            callback(results[0]);
        }
    });
};

// if the collection does not exist for the database provided, create it, else return the collection object
var readOrCreateCollection = function (database, callback) {
    client.queryCollections(database._self, 'SELECT * FROM root r WHERE r.id="' + collectionId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            //indicating no collection exists in the provided database matching the query
            client.createCollection(database._self, { id: collectionId }, function (err, createdCollection) {
                callback(createdCollection);
            });
        } else {
            // we found a collection
            callback(results[0]);
        }
    });
};