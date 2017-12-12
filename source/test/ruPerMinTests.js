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
    DocumentBase = lib.DocumentBase,
    Constants = lib.Constants,
    UriFactory = lib.UriFactory;

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("RU Per Minute", function () {
    var client = new DocumentDBClient(host, { masterKey: masterKey });

    var removeAllDatabases = function(done) {
        client.readDatabases().toArray(function(err, databases) {
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
            databases.forEach(function(database) {
                client.deleteDatabase(database._self, function(err, db) {
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

    var databaseLink = undefined;
    var createDatabase = function (done) {
        client.createDatabase({ id: "Database" }, function (err, createdDB) {
            assert.equal(err, undefined, "error creating database ");
            databaseLink = UriFactory.createDatabaseUri(createdDB.id);
            done();
        });
    }

    //- removes all the databases, 
    //  - creates a new database,
    beforeEach(function(done) {
        removeAllDatabases(function() {
            return createDatabase(function() {
                done();
            });
        });
    });

    //- removes all the databases, 
    afterEach(function (done) {
        removeAllDatabases(function () {
            done();
        });
    });

    xit("Create Collection with RU Per Minute Offer", function(done) {
        var collectionDefinition = {
            id: "sample col"
        };

        var options = {
            offerEnableRUPerMinuteThroughput: true,
            offerVersion: "V2",
            offerThroughput: 400
        };

        client.createCollection(databaseLink, collectionDefinition, options, function(err, collection) {
            assert.equal(err, undefined, "Error in creating collection");

            var validateOffer = function(error, offers) {
                assert.equal(error, undefined, "unexpected failure in reading offers");
                assert.equal(offers.length, 1);
                var offer = offers[0];

                assert.equal(offer.offerType, "Invalid");
                assert.notEqual(offer.content, undefined);
                assert.equal(offer.content.offerIsRUPerMinuteThroughputEnabled, true);

                done();
            };

            var queryIterator = client.readOffers().toArray(validateOffer);
        });
    });

    xit("Create Collection without RU Per Minute Offer", function (done) {
        var collectionDefinition = {
            id: "sample col"
        };

        var options = {
            offerVersion: "V2",
            offerThroughput: 400
        };

        client.createCollection(databaseLink, collectionDefinition, options, function (err, collection) {
            assert.equal(err, undefined, "Error in creating collection");

            var validateOffer = function (error, offers) {
                assert.equal(error, undefined, "unexpected failure in reading offers");
                assert.equal(offers.length, 1);
                var offer = offers[0];

                assert.equal(offer.offerType, "Invalid");
                assert.notEqual(offer.content, undefined);
                assert.equal(offer.content.offerIsRUPerMinuteThroughputEnabled, false);

                done();
            };

            var queryIterator = client.readOffers().toArray(validateOffer);
        });
    });

    xit("Create Collection with RU Per Minute Offer and insert Document with disableRUPerMinuteUsage options", function (done) {
        var collectionDefinition = {
            id: "sample col"
        };

        var options = {
            offerEnableRUPerMinuteThroughput: true,
            offerVersion: "V2",
            offerThroughput: 400
        };

        client.createCollection(databaseLink, collectionDefinition, options, function (err, collection) {
            assert.equal(err, undefined, "Error in creating collection");
            var collectionLink = collection._self;
            var options = {
                disableRUPerMinuteUsage: true
            };
            client.createDocument(collectionLink, { id : "sample document"}, options, function(err, document, headers) {
                assert.equal(err, undefined, "Error in creating document");
                assert(headers[Constants.HttpHeaders.IsRUPerMinuteUsed] != true);
                done();
            });
        });
    });
});