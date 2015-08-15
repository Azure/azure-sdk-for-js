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
// 1. Create a collection in the database
// 2  List all collections on a database
// 2. Read a specific collection using its Id
// 3. Get the OfferType for a collection
// 4. Scale the collection up by changing the Offer.OfferType it is linked to
// 5. Delete collection and the database we created
// 6. finish()
//---------------------------------------------------------------------------------

// ensuring a database exists for us to work with
console.log('Looking for a database with id of \'' + databaseId + '\'...');
getOrCreateDatabase(databaseId, function (db) {
    
    //NOTE: when using the new ID Based Routing URIs, instead of the _self, as we're doing in this sample
    //      ensure that the URI does not end with a trailing '/' character
    var dbLink = 'dbs/' + databaseId
    
    // 1.
    console.log();
    console.log('Creating a collection with id \'' + collectionId + '\'...');
    createCollection(dbLink, collectionId, function (col) {
        
        // 2 .
        console.log();
        console.log('Listing all collections on this database...');
        listCollections(dbLink, function (cols) {
            for (var i = 0; i < cols.length; i++) {
                console.log(cols[i].id);
            }
            
            // 6.
            console.log('\n');
            console.log('Cleaning up ...');
            deleteDatabase(dbLink, function () {
                finish();
            });            
        });
    });
});

function createCollection(databaseLink, collectionId, callback) {
    //we're creating a Collection here using the default indexingPolicy, 
    //for more information on using other indexingPolicies please consult the IndexManagement sample
    
    //we're also setting the OfferType for this new collection to be an "S1"
    //"S1" is the default, so if a OfferType value is not supplied in the 4th parameter then OfferTyoe of "S1" will apply
    //for more information on OfferTypes please consult the DocumentDB Documentation on 
    //http://azure.microsoft.com/en-us/documentation/services/documentdb/
    
    client.createCollection(databaseLink, { id: collectionId }, { offerType: "S1" }, function (err, created) {
        if (err) {
            handleError(err);

        } else {
            console.log('Collection \'' + collectionId + '\'created');
            callback(created);
        }
    });
}

function listCollections(databaseLink, callback) {
    var queryIterator = client.readCollections(databaseLink).toArray(function (err, cols) {
        if (err) {
            handleError(err);
        
        } else {            
            console.log(cols.length + ' Collections found');
            callback(cols);
        }
    });
}

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

function getOrCreateDatabase(databaseId, callback){
    //we're using queryDatabases here and not readDatabase
    //readDatabase will throw an exception if resource is not found
    //queryDatabases will not, it will return empty resultset. 

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

        //database not found, create it
        } else if (results.length === 0) {
            console.log('Database \'' + databaseId + '\'not found');
            var databaseDef = { id: databaseId };
            
            client.createDatabase(databaseDef, function (err, created) {
                if (err) {
                    handleError(err);
                }
                
                console.log('Database \'' + databaseId + '\'created');
                callback(created);
            });
        
        //database found, return it
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

function deleteDatabase(dbLink, callback) {
    client.deleteDatabase(dbLink, function (err) {
        if (err) {
            handleError(err);
        } else {
            console.log('Database \'' + database.id + '\'deleted');
            callback();
        }
    });
}

function deleteDatabase(databaseId, callback) {
    findDatabaseById(databaseId, function (err, db) {
        if (err) {
            handleError(err);
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