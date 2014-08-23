var DocumentDBClient = require("documentdb").DocumentClientWrapper
  , DocumentBase = require("documentdb").DocumentBase
  , assert = require("assert")
  , Stream = require("stream")
  , testConfig = require('./_testConfig')
  , Q = require('q');
  
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("NodeJS Client Q prmise Wrapper CRUD Tests", function(){

    // remove all databases from the endpoint before each test
    beforeEach(function(done) {
        var client = new DocumentDBClient(host, {masterKey: masterKey});
        client.readDatabases().toArrayAsync()
            .then(function(result) {
                var databases = result.feed;
                var length = databases.length;
                if(length === 0){
                    return done();
                }
            
                var count = 0;
                databases.forEach(function(database){
                    client.deleteDatabaseAsync(database._self)
                        .then(function(){
                            count++;
                            if(count === length){
                                done();
                            }
                        },
                        function(err){
                            console.log(err);
                        });
                });
            }, 
            function(err){
                console.log(err);
                done();    
            });
    });
    
    describe("Validate Database CRUD", function() {
        it("[promiseApi] Should do database CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            var validateOptions = { 
                className: "Database" ,
                resourceDefinition: {id: "sampleDb"},
                validateCreate: function(created) {
                    assert.equal(created.id, "sampleDb", "wrong id");
                },
                validateReplace: function(created, replaced) {
                    assert.equal(replaced.id, "replaced db", "id should change");
                    assert.equal(created.id, replaced.id, "id should stay the same");
                },
                replaceProperties: function(resource) {
                    resource.id = "replaced db";
                    return resource;
                }
            };
            
            validateCRUDAsync(client, undefined, validateOptions)
                .then(function() {
                    done();
                })
                .fail(function(error) {
                    done();
                });
           
        });
    });
    
    describe("Validate Collection CRUD", function(){
        it("[promiseApi] Should do collection CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true})
                .then(function(createdResources) {
                    var validateOptions = { 
                        className: "Collection" ,
                        resourceDefinition: {id: "sample coll"},
                        validateCreate: function(created) {
                            assert.equal(created.id, "sample coll", "wrong id");
                        },
                        validateReplace: function(created, replaced) {
                            // collection doesn't support replace.
                        },
                        replaceProperties: function(resource) {
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdDb._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error);
                            done();
                        });
                });
        });
    });
    
    describe("Validate Document CRUD", function(){
        it("[promiseApi] Should do document CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, coll: true})
                .then(function(createdResources) {
                    var validateOptions = { 
                        className: "Document" ,
                        resourceDefinition: { id: "sample document", foo: "bar", key: "value" },
                        validateCreate: function(created) {
                            assert.equal(created.id, "sample document", "wrong id");
                            assert.equal(created.foo, "bar", "wrong property value");
                        },
                        validateReplace: function(created, replaced) {
                            assert.equal(replaced.id, "replaced document", "id property should change");
                            assert.equal(replaced.foo, "not bar", "property should have changed");
                            assert.equal(created.id, replaced.id, "id should stay the same");
                        },
                        replaceProperties: function(resource) {
                            resource.id = "replaced document";
                            resource.foo = "not bar";
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdCollection._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error);
                            done();
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
        
        it("[promiseApi] Should do attachment CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, coll: true, doc: true})
                .then(function(createdResources) {
                    var attachmentDefinition = { id: "dynamic attachment", media: "http://xstore.", MediaType: "Book", Author:"My Book Author", Title:"My Book Title", contentType:"application/text" };
                    var validateOptions = { 
                        className: "Attachment" ,
                        resourceDefinition: attachmentDefinition,
                        validateCreate: function(created) {
                            assert.equal(created.MediaType, "Book", "invalid media type");
                            assert.equal(created.Author, "My Book Author", "invalid property value");
                        },
                        validateReplace: function(created, replaced) {
                            assert.equal(replaced.MediaType, "Book", "invalid media type");
                            assert.equal(replaced.Author, "new author", "invalid property value");
                        },
                        replaceProperties: function(resource) {
                            resource.Author = "new author";
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdDoc._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error, error.stack);
                            done();
                        });
                });           
        });
        
        it("[promiseApi] Should do attachment media operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            var validMediaOptions = { slug: "attachment name", contentType: "application/text" };
            var invalidMediaOptions = { slug: "attachment name", contentType: "junt/test" };
            var validAttachment;
            createParentResourcesAsync(client, {db: true, coll: true, doc: true})
                .then(function(createdResources) {
                    var document = createdResources.createdDoc
                    var validMediaOptions = { slug: "attachment name", contentType: "application/text" };
                            // create attachment with invalid content-type
                            var contentStream = createReadableStream();
                            client.createAttachmentAndUploadMediaAsync(document._self, contentStream, invalidMediaOptions)
                                .then(function(response) {
                                    assert.fail("", "", "create shouldn't have succeeded");
                                },
                                function(error) {
                                    var badRequestErrorCode = 400;
                                    assert.equal(error.code, badRequestErrorCode);
                                    
                                    contentStream = createReadableStream();
                                    return client.createAttachmentAndUploadMediaAsync(document._self, contentStream, validMediaOptions);
                                })
                                .then(function(response) {
                                    validAttachment = response.resource;
                                    assert.equal(validAttachment.id,  "attachment name", "id of created attachment should be the same as the one in the request");
                                    return client.readMediaAsync(validAttachment.media);
                                })
                                .then(function(response) {
                                    assert.equal(response.result, "first chunk second chunk");
                                    contentStream = createReadableStream("modified first chunk ", "modified second chunk");
                                    return client.updateMediaAsync(validAttachment.media, contentStream, validMediaOptions);
                                })
                                .then(function(response) {
                                    return client.readMediaAsync(validAttachment.media);
                                })
                                .then(function(response) {
                                    // read media streamed
                                    assert.equal(response.result, "modified first chunk modified second chunk");
                                    client.connectionPolicy.MediaReadMode = DocumentBase.MediaReadMode.Streamed;
                                    return client.readMediaAsync(validAttachment.media);
                                })
                                .then(function(response) {
                                    readMediaResponse(response.result, function(err, mediaResult){
                                        assert.equal(mediaResult, "modified first chunk modified second chunk");
                                        done();
                                    });
                                })
                                .fail(function(error) {
                                    console.log(error);
                                    done();
                                });
                })
            
        });
    });
    
    describe("Validate User CRUD", function(){
        it("[promiseApi] Should do User CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true})
                .then(function(createdResources) {
                    var validateOptions = { 
                        className: "User" ,
                        resourceDefinition: { id: "new user"},
                        validateCreate: function(created) {
                            assert.equal(created.id, "new user", "wrong id");
                        },
                        validateReplace: function(created, replaced) {
                            assert.equal(replaced.id, "replaced user", "id property should change");
                            assert.equal(created.id, replaced.id, "id should stay the same");
                        },
                        replaceProperties: function(resource) {
                            resource.id = "replaced user";
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdDb._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error);
                            done();
                        });
                });
        });
    });
    
     describe("Validate Permission CRUD", function(){
        it("[promiseApi] Should do Permission CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, user: true, coll: true})
                .then(function(createdResources) {
                    var validateOptions = { 
                        className: "Permission" ,
                        resourceDefinition: { id: "new permission", permissionMode: DocumentBase.PermissionMode.Read, resource: createdResources.createdCollection._self },
                        validateCreate: function(created) {
                            assert.equal(created.id, "new permission", "wrong id");
                            assert.equal(created.permissionMode, DocumentBase.PermissionMode.Read, "wrong permissionMode");
                            assert.equal(created.resource, createdResources.createdCollection._self, "wrong resource");
                        },
                        validateReplace: function(created, replaced) {
                            assert.equal(replaced.id, "replaced permission", "id property should change");
                            assert.equal(replaced.permissionMode, DocumentBase.PermissionMode.All, "permission mode should change");
                            assert.equal(created.id, replaced.id, "id should stay the same");
                        },
                        replaceProperties: function(resource) {
                            resource.id = "replaced permission";
                            resource.permissionMode = DocumentBase.PermissionMode.All;
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdUser._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error);
                            done();
                        });
                });
        });
    });
    
    describe("Validate Trigger CRUD", function(){
        it("[promiseApi] Should do trigger CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, coll: true})
                .then(function(createdResources) {
                    var triggerDefinition = { 
                        id: "sample trigger", 
                        serverScript: function() {var x = 10;},
                        triggerType: DocumentBase.TriggerType.Pre,
                        triggerOperation: DocumentBase.TriggerOperation.All 
                    };
                    
                    var validateOptions = { 
                        className: "Trigger" ,
                        resourceDefinition: triggerDefinition,
                        validateCreate: function(created) {
                            for (var property in triggerDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(created[property], triggerDefinition[property], "property " + property + " should match");
                                } else {
                                    assert.equal(created.body, "function () {var x = 10;}");
                                }
                            }
                        },
                        validateReplace: function(created, replaced) {
                            for (var property in triggerDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(replaced[property], created[property], "property " + property + " should match");
                                } else {
                                    assert.equal(replaced.body, "function () {var x = 20;}");
                                }
                            }
                        },
                        replaceProperties: function(resource) {
                            resource.body = function() {var x = 20;};
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdCollection._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error);
                            done();
                        });
                });
        });
    });
    
    describe("Validate UDF CRUD", function(){
        it("[promiseApi] Should do UDF CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, coll: true})
                .then(function(createdResources) {
                    var udfDefinition = { id: "sample udf", serverScript: function() {var x = 10;} };
                    
                    var validateOptions = { 
                        className: "UserDefinedFunction" ,
                        resourceDefinition: udfDefinition,
                        validateCreate: function(created) {
                            for (var property in udfDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(created[property], udfDefinition[property], "property " + property + " should match");
                                } else {
                                     assert.equal(created.body, "function () {var x = 10;}");
                                }
                            }
                        },
                        validateReplace: function(created, replaced) {
                            for (var property in udfDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(replaced[property], created[property], "property " + property + " should match");
                                } else {
                                    assert.equal(replaced.body, "function () {var x = 20;}");
                                }
                            }
                        },
                        replaceProperties: function(resource) {
                            resource.body = function() {var x = 20;};
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdCollection._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error);
                            done();
                        });
                });
        });
    });
    
    describe("Validate sproc CRUD", function(){
        it("[promiseApi] Should do sproc CRUD operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, coll: true})
                .then(function(createdResources) {
                    var sprocDefinition = { id: "sample sproc", serverScript: function() {var x = 10;}};;
                    
                    var validateOptions = { 
                        className: "StoredProcedure" ,
                        resourceDefinition: sprocDefinition,
                        validateCreate: function(created) {
                           for (var property in sprocDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(created[property], sprocDefinition[property], "property " + property + " should match");
                                } else {
                                     assert.equal(created.body, "function () {var x = 10;}");
                                }
                            }
                        },
                        validateReplace: function(created, replaced) {
                            for (var property in sprocDefinition) {
                                if (property !== "serverScript") {
                                    assert.equal(replaced[property], created[property], "property " + property + " should match");
                                } else {
                                    assert.equal(replaced.body, "function () {var x = 20;}");
                                }
                            }
                        },
                        replaceProperties: function(resource) {
                            resource.body = function() {var x = 20;};
                            return resource;
                        }
                    };
                    
                    validateCRUDAsync(client, createdResources.createdCollection._self, validateOptions)
                        .then(function() {
                            done();
                        })
                        .fail(function(error) {
                            console.log(error);
                            done();
                        });
                });
        });
    });
    
    describe("Validate QueryIterator Functionality", function() {
        var createTestResources = function(client) {
            var deferred = Q.defer();
            var collection, doc1, doc2, doc3;
            client.createDatabaseAsync({ id: "sample database" })
                .then(function(response) {
                    db = response.resource;
                    return client.createCollectionAsync(db._self, {id: "sample collection"});
                })
                .then(function(response) {
                    collection = response.resource;
                    return client.createDocumentAsync(collection._self, {id: "doc1", prop1: "value1"});
                })
                .then(function(response) {
                    doc1 = response.resource;
                    return client.createDocumentAsync(collection._self, {id: "doc2", prop1: "value2"});
                })
                .then(function(response) {
                    doc2 = response.resource;
                    return client.createDocumentAsync(collection._self, {id: "doc3", prop1: "value3"});
                })
                .then(function(response) {
                    doc3 = response.resource;
                    var resources = {
                        coll: collection,
                        doc1: doc1,
                        doc2: doc2,
                        doc3: doc3
                    };
                    deferred.resolve(resources);
                })
                .fail(function(error){
                    deferred.reject(error);
                });
                
            return deferred.promise;
        };
        
        it("[promiseApi] validate QueryIterator iterator toArray", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createTestResources(client)
                .then(function(resources) {
                    var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                    queryIterator.toArrayAsync()
                        .then(function(response) {
                            var docs = response.feed;
                            assert.equal(docs.length, 3, "queryIterator should return all documents using continuation");
                            assert.equal(docs[0].id, resources.doc1.id);
                            assert.equal(docs[1].id, resources.doc2.id);
                            assert.equal(docs[2].id, resources.doc3.id);
                            done();
                        })
                        .fail(function(error){
                            console.log("An error has occured", error, error.stack);
                            done();
                        });
                })
                .fail(function(error){
                    console.log("An error has occured", error, error.stack);
                    done();
                });
        });
       
        
        it("[promiseApi] validate queryIterator iterator forEach", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createTestResources(client)
                .then(function(resources) {
                    var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                    var counter = 0;
                    // test queryIterator.forEach
                    queryIterator.forEach(function(err, doc) {
                        if (err) {
                            console.log("an error occured", err, err.stack);
                            return done();
                        }
                        
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
                            return done();
                        }
                    });
                })
                .fail(function(error){
                    console.log("An error has occured", error, error.stack);
                    done();
                });
        });
        
        it("[promiseApi] validate queryIterator nextItem and hasMoreResults", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createTestResources(client)
                .then(function(resources) {
                    var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                    assert.equal(queryIterator.hasMoreResults(), true);
                    queryIterator.nextItemAsync()
                        .then(function(response) {
                            var doc = response.resource;
                            assert.equal(doc.id, resources.doc1.id, "call queryIterator.nextItem after reset should return first document");
                            assert.equal(queryIterator.hasMoreResults(), true);
                            return queryIterator.nextItemAsync();
                        })
                        .then(function(response) {
                            var doc = response.resource;
                            assert.equal(doc.id, resources.doc2.id, "call queryIterator.nextItem again should return second document");
                            assert.equal(queryIterator.hasMoreResults(), true);
                            return queryIterator.nextItemAsync();
                        })
                        .then(function(response) {
                            var doc = response.resource;
                            assert.equal(doc.id, resources.doc3.id, "call queryIterator.nextItem again should return third document");
                            return queryIterator.nextItemAsync();
                        })
                        .then(function(response) {
                            var doc = response.resource;
                            assert.equal(doc, undefined, "queryIterator should return undefined if there is no elements");
                            done();
                        })
                        .fail(function(error){
                            console.log("An error has occured", error, error.stack);
                            done();
                        });
                })
                .fail(function(error){
                    console.log("An error has occured", error, error.stack);
                    done();
                });
        });
        
        it("[promiseApi] validate queryIterator iterator executeNext", function(done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createTestResources(client)
                .then(function(resources) {
                    var queryIterator = client.readDocuments(resources.coll._self, {maxItemCount:2});
                    queryIterator.executeNextAsync()
                        .then(function(response) {
                            var docs = response.feed;
                            assert.equal(docs.length, 2, "first batch size should be 2");
                            assert.equal(docs[0].id, resources.doc1.id, "first batch first document should be doc1");
                            assert.equal(docs[1].id, resources.doc2.id, "batch first second document should be doc2");
                            return queryIterator.executeNextAsync()
                        })
                        .then(function(response) {
                            var docs = response.feed;
                            assert.equal(docs.length, 1, "second batch size should be 2");
                            assert.equal(docs[0].id, resources.doc3.id, "second batch element should be doc3");
                            done();
                        })
                        .fail(function(error){
                            console.log("An error has occured", error, error.stack);
                            done();
                        });
                })
                .fail(function(error){
                    console.log("An error has occured", error, error.stack);
                    done();
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
                    if (prebody.id != 'TESTING POST TRIGGERt1') throw 'id mismatch';
                    var postbody = getContext().getResponse().getBody();
                    if (postbody.id != 'TESTING POST TRIGGERt1') throw 'id mismatch';
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
        
        
        var createTriggersImplementation = function(client, collection, index, deferred){
            if (index === triggers.length) {
				return deferred.resolve();
            }
            
			client.createTriggerAsync(collection._self, triggers[index])
                .then(function(trigger) {
                    createTriggersImplementation(client, collection, index + 1, deferred);
                })
                .fail(function(error){
                    console.log(error, error.stack);
                });
        };
        
        var createTriggersAsync = function(client, collection, index) {
            var deferred = Q.defer();
            createTriggersImplementation(client, collection, index, deferred);
            return deferred.promise;
        };
        
        it("[promiseApi] Should do trigger operations successfully", function(done){
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, coll: true})
                .then(function(resources) {
                    var collection = resources.createdCollection;
                    createTriggersAsync(client, collection, 0)
                        .then(function(){
                            return client.createDocumentAsync(collection._self, { id: "doc1", key: "value" }, { preTriggerInclude: "t1" });
                        })
                        .then(function(response) {
                            assert.equal(response.resource.id, "DOC1t1", "id should be capitalized");
                            return client.createDocumentAsync(collection._self, { id: "doc2", key2: "value2" }, { preTriggerInclude: "t2" });
                        })
                        .then(function(response) {
                            assert.equal(response.resource.id, "doc2", "id shouldn't change");
                            return client.createDocumentAsync(collection._self, { id: "Doc3", prop: "empty" }, { preTriggerInclude: "t3" });
                        })
                        .then(function(response) {
                            assert.equal(response.resource.id, "doc3t3");
                            return client.createDocumentAsync(collection._self, { id: "testing post trigger" }, { postTriggerInclude: "response1", preTriggerInclude: "t1" });
                        })
                        .then(function(response) {
                            assert.equal(response.resource.id, "TESTING POST TRIGGERt1");
                            return client.createDocumentAsync(collection._self, { id: "responseheaders" }, { preTriggerInclude: "t1" });
                        })
                        .then(function(response) {
                            assert.equal(response.resource.id, "RESPONSEHEADERSt1");
                            return client.createDocumentAsync(collection._self, { id: "Docoptype" }, { postTriggerInclude: "triggerOpType" })
                        })
                        .then(function(response) {
                            assert.fail("", "", "request shouldn't succeed");
                        },
						function(error){
							done();
						})
                        .fail(function(error) {
                            console.log("error", error, error.stack);  
                            assert.fail("", "", "an error occured");
                            done();
                        });
                })
                .fail(function(error) {
                    console.log("error", error, error.stack);  
                    assert.fail("", "", "an error occured");
                    done();
                });
        });
    });
    
    describe("validate stored procedure functionality", function () {
        it("[promiseApi] Should do stored procedure operations successfully", function (done) {
            var client = new DocumentDBClient(host, {masterKey: masterKey});
            createParentResourcesAsync(client, {db: true, coll: true})
                .then(function(resources) {
                    var collection = resources.createdCollection;
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

					client.createStoredProcedureAsync(collection._self, sproc1)
                        .then(function (response) {
                            return client.executeStoredProcedureAsync(response.resource._self);
                        })
                        .then(function(response) {
                            assert.equal(response.result, 999);
                            var sproc2 = {
                                id: "storedProcedure2",
                                body: function () {
                                    for (var i = 0; i < 10; i++) getContext().getResponse().appendValue('Body', i);
                                }
                            };
                            
                            return client.createStoredProcedureAsync(collection._self, sproc2);
                        })
                        .then(function(response) {
                            return client.executeStoredProcedureAsync(response.resource._self);
                        })
                        .then(function(response) {
                            assert.equal(response.result, 123456789);
                            var sproc3 = {
                                id: "storedProcedure3",
                                body: function (input) {
                                    getContext().getResponse().setBody('a' + input.temp);
                                }
                            };
                                            
                            return client.createStoredProcedureAsync(collection._self, sproc3);
                        })
                        .then(function(response) {
                             return client.executeStoredProcedureAsync(response.resource._self, {temp: "so"});
                        })
                        .then(function(response) {
                            assert.equal(response.result, "aso");
                            done();   
                        })                                
                        .fail(function(error) {
                            console.log("error", error, error.stack);  
                            assert.fail("", "", "an error occured");
                            done();
                        });
                    })
                    .fail(function(error) {
                        console.log("error", error, error.stack);  
                        assert.fail("", "", "an error occured");
                        done();
                    });
        });
    });
   
    function validateCRUDAsync(client, parentLink, options) {
        var deferred = Q.defer();
        var className = options.className, resourceDefinition = options.resourceDefinition, validateCreate = options.validateCreate, 
            validateReplace = options.validateReplace, replaceProperties = options.replaceProperties;
        var resources, replacedResources, readResource, createdResource, beforeCount;
        client["read" + className + "s"](parentLink).toArrayAsync()
            .then(function(response) {
                resources = response.feed;
                assert.equal(resources.constructor, Array, "Value should be an array");
                beforeCount = resources.length;
                if (parentLink) {
                    return client["create"+ className + "Async"](parentLink, resourceDefinition);
                } else {
                    return client["create"+ className + "Async"](resourceDefinition);
                }
            })
            .then(function(response) {
                createdResource = response.resource;
                validateCreate(createdResource);
                return client["read" + className + "s"](parentLink).toArrayAsync();
            })
            .then(function(response) {
                resources = response.feed;
                assert.equal(resources.length, beforeCount + 1, "create should increase the number of resources");
                if (parentLink) {
                    return client["query" + className + "s"](parentLink, '(^/"id"/"' + resourceDefinition.id + '")/"_rid"!?', {jpath: true}).toArrayAsync();
                } else {
                    return client["query" + className + "s"]('(^/"id"/"' + resourceDefinition.id + '")/"_rid"!?', {jpath: true}).toArrayAsync();
                }
            })
			.then(function(response) {
                var resources = response.feed;
                assert(resources.length > 0, "number of resources for the query should be > 0");
                var query 
                if (className === "StoredProcedure") {
                    // SQL doesn't work with stored procedures.
                   return client["query" + className + "s"](parentLink, '(^/"id"/"' + resourceDefinition.id + '")/"_rid"!?', {jpath: true}).toArrayAsync();
                } else if (parentLink) { 
					return client["query" + className + "s"](parentLink, 'select * FROM root r WHERE r.id="' + resourceDefinition.id + '"').toArrayAsync();
				} else {
					return client["query" + className + "s"]('select * FROM root r WHERE r.id="' + resourceDefinition.id + '"').toArrayAsync();
				}
            })
            .then(function(response) {
                var resources = response.feed;
                assert(resources.length > 0, "number of resources for the query should be > 0");
                createdResource = replaceProperties(createdResource);
                if (className !== "Collection") {
                    return client["replace" + className + "Async"](createdResource._self, createdResource); 
                } else {
                    return client["read" + className + "Async"](createdResource._self); 
                }
            })
            .then(function(response) {
                replacedResource = response.resource;
                validateReplace(createdResource, replacedResource);
                return client["read" + className + "Async"](replacedResource._self);
            })
            .then(function(response) {
                var readResource = response.resource;
                assert.equal(replacedResource.id, readResource.id);
                return client["delete" + className + "Async"](readResource._self);
            })
            .then(function(response) {
                client["read" + className + "Async"](replacedResource._self)
                    .then(function(response) {
                        assert.fail("", "", "request should return an error");
                    },
                    function(error){    
                        var notFoundErrorCode = 404;
                        assert.equal(error.code, notFoundErrorCode, "response should return error code 404");
                        deferred.resolve();
                    })
            })
            .fail(function(error){
                console.log("error", error, error.stack);  
                assert.fail("", "", "an error occured");
                deferred.reject(error);
            });
        
        return deferred.promise;
    }
    
    function createParentResourcesAsync(client, options) {
        var deferred = Q.defer();
        var createdResources = {};
        if (options.db) {
            client.createDatabaseAsync({ id: "sample database" })
                .then(function(response){
                    var db = createdResources.createdDb = response.resource;
                    if (options.coll) {
                        client.createCollectionAsync(db._self, {id: "sample coll"})
                            .then(function(response){
                                var coll = createdResources.createdCollection = response.resource;
                                if (options.doc) {
                                    client.createDocumentAsync(coll._self, {id: "sample doc"})
                                        .then(function(response){
                                            var doc = createdResources.createdDoc = response.resource;
                                            deferred.resolve(createdResources);
                                        })
                                } else if (options.user) {
									client.createUserAsync(db._self, {id: "sample user"})
										.then(function(response){
											var user = createdResources.createdUser = response.resource;
											deferred.resolve(createdResources);
										});
                                } else {
                                    deferred.resolve(createdResources);
                                }
                            });
                    } else if (options.user) {
                        client.createUserAsync(db._self, {id: "sample user"})
                            .then(function(response){
                                var user = createdResources.createdUser = response.resource;
                                deferred.resolve(createdResources);
                            });
                    } else {
                        deferred.resolve(createdResources);
                    }
                })
                .fail(function(error) {
                    deferred.reject(error);
                });
        }
        
        return deferred.promise;
    }
});
