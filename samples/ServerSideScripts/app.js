console.log();
console.log('Azure DocumentDB Node.js Samples');
console.log('================================');
console.log();
console.log('SERVER SIDE SCRIPTS');
console.log('===================');
console.log();

/*jshint node:true */
"use strict";

var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../Shared/config')
  , utils = require('../Shared/utils')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , dbLink
  , collLink;

var host = config.connection.endpoint
  , masterKey = config.connection.authKey;
  
// Cache Database and Collection self-links.
var databaseLink, collectionLink, sprocLink;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

// Path to stored procedure definition
var sprocDefinition = require('./JS/upsert');

// Execute the stored procedure with the following parameters.
var sprocParams = [{
  id: "myDocument",
  foo: "bar"
}];

// Get or Create the Database
utils.getOrCreateDatabase(client, databaseId, function(db) {
    databaseLink = "dbs/" + databaseId;

    // Get or Create the Collection
    utils.getOrCreateCollection(client, databaseLink, collectionId, function(coll) {
        collectionLink = databaseLink + "/colls/" + collectionId;

        console.log("Upserting the sproc: '" + sprocDefinition.id + "'");
        upsertSproc(collectionLink, sprocDefinition, function(err, sproc) {
            if (err) throw err;
            
            var sprocLink = collectionLink + "/sprocs/" + sproc.id;

            console.log("Executing the sproc: '" + sproc.id + "'");
            console.log('Sproc parameters: ' + JSON.stringify(sprocParams));
            executeSproc(sprocLink, sprocParams);
        });
    });
});

function upsertSproc(collectionLink, sprocDefinition, callback) {
    var query = {
        query: 'SELECT * FROM sprocs s WHERE s.id = @id',
        parameters: [{
            name: '@id',
            value: sprocDefinition.id
        }]
    };

    // Query for the stored procedure.
    client.queryStoredProcedures(collectionLink, query, null).toArray(function(err, results) {
        if (err) throw err;

        if (results.length > 0) {
            // Delete it if it exists and re-create it.
            client.deleteStoredProcedure(results[0]._self, null, function(err) {
                client.createStoredProcedure(collectionLink, sprocDefinition, null, function(err, sproc) {
                    callback(null, sproc);
                });
            });
        } else {
            // Otherwise just create the sproc.
            client.createStoredProcedure(collectionLink, sprocDefinition, null, function(err, sproc) {
                callback(null, sproc);
            });
        }
    });
}

function executeSproc(sprocLink, sprocParams) {
    client.executeStoredProcedure(sprocLink, sprocParams, function(err, results, responseHeaders) {
        console.log('//////////////////////////////////');
        if (err) {
            console.log('// err');
            console.log(err);
        }
        if (responseHeaders) {
            console.log('// responseHeaders');
            console.log(responseHeaders);
        }
        if (results) {
            console.log('// results');
            console.log(results);
        }
        console.log('//////////////////////////////////');
    });
}