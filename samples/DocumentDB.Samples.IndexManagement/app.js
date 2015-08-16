console.log();
console.log('Azure DocumentDB Node.js Samples');
console.log('================================');
console.log();
console.log('INDEX MANAGEMENT');
console.log('================');
console.log();

var DocumentDBClient = require('documentdb').DocumentClient
  , DocumentBase = require("documentdb").DocumentBase
  , config = require('../config')
  , fs = require('fs')
  , databaseId = config.names.database
  , dbLink

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

//NOTE: 
//when using the new IDBased Routing URIs, instead of the _self, as we 're doing in this sample
//ensure that the URI does not end with a trailing '/' character
//so dbs/databaseId instead of dbs/databaseId/
//also, ensure there is no leading space

//---------------------------------------------------------------------------------------------------
// This demo performs a few steps
// 1. explictlyExcludeFromIndex - how to manually exclude a document from being indexed
// 2. useManualIndexing         - switch auto indexing off, and then manually add individual docs
// 3. useLazyIndexing
// 4. useRangeIndexOnStrings
// 5. excludePathsFromIndex
// 6. forceScanOnHashIndexPath
// 7. performIndexTransforms
//---------------------------------------------------------------------------------------------------

//ensuring a database & collection exists for us to work with
init(function (err) {
    if (!err) {
        dbLink = 'dbs/' + databaseId;
        console.log(dbLink);
                
        //1.
        console.log('\n1.');
        console.log('explictlyExcludeFromIndex - manually exclude document from being indexed');
        explictlyExcludeFromIndex(function (err) {
            if (!err) {
                
                //2.
                console.log('\n2.');
                console.log('useManualIndexing - switch auto indexing off, and manually index docs');
                useManualIndexing(function (err) {
                    if (!err) {
                                                                        
                        finish();
                    }
                });
            }             
        });
    }
});

function init(callback) {
    getOrCreateDatabase(databaseId, function (db) {
        callback();
    });
}

function explictlyExcludeFromIndex(callback) {
    console.log('create collection with default index policy')
    
    //we're using the default indexing policy because by default indexingMode == consistent & automatic == true
    //which means that by default all documents added to a collection are indexed as the document is written
    var collId = 'ExplictExcludeDemo';
    createCollection(dbLink, collId, null, function (coll) {
        var collLink = dbLink + '/colls/' + coll.id;        
        var docSpec = { id : 'doc', foo : "bar" };
        
        console.log('Create document, but exclude from index')
        
        //createDocument takes RequestOptions as 3rd parameter. 
        //One of these options is indexingDirectives which can be include, or exclude
        //we're using exclude this time to manually exclude this document from being indexed
        client.createDocument(collLink, docSpec, { indexingDirective: 'exclude' }, function (err, document) {
            if (err) {
                handleError(err)

            } else {
                console.log('Document with id \'' + document.id + '\' created');

                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.foo=@foo',
                    parameters: [
                        {
                            name: '@foo',
                            value: "bar"
                        }
                    ]
                };

                console.log('queryDocuments for doc should not find any results');
                client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
                    if (err) {
                        callback(err);
                    } 

                    else if (results != 0) {
                        callback(new Error('there were not meant to be results'));

                    } else {
                        console.log('No results found');
                        
                        console.log('readDocument should still find the doc');
                        client.readDocument(collLink + '/docs/doc', function (err, doc) {
                            if (err) {
                                callback(err);
                        
                            } else {
                                console.log('readDocument found doc and its _self is \'' + doc._self + '\'');

                                deleteCollection(collLink, function (result) {
                                    console.log('Collection \'' +  collId + '\' deleted');
                                    callback();
                                });                                                            
                            }
                        });
                    }
                });
            }
        });
    })
}

function useManualIndexing(callback) {
    console.log('create collection with indexingPolicy.automatic : false')
    
    var collId = 'ManualIndexDemo';
    var indexPolicySpec = { automatic: false };
    
    createCollection(dbLink, collId, indexPolicySpec, function (coll) {
        var collLink = dbLink + '/colls/' + coll.id;
        
        //documentClient.createDocument() takes RequestOptions as 3rd parameter. 
        //One of these options is indexingDirectives which can be include, or exclude
        //we're using include this time to manually index this particular document
        console.log('Create document, but exclude from index')        
        var docSpec = { id : 'doc', foo : "bar" };
        client.createDocument(collLink, docSpec, { indexingDirective: 'include' }, function (err, document) {
            if (err) {
                handleError(err)

            } else {
                console.log('Document with id \'' + document.id + '\' created');
                
                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.foo=@foo',
                    parameters: [
                        {
                            name: '@foo',
                            value: "bar"
                        }
                    ]
                };
                
                console.log('queryDocuments for doc should find a result as it was indexed');
                client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
                    if (err) {
                        callback(err);
                    } 

                    else if (results == 0) {
                        callback(new Error('There were meant to be results'));

                    } else {
                        var doc = results[0];                        
                        console.log('Document with id \'' +  doc.id + '\' found');

                        deleteCollection(collLink, function (result) {
                            console.log('Collection \'' + collId + '\' deleted');
                            callback();
                        });
                    }
                });
            }
        });
    })    
}

function deleteDatabase(dbLink) {
    client.deleteDatabase(dbLink, function (err) {
        if (err) {
            handleError(err);
        }
    });
}

function createCollection(dbLink, id, indexPolicy, callback) {
    var collDef = { id: id };

    if (indexPolicy) {
        collDef.indexingPolicy = indexPolicy;
    }

    client.createCollection(dbLink, collDef, function (err, created) {
        if (err) {
            handleError(err);
                
        } else {
            console.log('Collection id \'' + created.id + '\' created');
            callback(created);
        }
    });
}

function deleteCollection(collLink, callback){
    client.deleteCollection(collLink, function (err, result) {
        if (err) {
            handleError(err);
        } else {
            callback(result);
        }
    });
}

function getOrCreateDatabase(id, callback) {
    //we're using queryDatabases here and not readDatabase
    //readDatabase will throw an exception if resource is not found
    //queryDatabases will not, it will return empty resultset. 
    
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [
            {
                name: '@id',
                value: id
            }
        ]
    };
    
    client.queryDatabases(querySpec).toArray(function (err, results) {
        if (err) {
            handleError(err);

        //database not found, create it
        } else if (results.length === 0) {
            var databaseDef = { id: id };
            
            client.createDatabase(databaseDef, function (err, created) {
                if (err) {
                    handleError(err);
                
                } else {
                    callback(created);
                }
            });
        
        //database found, return it
        } else {
            callback(results[0]);
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