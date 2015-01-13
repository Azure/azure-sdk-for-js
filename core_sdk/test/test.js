//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

'use strict';

var DocumentDBClient = require("documentdb").DocumentClient
  , DocumentBase = require("documentdb").DocumentBase
  , assert = require("assert")
  , testConfig = require('./_testConfig')
  , Stream = require("stream");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("NodeJS CRUD Tests", function(){

    // remove all databases from the endpoint before each test
    beforeEach(function(done){
        var client = new DocumentDBClient(host, {masterKey: masterKey});
        client.readDatabases().toArray(function(err, databases) {
             if (err !== undefined) { 
                console.log("An error occured", err);
                return done();
            }
            
            var length = databases.length;
            
            if(length === 0){
                return done();
            }
            
            var count = 0;
            databases.forEach(function(database){
                client.deleteDatabase(database._self, function(err, db){
                    if (err !== undefined) { 
                        console.log("An error occured", err);
                        return done();
                    }

                    count++;
                    if(count === length){
                        done();
                    }
                });
            });
        });
    });

    describe("Validate Database CRUD", function(){
        it("[nativeApi] Should do database CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // read databases
            client.readDatabases().toArray(function(err, databases) {
                assert.equal(err, undefined, "error reading databases");
                assert.equal(databases.constructor, Array, "Value should be an array");
                // create a database
                var beforeCreateDatabasesCount = databases.length;
                var databaseDefinition = { id: "sample database" };
                client.createDatabase(databaseDefinition, function(err, db){
                    assert.equal(err, undefined, "error creating database");
                    assert.equal(db.id, databaseDefinition.id);
                    // read databases after creation
                    client.readDatabases().toArray(function(err, databases) {
                        assert.equal(databases.length, beforeCreateDatabasesCount + 1, "create should increase the number of databases");
                        // query databases
                        var querySpec = {
                            query: 'SELECT * FROM root r WHERE r.id=@id',
                            parameters: [
                                {
                                    name: '@id',
                                    value: databaseDefinition.id
                                }
                            ]
                        };
                        client.queryDatabases(querySpec).toArray(function (err, results) {
							assert(results.length > 0, "number of results for the query should be > 0");
							//replace database 
							db.id = "replaced db";
							client.replaceDatabase(db._self, db, function(error, replacedDb){
								assert.equal(replacedDb.id, "replaced db", "Db name should change");
								assert.equal(db.id, replacedDb.id, "Db id should stay the same");
								// read database
								client.readDatabase(replacedDb._self, function(err, database) {
									assert.equal(err, undefined, "readDatabase should work successfully");
									assert.equal(replacedDb.id, database.id);
									// delete database
									client.deleteDatabase(replacedDb._self, function(err, res){
										// read database after deletion
										client.readDatabase(db._self, function(err, database) {
											var notFoundErrorCode = 404;
											assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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

    describe("Validate Queries CRUD", function () {
        it("[nativeApi] Should do queries CRUD operations successfully", function (done) {
            var client = new DocumentDBClient(host, { masterKey: masterKey });
            // create a database
            var databaseDefinition = { id: "sample database" };
            client.createDatabase(databaseDefinition, function (err, db) {
                assert.equal(err, undefined, "error creating database");
                assert.equal(db.id, databaseDefinition.id);
                // query databases
                var querySpec0 = {
                    query: 'SELECT * FROM root r WHERE r.id=@id',
                    parameters: [
                        {
                            name: '@id',
                            value: databaseDefinition.id
                        }
                    ]
                };
                client.queryDatabases(querySpec0).toArray(function (err, results) {
                    assert(results.length > 0, "number of results for the query should be > 0");
                    var querySpec1 = {
                        query: 'SELECT * FROM root r WHERE r.id="' + databaseDefinition.id + '"'
                    };
                    client.queryDatabases(querySpec1).toArray(function (err, results) {
                        assert(results.length > 0, "number of results for the query should be > 0");
                        var querySpec2 = 'SELECT * FROM root r WHERE r.id="' + databaseDefinition.id + '"';
                        client.queryDatabases(querySpec2).toArray(function (err, results) {
                            assert(results.length > 0, "number of results for the query should be > 0");
                            done();
                        });
                    });
                });
            });
        });
    });

    describe("Validate Collection CRUD", function(){
        it("[nativeApi] Should do collection CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                client.readCollections(db._self).toArray(function(err, collections) {
                    assert.equal(err, undefined, "error reading collections");
                    assert.equal(collections.constructor, Array, "Value should be an array");
                    // create a collection
                    var beforeCreateCollectionsCount = collections.length;
                    var collectionDefinition = { id: "sample collection" };
                    client.createCollection(db._self, collectionDefinition, function(err, collection){
                        assert.equal(err, undefined, "error creatong collection");
                        assert.equal(collection.id, collectionDefinition.id);
                        // read collections after creation
                        client.readCollections(db._self).toArray(function(err, collections) {
                            assert.equal(collections.length, beforeCreateCollectionsCount + 1, "create should increase the number of collections");
                            // query collections
                            var querySpec = {
                                query: 'SELECT * FROM root r WHERE r.id=@id',
                                parameters: [
                                    {
                                        name: '@id',
                                        value: collectionDefinition.id
                                    }
                                ]
                            };
							client.queryCollections(db._self, querySpec).toArray(function(err, results) {
								assert(results.length > 0, "number of results for the query should be > 0");								
								// read collection
								client.readCollection(collection._self, function(err, collection) {
									assert.equal(err, undefined, "readCollection should work successfully");
									assert.equal(collection.id, collection.id);
									// delete collection
									client.deleteCollection(collection._self, function(err, res){
										// read collection after deletion
										client.readCollection(collection._self, function(err, collection) {
											var notFoundErrorCode = 404;
											assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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

    describe("Validate Document CRUD", function(){
        it("[nativeApi] Should do document CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection){
                    // read documents
                    client.readDocuments(collection._self).toArray(function(err, documents) {
                        assert.equal(err, undefined, "error reading documents");
                        assert.equal(documents.constructor, Array, "Value should be an array");
                        // create a document
                        var beforeCreateDocumentsCount = documents.length;
                        var documentDefinition = { name: "sample document", foo: "bar", key: "value", replace: "new property" };
						client.createDocument(collection._self, documentDefinition, {disableAutomaticIdGeneration: true}, function(err, document) {
							assert(err !== undefined, "should throw an error because automatic id generation is disabled");
							client.createDocument(collection._self, documentDefinition, function(err, document){
								assert.equal(err, undefined, "error creating document");
								assert.equal(document.name, documentDefinition.name);
								assert(document.id !== undefined);
								// read documents after creation
								client.readDocuments(collection._self).toArray(function(err, documents) {
									assert.equal(documents.length, beforeCreateDocumentsCount + 1, "create should increase the number of documents");
								    // query documents
									var querySpec = {
									    query: 'SELECT * FROM root r WHERE r.id=@id',
									    parameters: [
                                            {
                                                name: '@id',
                                                value: document.id
                                            }
									    ]
									};
									client.queryDocuments(collection._self, querySpec).toArray(function(err, results) {
									    assert(results.length > 0, "number of results for the query should be > 0");
										client.queryDocuments(collection._self, querySpec, { enableScanInQuery: true} ).toArray(function(err, results) {
											assert(results.length > 0, "number of results for the query should be > 0");
											//replace document 
											document.name = "replaced document";
											document.foo = "not bar";
											client.replaceDocument(document._self, document, function(error, replacedDocument) {
												assert.equal(replacedDocument.name, "replaced document", "document name property should change");
												assert.equal(replacedDocument.foo, "not bar", "property should have changed");
												assert.equal(document.id, replacedDocument.id, "document id should stay the same");
												// read document
												client.readDocument(replacedDocument._self, function(err, document) {
													assert.equal(err, undefined, "readDocument should work successfully");
													assert.equal(replacedDocument.id, document.id);
													// delete document
													client.deleteDocument(replacedDocument._self, function(err, res){
														// read documents after deletion
														client.readDocument(document._self, function(err, document) {
															var notFoundErrorCode = 404;
															assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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
                });
            });
        });
    });
    
    describe("Validate Attachment CRUD", function(){
        var createReadableStream = function(firstChunk, secondChunk){
            var readableStream = new Stream.Readable();
            var chunkCount = 0;
            readableStream._read = function(n){
                if(chunkCount === 0){
                    this.push(firstChunk || "first chunk ");
                } else if(chunkCount === 1) {
                    this.push(secondChunk || "second chunk");
                } else {
                    this.push(null);
                }
                chunkCount++;
            };
            
            return readableStream;
        };
        
        var readMediaResponse = function(response, callback){
            var data = "";
            response.on("data", function(chunk) { 
                data += chunk;
            });
            response.on("end", function() {
                if (response.statusCode >= 300) {
                    return callback({code:response.statusCode, body:data});
                }

                return callback(undefined, data);
            });
        };
        
        it("[nativeApi] Should do attachment CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection){
                    // create document
                    client.createDocument(collection._self, { id: "sample document", foo: "bar", key: "value" }, function(err, document){
                        // list all attachments
                        client.readAttachments(document._self).toArray(function(err, attachments){
                            assert.equal(err, undefined, "error reading attachments");
                            assert.equal(attachments.constructor, Array, "Value should be an array");
                            var initialCount = attachments.length;
                            var validMediaOptions = { slug: "attachment name", contentType: "application/text" };
                            var invalidMediaOptions = { slug: "attachment name", contentType: "junt/test" };
                            // create attachment with invalid content-type
                            var contentStream = createReadableStream();
                            client.createAttachmentAndUploadMedia(document._self, contentStream, invalidMediaOptions, function(err, attachment){
                                assert(err !== undefined, "create attachment should return error on invalid mediatypes");
                                var badRequestErrorCode = 400;
                                assert.equal(err.code, badRequestErrorCode);
                                contentStream = createReadableStream();
                                // create streamed attachment with valid content-type
                                client.createAttachmentAndUploadMedia(document._self, contentStream, validMediaOptions, function(err, validAttachment){
                                    assert.equal(err, undefined, "error creating valid attachment");
                                    assert.equal(validAttachment.id,  "attachment name", "name of created attachment should be the same as the one in the request");
                                    contentStream = createReadableStream();
                                    // create colliding attachment
                                    var content2 = "bug";
                                    client.createAttachmentAndUploadMedia(document._self, contentStream, validMediaOptions, function(err, attachment){
                                        assert(err !== undefined, "create conflicting attachment should return error on conflicting names");
                                        var conflictErrorCode = 409;
                                        assert.equal(err.code, conflictErrorCode);
                                        contentStream = createReadableStream();                                        
                                        // create attachment with media link
                                        var dynamicAttachment = { id: "dynamic attachment", media: "http://xstore.", MediaType: "Book", Author:"My Book Author", Title:"My Book Title", contentType:"application/text" };
                                        client.createAttachment(document._self, dynamicAttachment, function(err, attachment){
                                            assert.equal(err, undefined, "error creating valid attachment");
                                            assert.equal(attachment.MediaType, "Book", "invalid media type");
                                            assert.equal(attachment.Author, "My Book Author", "invalid property value");
                                             // list all attachments
                                            client.readAttachments(document._self).toArray(function(err, attachments){
                                                assert.equal(err, undefined, "error reading attachments");
                                                assert.equal(attachments.length, initialCount + 2, "number of attachments should've increased by 2");
                                                attachment.Author = "new author";
                                                //replace the attachment
                                                client.replaceAttachment(attachment._self, attachment, function(err, attachment){      
                                                    assert.equal(err, undefined, "error replacing attachment");
                                                    assert.equal(attachment.MediaType, "Book", "invalid media type");
                                                    assert.equal(attachment.Author, "new author", "invalid property value");
                                                    // read attachment media
                                                    client.readMedia(validAttachment.media, function(err, mediaResponse){
                                                        assert.equal(err, undefined, "error reading attachment media");
                                                        assert.equal(mediaResponse, "first chunk second chunk");
                                                        contentStream = createReadableStream("modified first chunk ", "modified second chunk");
                                                        // update attachment media
                                                        client.updateMedia(validAttachment.media, contentStream, validMediaOptions, function(err, mediaResult){
                                                            assert.equal(err, undefined, "error update media");
                                                            // read attachment media after update
                                                            // read media buffered
                                                            client.readMedia(validAttachment.media, function(err, mediaResponse){
                                                                assert.equal(err, undefined, "error reading media");
                                                                assert.equal(mediaResponse, "modified first chunk modified second chunk");
                                                                // read media streamed
                                                                client.connectionPolicy.MediaReadMode = DocumentBase.MediaReadMode.Streamed;
                                                                client.readMedia(validAttachment.media, function(err, mediaResponse){
                                                                    assert.equal(err, undefined, "error reading media");
                                                                    readMediaResponse(mediaResponse, function(err, mediaResult){
                                                                        assert.equal(err, undefined, "error reading media");
                                                                        assert.equal(mediaResult, "modified first chunk modified second chunk");
                                                                        // share attachment with a second document
                                                                        client.createDocument(collection._self, {id: "document 2"}, function(err, document){
                                                                            var secondAttachment = { id: validAttachment.id, contentType: validAttachment.contentType, media: validAttachment.media };
                                                                            client.createAttachment(document._self, secondAttachment, function(err, attachment){
                                                                                assert.equal(err, undefined, "error creating attachments");
                                                                                assert.equal(validAttachment.id, attachment.id, "name mismatch");
                                                                                assert.equal(validAttachment.media, attachment.media, "media mismatch");
                                                                                assert.equal(validAttachment.contentType, attachment.contentType, "contentType mismatch");
                                                                                // deleting attachment
                                                                                client.deleteAttachment(validAttachment._self, function(err, attachment){
                                                                                    assert.equal(err, undefined, "error deleting attachments");
                                                                                    // read attachments after deletion
                                                                                    client.readAttachment(validAttachment._self, function(err, attachment){
                                                                                        var notFoundErrorCode = 404;
                                                                                        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                                                                                        done();
                                                                                    });
                                                                                })
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
                                    });
                                });
                            });
                        });
                    });  
                });
            });
        });
    });
   
    describe("Validate User CRUD", function(){
        it("[nativeApi] Should do User CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // list users
                client.readUsers(db._self).toArray(function(err, users) {
                    assert.equal(err, undefined, "error reading users");
                    assert.equal(users.constructor, Array, "Value should be an array");
                    var beforeCreateCount = users.length;
                    // create user
                    client.createUser(db._self, { id: "new user" }, function(err, user){
                        assert.equal(err, undefined, "error creating User");
                        assert.equal(user.id, "new user", "user name error");
                        // list users after creation
                        client.readUsers(db._self).toArray(function(err, users){
                            assert.equal(users.length, beforeCreateCount + 1);
                            // query users
                            var querySpec = {
                                query: 'SELECT * FROM root r WHERE r.id=@id',
                                parameters: [
                                    {
                                        name: '@id',
                                        value: 'new user'
                                    }
                                ]
                            };
							client.queryUsers(db._self, querySpec).toArray(function(err, results) {
								assert(results.length > 0, "number of results for the query should be > 0");
								//replace user 
								user.id = "replaced user";
								client.replaceUser(user._self, user, function(error, replacedUser){
									assert.equal(replacedUser.id, "replaced user", "user name should change");
									assert.equal(user.id, replacedUser.id, "user id should stay the same");
									// read user
									client.readUser(replacedUser._self, function(err, user) {
										assert.equal(err, undefined, "readUser should work successfully");
										assert.equal(replacedUser.id, user.id);
										// delete user
										client.deleteUser(user._self, function(err, res){
											assert.equal(err, undefined, "delete user should should work successfully");
											// read user after deletion
											client.readUser(user._self, function(err, user) {
												var notFoundErrorCode = 404;
												assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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
    });
    
    describe("Validate Permission CRUD", function(){
        it("[nativeApi] Should do Permission CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
				client.createCollection(db._self, { id: "sample coll" }, function(err, coll) {
					// create user
					client.createUser(db._self, { id: "new user" }, function(err, user){
						// list permissions
						client.readPermissions(user._self).toArray(function(err, permissions){
							assert.equal(err, undefined, "error reading permissions");
							assert.equal(permissions.constructor, Array, "Value should be an array");
							var beforeCreateCount = permissions.length;
							var permission = { id: "new permission", permissionMode: DocumentBase.PermissionMode.Read, resource: coll._self };
							// create permission
							client.createPermission(user._self, permission, function(err, permission){
								assert.equal(err, undefined, "error creating permission");
								assert.equal(permission.id, "new permission", "permission name error");
								// list permissions after creation
								client.readPermissions(user._self).toArray(function(err, permissions){
									assert.equal(permissions.length, beforeCreateCount + 1);
								    // query permissions
									var querySpec = {
									    query: 'SELECT * FROM root r WHERE r.id=@id',
									    parameters: [
                                            {
                                                name: '@id',
                                                value: permission.id
                                            }
									    ]
									};
									client.queryPermissions(user._self, querySpec).toArray(function(err, results) {
										assert(results.length > 0, "number of results for the query should be > 0");
										//replace permission 
										permission.id = "replaced permission";
										client.replacePermission(permission._self, permission, function(error, replacedPermission){
											assert.equal(replacedPermission.id, "replaced permission", "permission name should change");
											assert.equal(permission.id, replacedPermission.id, "permission id should stay the same");
											// read permission
											client.readPermission(replacedPermission._self, replacedPermission.id, function(err, permission) {
												assert.equal(err, undefined, "readUser should work successfully");
												assert.equal(replacedPermission.id, permission.id);
												// delete permission
												client.deletePermission(replacedPermission._self, function(err, res){
													assert.equal(err, undefined, "delete permission should should work successfully");
													// read permission after deletion
													client.readPermission(permission._self, function(err, permission) {
														var notFoundErrorCode = 404;
														assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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
            });
        });
    });
    
    describe("Validate Authorization", function(){
        var setupEntities = function(client, callback){
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection1
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection1){
                    // create document1
                    client.createDocument(collection1._self, { id: "coll1doc1", foo: "bar", key: "value" }, function(err, document1){
                        // create document 2
                        client.createDocument(collection1._self, { id: "coll1doc2", foo: "bar2", key: "value2" }, function(err, document2){
                            // create attachment
                            var dynamicAttachment = { id: "dynamic attachment", media: "http://xstore.", MediaType: "Book", Author:"My Book Author", Title:"My Book Title", contentType:"application/text" };
                            client.createAttachment(document1._self, dynamicAttachment, function(err, attachment){
                                // create collection 2
                                client.createCollection(db._self, { id: "sample collection2" }, function(err, collection2){
                                    // create user1
                                    client.createUser(db._self, { id: "user1" }, function(err, user1){
                                        var permission = { id: "permission On Coll1", permissionMode: DocumentBase.PermissionMode.Read, resource: collection1._self};
                                        // create permission for collection1 
                                        client.createPermission(user1._self, permission, function(err, permissionOnColl1) {
											assert(permissionOnColl1._token !== undefined, "permission token is invalid");
                                            permission = { id: "permission On Doc1", permissionMode: DocumentBase.PermissionMode.All, resource: document2._self};
                                            // create permission for document 2
                                            client.createPermission(user1._self, permission, function(err, permissionOnDoc2){
                                                assert(permissionOnDoc2._token !== undefined, "permission token is invalid");
                                                // create user 2
                                                client.createUser(db._self, { id: "user2" }, function(err, user2){
                                                    permission = { id: "permission On coll2", permissionMode: DocumentBase.PermissionMode.All, resource: collection2._self};
                                                    // create permission on collection 2
                                                    client.createPermission(user2._self, permission, function(err, permissionOnColl2){
                                                        var entities = {
                                                            db: db,
                                                            coll1: collection1,
                                                            coll2: collection2,
                                                            doc1: document1,
                                                            doc2: document2,
                                                            user1: user1,
                                                            user2: user2,
                                                            attachment: attachment,
                                                            permissionOnColl1: permissionOnColl1,
                                                            permissionOnDoc2: permissionOnDoc2,
                                                            permissionOnColl2: permissionOnColl2
                                                        };
                                                        
                                                        callback(entities);
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
            });
        };
        
        it("[nativeApi] Should do authorization successfully", function(done){
            var client = new DocumentDBClient(host);
            client.readDatabases().toArray(function(err, databases){
                assert(err !== undefined, "error should not be undefined");
                var unauthorizedErrorCode = 401;
                assert.equal(err.code, unauthorizedErrorCode, "error code should be equal to 401");
                client = new DocumentDBClient(host, {masterKey: masterKey});
                // setup entities
                setupEntities(client, function(entities){
                    var resourceTokens = {};
                    resourceTokens[entities.coll1._rid] = entities.permissionOnColl1._token;
                    resourceTokens[entities.doc1._rid] = entities.permissionOnColl1._token;
                    var col1Client = new DocumentDBClient(host, {resourceTokens: resourceTokens});
                    // 1. Success-- Use Col1 Permission to Read
                    col1Client.readCollection(entities.coll1._self, function(err, successColl1) {
						assert(successColl1 !== undefined, "error reading collection");
                        // 2. Failure-- Use Col1 Permission to delete
                        col1Client.deleteCollection(successColl1._self, function(err, result){
                            assert(err !== undefined, "expected to fail, no permission to delete");
                            // 3. Success-- Use Col1 Permission to Read All Docs
                            col1Client.readDocuments(successColl1._self).toArray(function(err, successDocuments){
                                assert(successDocuments !== undefined, "error reading documents");
                                assert.equal(successDocuments.length, 2, "Expected 2 Documents to be succesfully read");
                                // 4. Success-- Use Col1 Permission to Read Col1Doc1
                                col1Client.readDocument(entities.doc1._self, function(err, successDoc){
                                    assert(successDoc !== undefined, "error reading document");
                                    assert.equal(successDoc.id, entities.doc1.id, "Expected to read children using parent permissions");
                                    var col2Client = new DocumentDBClient(host, { permissionFeed: [ entities.permissionOnColl2 ] });
                                    var doc = {id: "new doc", CustomProperty1: "BBBBBB", customProperty2: 1000 };
                                    col2Client.createDocument(entities.coll2._self, doc, function(err, successDoc) {
                                        assert(successDoc !== undefined, "error creating document");
                                        assert.equal(successDoc.CustomProperty1, doc.CustomProperty1, "document should have been created successfully");
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
    
    describe("Validate Trigger CRUD", function(){
        it("[nativeApi] Should do trigger CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection){
                    // read triggers
                    client.readTriggers(collection._self).toArray(function(err, triggers) {
                        assert.equal(err, undefined, "error reading triggers");
                        assert.equal(triggers.constructor, Array, "Value should be an array");
                        // create a trigger
                        var beforeCreateTriggersCount = triggers.length;
                        var triggerDefinition = { id: "sample trigger", serverScript: function() {var x = 10;}, triggerType: DocumentBase.TriggerType.Pre, triggerOperation: DocumentBase.TriggerOperation.All };
                        client.createTrigger(collection._self, triggerDefinition, function(err, trigger){
                            assert.equal(err, undefined, "error creating trigger");
                            for (var property in triggerDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(trigger[property], triggerDefinition[property], "property " + property + " should match");
                                } else {
                                    assert.equal(trigger.body, "function () {var x = 10;}");
                                }
                            }
                            // read triggers after creation
                            client.readTriggers(collection._self).toArray(function(err, triggers) {
                                assert.equal(triggers.length, beforeCreateTriggersCount + 1, "create should increase the number of triggers");
                                // query triggers
                                var querySpec = {
                                    query: 'SELECT * FROM root r WHERE r.id=@id',
                                    parameters: [
                                        {
                                            name: '@id',
                                            value: triggerDefinition.id
                                        }
                                    ]
                                };
								client.queryTriggers(collection._self, querySpec).toArray(function(err, results) {
									assert(results.length > 0, "number of results for the query should be > 0");
									//replace trigger 
									trigger.body = function() {var x = 20;};
									client.replaceTrigger(trigger._self, trigger, function(error, replacedTrigger){
										for (var property in triggerDefinition) {
											if (property !== "serverScript") {
												assert.equal(replacedTrigger[property], trigger[property], "property " + property + " should match");
											} else {
												assert.equal(replacedTrigger.body, "function () {var x = 20;}");
											}
										}
										// read trigger
										client.readTrigger(replacedTrigger._self, function(err, trigger) {
											assert.equal(err, undefined, "readTrigger should work successfully");
											assert.equal(replacedTrigger.id, trigger.id);
											// delete trigger
											client.deleteTrigger(replacedTrigger._self, function(err, res){
												// read triggers after deletion
												client.readTrigger(replacedTrigger._self, function(err, trigger) {
													var notFoundErrorCode = 404;
													assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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
        });
    });

    describe("Validate UDF CRUD", function(){
        it("[nativeApi] Should do UDF CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection){
                    // read udfs
                    client.readUserDefinedFunctions(collection._self).toArray(function(err, udfs) {
                        assert.equal(err, undefined, "error reading udfs");
                        assert.equal(udfs.constructor, Array, "Value should be an array");
                        // create a udf
                        var beforeCreateUdfsCount = udfs.length;
                        var udfDefinition = { id: "sample udf", serverScript: function() {var x = 10;} };
                        client.createUserDefinedFunction(collection._self, udfDefinition, function(err, udf){
                            assert.equal(err, undefined, "error creating udf");
                            for (var property in udfDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(udf[property], udfDefinition[property], "property " + property + " should match");
                                } else {
                                     assert.equal(udf.body, "function () {var x = 10;}");
                                }
                            }
                            
                            // read udfs after creation
                            client.readUserDefinedFunctions(collection._self).toArray(function(err, udfs) {
                                assert.equal(udfs.length, beforeCreateUdfsCount + 1, "create should increase the number of udfs");
                                // query udfs
                                var querySpec = {
                                    query: 'SELECT * FROM root r WHERE r.id=@id',
                                    parameters: [
                                        {
                                            name: '@id',
                                            value: udfDefinition.id
                                        }
                                    ]
                                };
								client.queryUserDefinedFunctions(collection._self, querySpec).toArray(function(err, results) {
									assert(results.length > 0, "number of results for the query should be > 0");
									// replace udf 
									udf.body = function() {var x = 20;};
									client.replaceUserDefinedFunction(udf._self, udf, function(error, replacedUdf){
										for (var property in udfDefinition) {
											if (property !== "serverScript") {
												assert.equal(replacedUdf[property], udf[property], "property " + property + " should match");
											} else {
												assert.equal(replacedUdf.body, "function () {var x = 20;}");
											}
										}
										 // read udf
										client.readUserDefinedFunction(replacedUdf._self, function(err, udf) {
											assert.equal(err, undefined, "readUserDefinedFunctions should work successfully");
											assert.equal(replacedUdf.id, udf.id);
											// delete udf
											client.deleteUserDefinedFunction(replacedUdf._self, function(err, res){
												// read udfs after deletion
												client.readUserDefinedFunction(replacedUdf._self, function(err, udf) {
													var notFoundErrorCode = 404;
													assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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
        });
    });
       
    describe("Validate sproc CRUD", function(){
        it("[nativeApi] Should do sproc CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection){
                    // read sprocs
                    client.readStoredProcedures(collection._self).toArray(function(err, sprocs) {
                        assert.equal(err, undefined, "error reading sprocs");
                        assert.equal(sprocs.constructor, Array, "Value should be an array");
                        // create a sproc
                        var beforeCreateSprocsCount = sprocs.length;
                        var sprocDefinition = { id: "sample sproc", serverScript: function() {var x = 10;}};
                        client.createStoredProcedure(collection._self, sprocDefinition, function(err, sproc){
                            assert.equal(err, undefined, "error creating sproc");
                            for (var property in sprocDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(sproc[property], sprocDefinition[property], "property " + property + " should match");
                                } else {
                                     assert.equal(sproc.body, "function () {var x = 10;}");
                                }
                            }
                            
                            // read sprocs after creation
                            client.readStoredProcedures(collection._self).toArray(function(err, sprocs) {
                                assert.equal(sprocs.length, beforeCreateSprocsCount + 1, "create should increase the number of sprocs");
                                // query sprocs
                                var querySpec = {
                                    query: 'SELECT * FROM root r'
                                };
                                client.queryStoredProcedures(collection._self, querySpec).toArray(function(err, sprocs){
                                    assert(sprocs.length > 0, "number of sprocs for the query should be > 0");
									// replace sproc 
									sproc.body = function() {var x = 20;};
									client.replaceStoredProcedure(sproc._self, sproc, function(error, replacedSproc){
										for (var property in sprocDefinition) {
											if (property !== "serverScript") {
												assert.equal(replacedSproc[property], sproc[property], "property " + property + " should match");
											} else {
												 assert.equal(replacedSproc.body, "function () {var x = 20;}");
											}
										}
										 // read sproc
										client.readStoredProcedure(replacedSproc._self, function(err, sproc) {
											assert.equal(err, undefined, "readStoredProcedures should work successfully");
											assert.equal(replacedSproc.id, sproc.id);
											// delete sproc
											client.deleteStoredProcedure(replacedSproc._self, function(err, res){
												// read sprocs after deletion
												client.readStoredProcedure(replacedSproc._self, function(err, sproc) {
													var notFoundErrorCode = 404;
													assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
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
        });
    });
    
    describe("Validate collection indexing policy", function(){
        it("[nativeApi] Should create collection with correct indexing policy", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection){
                    assert.equal(collection.indexingPolicy.indexingMode, DocumentBase.IndexingMode.Consistent, "default indexing mode should be consistent");
                    var lazyCollectionDefinition = { id: "lazy collection", indexingPolicy: { indexingMode: DocumentBase.IndexingMode.Lazy } };
                    client.deleteCollection(collection._self, function(err, coll) {
                        client.createCollection(db._self, lazyCollectionDefinition, function(err, lazyCollection) {
                            assert.equal(lazyCollection.indexingPolicy.indexingMode, DocumentBase.IndexingMode.Lazy, "indexing mode should be lazy");
                            var consistentCollectionDefinition = { id: "lazy collection", indexingPolicy: { indexingMode: DocumentBase.IndexingMode.Consistent } };
                            client.deleteCollection(lazyCollection._self, function(err, coll) {
                                client.createCollection(db._self, consistentCollectionDefinition, function(err, consistentCollection) {
                                    assert.equal(collection.indexingPolicy.indexingMode, DocumentBase.IndexingMode.Consistent, "indexing mode should be consistent");
                                    var collectionDefinition = {
                                        "id": "CollectionWithIndexingPolicy",
                                        "indexingPolicy": {  
											 automatic: true,
											 indexingMode: "Consistent",
											"IncludedPaths": [  
											{  
												IndexType: "Hash",
												Path: "/"
											}
											],
											ExcludedPaths: [  
											 "/\"systemMetadata\"/*"
											]
									    }

                                    };
                                    
                                    client.deleteCollection(consistentCollection._self, function(err, coll) {
                                        client.createCollection(db._self, collectionDefinition, function(err, collectioWithIndexingPolicy) {
											assert.equal(collectioWithIndexingPolicy.indexingPolicy.IncludedPaths.length, 2, "Unexpected includedPaths length");
                                            assert.equal(collectioWithIndexingPolicy.indexingPolicy.ExcludedPaths.length, 1, "Unexpected excludedPaths length");
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
    
    describe("Validate client request timeout", function(){
        it("[nativeApi] Client Should throw exception", function(done){
            var connectionPolicy = new DocumentBase.ConnectionPolicy();
            // making timeout 1 ms to make sure it will throw
            connectionPolicy.RequestTimeout = 1; 
            var client = new DocumentDBClient(host, {masterKey: masterKey}, connectionPolicy);
            // create database
            client.createDatabase({ id: "sample database" }, function(err, db){
                assert.equal(err.code, "ECONNRESET", "client should throw exception");
                done();
            });
        });
    });
    
    describe("Validate QueryIterator Functionality", function() {
        var createResources = function(client, callback) {
            client.createDatabase({ id: "sample database" + Math.random() }, function(err, db) {
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection) {
                    client.createDocument(collection._self, {id: "doc1", prop1: "value1"}, function(err, doc1) {
                        client.createDocument(collection._self, {id: "doc2", prop1: "value2"}, function(err, doc2) {
                            client.createDocument(collection._self, {id: "doc3", prop1: "value3"}, function(err, doc3) {
                                var resources = {
                                    coll: collection,
                                    doc1: doc1,
                                    doc2: doc2,
                                    doc3: doc3
                                };
                                
                                callback(resources);
                            });
                        });
                    });
                });
            });
        };
        
        it("[nativeApi] validate QueryIterator iterator toArray", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createResources(client, function(resources){
                var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                queryIterator.toArray(function(err, docs) {
                    assert.equal(docs.length, 3, "queryIterator should return all documents using continuation");
                    assert.equal(docs[0].id, resources.doc1.id);
                    assert.equal(docs[1].id, resources.doc2.id);
                    assert.equal(docs[2].id, resources.doc3.id);
                    done();
                });
            });
        });
        
        it("[nativeApi] validate queryIterator iterator forEach", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createResources(client, function(resources){
                var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                var counter = 0;
                // test queryIterator.forEach
                queryIterator.forEach(function(err, doc) {
                    counter++;
                    if (counter === 1) {
                        assert.equal(doc.id, resources.doc1.id, "first document should be doc1");
                    } else if(counter === 2) {
                        assert.equal(doc.id, resources.doc2.id, "second document should be doc2");
                    } else if(counter === 3) {
                        assert.equal(doc.id, resources.doc3.id, "third document should be doc3");
                    }
                    
                    if (doc === undefined) {
                        assert(counter < 5, "iterator should have stopped");
                        done();
                    }
                });
            });
        });
        
        it("[nativeApi] validate queryIterator nextItem and hasMoreResults", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createResources(client, function(resources){
                var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                assert.equal(queryIterator.hasMoreResults(), true);
                queryIterator.nextItem(function(err, doc) {
                    assert.equal(doc.id, resources.doc1.id, "call queryIterator.nextItem after reset should return first document");
                    assert.equal(queryIterator.hasMoreResults(), true);
                    queryIterator.nextItem(function(err, doc) {
                        assert.equal(doc.id, resources.doc2.id, "call queryIterator.nextItem again should return second document");
                        assert.equal(queryIterator.hasMoreResults(), true);
                        queryIterator.nextItem(function(err, doc) {
                            assert.equal(doc.id, resources.doc3.id, "call queryIterator.nextItem again should return third document");
                            queryIterator.nextItem(function(err, doc){
                                assert.equal(doc, undefined, "queryIterator should return undefined if there is no elements");
                                done();
                            });
                        });
                    });
                });
            });
        });
        
        it("[nativeApi] validate queryIterator iterator executeNext", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createResources(client, function(resources){
                var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                queryIterator.executeNext(function(err, docs, headers) {
					assert(headers != undefined, "executeNext should pass headers as the third parameter to the callback");
                    assert.equal(docs.length, 2, "first batch size should be 2");
                    assert.equal(docs[0].id, resources.doc1.id, "first batch first document should be doc1");
                    assert.equal(docs[1].id, resources.doc2.id, "batch first second document should be doc2");
                    queryIterator.executeNext(function(err, docs) {
                        assert.equal(docs.length, 1, "second batch size should be 2");
                        assert.equal(docs[0].id, resources.doc3.id, "second batch element should be doc3");
                        done();
                    });
                });
            });
        });
    });
    
    describe("validate trigger functionality", function(){
        var triggers = [
            {
                id: "t1",
                body: function() {
                        var item = getContext().getRequest().getBody();
                        item.id = item.id.toUpperCase() + 't1';
                        getContext().getRequest().setBody(item);
                },
                triggerType: DocumentBase.TriggerType.Pre,
                triggerOperation: DocumentBase.TriggerOperation.All
            },
            {
                id: "t2",
                body: "function() { }", // trigger already stringified
                triggerType:  DocumentBase.TriggerType.Pre,
                triggerOperation: DocumentBase.TriggerOperation.All
            },
            {
                id: "t3",
                body: function() { 
                    var item = getContext().getRequest().getBody();
                    item.id = item.id.toLowerCase() + 't3';
                    getContext().getRequest().setBody(item);
                },
                triggerType: DocumentBase.TriggerType.Pre,
                triggerOperation: DocumentBase.TriggerOperation.All
            },
            {
                id: "response1",
                body: function() {
                    var prebody = getContext().getRequest().getBody();
                    if (prebody.id != 'TESTING POST TRIGGERt1') throw 'name mismatch';
                    var postbody = getContext().getResponse().getBody();
                    if (postbody.id != 'TESTING POST TRIGGERt1') throw 'name mismatch';
                },
                triggerType: DocumentBase.TriggerType.Post,
                triggerOperation: DocumentBase.TriggerOperation.All
            },
            {
                id: "triggerOpType",
                body: "function() { }", 
                triggerType: DocumentBase.TriggerType.Post,
                triggerOperation: DocumentBase.TriggerOperation.Delete,
            },
        ];
        
        var createTriggers = function(client, collection, index, callback){
            if (index === triggers.length) {
                return callback();
            }
            
            client.createTrigger(collection._self, triggers[index], function(err, trigger){
                for (var property in triggers[index]) {
                    assert.equal(trigger[property], triggers[index][property], "property " + property + " should match");
                }
                
                createTriggers(client, collection, index + 1, callback);
            })
        };
        
        it("[nativeApi] Should do trigger operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            // create database    
            client.createDatabase({ id: "sample database" }, function(err, db){
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function(err, collection){
                    // create triggers
                    createTriggers(client, collection, 0, function() {
                        // create document
                        client.readTriggers(collection._self).toArray(function (err, triggers) {
                            client.createDocument(collection._self, { id: "doc1", key: "value" }, { preTriggerInclude: "t1" }, function (err, document) {
                                assert.equal(document.id, "DOC1t1", "name should be capitalized");
                                client.createDocument(collection._self, { id: "doc2", key2: "value2" }, { preTriggerInclude: "t2" }, function (err, document2) {
                                    assert.equal(document2.id, "doc2", "name shouldn't change");
                                    client.createDocument(collection._self, { id: "Doc3", prop: "empty" }, { preTriggerInclude: "t3" }, function (err, document3) {
                                        assert.equal(document3.id, "doc3t3");
                                        client.createDocument(collection._self, { id: "testing post trigger" }, { postTriggerInclude: "response1", preTriggerInclude: "t1" }, function (err, document4) {
                                            assert.equal(document4.id, "TESTING POST TRIGGERt1");
                                            client.createDocument(collection._self, { id: "responseheaders" }, { preTriggerInclude: "t1" }, function (err, document5, headers) {
                                                assert.equal(document5.id, "RESPONSEHEADERSt1");
                                                client.createDocument(collection._self, { id: "Docoptype" }, { postTriggerInclude: "triggerOpType" }, function (err, document6) {
                                                    assert(err !== undefined);
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
        });
    });

    describe("validate stored procedure functionality", function () {
        it("[nativeApi] Should do stored procedure operations successfully", function (done) {
            var client = new DocumentDBClient(host, { masterKey: masterKey });
            // create database    
            client.createDatabase({ id: "sample database" }, function (err, db) {
                // create collection
                client.createCollection(db._self, { id: "sample collection" }, function (err, collection) {
					var sproc1 = {
						id: "storedProcedure1",
						body: function () {
							for (var i = 0; i < 1000; i++) {
								var item = getContext().getResponse().getBody();
								if (i > 0 && item != i - 1) throw 'body mismatch';
								getContext().getResponse().setBody(i);
							}
						}
					};

					client.createStoredProcedure(collection._self, sproc1, function (err, retrievedSproc) {
						client.executeStoredProcedure(retrievedSproc._self, function (err, result) {
							assert.equal(result, 999);
							var sproc2 = {
								id: "storedProcedure2",
								body: function () {
									for (var i = 0; i < 10; i++) getContext().getResponse().appendValue('Body', i);
								}
							};

							client.createStoredProcedure(collection._self, sproc2, function (err, retrievedSproc2) {
								client.executeStoredProcedure(retrievedSproc2._self, function (err, result) {
									assert.equal(result, 123456789);
									var sproc3 = {
										id: "storedProcedure3",
										body: function (input) {
											getContext().getResponse().setBody('a' + input.temp);
										}
									};
										
									client.createStoredProcedure(collection._self, sproc3, function(err, retrievedSproc3){
										client.executeStoredProcedure(retrievedSproc3._self, {temp: "so"}, function(err, result){
											assert.equal(result, "aso");
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
    
    describe("validate database account functionality", function () {
		it("[nativeApi] Should get database account successfully", function (done) {
			var client = new DocumentDBClient(host, { masterKey: masterKey });
			client.getDatabaseAccount(function(err, databaseAccount, headers) {
				assert.equal(databaseAccount.DatabasesLink, "/dbs/");
                assert.equal(databaseAccount.MediaLink , "/media/");
                assert.equal(databaseAccount.MaxMediaStorageUsageInMB, headers["x-ms-max-media-storage-usage-mb"]);
                assert.equal(databaseAccount.CurrentMediaStorageUsageInMB, headers["x-ms-media-storage-usage-mb"]);
                assert.equal(databaseAccount.CapacityUnitsConsumed, headers["x-ms-database-capacity-units-consumed"]);
                assert.equal(databaseAccount.CapacityUnitsProvisioned, headers["x-ms-database-capacity-units-provisioned"]);
                assert.equal(databaseAccount.ConsumedDocumentStorageInMB, headers["x-ms-databaseaccount-consumed-mb"]);
                assert.equal(databaseAccount.ReservedDocumentStorageInMB, headers["x-ms-databaseaccount-reserved-mb"]);
                assert.equal(databaseAccount.ProvisionedDocumentStorageInMB, headers["x-ms-databaseaccount-provisioned-mb"]);
                assert(databaseAccount.ConsistencyPolicy.defaultConsistencyLevel != undefined);
                done();
			});
		});
	});
});
