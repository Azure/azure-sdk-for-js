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
var dbLink;

//---------------------------------------------------------------------------------
// This demo performs a few steps
// 1. createCollection  - given an id, create a new Collectionwith thedefault indexingPolicy
// 2. listCollections   - example of using the QueryIterator to get a list of Collections in a Database
// 3. readCollection    - Read a collection by its _self
// 4. readCollection    - Read a collection by its id (using new ID Based Routing)
// 5. getOfferType      - get the Offer.OfferType for a collection. This is what determines if aCollection is S1, S2, or S3 
// 6. changeOfferType   - change the Offer.OfferType for a collection. This is how you scale a Collection up or down
// 7. deleteCollection  - given just the collection id, delete the collection
//---------------------------------------------------------------------------------

// ensuring a database exists for us to work with
getOrCreateDatabase(databaseId, function (db) {
    
    //NOTE: when using the new ID Based Routing URIs, instead of the _self, as we're doing in this sample
    //      ensure that the URI does not end with a trailing '/' character
    dbLink = 'dbs/' + databaseId;
    
    //1.
    console.log('1. createCollection ith id \'' + collectionId + '\'');
    createCollection(dbLink, collectionId, function (col) {
        
        //2.
        console.log('\n2. listCollections in database');
        listCollections(dbLink, function (cols) {
            for (var i = 0; i < cols.length; i++) {
                console.log(cols[i].id);
            }
            
            //3.
            console.log('\n3. readCollection by its _self');
            readCollection(col._self, function (result) {
                if (result) {
                    console.log('Collection with _self \'' + result._self + '\' was found its id is \'' + result.id);
                }
                
                //4.
                console.log('\n4. readCollection by its id');
                readCollectionById(collectionId, function (result) {
                    if (result) {
                        console.log('Collection with id of \'' + collectionId + '\' was found its _self is \'' + result._self + '\'');
                    }
                    
                    //5.
                    console.log('\n5. getOfferType by its id');
                    getOfferType(col, function (offer) {
                        if (offer) {
                            console.log('Collection with id of \'' + collectionId + '\' has an Offer Type of \'' + offer.offerType + '\'');                            
                        }
                        
                        //6.
                        console.log('\n6. changeOfferType to an S2');
                        offer.offerType = 'S2';
                        changeOfferType(offer.id, offer, function (offer) {
                            if (offer) {
                                console.log('Collection now has offerType of \'' + offer.offerType + '\'');
                            }
                                
                            //7.
                            console.log('\n7. deleteCollection \'' + collectionId + '\'');
                            deleteCollection(collectionId, function () {
                                    
                                //cleanup & end
                                console.log('\nCleaning up ...');
                                finish();
                            });
                        });
                    });
                });
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
    
    var collSpec = { id: collectionId };
    var options = { offerType: "S1" };

    client.createCollection(databaseLink, collSpec, options, function (err, created) {
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

function readCollection(selfLink, callback) {
    client.readCollection(selfLink, function (err, coll) {
        if (err) {
            handleError(err);
        
        } else {            
            callback(coll);
        }
    });
}

function readCollectionById(collectionId, callback) {
    //when using the new ID Based Routing URIs, the URI must NOT have a trailing / character
    //i.e. instead of dbs/databaseId/colls/collectionId/ (which is the format of a db._self) the URI must be dbs/databaseId/colls/collectionId

    var collLink = dbLink + '/colls/' + collectionId;
    client.readCollection(collLink, function (err, coll) {
        if (err) {
            handleError(err);
        
        } else {
            callback(coll);
        }
    });
}

function getOfferType(collection, callback) {
    //Collections and OfferTypes are loosely coupled.
    //Offer.resource == collection._self And Offer.offerResourceId == collection._rid    
    //Therefore, to find the OfferType for a Collection, query for Offers by resourceLink matching collectionSelfLink

    var querySpec = {
        query: 'SELECT * FROM root r WHERE  r.resource = @link',
        parameters: [
            {
                name: '@link',
                value: collection._self
            }
        ]
    };
    
    client.queryOffers(querySpec).toArray(function (err, offers) {
        if (err) {
            handleError(err);
                 
        } else if (offers.length === 0) {
            console.log('No offer found for collection');
            
        } else {
            console.log('Offer found for collection');
            var offer = offers[0];
            callback(offer);
        }
    });
}

function changeOfferType(offerId, updatedOffer, callback) {
    var offerLink = 'offers/' + offerId;    
    
    client.replaceOffer(offerLink, updatedOffer, function (err, replacedOffer) {
        if (err) {
            handleError(err);

        } else if (replacedOffer.offerType != updatedOffer.offerType) {
            throw 'OfferType was not updated';

        } else {
            callback(replacedOffer);
        }
    })
}

function deleteCollection(collectionId, callback) {
    var collLink = dbLink + '/colls/' + collectionId;

    client.deleteCollection(collLink, function (err) {
        if (err) {
            handleError(err);
        } else {
            console.log('Collection \'' + collectionId + '\'deleted');
            callback();
        }
    });
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
            var databaseDef = { id: databaseId };
            
            client.createDatabase(databaseDef, function (err, created) {
                if (err) {
                    handleError(err);
                }

                callback(created);
            });
        
        //database found, return it
        } else {
            callback(results[0]);
        }
    });
}

function deleteDatabase(dbLink) {
    client.deleteDatabase(dbLink, function (err) {
        if (err) {
            handleError(err);
        }
    });
}

function handleError(error) {
    console.log('\nAn error with code \'' + error.code + '\' has occurred:');
    console.log('\t' + JSON.parse(error.body).message);
    
    finish();
}

function finish() {
    deleteDatabase(dbLink);
    console.log('\nEnd of demo.');
}