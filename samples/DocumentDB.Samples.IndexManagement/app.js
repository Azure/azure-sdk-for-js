console.log();
console.log('Azure DocumentDB Node.js Samples');
console.log('================================');
console.log();
console.log('INDEX MANAGEMENT');
console.log('================');
console.log();

var DocumentDBClient = require('documentdb').DocumentClient
  , DocumentBase = require('documentdb').DocumentBase
  , async = require('async')
  , config = require('../config')
  , fs = require('fs')
  , databaseId = config.names.database
  , dbLink

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

//IMPORTANT: 
//this sample creates and delete collections at least 7 times. 
//each time you execute createCollection you are charged for 1hr (our smallest billing unit) 
//even if that collection is only alive for a few seconds.
//so please take note of this before running this sample

//TODO: Now that index transforms exist, refactor to create only 1 collection and just reuse each time

//NOTE: 
//when using the new IDBased Routing URIs, instead of the _self, as we 're doing in this sample
//ensure that the URI does not end with a trailing '/' character
//so dbs/databaseId instead of dbs/databaseId/
//also, ensure there is no leading space

//-----------------------------------------------------------------------------------------------------------
// This demo performs a few steps
// 1. explictlyExcludeFromIndex - how to manually exclude a document from being indexed
// 2. useManualIndexing         - switch auto indexing off, and then manually add individual docs
// 3. useLazyIndexing           - create a collection with indexing mode set to Lazy instead of consistent
// 4. forceScanOnHashIndexPath  - use a directive to allow a scan on a string path during a range operation
// 5. useRangeIndexOnStrings    - create a range index on string path
// 6. excludePathsFromIndex     - create a custom indexPolicy that excludes specific path in document
// 7. performIndexTransforms    - create a collection with default indexPolicy, then update this online
//------------------------------------------------------------------------------------------------------------

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
                        
                        //3.
                        console.log('\n3.');
                        console.log('useLazyIndexing - create collection lazy index');
                        useLazyIndexing(function (err) {
                            if (!err) {
                                
                                //4.
                                console.log('\n4.');
                                console.log('forceScanOnHashIndexPath  - use index directive to allow range scan on path without range index');
                                forceScanOnHashIndexPath(function (err) {
                                    if (!err) {
                                        
                                        //5.
                                        console.log('\n5.');
                                        console.log('useRangeIndexOnStrings  - create a range index on string path');
                                        useRangeIndexOnStrings(function (err) {
                                            if (!err) {
                                                
                                                //6.
                                                console.log('\n6.');
                                                console.log('excludePathsFromIndex  - create a range index on string path');
                                                excludePathsFromIndex(function (err) {
                                                    if (!err) {
                                                        
                                                        //7.
                                                        console.log('\n7.');
                                                        console.log('performIndexTransforms  - update an index policy online');
                                                        performIndexTransforms(function (err) {
                                                            if (!err) {
                                                                
                                                                finish();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
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
    var indexingPolicySpec = { automatic: false };
    
    createCollection(dbLink, collId, indexingPolicySpec, function (coll) {
        var collLink = dbLink + '/colls/' + coll.id;
        
        //documentClient.createDocument() takes RequestOptions as 3rd parameter. 
        //One of these options is indexingDirectives which can be include, or exclude
        //we're using include this time to manually index this particular document
        console.log('Create document, and explicitly include in index')        
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

function useLazyIndexing(callback) {
    
    // DocumentDB offers synchronous (consistent) and asynchronous (lazy) index updates. 
    // By default, the index is updated synchronously on each insert, replace or delete of a document to the collection. 
    // There are times when you might want to configure certain collections to update their index asynchronously. 
    // Lazy indexing boosts the write performance and lowers RU charge of each insert 
    // and is ideal for bulk ingestion scenarios for primarily read-heavy collections
    // It is important to note that you might get inconsistent reads whilst the writes are in progress,
    // However once the write volume tapers off and the index catches up, then the reads continue as normal
    
    // It is difficult to demonstrate this is a code sample as you only really notice this under sustained
    // heavy-write workloads. So this code sample shows just how to create the custom index polixy needed

    console.log('create collection with indexingPolicy.indexMode : lazy')
    
    // allowed values for IndexingMode are consistent (default), lazy and none
    var collId = 'LazyIndexDemo';
    var indexingPolicySpec = { indexingMode: "lazy"  };
    
    createCollection(dbLink, collId, indexingPolicySpec, function (coll) {
        console.log('Collection \'' + coll.id + '\' created with index policy: ');
        console.log(coll.indexingPolicy);
        
        var collLink = dbLink + '/colls/' + coll.id;
        deleteCollection(collLink, function (result) {
            console.log('Collection \'' + collId + '\' deleted');
            callback();
        });
    });
}

function forceScanOnHashIndexPath(callback) {
    // DocumentDB index knows about 3 datatypes - numbers, strings and geojson
    // By default, the index on a collection does not put range indexes on to string paths
    // Therefore, if you try and do a range operation on a string path with a default index policy, you will get an error
    // You can override this by using an request option, that is what this demonstrates
    // NOTE - it is not recommended to do this often due to the high charge associated with a full collection scan
    //        if you find yourself doing this often on a particular path, create a range index for strings on that path
    
    console.log('create collection with default index policy')
    var collId = 'ForceScanDemo';
    
    createCollection(dbLink, collId, null, function (coll) {
        console.log('Collection \'' + coll.id + '\' created with default index policy (i.e. no range on strings)');
    
        var collLink = dbLink + '/colls/' + coll.id;
        
        //create a document
        console.log('Creating document');
        client.createDocument(collLink, { id: "doc", stringField: "a string value" }, function (err, doc) {
            if (err) {
                handleError(err)

            } else {
                console.log('Document created');
                
                //try a range query on the document, expect an error            
                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.stringField > @value',
                    parameters: [
                        {
                            name: '@value',
                            value: 'a'
                        }
                    ]
                };
                
                console.log('Querying for document where stringField > \'a\', should fail');
                client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
                    if (!err) {
                        callback(err);
                
                    } else {
                        console.log('Query failed with ' + err.code);
                        
                        //try same range query again, this time specifying the directive to do a scan, 
                        //be wary of high RU cost that you could get for even a single document!
                        //we won't particularly see a high charge this time because there is only 1 doc in the collection
                        //so a scan on 1 document isn't costly. a few thousand documents will be very different
                        console.log('Repeating query for document where stringField > \'a\', this time with enableScanInQuery: true');
                        
                        //notice how we're switching to queryIterator.executeNext instead of calling .toArray() as before
                        //reason being, toArray will issue multiple requests to the server until it has fetched all results
                        //here we can control this using executeNext.
                        //now we can get the headers for each request which includes the charge, continuation tokens etc. 

                        var queryIterator = client.queryDocuments(collLink, querySpec, {enableScanInQuery: true} );
                        queryIterator.executeNext(function (err, docs, headers) {
                            if (err) {
                                handleError(err);
                            } else {
                                var charge = headers['x-ms-request-charge'];
                                var doc = docs[0];
                                
                                console.log('Document \'' + doc.id + '\' found, request charge: ' + charge);
                                
                                deleteCollection(collLink, function (result) {
                                    console.log('Collection \'' + collId + '\' deleted');
                                    callback();
                                });
                            }
                        });
                    }
                });
            }
        });       
    });
}

function useRangeIndexOnStrings(callback) {
    // DocumentDB index knows about 3 datatypes - numbers, strings and geojson
    // By default, the index on a collection does not put range indexes on to string paths
    // In this demo we are going to create a custom index policy which enables range index on a string path 
    
    console.log('create collection with range index on string paths')
    var collId = 'RangeIndexDemo';
    var indexPolicySpec = {
        includedPaths: [
            {
                path: "/*",
                indexes: [
                    {
                        kind: "Range",
                        dataType: "String"
                    },
                    {
                        kind: "Range",
                        dataType: "Number"
                    }
                ]
            }
        ]
    };
    
    createCollection(dbLink, collId, indexPolicySpec, function (coll) {
        console.log('Collection \'' + coll.id + '\' created with custom index policy');
        
        var collLink = dbLink + '/colls/' + coll.id;
    
        //create a document
        console.log('Creating document');
        client.createDocument(collLink, { id: "doc", stringField: "a string value" }, function (err, doc) {
            if (err) {
                handleError(err)
    
            } else {
                console.log('Document created');
    
                //try a range query on the document, expect an error            
                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.stringField > @value',
                    parameters: [
                        {
                            name: '@value',
                            value: 'a'
                        }
                    ]
                };
    
                console.log('Querying for document where stringField > \'a\', should return results');
                
                //notice how we're switching to queryIterator.executeNext instead of calling .toArray() as before
                //reason being, toArray will issue multiple requests to the server until it has fetched all results
                //here we can control this using executeNext.
                //now we can get the headers for each request which includes the charge, continuation tokens etc.                 
                var queryIterator = client.queryDocuments(collLink, querySpec, { enableScanInQuery: true });
                queryIterator.executeNext(function (err, docs, headers) {
                    if (err) {
                        callback(err);
    
                    } else {
                        var charge = headers['x-ms-request-charge'];
                        var doc = docs[0];
                        
                        console.log('Document \'' + doc.id + '\' found, request charge: ' + charge);
                        
                        deleteCollection(collLink, function (result) {
                            console.log('Collection \'' + collId + '\' deleted');
                            callback();
                        });
                    }
                });
            }
        });       
    });
}

function excludePathsFromIndex(callback) {    
    console.log('create collection with an excluded path')
    var collId = 'ExcludePathDemo';
    var indexPolicySpec = {
        //the special "/" must always be included somewhere. in this case we're including root 
        //and then excluding specific paths
        includedPaths : [
            {
                path: "/",
                indexes: [
                    {
                        kind: DocumentBase.IndexKind.Hash,
                        dataType: DocumentBase.DataType.Number,
                        precision: 2
                    }
                ]
            }
        ],
        excludedPaths: [
            {
                path: "/metaData/*"               
            }
        ]
    };
    
    createCollection(dbLink, collId, indexPolicySpec, function (coll) {
        console.log('Collection \'' + coll.id + '\' created with excludedPaths');
    
        var collLink = dbLink + '/colls/' + coll.id;
        var docId = 'doc';

        var docSpec = {
            id : docId, 
            metaData : "meta", 
            subDoc : {
                searchable : "searchable", subSubDoc : { someProperty : "value" }
            }
        };

        //create a document
        console.log('Creating document');
        client.createDocument(collLink, docSpec, function (err, doc) {
            if (err) {
                handleError(err)
    
            } else {
                console.log('Document created');
    
                //try a query on an excluded property, expect no results
                var querySpec = {
                    query: 'SELECT * FROM root r WHERE r.metaData = @value',
                    parameters: [
                        {
                            name: '@value',
                            value: 'meta'
                        }
                    ]
                };
                
                
                //expecting an exception on this query due to the fact that it includes paths that
                //have been excluded. If you want to force a scan, then enableScanInQuery like we did in forceScanOnHashIndexPath()
                console.log('Querying for document where metaData = \'meta\', should throw an exception');
                client.queryDocuments(collLink, querySpec).toArray(function (err, docs) {
                    if (!err) {
                        callback(new Error('Should\'ve produced an error'));
                    
                    } else {
                        
                        //show that you can still read the document by its id                        
                        var docLink = collLink + '/docs/' + docId;
                        console.log('Can still readDocument using \'' + docLink + '\'');
                        client.readDocument(docLink, function (err, doc) {
                            if (err) {
                                callback(err);

                            } else {
                                console.log('Document \'' + docLink + '\' read and it\'s _self is \'' + doc._self + '\'');
                                
                                deleteCollection(collLink, function (result) {
                                    console.log('Collection \'' + collId + '\' deleted');
                                    callback();
                                });
                            }
                        });
                    }
                });
            }
        });       
    });
}

function performIndexTransforms(callback) { 
    //create collection with default index policy
    console.log('Creating collection with default index policy (i.e. no range on strings)');
    var collId = 'IndexTransformsDemo';

    createCollection(dbLink, collId, null, function (coll) {
        console.log('Collection \'' + coll.id + '\' created');
        
        var collLink = dbLink + '/colls/' + coll.id;
            
        //create document
        var docSpec = {
            id: 'doc', 
            stringField: 'a string'
        };

        console.log('Creating document');
        client.createDocument(collLink, docSpec, function (err, doc) {
            if (err) {
                handleError(err);

            } else {
                console.log('Document with id \'' + doc.id + '\' created');
                
                //define a new indexPolicy which includes Range on all string paths (and Hash on all numbers)
                var indexPolicySpec = {
                    includedPaths: [
                        {
                            path: "/*",
                            indexes: [
                                {
                                    kind: "Range",
                                    dataType: "String"
                                },
                                {
                                    kind: "Range",
                                    dataType: "Number"
                                }
                            ]
                        }
                    ]
                };
                
                var collSpec = { id: collId };
                collSpec.indexingPolicy = indexPolicySpec;
                
                //replaceCollection to update the indexPolicy
                client.replaceCollection(collLink, collSpec, function (err, result) {
                    if (err) {
                        handleError(err);

                    } else {
                        console.log('Waiting for index transform to be completed');
                        
                        //Index transform is an async operation that is performed on a Collection
                        //You can contiue to use the collection while this is happening, but depending
                        //on the transform and your queries you may get inconsistent results as the index is updated

                        //Here, we'll just wait for index transform to complete. 
                        //this will be almost instant because we only have one document
                        //but this can take some time on larger collections
                        waitForIndexTransformToComplete(collLink, function (err) {
                            console.log('Index transform completed');
                            
                            var querySpec = {
                                query: 'SELECT * FROM root r WHERE r.stringField > @value',
                                parameters: [
                                    {
                                        name: '@value',
                                        value: 'a'
                                    }
                                ]
                            };

                            //queryDocuments doing a range operation on a string (this would've failed without the transform)
                            client.queryDocuments(collLink, querySpec).toArray(function (err, results) {
                                if (err) {
                                    handleError(err);

                                } else if (results.length == 0) {
                                    callback(new Error('Should\'ve found a doc'));

                                } else {
                                    var doc = results[0];
                                    console.log('Document with id \'' + doc.id + '\' found');
                                    
                                    callback();
                                }
                            });
                        })
                    }
                });
            }
        });        
    });
}

function waitForIndexTransformToComplete(collLink, callback) {
    //To figure out the progress of and index transform, 
    //do a readCollection and check the 3rd parameter of the callback
    //The headers collection includes a header that indicates progress between 0 and 100
    var progress = 0;
    var count = 0;

    async.whilst(
        function () { return progress > 0 && progress < 100; },
        
        function (cb) {
            console.log('Reading collection');
            client.readCollection(collLink, function (err, coll, headers) {
                if (err) {
                    handleError(err);
                
                } else {
                    progress = headers['x-ms-documentdb-collection-index-transformation-progress'];
                    console.log('Progress is currently ' + progress);
                    
                    console.log('Waiting for 10ms');
                    setTimeout(cb, 10);
                }
            });
        },
        
        function (err) {
            console.log('Done waiting, progress == 100');
            callback();
        }
    );
}

function deleteDatabase(dbLink) {
    client.deleteDatabase(dbLink, function (err) {
        if (err) {
            handleError(err);
        }
    });
}

function createCollection(dbLink, id, indexPolicy, callback) {
    //because this sample currently does LOTS of creates on Collections
    //there is a high possibility of being throttled on createCollection
    //hence the async.whilst() handling the 429 error

    var done = false;
    var coll;

    var collDef = { id: id };

    if (indexPolicy) {
        collDef.indexingPolicy = indexPolicy;
    }
    
    async.whilst(
        function () { return !done; },
        
        function (cb) {
            console.log('Trying to create collection');
            client.createCollection(dbLink, collDef, function (err, created, headers) {
                if (err && err.code != 429) {
                    throw (err);
                }

                else if (err && err.code == 429) {
                    var retryafter = headers['x-ms-retry-after-ms'];
                    
                    console.log('Sleeping for ' + retryafter + ' ms');
                    setTimeout(cb, retryafter);                    
                
                } else {
                    console.log('Collection id \'' + created.id + '\' created');
                    done = true;
                    coll = created;
                    cb();
                }
            });
        },
           
        function (err) {
            console.log('Collection created');
            callback(coll);
        }
    );
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