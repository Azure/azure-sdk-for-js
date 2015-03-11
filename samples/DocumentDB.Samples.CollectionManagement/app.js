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
console.log('COLLECTION MANAGEMENT');
console.log('=====================');
console.log();

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , databaseId = config.names.database
  , collectionId = config.names.collection

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

//---------------------------------------------------------------------------------
// This demo performs a few steps
// 1. Read or Create a Database (we always need a database to work with)
// 2. Create a collection in this database
// 3. List Collections on a database
// 4. Delete Collection and the database we created
// 5. finish()
//---------------------------------------------------------------------------------

// 1.
console.log('Looking for a database named \'' + databaseId + '\'...');
getOrCreateDatabase(databaseId, function (db) {
    // 2.
    console.log('Creating a collection called \'' + collectionId + '\'...');
    createCollection(db._self, collectionId, function (col) {        
        // 3.
        console.log('Listing all collections on this database...');
        listCollections(db._self, function (cols) {
            for (var i = 0; i < cols.length; i++) {
                console.log(cols[i].id);
            };

            // 4.
            console.log('Cleaning up...');
            deleteCollection(col, function () {
                deleteDatabase(db, function () {
                    // 5.
                    finish();
                });
            });                       
        });
    });
});

function listCollections(databaseLink, callback) {
    var queryIterator = client.readCollections(databaseLink).toArray(function (err, cols) {
        if (err) {
            handleError(err);
        }
        
        console.log(cols.length + ' Collections found');
        callback(cols);
    });
}

function createCollection(databaseLink, collectionId, callback) {
    //we're creating a Collection here using the default indexingPolicy, 
    //for more information on using other indexingPolicies please consult the IndexManagement sample
    var collectionDef = { id: collectionId };
    
    client.createCollection(databaseLink, collectionDef, function (err, created) {
        if (err) {
            handleError(err);
        }
        
        console.log('Collection \'' + collectionId + '\'created');
        callback(created);
    });
}

function getOrCreateDatabase(databaseId, callback){
    var querySpec = {
        query: 'SELECT * FROM root r WHERE  r.id = @id',
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