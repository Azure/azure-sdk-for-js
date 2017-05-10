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
    _ = require('underscore');

var Base = lib.Base,
    DocumentDBClient = lib.DocumentClient,
    Range = lib.Range

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("NodeJS Aggregate Query Tests", function () {
    var partitionKey = "key";
    var uniquePartitionKey = "uniquePartitionKey";
    var field = "field";
    var sum;
    var numberOfDocuments;
    var numberOfDocumentsWithNumbericId;
    var numberOfDocsWithSamePartitionKey;

    var removeAllDatabases = function (done) {
        var client = new DocumentDBClient(host, {masterKey: masterKey});
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

    var generateTestData = function () {
        numberOfDocuments = 800;
        field = "field";
        var docs = []

        var values = [null, false, true, "abc", "cdfg", "opqrs", "ttttttt", "xyz", "oo", "ppp"]
        for (var i = 0; i < values.length; ++i) {
            var d = {};
            d[partitionKey] = values[i];
            docs.push(d);
        }

        numberOfDocsWithSamePartitionKey = 400;
        for (var i = 0; i < numberOfDocsWithSamePartitionKey; ++i) {
            var d = {};
            d[partitionKey] = uniquePartitionKey;
            d['resourceId'] = i.toString();
            d[field] = i + 1;
            docs.push(d);
        }

        numberOfDocumentsWithNumbericId = numberOfDocuments - values.length - numberOfDocsWithSamePartitionKey;
        for (var i = 0; i < numberOfDocumentsWithNumbericId; ++i) {
            var d = {};
            d[partitionKey] = i + 1;
            docs.push(d);
        }

        sum = numberOfDocumentsWithNumbericId * (numberOfDocumentsWithNumbericId + 1) / 2.0;

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
                    assert.equal(err, undefined, "error creating document " + JSON.stringify(documents[currentIndex]) + ", err: " + err);
                    returnedDocuments.push(document);
                    insertDocument(++currentIndex);
                });
            }
        };

        insertDocument(0);
    };

    describe("Validate Aggregate Document Query", function () {
        var client = new DocumentDBClient(host, {masterKey: masterKey});
        var documentDefinitions = generateTestData();

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
            client.createDatabase({id: Base.generateGuidId()}, function (err, createdDB) {
                assert.equal(err, undefined, "error creating database: " + JSON.stringify(err));
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
                        '/' + partitionKey
                    ],
                    'kind': 'Hash'
                }
            }
            var collectionOptions = {'offerThroughput': 10100}
            client.createCollection(getDatabaseLink(true, db), collectionDefinition, collectionOptions, function (err, createdCollection) {
                assert.equal(err, undefined, "error creating collection: " + JSON.stringify(err));
                collection = createdCollection;
                done();
            });
        };

        var validateResult = function (actualValue, expectedValue) {
            assert.deepEqual(actualValue, expectedValue, "actual value doesn't match with expected value.");
        }

        var validateToArray = function (queryIterator, options, expectedResults, done) {

            ////////////////////////////////
            // validate toArray()
            ////////////////////////////////
            var toArrayVerifier = function (err, results) {
                assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));
                assert.equal(results.length, expectedResults.length, "invalid number of results");
                assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");

                validateResult(results, expectedResults);
                return done();
            };

            queryIterator.toArray(toArrayVerifier);
        };

        var validateNextItem = function (queryIterator, options, expectedResults, done) {

            ////////////////////////////////
            // validate nextItem()
            ////////////////////////////////

            var results = [];
            var nextItemVerifier = function (err, item) {
                assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));
                if (item === undefined) {
                    assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                    validateResult(results, expectedResults);

                    return done();
                }
                results = results.concat(item);

                if (results.length < expectedResults.length) {
                    assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                }
                return queryIterator.nextItem(nextItemVerifier);
            };

            queryIterator.nextItem(nextItemVerifier);
        };

        var validateNextItemAndCurrentAndHasMoreResults = function (queryIterator, options, expectedResults, done) {
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
                    assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));
                    assert.equal(item, currentItem, "current must give the previously item returned by nextItem");

                    if (currentItem === undefined) {
                        assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                        validateResult(results, expectedResults);

                        return done();
                    }

                    if (results.length < expectedResults.length) {
                        assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                    }

                    return queryIterator.nextItem(nextItemVerifier);
                };

                assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));

                if (item === undefined) {
                    assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                    validateResult(results, expectedResults);

                    return queryIterator.current(currentVerifier);
                }
                results = results.concat(item);

                if (results.length < expectedResults.length) {
                    assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                }

                var currentVerifier = function (err, currentItem) {
                    queryIterator.nextItem(nextItemVerifier);
                }

                return queryIterator.current(currentVerifier);
            };
            queryIterator.nextItem(nextItemVerifier);
        };


        var validateExecuteNextAndHasMoreResults = function (queryIterator, options, expectedResults, done) {
            ////////////////////////////////
            // validate executeNext() 
            ////////////////////////////////

            var totalFetchedResults = [];
            var executeNextValidator = function (err, results) {
                assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));
                if (results === undefined || (totalFetchedResults.length === expectedResults.length)) {
                    // no more results
                    validateResult(totalFetchedResults, expectedResults);
                    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
                    assert.equal(results, undefined, "unexpected more results" + JSON.stringify(results));

                    return done();
                }

                totalFetchedResults = totalFetchedResults.concat(results);

                if (totalFetchedResults.length < expectedResults.length) {
                    // there are more results
                    assert.equal(results.length, pageSize, "executeNext: invalid fetch block size");
                    assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
                    return queryIterator.executeNext(executeNextValidator);

                } else {
                    // no more results
                    assert.equal(expectedResults.length, totalFetchedResults.length, "executeNext: didn't fetch all the results");

                    //validate that next execute returns undefined resources
                    return queryIterator.executeNext(executeNextValidator);
                }
            };

            queryIterator.executeNext(executeNextValidator);
        }

        var validateForEach = function (queryIterator, options, expectedResults, done) {

            ////////////////////////////////
            // validate forEach() 
            ////////////////////////////////

            var results = [];
            var callbackSingnalledEnd = false;
            var forEachCallback = function (err, item) {
                assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));
                // if the previous invocation returned false, forEach must avoid invoking the callback again!
                assert.equal(callbackSingnalledEnd, false, "forEach called callback after the first false returned");

                // item == undefined means no more results
                if (item !== undefined) {
                    results = results.concat(item);
                }

                if (results.length == expectedResults.length) {
                    callbackSingnalledEnd = true;
                    validateResult(results, expectedResults);
                    process.nextTick(done);
                    return false;
                }
                return true;
            };

            queryIterator.forEach(forEachCallback);
        }

        var executeQueryAndValidateResults = function (collectionLink, query, expectedResults, done) {

            var options = {enableCrossPartitionQuery: true};

            var queryIterator = client.queryDocuments(collectionLink, query, options);
            
            validateToArray(queryIterator, options, expectedResults,
                function () {
                    queryIterator.reset();
                    validateExecuteNextAndHasMoreResults(queryIterator, options, expectedResults,
                        function () {
                            queryIterator.reset();
                            validateNextItemAndCurrentAndHasMoreResults(queryIterator, options, expectedResults,
                                function () {
                                    validateForEach(queryIterator, options, expectedResults, done);
                                }
                            );
                        }
                    );
                }
            );
        };

        var generateTestConfigs = function () {
            var testConfigs = [];
            var aggregateQueryFormat = "SELECT VALUE %s(r.%s) FROM r WHERE %s";
            var aggregateOrderByQueryFormat = "SELECT VALUE %s(r.%s) FROM r WHERE %s ORDER BY r.%s";
            var aggregateConfigs = [
                {
                    operator: 'AVG',
                    expected: sum / numberOfDocumentsWithNumbericId,
                    condition: util.format("IS_NUMBER(r.%s)", partitionKey)
                },
                {operator: 'AVG', expected: undefined, condition: 'true'},
                {operator: 'COUNT', expected: numberOfDocuments, condition: 'true'},
                {operator: 'MAX', expected: 'xyz', condition: 'true'},
                {operator: 'MIN', expected: null, condition: 'true'},
                {operator: 'SUM', expected: sum, condition: util.format("IS_NUMBER(r.%s)", partitionKey)},
                {operator: 'SUM', expected: undefined, condition: 'true'}
            ];


            aggregateConfigs.forEach(function (config) {
                var query = util.format(aggregateQueryFormat, config.operator, partitionKey, config.condition);
                var testName = util.format("%s %s", config.operator, config.condition);
                testConfigs.push({'testName': testName, 'query': query, 'expected': config.expected});

                var query = util.format(aggregateOrderByQueryFormat, config.operator, partitionKey, config.condition, partitionKey);
                var testName = util.format("%s %s OrderBy", config.operator, config.condition);
                testConfigs.push({'testName': testName, 'query': query, 'expected': config.expected});
            });

            var aggregateSinglePartitionQueryFormat = "SELECT VALUE %s(r.%s) FROM r WHERE r.%s = '%s'";
            var aggregateSinglePartitionQueryFormatSelect = "SELECT %s(r.%s) FROM r WHERE r.%s = '%s'";
            var samePartitionSum = numberOfDocsWithSamePartitionKey * (numberOfDocsWithSamePartitionKey + 1) / 2.0;
            var aggregateSinglePartitionConfigs = [
                {operator: 'AVG', expected: samePartitionSum / numberOfDocsWithSamePartitionKey},
                {operator: 'COUNT', expected: numberOfDocsWithSamePartitionKey},
                {operator: 'MAX', expected: numberOfDocsWithSamePartitionKey},
                {operator: 'MIN', expected: 1},
                {operator: 'SUM', expected: samePartitionSum}
            ];

            aggregateSinglePartitionConfigs.forEach(function (config) {
                var query = util.format(aggregateSinglePartitionQueryFormat, config.operator, field, partitionKey, uniquePartitionKey);
                var testName = util.format("%s SinglePartition %s", config.operator, "SELECT VALUE");
                testConfigs.push({'testName': testName, 'query': query, 'expected': config.expected});

                query = util.format(aggregateSinglePartitionQueryFormatSelect, config.operator, field, partitionKey, uniquePartitionKey);
                testName = util.format("%s SinglePartition %s", config.operator, "SELECT");
                testConfigs.push({'testName': testName, 'query': query, 'expected': {'$1': config.expected}});
            });

            return testConfigs;
        }

        generateTestConfigs().forEach(function (test) {
            it(test.testName, function (done) {
                var expected = test.expected === undefined ? [] : [test.expected];
                executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), test.query, expected, done);
            });
        });

    });
});
