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
    UriFactory = require("../lib/uriFactory").UriFactory,
    DocumentDBClient = lib.DocumentClient;

var host = testConfig.host;
var masterKey = testConfig.masterKey;


describe("URI Factory Tests", function () {

    var executeExceptionThrowingFunction = function (func) {
        var isThrown = false;
        try {
            func();
        }
        catch (err) {
            isThrown = true;
        }
        assert(isThrown, "function did not throw an exception");
    }

    describe("Create Database URI", function () {
        var createDatabaseUriTest = function (dbId, expectedUri) {
            assert.equal(UriFactory.createDatabaseUri(dbId), expectedUri, "error invalid database URI");
        }

        it("Normal database Id", function () {
            createDatabaseUriTest("database1", "dbs/database1");
        });

        it("Empty database Id", function () {
            executeExceptionThrowingFunction(function () {
                createDatabaseUriTest("", "exception")
            });
        });

        it("Database Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createDatabaseUriTest("db?1", "exception");
            });
        });
    });

    describe("Create Collection URI", function () {
        var createCollectionUriTest = function (dbId, collId, expectedUri) {
            assert.equal(UriFactory.createDocumentCollectionUri(dbId, collId), expectedUri);
        }

        it("Normal database & collection IDs", function () {
            createCollectionUriTest("db1", "col1", "dbs/db1/colls/col1");
        });

        it("Empty collection Id", function () {
            executeExceptionThrowingFunction(function () {
                createCollectionUriTest("db1", "", "must throw exception");
            });
        });

        it("Collection Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createCollectionUriTest("db1", "coll?", "exception");
            });
        });
    });

    describe("Create User URI", function () {
        var createUserUriTest = function (dbId, userId, expectedUri) {
            assert.equal(UriFactory.createUserUri(dbId, userId), expectedUri);
        };

        it("Noramal Database Id & User Id", function () {
            createUserUriTest("db1", "user1", "dbs/db1/users/user1");
        });

        it("Empty user Id", function () {
            executeExceptionThrowingFunction(function () {
                createUserUriTest("db1", null, "exception");
            });
        });

        it("User Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createUserUriTest("db1", "user\\1", "exception");
            });
        });

    });

    describe("Create Document URI", function () {
        var createDocumentUriTest = function (dbId, collId, docId, expectedUri) {
            assert.equal(UriFactory.createDocumentUri(dbId, collId, docId), expectedUri);
        }

        it("Normal database Id, collection Id and, document Id", function () {
            createDocumentUriTest("db1", "coll1", "doc1", "dbs/db1/colls/coll1/docs/doc1");
        });

        it("Empty document Id", function () {
            executeExceptionThrowingFunction(function () {
                createDocumentUriTest("db1", "coll1", undefined, "exception");
            });
        });

        it("Document Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createDocumentUriTest("db1", "coll1", "?doc1", "exception");
            });
        });
    });

    describe("Create Permission URI", function () {
        var createPermissionUriTest = function (dbId, userId, permId, expectedUri) {
            assert.equal(UriFactory.createPermissionUri(dbId, userId, permId), expectedUri);
        }

        it("Normal database Id, user Id and, permission Id", function () {
            createPermissionUriTest("db1", "user1", "perm1", "dbs/db1/users/user1/permissions/perm1");
        });

        it("Empty permission Id", function () {
            executeExceptionThrowingFunction(function () {
                createPermissionUriTest("db1", "user1", "   ", "exception");
            });
        });

        it("Permission Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createPermissionUriTest("db1", "user1", "perm/1", "exception");
            });
        });
    });

    describe("Create StoredProcedure URI", function () {
        var createStoredProcedureUriTest = function (dbId, collId, sprocId, expectedUri) {
            assert.equal(UriFactory.createStoredProcedureUri(dbId, collId, sprocId), expectedUri);
        }

        it("Normal database Id, collection Id and, storedProcedure Id", function () {
            createStoredProcedureUriTest("db1", "col1", "sproc1", "dbs/db1/colls/col1/sprocs/sproc1");
        });

        it("Empty storedProcedure Id", function () {
            executeExceptionThrowingFunction(function () {
                createStoredProcedureUriTest("db1", "col1", "", "exception");
            });
        });

        it("StoredProcedure Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createStoredProcedureUriTest("db1", "col1", "\sproc 1", "exception");
            });
        });
    });

    describe("Create Trigger URI", function () {
        var createTriggerUriTest = function (dbId, collId, trgId, expectedUri) {
            assert.equal(UriFactory.createTriggerUri(dbId, collId, trgId), expectedUri);
        }

        it("Normal database Id, collection Id and, trigger Id", function () {
            createTriggerUriTest("db1", "col1", "trig1", "dbs/db1/colls/col1/triggers/trig1");
        });

        it("Empty trigger Id", function () {
            executeExceptionThrowingFunction(function () {
                createTriggerUriTest("db1", "col1", null, "exception");
            });
        });

        it("trigger Id with illegals chars", function () {
            executeExceptionThrowingFunction(function () {
                createTriggerUriTest("db1", "col1", "tr?iger", "exception");
            });
        });
    });

    describe("Create User-Defined-Function URI", function () {
        var createUserDefinedFunctionUriTest = function (dbId, collId, udfId, expectedUri) {
            assert.equal(UriFactory.createUserDefinedFunctionUri(dbId, collId, udfId), expectedUri);
        }

        it("Normal database Id, collection Id and, UDF Id", function () {
            createUserDefinedFunctionUriTest("db1", "col1", "udf1", "dbs/db1/colls/col1/udfs/udf1");
        });

        it("Empty UDF Id", function () {
            executeExceptionThrowingFunction(function () {
                createUserDefinedFunctionUriTest("db1", "col1", undefined, "exception");
            });
        });

        it("UDF Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createUserDefinedFunctionUriTest("db1", "col1", "u/df1/", "exception");
            });
        });
    });

    describe("Create Conflict URI", function () {
        var createConflictUriTest = function (dbId, collId, confId, expectedUri) {
            assert.equal(UriFactory.createConflictUri(dbId, collId, confId), expectedUri);
        }

        it("Normal database Id, collection Id and, conflict Id", function () {
            createConflictUriTest("db1", "col1", "conf1", "dbs/db1/colls/col1/conflicts/conf1");
        });

        it("Empty conflict Id", function () {
            executeExceptionThrowingFunction(function () {
                createConflictUriTest("db1", "col1", "    ", "exception");
            });
        });

        it("Conflict Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createConflictUriTest("db1", "col1", "\\conf\\1", "exception");
            });
        });
    });

    describe("Create Attachment URI", function () {
        var createAttachmentUriTest = function (dbId, collId, docId, atchId, expectedUri) {
            assert.equal(UriFactory.createAttachmentUri(dbId, collId, docId, atchId), expectedUri);
        }

        it("Normal database Id, collection Id and, document Id, attachmentId", function () {
            createAttachmentUriTest("db1", "coll1", "doc1", "atch1", "dbs/db1/colls/coll1/docs/doc1/attachments/atch1");
        });

        it("Empty attachment Id", function () {
            executeExceptionThrowingFunction(function () {
                createAttachmentUriTest("db1", "coll1", "doc1", null, "exception");
            });
        });

        it("Attachment Id with illegal chars", function () {
            executeExceptionThrowingFunction(function () {
                createAttachmentUriTest("db1", "coll1", "d   ?oc1", "atch?#1", "exception");
            });
        });
    });

    describe("Create PartitionKeyRanges URI", function () {
        var createPartitionKeyRangesUriTest = function (dbId, collId, expectedUir) {
            assert.equal(UriFactory.createPartitionKeyRangesUri(dbId, collId), expectedUir);
        }

        it("Normal database & collection IDs", function () {
            createPartitionKeyRangesUriTest("db1", "col1", "dbs/db1/colls/col1/pkranges");
        });
    });

    describe("Use uriFactory in integration with other methods", function () {
        var testDatabaseId = "uriFactoryTestDb";

        var client = new DocumentDBClient(host, { masterKey: masterKey });

        var deleteDatabases = function (done) {
            client.readDatabases().toArray(function (err, databases) {
                if (err) {
                    console.log("error occured reading databases", err);
                    return done();
                }

                var index = databases.length;
                if (index === 0) {
                    return done();
                }

                databases.forEach(function (database) {
                    index--;
                    if (database.id === testDatabaseId) {
                        client.deleteDatabase(database._self, function (err, db) {
                            if (err) {
                                console.log("error occured deleting databases", err);
                                return done();
                            }
                        });
                    }
                    if (index === 0) {
                        return done();
                    }
                });
            });
        }

        var createDocumentUsingUriFactory = function (databaseId, collectionId, documentId, done) {
            client.createDatabase({ id: databaseId }, function (err, database) {
                assert.equal(err, undefined, "error creating database");
                assert.equal(database.id, databaseId, "invalid database Id");

                var databaseUri = UriFactory.createDatabaseUri(databaseId);
                var collectionBody = {
                    id: collectionId,
                    indexingPolicy: { indexingMode: "Lazy" } //Modes : Lazy, Consistent
                };
                client.createCollection(databaseUri, collectionBody, function (err, collection) {
                    assert.equal(err, undefined, "error creating collection" + err);
                    assert.equal(collection.id, collectionBody.id, "invalid collection Id");

                    var collectionUri = UriFactory.createDocumentCollectionUri(databaseId, collectionId);
                    var documentBody = {
                        id: documentId,
                        context: "something to consume space"
                    };
                    client.createDocument(collectionUri, documentBody, function (err, document) {
                        assert.equal(err, undefined, "error creating document");
                        assert.equal(document.id, documentId, "invalid document Id");
                        done();
                    });
                });
            });
        }

        afterEach(function (done) { deleteDatabases(done) });
        beforeEach(function (done) { deleteDatabases(done) });

        it("check uriFactory generates valid URIs when resource Ids contain unicode", function (done) {
            createDocumentUsingUriFactory(testDatabaseId, "डेटाबेस پایگاه داده 数据库", "doc1", done);
        });
    });
});

