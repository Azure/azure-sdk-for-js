/*jshint node:true */
"use strict";

var DocumentDBClient = require('documentdb').DocumentClient;
var DocumentDBUtils = require('../utils');
var config = require('../config');

// Cache Database and Collection self-links.
var databaseLink, collectionLink, sprocLink;

// Initialize DocumentDB Client.
var docDbClient = new DocumentDBClient(config.connection.endpoint, {
  masterKey: config.connection.authKey
});

// Path to stored procedure definition
var sprocDefinition = require('./JS/upsert');

// Execute the stored procedure with the following parameters.
var sprocParams = [{
  id: "myDocument",
  foo: "bar"
}];

// Get or Create the Database
DocumentDBUtils.getOrCreateDatabase(docDbClient, config.names.database, function(db) {
  databaseLink = db._self;

  // Get or Create the Collection
  DocumentDBUtils.getOrCreateCollection(docDbClient, databaseLink, config.names.collection, function(coll) {
    collectionLink = coll._self;

    console.log("Upserting the sproc: '" + sprocDefinition.id + "'");
    upsertSproc(docDbClient, collectionLink, sprocDefinition, function(err, sproc) {
      if (err) throw err;

      console.log("Executing the sproc: '" + sproc.id + "'");
      console.log('Sproc parameters: ' + JSON.stringify(sprocParams));
      executeSproc(docDbClient, sproc._self, sprocParams);
    });
  });
});

function upsertSproc(client, collectionLink, sprocDefinition, callback) {
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

function executeSproc(client, sprocLink, sprocParams) {
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