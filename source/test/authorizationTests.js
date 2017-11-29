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

var assert = require("assert"),
    lib = require("../lib/"),
    testConfig = require("./_testConfig.js"),
    DocumentBase = lib.DocumentBase,
    UriFactory = lib.UriFactory;

var Base = lib.Base,
    DocumentDBClient = lib.DocumentClient;

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("Authorization bug fix Test", function () {
    /************** VARIABLES **************/
    this.timeout(5000);
    var client = new DocumentDBClient(host, { masterKey: masterKey });

    var database = { id: "dbs" };
    var collection = { id: "colls" };

    var userReadPermission = { id: "User With Read Permission" };
    var userAllPermission = { id: "User With All Permission" };
    var collReadPermission = {
        id: "collection Read Permission",
        permissionMode: DocumentBase.PermissionMode.Read
    };
    var collAllPermission = {
        id: "collection All Permission",
        permissionMode: DocumentBase.PermissionMode.All
    };

    /************** METHODS **************/

    var assertError = function (message, error) {
        if (error) {
            assert.fail("code: " + error.code + " " + message + error.body);
        }
    }

    var cleanup = function (dbId, done) {
        client.deleteDatabase(UriFactory.createDatabaseUri(dbId), function (err, db) {
            //resource not found error
            if (err && err.code == 404) {
                return done();
            }

            assertError("error deleting database:", err);
            return done();
        });
    };

    var createResources = function (callback) {
        //create a database
        client.createDatabase(database, function (err, db) {
            assertError("error creating database: ", err);
            assert.equal(db.id, database.id, "database is not created properly");
            database = db;

            //create userReadPermission
            client.createUser(database._self, userReadPermission, function (err, user) {
                assertError("error creating userReadPermission: ", err);
                assert.equal(userReadPermission.id, user.id, "userReadPermission is not created properly");
                userReadPermission = user;

                //create collection
                client.createCollection(database._self, collection, function (err, coll) {
                    assertError("error creating document: ", err);
                    assert.equal(collection.id, coll.id, "coll1 is not created properly");
                    collection = coll;

                    //give permission to read collection, to userReadPermission
                    collReadPermission.resource = collection._self;
                    client.createPermission(userReadPermission._self, collReadPermission, function (err, readPermission) {
                        assertError("error creating permission: ", err);
                        assert.equal(readPermission.id, collReadPermission.id, "permission to read coll1 is not created properly");
                        collReadPermission = readPermission;

                        //create userAllPermission
                        client.createUser(database._self, userAllPermission, function (err, userAllPerm) {
                            assertError("error creating userAllPermission: ", err);
                            assert.equal(userAllPermission.id, userAllPerm.id, "userAllPermission is not created properly");
                            userAllPermission = userAllPerm;

                            collAllPermission.resource = collection._self;
                            client.createPermission(userAllPermission._self, collAllPermission, function (err, allPermission) {
                                assertError("error creating permission: ", err);
                                assert.equal(collAllPermission.id, allPermission.id, "permission to read coll2 is not created properly");

                                //permissions.push(permission);
                                collAllPermission = allPermission;
                                callback();
                            });
                        });
                        //create all permission for coll

                    });
                });

            });
        });
    };

    var accessCollectionByPermission = function (documentClient, link, callback) {
        //read collection
        documentClient.readCollection(link, function (err, collection) {
            assertError("error reading collection", err);
            assert.equal(collection.id, collection.id, "invalid collection");

            if (callback) {
                callback();
            }

        });
    };

    var modifyCollectionByPermission = function (documentClient, link, callback) {
        //read collection
        documentClient.deleteCollection(link, function (err, collection) {
            assertError("error deleting collection", err);

            if (callback) {
                callback();
            }

        });
    };
    /************** TEST **************/

    beforeEach(function (done) {
        cleanup(database.id, done);
    });

    afterEach(function (done) {
        cleanup(database.id, done);
    });

    it("Accessing collection by resourceTokens", function (done) {
        createResources(function () {
            var rTokens = {};
            rTokens[collection.id] = collReadPermission._token;

            var collectionUri = UriFactory.createDocumentCollectionUri(database.id, collection.id);
            var clientReadPermission = new DocumentDBClient(host, { resourceTokens: rTokens });

            accessCollectionByPermission(clientReadPermission, collectionUri, done);
        });
    });

    it("Accessing collection by permissionFeed", function (done) {
        createResources(function () {
            var clientReadPermission = new DocumentDBClient(host, { permissionFeed: [collReadPermission] });

            //self link must be used to access a resource using permissionFeed
            accessCollectionByPermission(clientReadPermission, collection._self, done);
        });
    });

    it("Accessing collection withot permission fails", function (done) {
        createResources(function () {
            var clientNoPermission = new DocumentDBClient(host);

            var collectionUri = UriFactory.createDocumentCollectionUri(database.id, collection.id);
            clientNoPermission.readCollection(collectionUri, function (err, coll) {
                assert(err !== undefined, "unauthorized access to database did not fail");
                done();
            });
        });
    });

    it("Accessing document by permissionFeed of parent collection", function (done) {
        createResources(function () {
            client.createDocument(collection._self, { id: "document1" }, function (err, createdDoc) {
                var clientReadPermission = new DocumentDBClient(host, { permissionFeed: [collReadPermission] });
                assertError("error creating document", err);
                assert.equal("document1", createdDoc.id, "invalid documnet create");

                clientReadPermission.readDocument(createdDoc._self, function (err, readDoc) {
                    assertError("error reading document with parent permission", err);
                    assert.equal(readDoc.id, createdDoc.id, "invalid document read");

                    done();
                });
            });
        });
    });

    it("Modifying collection by resourceTokens", function (done) {
        createResources(function () {
            var rTokens = {};
            rTokens[collection.id] = collAllPermission._token;

            var collectionUri = UriFactory.createDocumentCollectionUri(database.id, collection.id);
            var clientAllPermission = new DocumentDBClient(host, { resourceTokens: rTokens });

            modifyCollectionByPermission(clientAllPermission, collectionUri, done);
        });
    });

    it("Modifying collection by permissionFeed", function (done) {
        createResources(function () {
            var clientAllPermission = new DocumentDBClient(host, { permissionFeed: [collAllPermission] });

            //self link must be used to access a resource using permissionFeed
            modifyCollectionByPermission(clientAllPermission, collection._self, done);
        });
    });
});
