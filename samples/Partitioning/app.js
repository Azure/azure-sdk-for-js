console.log();
console.log('Azure DocumentDB Node.js Samples');
console.log('================================');
console.log();
console.log('PARTITIONING');
console.log('============');
console.log();

var DocumentDBClient = require('documentdb').DocumentClient
  , HashPartitionResolver = require('documentdb').HashPartitionResolver
  , RangePartitionResolver = require('documentdb').RangePartitionResolver
  , fs = require('fs')
  , async = require('async')
  , config = require('../Shared/config')
  , utils = require('../Shared/utils')
  , databaseId = config.names.database
  , collectionId = config.names.collection
  , databaseLink;

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

var documentDefinitions = function () {
    var data = fs.readFileSync('../Shared/Data/Families.json');
    return JSON.parse(data).Families;
};

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

//*****************************************************************************************************
//IMPORTANT: 
// this sample creates and delete collections multiple times! 
// each time a collection is created, your account will be charged for 1hr (our smallest billing unit)
// even if that collection is only alive for a few seconds.
//
// please take note of this before running this sample
//*****************************************************************************************************

//-------------------------------------------------------------------------------------------------------------
// This demo performs a few steps
// 1. HashPartitionResolver     - distribute writes across two collections using partition key
// 2  RangePartitionResolver    - uses a range map object to control which partition is used
// 3. CustomResolver            - shows how to use custom functions instead of using the provided resolvers
//-------------------------------------------------------------------------------------------------------------

init(function (err) {
    if (!err) {
        console.log();
        console.log('1. HashPartitionResolver');
        console.log('========================');
        useHashPartitionResolver(databaseLink, function (err) {
            
            console.log();
            console.log('2. RangePartitionResolver');
            console.log('=========================');
            useRangePartitionResolver(databaseLink, function (err) {
                
                console.log();
                console.log('3. CustomPartitionResolver');
                console.log('========================');
                useCustomPartitionResolver(databaseLink, function (err) {
                    finish();
                });
            });
        });
          
    } else {
        handleError(err);
    }
});

function useHashPartitionResolver(databaseLink, callback) {        
    //create two collections to partition data across
    var collectionIds = ["HashBucket0", "HashBucket1"];
    createCollections(collectionIds, function (colls) {
        var coll1Link = databaseLink + '/colls/' + colls[0];
        var coll2Link = databaseLink + '/colls/' + colls[1];
        
        //register these two collections with a HashPartitionResolver
        //the first paramter is the partitionkey resolver
        //  - the partitionkey resolver is a function that you provide that returns a string from your document. 
        //  - if the partitionkey is a root level property such as id, then you can just hardcode the partitionkey resolver to the string literal 'id'
        //the second parameter of a HashPartitionResolver is an array of collection links
        
        //for this example we are using the address.state property and therefore have a custom function to return this
        //if we wanted to partition by just zip code, which is a number, then function (doc) {return doc.address.zip.toString() } would be used to return a string
        var resolver = new HashPartitionResolver(function (doc) { return doc.address.state; }, [coll1Link, coll2Link]);
        
        //register this resolver on the instance of DocumentClient we're using
        //the key is something you can identify the resolver with. in most cases we just use the database link
        client.partitionResolvers[databaseLink] = resolver;
        
        //now let's create some documents
        insertDocuments(documentDefinitions(), function (docs) {
            
            //find me all families that have no children
            var querySpec = {
                query: 'SELECT * FROM c WHERE NOT IS_DEFINED(c.children)'
            }
            
            //there will be only 1 document (KinDocument) returned here, this is because only 1 family (the Kin family) in the WA partition has no children defined
            //we took the query supplied, and executed it against a single collection (or partition)
            client.queryDocuments(databaseLink, querySpec, { partitionKey: 'WA' }).toArray(function (err, results) {
                console.log("\nQuerying with partition key: WA produces " + results.length + " result(s)");
                console.log("Found " + results[0].id);
                
                //here we are doing the same query but this time we're not supplying the partitionkey
                //this will effectively do a fan-out query. we will hit the first collection, drain it of results
                //and then, in-turn, hit each collection defined in the resolver until we've touched them all.
                //the .toArray() method will do this implictly internally. 
                //if you would like to not have the driver implicitly walk each collection and you 
                //want to control this then use the executeNext method of the query iterator
                console.log('\nQuerying without a partition key');
                
                var iterator = client.queryDocuments(databaseLink, querySpec);
                executeNext(iterator, function () {
                    callback(null);
                });
            });
        });
    });
}

function useRangePartitionResolver(databaseLink, callback) {
    callback();
}

function useCustomPartitionResolver(databaseLink, callback) {
    //While DocumentDB comes with hash & range partition resolvers
    //there are cases where you want to implement your own custom logic to control partitioning
    //this function, shows you how to implement custom logic.
    
    //In this function we create 7 collections. One for each day of the week. 
    //Then, depending on the day of the week on the inserted document it is assigned to the matching collection
    
    //Create collections, one per day of the week in this case
    var collectionIds = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
    createCollections(collectionIds, function (colls, err) {
        
        //Define a custom object that provides implementations for getPartitionKey(), resolveForCreate() and resolveForRead()
        var resolver = {
            getPartitionKey: function (document) {
                var date = new Date(document.date);
                var dayOfWeek = date.getDay();
                return dayOfWeek;
            },
            resolveForCreate: function (partitionKey) {
                if (partitionKey >= 0 && partitionKey < collectionLinks.length) {
                    return this.collectionLinks[partitionKey];
                }
                
                throw new Error("Invalid partition key");
            },
            resolveForRead: function (partitionKey) {
                if ( partitionKey >= 0 && partitionKey < collectionLinks.length) {
                    return [this.collectionLinks[partitionKey]];
                }

                throw new Error("Invalid partition key");
            },
            setCollectionLinks: function (links) {
                this.collectionLinks = links;
            }
        };
        
        //We need to tell our custom resolver what collection links we're working with
        var collectionLinks = [];
        for (var i = 0; i <= collectionIds.length; i++) {
            collectionLinks.push(databaseLink + '/colls/' + collectionIds[i]);
        };
        
        resolver.setCollectionLinks(collectionLinks);

        //Now register this custom resolver object on the instance of DocumentClient you are using
        client.partitionResolvers[databaseLink] = resolver;
              
        //Now create some document definitions, one per day for the month of February, 2016
        var count = 1;
        var documents = [];
        
        do {            
            documents.push({ id: count.toString(), date: 'February ' + count + ', 2016' });
            count++;
        } while(count <= 29);
        
        insertDocuments(documents, function (docs, err) {
            //find me all families that have no children
            var querySpec = {
                query: 'SELECT * FROM root'
            }
            
            //there will be only 4 documents in collectionLink[0], because there were 4 Monday's in February, 2016
            client.queryDocuments(databaseLink, querySpec, { partitionKey: 0 }).toArray(function (err, results) {
                console.log("\nQuerying with partition key: 0 produces " + results.length + " result(s)");
                for (var i = 0; i < results.length; i++) {
                    console.log("Found " + results[i].id);
                };
                
                //here we are doing the same query but this time we're not supplying the partitionkey
                //this will throw an exception in our custom resolver, where the range & hash resolvers resulted in a fan-out query
                //this is our custom resolver, we can do anything we want in the resolveForRead() method of our resolver if partitionKey is undefined
                console.log('\nQuerying without a partition key');
                
                try {
                    client.queryDocuments(databaseLink, querySpec).toArray();
                } catch (err) {
                    console.log('As expected, ' + err.message + 'was thrown from resolver');
                }

                console.log('\nCustomPartitionResolver done');
                callback();
            })         
        })
    })
}

function executeNext(iterator, callback) {
    iterator.executeNext(function (err, results, responseHeaders) {
        async.each(
            results, 
            
            function i(result, cb) {
                console.log("Found " + result.id);
                cb();
            }
        );
        
        if (iterator.hasMoreResults()) {
            executeNext(iterator, callback)
        }
        else {
            callback(null);
        }
    });
}

function createCollections(collectionIds, callback){
    var createdList = [];
    
    console.log('\nCreating collections');
    
    async.each(
        collectionIds, 
        
        function iterator(collectionId, cb) {            
            client.createCollection(databaseLink, { id: collectionId }, function (err, created, headers) {
                if (err) {
                    if (err.code == 429) {
                        var wait = headers["x-ms-retry-after-ms"] || 1000;
                        
                        setTimeout(function () { iterator(collectionId, cb)}, wait);
                    } else {
                        console.log(err);
                    }
                } else {
                    console.log('created ' + collectionId);
                    createdList.push(collectionId);
                    cb();
                }
            });
        },

        function (err) {
            console.log('Creating done ' + createdList.length);
            callback(createdList);
        }
    );
}

function insertDocuments(documentDefinitions, callback) {
    var createdList = [];
    
    console.log('\nCreating documents');

    async.each(
        documentDefinitions, 
        
        function iterator(documentDefinition, cb) {
            client.createDocument(databaseLink, documentDefinition, function (err, document) {
                if (err) {
                    if (err.code == 429) {
                        var wait = headers["x-ms-retry-after-ms"] || 1000;
                                                
                        setTimeout(function () { iterator(collectionId, cb) }, wait);
                    } else {
                        console.log(err);
                    }
                } else {
                    console.log('created ' + document.id);
                    createdList.push(document);
                    cb();
                }
            });
        },

        function (err) {
            console.log('Creating done ' + createdList.length);
            callback(createdList);
        }
    );
}

function init(callback){
    utils.getOrCreateDatabase(client, databaseId, function (err, db) {
        if (err) {
            return callback(err);

        } else {
            databaseLink = 'dbs/' + databaseId;
            callback();            
        }
    });
}

function handleError(error){
    console.log('\nAn error with code \'' + error.code + '\' has occurred:');
    console.log('\t' + error.message);
}

function finish() {
    utils.deleteDatabase(client, databaseLink, function (err) {
        if (!err) {
            console.log('\nEnd of demo.');
        }
    });
}