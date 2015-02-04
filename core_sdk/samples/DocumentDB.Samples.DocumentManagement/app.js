//--------------------------------------------------------------------------------- 
// Microsoft (R)  Azure SDK 
// Software Development Kit 
//  
// Copyright (c) Microsoft Corporation. All rights reserved.   
// 
// THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,  
// EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES  
// OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.  
//---------------------------------------------------------------------------------

console.log();
console.log('Azure DocumentDB Node.js Samples');
console.log('================================');
console.log();
console.log('DOCUMENTATION MANAGEMENT');
console.log('========================');
console.log();

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , fs = require('fs')
  , databaseId = config.names.database
  , collectionId = config.names.collection

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

var documentDefinitions = function () {
    var data = fs.readFileSync('./Data/Families.json');   
    return JSON.parse(data).Families;
};

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient( host, { masterKey: masterKey });

// Load our sample data
sampleDocuments = documentDefinitions();

//-----------------------------------------------------------------------------------------
// This demo performs a few steps
// 1. Read or Create a Database & Collection (we always need these to work with Documents)
// 2. Insert some documents
// 3. Query for a single document on some property
// 4. Update a document
// 5. Find a document by id, 
// 6. then Delete that document
// 7. Delete Collection and the database we created
// 8. finish()
//------------------------------------------------------------------------------------------

// 1.
console.log('Looking for a database named \'' + databaseId + '\'...');
getOrCreateDatabase(databaseId, function (db) {

    console.log('Creating a collection called \'' + collectionId + '\'...');
    getOrCreateCollection(db._self, collectionId, function (col) {

        // 2.
        insertDocuments(col._self, function (docs) {
            
            // 3.
            var querySpec = {
                query: 'SELECT * FROM Families f WHERE  f.lastName = @lastName',
                parameters: [
                    {
                        name: '@lastName',
                        value: 'Anderson'
                    }
                ]
            };
            client.queryDocuments(col._self, querySpec).toArray(function (err, results) {
                if (err) {
                    handleError(err);
                }
                
                //4.
                //add a new child to this family, and change their lastName
                var childDef = {
                    "firstName": "Newborn",
                    "gender": "female"
                };
                
                var doc = results[0];
                doc.children.push(childDef);
                doc.lastName = "Updated";
                
                //now replace the document on the server with the updated document
                console.log('Updating document with id \'' + doc.id + '\'...');
                client.replaceDocument(doc._self, doc, function (err, updated) {
                    if (err) {
                        handleError(err);
                    }
                    
                    console.log('Document with id \'' + doc.id + '\' updated. Now has ' + updated.children.length + '\ children.');
                    
                    // 5.
                    //fetch document by id
                    console.log('Get DocumentById \'WakefieldFamily\'');
                    getDocumentById(col._self, 'WakefieldFamily', function (doc) {
                        
                        console.log('Got document by id \'' + doc.id + '\' It\'s SelfLink is: ' + doc._self);
                        // 6.
                        client.deleteDocument(doc._self, function (err, result) {
                            if (err) {
                                handleError(err);
                            }

                            // 7.
                            deleteCollection(col, function () {
                                deleteDatabase(db, function () {
                                    
                                    // 8.
                                    finish();
                                });
                            });
                        });
                    });
  
                });
            });
        });
    });
});

function getDocumentById(collectionLink, id, callback) {
    var querySpec = {
        query: 'SELECT * FROM Families f WHERE  f.id = @id',
        parameters: [
            {
                name: '@id',
                value: id
            }
        ]
    };
    client.queryDocuments(collectionLink, querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);
        }

        if (results.length === 0) {
            throw ("No document found with id matching '" + id + "'");
        } else if (results.length > 1) {
            throw ("More than one document found matching id '" + id + "'");
        }else{
            callback(results[0]);
        }
    });
}

function insertDocuments(collectionLink, callback) {
    var createdList = [];
    var counter = 0;
    for (var i = 0; i < sampleDocuments.length; i++){
        var docDef = sampleDocuments[i];
        
        client.createDocument(collectionLink, docDef, function (err, created) {
            if (err) {
                handleError(err);
            }
            
            counter++;
            
            createdList.push(created);
            console.log('Document with id \'' + created.id + '\' created.');
            if (counter === sampleDocuments.length - 1) {
                callback(createdList);
            }
        });
    }
}

function getOrCreateDatabase(databaseId, callback) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [
            {
                name: '@id',
                value: databaseId
            }
        ]
    };
    client.queryDatabases(querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);
        }
        
        if (results.length === 0) {
            console.log('Database \'' + databaseId + '\'not found');
            var databaseDef = { id: databaseId };
            
            client.createDatabase(databaseDef, function (err, created) {
                if (err) {
                    handleError(err);
                }
                
                console.log('Database \'' + databaseId + '\'created');
                callback(created);
            });
        } else {
            console.log('Database \'' + databaseId + '\'found');
            callback(results[0]);
        }
    });
}

function getOrCreateCollection(databaseLink, collectionId, callback) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [
            {
                name: '@id',
                value: collectionId
            }
        ]
    };
    client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);
        }
        
        if (results.length === 0) {
            console.log('Collection \'' + collectionId + '\'not found');
            var collectionDef = { id: collectionId };
            
            client.createCollection(databaseLink, collectionDef, function (err, created) {
                if (err) {
                    handleError(err);
                }
                
                console.log('Collection \'' + collectionId + '\'created');
                callback(created);
            });
        } else {
            console.log('Collection \'' + collectionId + '\'found');
            callback(results[0]);
        }
    });
}

function deleteCollection(collection, callback) {
    client.deleteCollection(collection._self, function (err) {
        if (err) {
            handleError(err);
        } else {
            console.log('Collection \'' + collection.id + '\'deleted');
            callback();
        }
    });
}

function deleteDatabase(database, callback) {
    client.deleteDatabase(database._self, function (err) {
        if (err) {
            handleError(err);
        } else {
            console.log('Database \'' + database.id + '\'deleted');
            callback();
        }
    });
}

function handleError(error) {
    console.log();
    console.log('An error with code \'' + error.code + '\' has occurred:');
    console.log('\t' + JSON.parse(error.body).message);
    console.log();
    
    finish();
}

function finish() {
    console.log();
    console.log('End of demo.');
}