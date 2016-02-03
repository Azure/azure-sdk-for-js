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
  , dbLink
  , collLink;

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

var documentDefinitions = function () {
    var data = fs.readFileSync('../Shared/Data/Families.json');
    return JSON.parse(data).Families;
};

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

//-----------------------------------------------------------------------------------------
// This demo performs a few steps
// 1. Use a HashPartitionResolver
// 2. Use a RangePartitionResolver
// 3. Use a custom PartitionResolver
//------------------------------------------------------------------------------------------

//ensuring a database & collection exists for us to work with
init(function (err) {
    if (!err) {
        useHashPartitionResolver(databaseLink, function () {
            useRangePartitionResolver(databaseLink, function () {
                useCustomPartitionResolver(databaseLink, function () {
                    finish();
                });
            });
        });        
    }
});


function useHashPartitionResolver(databaseLink, callback) {
    //create two collections to partition data across
    utils.getOrCreateCollection(client, databaseLink, 'Collection.HashBucket0', function (err, coll1) {
        var coll1Link = databaseLink + '/colls/' + coll1.id;

        utils.getOrCreateCollection(client, databaseLink, 'Collection.HashBucket1', function (err, coll2) {
            var coll2Link = databaseLink + '/colls/' + coll2.id;
            
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
            insertDocuments(databaseLink, function (docs) {

                //find me all families that have no children
                var querySpec = {
                    query: 'SELECT * FROM c WHERE NOT IS_DEFINED(c.children)'
                }
                
                //there will be only 1 document returned here, this is because only 1 family in the WA partition has no children
                client.queryDocuments(databaseLink, querySpec, { partitionKey: 'WA' }).toArray(function (err, results) {
                    console.log('Results when specifying a partition key: ' + results.length);
                    
                    //here we are doing the same query but this time we're not supplying the partitionkey
                    //this will effectively do a fan-out query. we will hit the first collection, drain it of results
                    //and then hit each collection defined in the resolver until we've touched them all.
                    //the .toArray() is doing this implictly internally. 
                    //if you would like to not have the driver implicitly walk each collection and you 
                    //want to control this then use the executeNext method of the query iterator
                    //TODO: include sample of queryIterator.executeNext();
                    client.queryDocuments(databaseLink, querySpec).toArray(function (err, results) {
                        console.log('Results when NOT specifying a partition key: ' + results.length);
                        
                        callback();
                    }); 
                });                
            });                     
        });       
    });
}    

function useRangePartitionResolver(databaseLink, callback) {
    callback();
}

function useCustomPartitionResolver(databaseLink, callback) {
    callback();
}

function insertDocuments(databaseLink, callback) {
    var createdList = [];
    
    async.each(
        documentDefinitions(), 
        
        function iterator(documentDefinition, cb) {
            client.createDocument(databaseLink, documentDefinition, function (err, document) {
                if (err) {
                    console.log(err);

                } else {
                    console.log('created ' + document.id);
                    createdList.push(document);
                    cb();
                }
            });
        },

        function (err) {
            console.log('iterating done ' + createdList.length);
            callback(createdList);
        }
    );
}

function init(callback){
    utils.getOrCreateDatabase(client, databaseId, function (err, db) {
        if (!err) {
            databaseLink = 'dbs/' + databaseId;
            callback();
        }
    });
}

function handleError(error){
    console.log('\nAn error with code \'' + error.code + '\' has occurred:');
    console.log('\t' + JSON.parse(error.body).message);
    
    finish();
}

function finish() {
    utils.deleteDatabase(client, databaseLink, function (err) {
        if (!err) {
            console.log('\nEnd of demo.');
        }
    });
}