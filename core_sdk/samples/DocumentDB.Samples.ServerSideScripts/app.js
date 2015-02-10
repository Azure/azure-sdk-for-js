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
  , utils = require('../utils')
  , config = require('../config')
  , fs = require('fs')
  , databaseId = config.names.database
  , collectionId = config.names.collection

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

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

var functionCount = 2;
var completedFunctions = 0;


// 1.
console.log('Looking for a database named \'' + databaseId + '\'...');

utils.getOrCreateDatabase(client, databaseId, function (db) {
    console.log('Found database \'' + db._self + '\'...');
    
    console.log('Looking for a collection named \'' + collectionId + '\'...');
    utils.getOrCreateCollection(client, db._self, collectionId, function (coll) {
        console.log('Found collection \'' + coll._self + '\'...');

        runSimpleScript(coll._self, function () { complete(db._self) });
        runAnother(coll._self, function () { complete(db._self) });
        samples.runBulkImport();
    });
});

function complete(databaseLink) {
    completedFunctions++;
    if (functionCount == completedFunctions) {
            utils.deleteDatabase(client, databaseLink, finish)
    }
}

function runSimpleScript(collectionLink, callback) {
    console.log('Simple Script');
    callback();
}

function runAnother(collectionLink, callback) {
    console.log('Another Script');
    callback();
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
