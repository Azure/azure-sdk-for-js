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
// 3. Using the collection selfLink, query for the Offer object and verify the OfferType
// 4. Scale the collection up by changing the Offer it is linked to
// 5. List Collections on a database
// 6. Delete Collection and the database we created
// 7. finish()
//---------------------------------------------------------------------------------

// 1.
console.log('Looking for a database named \'' + databaseId + '\'...');
getOrCreateDatabase(databaseId, function (db) {

    // 2.
    console.log('Creating a collection called \'' + collectionId + '\'...');
    createCollection(db._self, collectionId, function (col) {

        // 3.
        console.log('Verifying offertype...');
        getOfferType(col._self, function (offer) {
            console.log('Offer type of collection ' + col.id + ' is ' + offer.offerType);
            
            // 4.
            console.log('Changing OfferType of collection...');
            changeOfferType(col._self, 'S2', function () {
                console.log('OfferType changed');

                // 5.
                console.log('Listing all collections on this database...');
                listCollections(db._self, function (cols) {
                    for (var i = 0; i < cols.length; i++) {
                        console.log(cols[i].id);
                    };
                    
                    // 6.
                    console.log('Cleaning up...');
                    deleteCollection(col, function () {
                        deleteDatabase(db, function () {
                            
                            // 7.
                            finish();
                        });
                    });

                });
            });
        });
    });
});

//Collections and OfferTypes are loosely coupled.
//An Offer's resource -- Collection's _self property
//And an Offer's offerResourceId -- Collection's _rid property
//To find the OfferType for a Collection, query for Offers by resourceLink matching collectionLink
function getOfferType(collectionLink, callback) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE  r.resource = @link',
        parameters: [
            {
                name: '@link',
                value: collectionLink
            }
        ]
    };
    
    client.queryOffers(querySpec).toArray(function (err, offers) {
        if (err) handleError(err);

        var offer = offers[0];
        callback(offer);
    });
}

function changeOfferType(collectionLink, newOfferType, callback) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE  r.resource = @link',
        parameters: [
            {
                name: '@link',
                value: collectionLink
            }
        ]
    };
    
    client.queryOffers(querySpec).toArray(function (err, offers) {
        if (err) handleError(err);
        
        var offer = offers[0];
        offer.offerType = newOfferType;
        
        client.replaceOffer(offer._self, offer, function (err, replacedOffer) {
            if (err) {
                handleError(err);
            } else if (replacedOffer.offerType != newOfferType) {
                throw 'OfferType was not updated';
            } else {
                callback(replacedOffer);
            }
        })     
    })
}

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
     
    //we're also setting the OfferType for this new collection to be an "S1"
    //"S1" is the default, so if a OfferType value is not supplied in the 4th parameter then OfferTyoe of "S1" will apply
    //for more information on OfferTypes please consult the DocumentDB Documentation on 
    //http://azure.microsoft.com/en-us/documentation/services/documentdb/

    client.createCollection(databaseLink, { id: collectionId }, { offerType: "S1" }, function (err, created) {
        if (err) handleError(err);
        
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