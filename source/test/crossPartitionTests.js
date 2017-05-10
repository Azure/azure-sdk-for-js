/*
The MIT License (MIT)
Copyright (c) 2017 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var lib = require("../lib/"),
    assert = require("assert"),
    testConfig = require("./_testConfig"),
    Stream = require("stream"),
    util = require("util"),
    HeaderUtils = require("../lib/queryExecutionContext/headerUtils"),
    _ = require('underscore');

var Base = lib.Base,
    DocumentDBClient = lib.DocumentClient,
    DocumentBase = lib.DocumentBase,
    Constants = lib.Constants,
    Range = lib.Range,
    RangePartitionResolver = lib.RangePartitionResolver,
    HashPartitionResolver = lib.HashPartitionResolver,
    AzureDocuments = lib.AzureDocuments,
    RetryOptions = lib.RetryOptions;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("NodeJS Cross Partition Tests", function () {
    var removeAllDatabases = function (done) {
        var client = new DocumentDBClient(host, { masterKey: masterKey });
        client.readDatabases().toArray(function (err, databases) {
            if (err !== undefined) {
                console.log("An error occured", err);
                assert.fail();
                return done(err);
            }

            var length = databases.length;

            if (length === 0) {
                return done();
            }

            var count = 0;
            databases.forEach(function (database) {
                client.deleteDatabase(database._self, function (err, db) {
                    if (err !== undefined) {
                        console.log("An error occured", err);
                        assert.fail();
                        return done(err);
                    }

                    count++;
                    if (count === length) {
                        done();
                    }
                });
            });
        });
    };

    var generateDocuments = function (docSize) {
        var docs = []
        for (var i = 0; i < docSize; i++) {
            var d = {
                'id': i.toString(),
                'name': 'sample document',
                'spam': 'eggs' + i.toString(),
                'cnt': i,
                'key': 'value',
                'spam2': (i == 3) ? 'eggs' + i.toString() : i,
                'boolVar': (i % 2 === 0),
                'number': 1.1 * i

            };
            docs.push(d);
        }
        return docs;
    };

    var getDatabaseLink = function (isNameBasedLink, db) {
        if (isNameBasedLink) {
            return "dbs/" + db.id;
        } else {
            return db._self;
        }
    };

    var getCollectionLink = function (isNameBasedLink, db, coll) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id;
        } else {
            return coll._self;
        }
    };

    var getDocumentLink = function (isNameBasedLink, db, coll, doc) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id + "/docs/" + doc.id;
        } else {
            return doc._self;
        }
    };

    var bulkInsertDocuments = function (client, isNameBased, db, collection, documents, callback) {
        var returnedDocuments = [];
        var insertDocument = function (currentIndex) {
            if (currentIndex >= documents.length) {
                callback(returnedDocuments);
            }
            else {
                client.createDocument(getCollectionLink(isNameBased, db, collection), documents[currentIndex], function (err, document) {
                    assert.equal(err, undefined, "error creating document " + JSON.stringify(documents[currentIndex]));
                    returnedDocuments.push(document);
                    insertDocument(++currentIndex);
                });
            }
        };

        insertDocument(0);
    };

    describe("Validate Query", function () {
        var client = new DocumentDBClient(host, { masterKey: masterKey });
        var documentDefinitions = generateDocuments(20);

        //- removes all the databases, 
        //  - creates a new database,
        //      - creates a new collecton,
        //          - bulk inserts documents to the collection
        before(function (done) {
            removeAllDatabases(function () {
                return createDatabase(function () {
                    return createCollection(
                        function () {
                            bulkInsertDocuments(client, isNameBased, db, collection, documentDefinitions,
                                function (insertedDocs) {
                                    return done();
                                });
                        }
                    );
                });
            })
        });

        var db = undefined;
        var createDatabase = function (done) {
            client.createDatabase({ id: "sample 中文 database" }, function (err, createdDB) {
                assert.equal(err, undefined, "error creating database ");
                db = createdDB;
                done();
            });
        }
        var collection = undefined;
        var isNameBased = false;

        var createCollection = function (done) {
            var collectionDefinition = {
                'id': 'sample collection',
                'indexingPolicy': {
                    'includedPaths': [
                        {
                            'path': '/',
                            'indexes': [
                                {
                                    'kind': 'Range',
                                    'dataType': 'Number'
                                },
                                {
                                    'kind': 'Range',
                                    'dataType': 'String'
                                }
                            ]
                        }
                    ]
                },
                'partitionKey': {
                    'paths': [
                        '/id'
                    ],
                    'kind': 'Hash'
                }
            }
            var collectionOptions = { 'offerThroughput': 10100 }
            client.createCollection("dbs/sample 中文 database", collectionDefinition, collectionOptions, function (err, createdCollection) {
                assert.equal(err, undefined, "error creating collection");
                collection = createdCollection;
                done();
            });
        };

        var validateResults = function (actualResults, expectedOrderIds) {
            assert.equal(actualResults.length, expectedOrderIds.length,
                "actual results length doesn't match with expected results length.");

            for (var i = 0; i < actualResults.length; i++) {
                assert.equal(actualResults[i].id, expectedOrderIds[i],
                    "actual result content doesn't match with expected result content.");
            }
        }

        var validateToArray = function (queryIterator, options, expectedOrderIds, done) {

            ////////////////////////////////
            // validate toArray()
            ////////////////////////////////
            options.continuation = undefined;
            var toArrayVerifier = function (err, results) {
                assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));
                assert.equal(results.length, expectedOrderIds.length, "invalid number of results");
                assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");

                validateResults(results, expectedOrderIds);
                return done();
            };

            queryIterator.toArray(toArrayVerifier);
        };

        var validateNextItem = function (queryIterator, options, expectedOrderIds, done) {

            ////////////////////////////////
            // validate nextItem()
            ////////////////////////////////
            var results = [];
            var nextItemVerifier = function (err, item) {
                assert.equal(err, undefined, "unexpected failure in fetching the results: " + err);
                if (item === undefined) {
                    assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                    validateResults(results, expectedOrderIds);

                    return done();
                }
                results = results.concat(item);

                if (results.length < expectedOrderIds.length) {
                    assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                }
                return queryIterator.nextItem(nextItemVerifier);
            };

            queryIterator.nextItem(nextItemVerifier);
        };

        var validateNextItemAndCurrentAndHasMoreResults = function (queryIterator, options, expectedOrderIds, done) {
            // curent and nextItem recursively invoke each other till queryIterator is exhausted
            ////////////////////////////////
            // validate nextItem()
            ////////////////////////////////
            var results = [];
            var nextItemVerifier = function (err, item) {

                ////////////////////////////////
                // validate current()
                ////////////////////////////////
                var currentVerifier = function (err, currentItem) {
                    assert.equal(err, undefined, "unexpected failure in fetching the results: " + err);
                    assert.equal(item, currentItem, "current must give the previously item returned by nextItem");

                    if (currentItem === undefined) {
                        assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                        validateResults(results, expectedOrderIds);

                        return done();
                    }

                    if (results.length < expectedOrderIds.length) {
                        assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                    }

                    return queryIterator.nextItem(nextItemVerifier);
                };

                assert.equal(err, undefined, "unexpected failure in fetching the results: " + err);

                if (item === undefined) {
                    assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                    validateResults(results, expectedOrderIds);

                    return queryIterator.current(currentVerifier);
                }
                results = results.concat(item);

                if (results.length < expectedOrderIds.length) {
                    assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                }

                var currentVerifier = function (err, currentItem) {
                    queryIterator.nextItem(nextItemVerifier);
                }

                return queryIterator.current(currentVerifier);
            };
            queryIterator.nextItem(nextItemVerifier);
        };

        var validateExecuteNextWithGivenContinuationToken = function (collectionLink, query, origOptions, listOfResultPages, listOfHeaders, done) {
            var options = JSON.parse(JSON.stringify(origOptions));
            var expectedResults = listOfResultPages.shift();
            var headers = listOfHeaders.shift();
            if (headers === undefined) {
                assert(listOfHeaders.length == 0, "only last header is empty");
                assert(listOfResultPages.length == 0);
                return done();
            }

            assert.notEqual(expectedResults, undefined);

            var continuationToken = headers[Constants.HttpHeaders.Continuation];

            var fromTokenValidator = function (token, expectedResultsFromToken, expectedHeadersFromToken) {
                options.continuation = token;
                var queryIterator = client.queryDocuments(collectionLink, query, options);

                var fromTokenToLastPageValidator = function (queryIterator, token, expectedResultsFromToken, expectedHeadersFromToken) {

                    // validates single page result and 
                    var resultPageValidator = function (err, resources, headers) {
                        assert.equal(err, undefined, "unexpected failure in fetching the results: " + err + JSON.stringify(err));

                        var exptectedResultPage = expectedResultsFromToken.shift();
                        var expectedHeaders = expectedHeadersFromToken.shift();
                        if (exptectedResultPage === undefined) {
                            assert.equal(resources, undefined);
                            assert.equal(headers, undefined);
                        } else {

                            validateResults(resources, exptectedResultPage.map(
                                function (r) {
                                    return r['id'];
                                }));

                            if (expectedHeaders) {
                                assert.equal(
                                    headers[Constants.HttpHeaders.Continuation],
                                    expectedHeaders[Constants.HttpHeaders.Continuation]);
                            } else {
                                assert.equal(headers, undefined);
                            }
                        }

                        if (expectedHeadersFromToken.length > 0) {
                            return fromTokenToLastPageValidator(queryIterator, token, expectedResultsFromToken, expectedHeadersFromToken);
                        } else {
                            // start testing from next continuation token ...
                            return validateExecuteNextWithGivenContinuationToken(collectionLink, query, options, listOfResultPages, listOfHeaders, done);
                        }
                    }
                    queryIterator.executeNext(resultPageValidator);
                }
                return fromTokenToLastPageValidator(queryIterator, continuationToken, listOfResultPages, listOfHeaders);
            }
            return fromTokenValidator(continuationToken, listOfResultPages, listOfHeaders);
        }

        var validateExecuteNextAndHasMoreResults = function (collectionLink, query, options, queryIterator, expectedOrderIds, done,
            validateExecuteNextWithContinuationToken) {
            var pageSize = options['maxItemCount'];

            ////////////////////////////////
            // validate executeNext() 
            ////////////////////////////////

            var listOfResultPages = [];
            var listOfHeaders = [];

            var totalFetchedResults = [];
            var executeNextValidator = function (err, results, headers) {

                listOfResultPages.push(results);
                listOfHeaders.push(headers);

                assert.equal(err, undefined, "unexpected failure in fetching the results: " + err + JSON.stringify(err));
                if (results === undefined || (totalFetchedResults.length === expectedOrderIds.length)) {
                    // no more results
                    validateResults(totalFetchedResults, expectedOrderIds);
                    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
                    assert.equal(results, undefined, "unexpected more results" + JSON.stringify(results));
                    if (validateExecuteNextWithContinuationToken) {
                        return validateExecuteNextWithGivenContinuationToken(
                            collectionLink, query, options, listOfResultPages, listOfHeaders, done
                        );
                    } else {
                        return done();
                    }
                }

                totalFetchedResults = totalFetchedResults.concat(results);

                if (totalFetchedResults.length < expectedOrderIds.length) {
                    // there are more results
                    if (validateExecuteNextWithContinuationToken) {
                        assert(results.length <= pageSize, "executeNext: invalid fetch block size");
                    } else {
                        assert.equal(results.length, pageSize, "executeNext: invalid fetch block size");

                    }
                    assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
                    return queryIterator.executeNext(executeNextValidator);

                } else {
                    // no more results
                    assert.equal(expectedOrderIds.length, totalFetchedResults.length, "executeNext: didn't fetch all the results");
                    assert(results.length <= pageSize, "executeNext: actual fetch size is more than the requested page size");

                    //validate that next execute returns undefined resources
                    return queryIterator.executeNext(executeNextValidator);
                }
            };

            queryIterator.executeNext(executeNextValidator);
        }

        var validateForEach = function (queryIterator, options, expectedOrderIds, done) {

            ////////////////////////////////
            // validate forEach() 
            ////////////////////////////////
            var results = [];
            var callbackSingnalledEnd = false;
            var forEachCallback = function (err, item) {
                assert.equal(err, undefined, "unexpected failure in fetching the results: " + err + JSON.stringify(err));
                // if the previous invocation returned false, forEach must avoid invoking the callback again!
                assert.equal(callbackSingnalledEnd, false, "forEach called callback after the first false returned");
                results = results.concat(item);
                if (results.length === expectedOrderIds.length) {
                    callbackSingnalledEnd = true;
                    validateResults(results, expectedOrderIds);
                    process.nextTick(done);
                    return false
                }
                return true;
            };

            queryIterator.forEach(forEachCallback);
        }

        var executeQueryAndValidateResults = function (collectionLink, query, options, expectedOrderIds, done, validateExecuteNextWithContinuationToken) {

            validateExecuteNextWithContinuationToken = validateExecuteNextWithContinuationToken || false;
            var queryIterator = client.queryDocuments(collectionLink, query, options);

            validateToArray(queryIterator, options, expectedOrderIds,
                function () {
                    queryIterator.reset();
                    validateExecuteNextAndHasMoreResults(collectionLink, query, options, queryIterator, expectedOrderIds,
                        function () {
                            queryIterator.reset();
                            validateNextItemAndCurrentAndHasMoreResults(queryIterator, options, expectedOrderIds,
                                function () {
                                    validateForEach(queryIterator, options, expectedOrderIds, done);
                                }
                            );
                        },
                        validateExecuteNextWithContinuationToken
                    );
                }
            );
        };

        it("Validate Parallel Query As String With no maxDegreeOfParallelism", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2};

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done, true, true);
        });

        it("Validate Parallel Query As String With maxDegreeOfParallelism: -1", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: -1 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done, true, true);
        });

        it("Validate Parallel Query As String With maxDegreeOfParallelism: 1", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done, true, true);
        });

        it("Validate Parallel Query As String With maxDegreeOfParallelism: 3", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done, true);
        });

        var requestChargeValidator = function (queryIterator, done) {

            var counter = 0;
            var totalRequestCharge = 0;

            var consumeFunc = function (err, results, headers) {
                var rc = (headers || {})[Constants.HttpHeaders.RequestCharge];

                if (counter == 0) {
                    assert(rc > 0);
                    counter += 1;
                }

                if (results == undefined) {
                    assert(totalRequestCharge > 0);
                    return done();
                }
                else {
                    totalRequestCharge += rc;
                    assert(rc >= 0);
                    queryIterator.executeNext(consumeFunc);
                }
            };

            queryIterator.executeNext(consumeFunc);
        }

        it("Validate Parallel Query Request Charge With maxDegreeOfParallelism: 3", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);
            requestChargeValidator(queryIterator, done);
        });



        it("Validate Parallel Query Request Charge With maxDegreeOfParallelism: 1", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);
            requestChargeValidator(queryIterator, done);
        });

        it("Validate Simple OrderBy Query Request Charge With maxDegreeOfParallelism = 1", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);
            requestChargeValidator(queryIterator, done);
        });

        it("Validate Simple OrderBy Query Request Charge With maxDegreeOfParallelism = 0", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 0 };

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);
            requestChargeValidator(queryIterator, done);
        });

        it("Validate Top Query Request Charge with maxDegreeOfParallelism = 3", function (done) {
            // a top query
            var topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            var query = util.format('SELECT top %d * FROM root r', topCount);
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);
            requestChargeValidator(queryIterator, done);
        });

        it("Validate Top Query Request Charge with maxDegreeOfParallelism = 0", function (done) {
            // a top query
            var topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            var query = util.format('SELECT top %d * FROM root r', topCount);
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 0 };

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);
            requestChargeValidator(queryIterator, done);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 0", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 0};

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 1", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 3", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3};

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = -1", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: -1 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
        });

        it("Validate Simple OrderBy Query As String", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
        });

        it("Validate Simple OrderBy Query", function (done) {
            // simple order by query
            var querySpec = {
                'query': 'SELECT * FROM root r order by r.spam'
            };
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);
        });

        it("Validate OrderBy Query With ASC", function (done) {
            // an order by query with explicit ascending ordering
            var querySpec = {
                'query': 'SELECT * FROM root r order by r.spam ASC'
            };
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);
        });

        it("Validate OrderBy Query With DESC", function (done) {
            // an order by query with explicit descending ordering
            var querySpec = {
                'query': 'SELECT * FROM root r order by r.spam DESC'
            };
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            })).reverse();

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);
        });

        it("Validate OrderBy with top", function (done) {
            // an order by query with top, total existing docs more than requested top count   
            var topCount = 9;
            var querySpec = {
                'query': util.format('SELECT top %d * FROM root r order by r.spam', topCount)
            }
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            })).slice(0, topCount);

           executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);

        });

        it("Validate OrderBy with Top Query (less results than top counts)", function (done) {
            // an order by query with top, total existing docs less than requested top count   
            var topCount = 30
            // sanity check  
            assert(topCount > documentDefinitions.length, "test setup is wrong");
            var querySpec = {
                'query': util.format('SELECT top %d * FROM root r order by r.spam', topCount)
            }
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);
        });

        it("Validate Top Query with maxDegreeOfParallelism = 3", function (done) {
            // a top query
            var topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            var query = util.format('SELECT top %d * FROM root r', topCount);
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            // prepare expected behaviour verifier
            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);

            var resultVerifier = function (err, results) {
                assert.equal(err, undefined);
                assert.equal(results.length, topCount);

                // select unique ids
                var uniqueIds = {}
                results.forEach(function (item) {
                    uniqueIds[item.id] = true;
                });
                // assert no duplicate results
                assert.equal(results.length, Object.keys(uniqueIds).length);
                done();
            };
            queryIterator.toArray(resultVerifier);
        });


        it("Validate Top Query", function (done) {
            // a top query
            var topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            var query = util.format('SELECT top %d * FROM root r', topCount);
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);

            var resultVerifier = function (err, results) {
                assert.equal(err, undefined);
                assert.equal(results.length, topCount);

                // select unique ids
                var uniqueIds = {}
                results.forEach(function (item) {
                    uniqueIds[item.id] = true;
                });
                // assert no duplicate results
                assert.equal(results.length, Object.keys(uniqueIds).length);
                done();
            };
            queryIterator.toArray(resultVerifier);
        });

        it("Validate Top Query (with 0 topCount)", function (done) {
            // a top query
            var topCount = 0;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            var query = util.format('SELECT top %d * FROM root r', topCount);
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);

            var resultVerifier = function (err, results) {
                assert.equal(err, undefined);
                assert.equal(results.length, topCount);

                // select unique ids
                var uniqueIds = {}
                results.forEach(function (item) {
                    uniqueIds[item.id] = true;
                });
                // assert no duplicate results
                assert.equal(results.length, Object.keys(uniqueIds).length);
                done();
            };
            queryIterator.toArray(resultVerifier);
        });

        it("Validate Parametrized Top Query", function (done) {
            // a top query
            var topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            var querySpec = {
                'query': 'SELECT top @n * FROM root r',

                "parameters": [
                    { "name": "@n", "value": topCount }
                ]
            }
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), querySpec, options);

            var resultVerifier = function (err, results) {
                assert.equal(err, undefined);
                assert.equal(results.length, topCount);

                // select unique ids
                var uniqueIds = {}
                results.forEach(function (item) {
                    uniqueIds[item.id] = true;
                });
                // assert no duplicate results
                assert.equal(results.length, Object.keys(uniqueIds).length);
                done();
            };
            queryIterator.toArray(resultVerifier);
        });

        it("Validate OrderBy with Parametrized Top Query", function (done) {
            // a parametrized top order by query
            var topCount = 9
            // sanity check  
            assert(topCount < documentDefinitions.length, "test setup is wrong");
            // a parametrized top order by query
            var querySpec = {
                'query': 'SELECT top @n * FROM root r order by r.spam',

                "parameters": [
                    { "name": "@n", "value": topCount }
                ]
            }
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            })).slice(0, topCount);

            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);
        });

        it("Validate OrderBy with Parametrized Predicate", function (done) {
            // an order by query combined with parametrized predicate
            var querySpec = {
                'query': 'SELECT * FROM root r where r.cnt > @cnt order by r.spam',
                "parameters": [
                    { "name": "@cnt", "value": 5 }
                ]
            }
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey)
                .filter(
                function (r) {
                    return r['cnt'] > 5;
                })
                .map(
                function (r) {
                    return r['id'];
                }));

            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);
        });

        it("Validate Error Handling - Orderby where types are noncomparable", function (done) {
            // test orderby with different order by item type
            // an order by query
            var query = {
                'query': 'SELECT * FROM root r order by r.spam2',
            }
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);

            var errorVerifier = function (err, results) {
                assert.equal(results, undefined);
                assert.notEqual(err, undefined);
                done();
            };
            queryIterator.toArray(errorVerifier);
        });

        it("Validate OrderBy Integer Query", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.cnt';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['cnt'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
        });

        it("Validate OrderBy Floating Point Number Query", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.number';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['number'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            // validates the results size and order
            executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
        });

        it("Validate OrderBy Boolean Query", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.boolVar';
            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);
            queryIterator.toArray(function (err, results) {
                assert.equal(err, undefined, "error occured");
                assert.equal(results.length, documentDefinitions.length);

                var index = 0;
                while (index < results.length) {
                    if (results[index].boolVar) {
                        break;
                    }
                    assert(results[index].id % 2 === 1);
                    index++;
                }

                while (index < results.length) {
                    assert(results[index].boolVar);
                    assert(results[index].id % 2 === 0);
                    index++;
                }
                done();
            });
        });

        it("Validate forEach quick termination", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';

            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            })).slice(0,1);

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);

            validateForEach(queryIterator, options, expectedOrderedIds, done);
        });

        it("Validate Failure", function (done) {
            // simple order by query in string format
            var query = 'SELECT * FROM root r order by r.spam';

            var options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            var getOrderByKey = function (r) {
                return r['spam'];
            }
            var expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r['id'];
            }));

            var queryIterator = client.queryDocuments(getCollectionLink(isNameBased, db, collection), query, options);

            
            var firstTime = true;

            queryIterator.current(function (err, callback) {

                if (firstTime) {
                    firstTime = false;
                //    console.log("print me " + Object.entries( queryIterator.queryExecutionContext));
                }
                done();

            });
        });
    });
});

