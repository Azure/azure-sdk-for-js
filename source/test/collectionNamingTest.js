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
    testConfig = require("./_testConfig.js"),
    Stream = require("stream"),
    DocumentDBClient = lib.DocumentClient,
    UriFactory = lib.UriFactory;

var host = testConfig.host;
var masterKey = testConfig.masterKey;


describe("Collection Naming Test", function () {

    /**************** VARIABLES ****************/
    var client = new DocumentDBClient(host, { masterKey: masterKey });
    var databaseId = "collNamingTestDB";
    var collectionId = "media";
    var documentId = "doc1";
    var attachmentId = "atch1";

    /************** METHODS **************/
    var assertError = function (error, message) {
        if (error) {
            assert.fail("code: " + error.code+ " " + message + error.body);
        }
    }

    var cleanup = function (dbId, done) {
        client.deleteDatabase(UriFactory.createDatabaseUri(dbId), function (err, db) {
            if (err && err.code === 404) {
                return done();
            }

            assertError(err, "error deleting database");
            return done();
        });
    };

    var createReadableStream = function (firstChunk, secondChunk) {
        var readableStream = new Stream.Readable();
        var chunkCount = 0;
        readableStream._read = function (n) {
            if (chunkCount === 0) {
                this.push(firstChunk || "first chunk ");
            } else if (chunkCount === 1) {
                this.push(secondChunk || "second chunk");
            } else {
                this.push(null);
            }
            chunkCount++;
        };

        return readableStream;
    };

    var createResources = function (specialName, callback) {
        //create database
        client.createDatabase({ id: databaseId }, function (err, db) {
            assertError(err, "error creating database");
            assert.equal(db.id, databaseId, "database is not created properly");

            //create collection
            var dbUri = UriFactory.createDatabaseUri(databaseId);
            client.createCollection(dbUri, { id: collectionId }, function (err, collection) {
                assertError(err, "error creating collection");
                assert.equal(collection.id, collectionId, "collection is not created properly");

                //createDocument
                var collectionUri = UriFactory.createDocumentCollectionUri(databaseId, collectionId);
                client.createDocument(collectionUri, { id: documentId }, function (err, document) {
                    assertError(err, "error creating document");
                    assert.equal(document.id, documentId, "document is not created properly");

                    //create attachment and upload media
                    var mediaOption = { slug: attachmentId, contentType: "application/text" };
                    var readableStream = createReadableStream("UPLOADING ", "MEDIA");
                    var documentUri = UriFactory.createDocumentUri(databaseId, collectionId, documentId);
                    client.createAttachmentAndUploadMedia(documentUri, readableStream, mediaOption, function (err, attachment) {
                        assertError(err, "error creating attachment");
                        assert.equal(attachment.id, attachmentId, "attachment is not created properly");
                        callback();
                    });
                });
            });
        });
    };

    var readCollectionWithSpecialName = function (specialName, done) {
        var collectionUri = UriFactory.createDocumentCollectionUri(databaseId, collectionId);
        client.readCollection(collectionUri, function (err, collection) {
            assertError(err, "error reading collection [" + collectionId + "]");
            assert.equal(collection.id, collectionId, "collectionIds do not match");
            done();
        });
    };

    var readMedia = function (done) {
        //read attachment
        var attachmentUri = UriFactory.createAttachmentUri(databaseId, collectionId, documentId, attachmentId);
        client.readAttachment(attachmentUri, function (err, attachment) {
            assertError(err, "error reading attachment");
            assert.equal(attachment.id, attachmentId, "attachmentIds don't match");

            //read media
            client.readMedia(attachment.media, function (err, media) {
                assertError(err, "error reading media");
                assert.equal(media, "UPLOADING MEDIA");
                done();
            });
        });
    };

    /************** TESTS **************/
    beforeEach(function (done) {
        cleanup(databaseId, done);
    });

    afterEach(function (done) {
        cleanup(databaseId, done);
    });

    it("Accessing a collection with 'media' in its name", function (done) {
        createResources("media", function () {
            readCollectionWithSpecialName("media", done);
        });
    });

    it("Accessing media in a collection", function (done) {
        createResources("media", function () {
            readCollectionWithSpecialName("media", done);
        });
    });
});