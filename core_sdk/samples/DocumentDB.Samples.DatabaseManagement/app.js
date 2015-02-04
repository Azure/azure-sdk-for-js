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
console.log('DATABASE MANAGEMENT');
console.log('===================');
console.log();


var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , databaseId = config.names.database
  
var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

//---------------------------------------------------------------------------------
// This demo performs a few steps
// 1. Attempt to find a database by Id, if found then just complete the sample
// 2. If the database was not found, try create it
// 3. Once the database was created, list all the databases on the account
// 4. Once we've finished listing all databases on the account, 
//    delete the db we created and finish
//---------------------------------------------------------------------------------

console.log('Looking for a database named \'' + databaseId + '\'...');

// 1.
findDatabaseById(databaseId, function (err, db) {
    if (db == null) {
        console.log('Creating database named \'' + databaseId + '\'...')
        // 2.
        createDatabase(databaseId, function (db) {
            if (db != null) {
                console.log('Database with id ' + db.id + ' created.');
                
                // 3.
                console.log('Listing all databases on this account...');
                listDatabases(function (dbs) {
                    for (var i = 0; i < dbs.length; i++) {
                        console.log(dbs[i].id);
                    }
                                     
                    // 4.
                    console.log('Deleting database named \'' + databaseId + '\'...');
                    deleteDatabase(databaseId, function () {
                        finish();
                    });
                });
            }
        }); 
    } else {
        console.log('Nothing more to do here, A database with id ' + db.id + ' was already found.');
        finish();
    }
});


function listDatabases(callback) {
    var queryIterator = client.readDatabases().toArray(function (err, dbs) {
        if (err) {
            handleError(err);
        }

        callback(dbs);
    });
}

function createDatabase(databaseId, callback) {
    var dbdef = {id : databaseId};

    client.createDatabase(dbdef, function (err, createdDatabase) {
        if (err) {
            handleError (err);
        }

        callback(createdDatabase);
    });
}

function deleteDatabase(databaseId, callback) {
    findDatabaseById(databaseId, function (err, db) {
        if (err) {
            handleError (err);
        }
        
        if (db != null) {
            client.deleteDatabase(db._self, function (err) {
                if (err) {
                    handleError(err);
                } else {
                    callback();
                }
            });
        }
    });
}

function findDatabaseById(databaseId, callback) {
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
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            // so, explictly return null
            callback(null, null);
        } else {
            // we found a database, so return it
            callback(null, results[0]);
        }
    });
};

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