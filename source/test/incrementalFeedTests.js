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
    testConfig = require("./_testConfig");

var Base = lib.Base,
    DocumentDBClient = lib.DocumentClient,
    Range = lib.Range;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("NodeJS Incremental Feed Tests using 'a_im' and 'IfNoneMatch' options", function () {
    var client = new DocumentDBClient(host, { masterKey: masterKey });

    // delete all databases and create sample database
    before(function (done) {
        deleteAllDatabases(function() {
            createDatabase(function () {
                done();
            });
        });
    });

    var isNameBased = false;

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

    var deleteAllDatabases = function (done) {
        var client = new DocumentDBClient(host, { masterKey: masterKey });
        client.readDatabases().toArray(function (err, databases) {
            if (err !== undefined) {
                console.log("An error occured", err);
                return done();
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
                        return done();
                    }
                    
                    count++;
                    if (count === length) {
                        return done();
                    }
                });
            });
        });
    };

    var db = undefined;
    var createDatabase = function (done) {
        client.createDatabase({id: "sample database"}, function (err, createdDB) {
            assert.equal(err, undefined, "error creating database: " + JSON.stringify(err));
            db = createdDB;
            done();
        });
    };

    var collection = undefined;
    var createCollection = function (done) {
        var collectionDefinition = {
            "id": "sample collection"
        };
        var dbLink = getDatabaseLink(false, db);
        client.createCollection(dbLink, collectionDefinition, function (err, result) {
            assert.equal(err, undefined, "error creating collection: " + JSON.stringify(err));
            collection = result;
            done();
        });
    };

    var deleteCollection = function (done) {
        client.deleteCollection(getCollectionLink(isNameBased, db, collection), function(err) {
            assert.equal(err, undefined, "error deleting collection");
            done();
        });
    };

    describe("Newly updated documents should be fetched incremetally", function(done) {

        // create collection and two documents
        before(function (done) {
            createCollection( function () {
                var collLink = getCollectionLink(isNameBased, db, collection);
                client.createDocument(collLink, {id: "doc1"}, function (err, document) {
                    assert.equal(err, undefined, "error creating first initial document");
                    client.createDocument(collLink, {id: "doc2"}, function (err, document) {
                        assert.equal(err, undefined, "error creating second initial document");
                        done();
                    });
                });
            });
        });

        after(function(done) {
            deleteCollection(done);
        });

        it("should fetch updated documents only", function(done) {
            var options = { a_im: "Incremental feed" };
            var query = client.readDocuments(getCollectionLink(isNameBased, db, collection), options);

            query.current( function(err, document, headers) {
                assert.equal(err, undefined, "unexpected failure in listDocuments request" + JSON.stringify(err));
                assert(headers.etag, "listDocuments response should have etag header");

                query.toArray(function(err, results) {
                    assert.equal(err, undefined, "error reading documents");
                    assert.equal(results.length, 2, "initial number of documents should be equal 2");


                    var documentLink = getDocumentLink(isNameBased, db, collection, document);

                    document.name = "xyz";
                    client.replaceDocument(documentLink, document, function(err, replaced) {
                        assert.equal(err, undefined, "error reading documents");
                        assert.deepEqual(replaced.name, "xyz", "replaced document should be valid");


                        options = {
                            a_im: "Incremental feed",
                            accessCondition: {
                                type: "IfNoneMatch",
                                condition: headers.etag
                            }
                        };
                        var collLink = getCollectionLink(isNameBased, db, collection);
                        client.readDocuments(collLink, options).toArray(function(err, results) {
                            assert.equal(err, undefined, "error reading documents");
                            assert.equal(results.length, 1, "initial number of documents should be equal 1");
                            assert.equal(results[0].name, "xyz", "fetched document should have 'name: xyz'");
                            assert.equal(results[0].id, document.id, "fetched document should be valid");
                            done();
                        });
                    });
                });
            });
        });
    });

    describe("Newly created documents should be fetched incrementally", function(done) {
        // create collection and one document
        before(function (done) {
            createCollection( function () {
                client.createDocument(getCollectionLink(isNameBased, db, collection), {id: "doc1"}, function (err, document) {
                    assert.equal(err, undefined, "error creating first initial document");
                    done();
                });
            });
        });

        after(function(done) {
            deleteCollection(done);
        });

        it("should fetch new documents only", function(done) {
            var options = { a_im: "Incremental feed" };
            var collLink = getCollectionLink(isNameBased, db, collection);
            var query = client.readDocuments(collLink, options);

            query.current( function(err, result, headers) {
                assert.equal(err, undefined, "unexpected failure in listDocuments request" + JSON.stringify(err));
                assert(headers.etag, "listDocuments response should have etag header");


                client.createDocument(collLink, { id: "doc2", prop: 1 }, function (err, document) {
                    assert.equal(err, undefined, "error creating document");
                    
                    options = {
                        a_im: "Incremental feed",
                        accessCondition: {
                            type: "IfNoneMatch",
                            condition: headers.etag
                        }
                    };
                    var query = client.readDocuments(collLink, options);
                    query.current(function(err, result, headers) {
                        assert.equal(err, undefined, "error reading current document");

                        assert.notDeepEqual(result, document, "actual should not match with expected value.");
                        delete result._lsn;
                        assert.deepEqual(result, document, "actual value doesn't match with expected value.");
                        

                        options.accessCondition.condition = headers.etag;

                        client.readDocuments(collLink, options).toArray(function(err, results) {
                            assert.equal(err, undefined, "error reading current documents");
                            assert.equal(results.length, 0, "should be nothing new");

                            client.createDocument(collLink, {id: "doc3"}, function (err, document) {
                                client.createDocument(collLink, {id: "doc4"}, function (err, document) {
                                    client.readDocuments(collLink, options).toArray(function(err, results) {
                                        assert.equal(err, undefined, "error reading current document");
                                        assert.equal(results.length, 2, "there should be 2 results");
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });


});
