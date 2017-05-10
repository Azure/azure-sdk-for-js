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

var Base = require("./base")
  , AzureDocuments = require("./documents")
  , QueryIterator = require("./queryIterator")
  , RequestHandler = require("./request")
  , RetryOptions = require("./retryOptions")
  , GlobalEndpointManager = require("./globalEndpointManager")
  , Constants = require("./constants");

//SCRIPT START
var DocumentClient = Base.defineClass(
    /**
     * Provides a client-side logical representation of the Azure DocumentDB database account.
     * This client is used to configure and execute requests in the Azure DocumentDB database service.
     * @constructor DocumentClient
     * @param {string} urlConnection           - The service endpoint to use to create the client.
     * @param {object} auth                    - An object that is used for authenticating requests and must contains one of the options
     * @param {string} [auth.masterKey]        - The authorization master key to use to create the client.
     * @param {Object} [auth.resourceTokens]   - An object that contains resources tokens. Keys for the object are resource Ids and values are the resource tokens.
     * @param {Array}  [auth.permissionFeed]   - An array of {@link Permission} objects.
     * @param {object} [connectionPolicy]      - An instance of {@link ConnectionPolicy} class. This parameter is optional and the default connectionPolicy will be used if omitted.
     * @param {string} [consistencyLevel]      - An optional parameter that represents the consistency level. It can take any value from {@link ConsistencyLevel}.
    */
    function DocumentClient(urlConnection, auth, connectionPolicy, consistencyLevel) {
        this.urlConnection = urlConnection;
        if (auth !== undefined) {
            this.masterKey = auth.masterKey;
            this.resourceTokens = auth.resourceTokens;
            if (auth.permissionFeed) {
                this.resourceTokens = {};
                for (var i = 0; i < auth.permissionFeed.length; i++) {
                    var resourceParts = auth.permissionFeed[i].resource.split("/");
                    var rid = resourceParts[resourceParts.length - 1];
                    this.resourceTokens[rid] = auth.permissionFeed[i]._token;
                }
            }
        }
        
        this.connectionPolicy = connectionPolicy || new AzureDocuments.ConnectionPolicy();
        this.defaultHeaders = {};
        this.defaultHeaders[Constants.HttpHeaders.CacheControl] = "no-cache";
        this.defaultHeaders[Constants.HttpHeaders.Version] = Constants.CurrentVersion;
        if (consistencyLevel !== undefined) {
            this.defaultHeaders[Constants.HttpHeaders.ConsistencyLevel] = consistencyLevel;
        }

        this.defaultHeaders[Constants.HttpHeaders.UserAgent] = Base._getUserAgent();
        
        // overide this for default query params to be added to the url.
        this.defaultUrlParams = "";
        
        // Query compatibility mode.
        // Allows to specify compatibility mode used by client when making query requests. Should be removed when
        // application/sql is no longer supported.
        this.queryCompatibilityMode = AzureDocuments.QueryCompatibilityMode.Default;
        this.partitionResolvers = {};
        
        this.partitionKeyDefinitionCache = {};

        this._globalEndpointManager = new GlobalEndpointManager(this);
    }, 
    {
        /** Gets the curent write endpoint for a geo-replicated database account.
         * @memberof DocumentClient
         * @instance
         * @param {function} callback        - The callback function which takes endpoint(string) as an argument.
        */
        getWriteEndpoint: function (callback) {
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                callback(writeEndpoint);
            });
        },

        /** Gets the curent read endpoint for a geo-replicated database account.
         * @memberof DocumentClient
         * @instance
         * @param {function} callback        - The callback function which takes endpoint(string) as an argument.
        */
        getReadEndpoint: function (callback) {
            this._globalEndpointManager.getReadEndpoint(function (readEndpoint) {
                callback(readEndpoint);
            });
        },

        /** Send a request for creating a database.
         * <p>
         *  A database manages users, permissions and a set of collections.  <br>
         *  Each Azure DocumentDB Database Account is able to support multiple independent named databases, with the database being the logical container for data. <br>
         *  Each Database consists of one or more collections, each of which in turn contain one or more documents. Since databases are an an administrative resource, the Service Master Key will be required in order to access and successfully complete any action using the User APIs. <br>
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {Object} body              - A json object that represents The database to be created.
         * @param {string} body.id           - The id of the database.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        createDatabase: function (body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var path = "/dbs";
            this.create(body, path, "dbs", undefined, undefined, options, callback);
        },
        
        /**
         * Creates a collection.
         * <p>
         * A collection is a named logical container for documents. <br>
         * A database may contain zero or more named collections and each collection consists of zero or more JSON documents. <br>
         * Being schema-free, the documents in a collection do not need to share the same structure or fields. <br>
         * Since collections are application resources, they can be authorized using either the master key or resource keys. <br>
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink                  - The self-link of the database.
         * @param {object} body                          - Represents the body of the collection.
         * @param {string} body.id                       - The id of the collection.
         * @param {IndexingPolicy} body.indexingPolicy   - The indexing policy associated with the collection.
         * @param {number} body.defaultTtl               - The default time to live in seconds for documents in a collection.
         * @param {RequestOptions} [options]             - The request options.
         * @param {RequestCallback} callback             - The callback for the request.
         */
        createCollection: function (databaseLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(databaseLink);
            var path = this.getPathFromLink(databaseLink, "colls", isNameBased);
            var id = this.getIdFromLink(databaseLink, isNameBased);
            
            this.create(body, path, "colls", id, undefined, options, callback);
        },
        
        /**
         * Create a document.
         * <p>
         * There is no set schema for JSON documents. They may contain any number of custom properties as well as an optional list of attachments. <br>
         * A Document is an application resource and can be authorized using the master key or resource keys
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} documentsFeedOrDatabaseLink               - The collection link or database link if using a partition resolver
         * @param {object} body                                      - Represents the body of the document. Can contain any number of user defined properties.
         * @param {string} [body.id]                                 - The id of the document, MUST be unique for each document.
         * @param {number} body.ttl                                  - The time to live in seconds of the document.
         * @param {RequestOptions} [options]                         - The request options.
         * @param {boolean} [options.disableAutomaticIdGeneration]   - Disables the automatic id generation. If id is missing in the body and this option is true, an error will be returned.
         * @param {RequestCallback} callback                         - The callback for the request.
         */
        createDocument: function (documentsFeedOrDatabaseLink, body, options, callback) {
            var partitionResolver = this.partitionResolvers[documentsFeedOrDatabaseLink];
            
            var collectionLink;
            if (partitionResolver === undefined || partitionResolver === null) {
                collectionLink = documentsFeedOrDatabaseLink;
            } else {
                collectionLink = this.resolveCollectionLinkForCreate(partitionResolver, body);
            }
            
            this.createDocumentPrivate(collectionLink, body, options, callback);
        },
        
        /**
         * Create an attachment for the document object.
         * <p>
         * Each document may contain zero or more attachments. Attachments can be of any MIME type - text, image, binary data. <br>
         * These are stored externally in Azure Blob storage. Attachments are automatically deleted when the parent document is deleted.
         * </P>
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink         - The self-link of the document.
         * @param {Object} body                 - The metadata the defines the attachment media like media, contentType. It can include any other properties as part of the metedata.
         * @param {string} body.contentType     - The MIME contentType of the attachment.
         * @param {string} body.media           - Media link associated with the attachment content.
         * @param {RequestOptions} options      - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
        */
        createAttachment: function (documentLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(documentLink);
            var path = this.getPathFromLink(documentLink, "attachments", isNameBased);
            var id = this.getIdFromLink(documentLink, isNameBased);
            
            this.create(body, path, "attachments", id, undefined, options, callback);
        },
        
        /**
         * Create a database user.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink         - The self-link of the database.
         * @param {object} body                 - Represents the body of the user.
         * @param {string} body.id              - The id of the user.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        createUser: function (databaseLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(databaseLink);
            var path = this.getPathFromLink(databaseLink, "users", isNameBased);
            var id = this.getIdFromLink(databaseLink, isNameBased);
            
            this.create(body, path, "users", id, undefined, options, callback);
        },
        
        /**
         * Create a permission.
         * <p> A permission represents a per-User Permission to access a specific resource e.g. Document or Collection.  </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink             - The self-link of the user.
         * @param {object} body                 - Represents the body of the permission.
         * @param {string} body.id              - The id of the permission
         * @param {string} body.permissionMode  - The mode of the permission, must be a value of {@link PermissionMode}
         * @param {string} body.resource        - The link of the resource that the permission will be applied to.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        createPermission: function (userLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(userLink);
            var path = this.getPathFromLink(userLink, "permissions", isNameBased);
            var id = this.getIdFromLink(userLink, isNameBased);
            
            this.create(body, path, "permissions", id, undefined, options, callback);
        },
        
        /**
        * Create a trigger.
        * <p>
        * DocumentDB supports pre and post triggers defined in JavaScript to be executed on creates, updates and deletes. <br>
        * For additional details, refer to the server-side JavaScript API documentation.
        * </p>
        * @memberof DocumentClient
        * @instance
        * @param {string} collectionLink           - The self-link of the collection.
        * @param {object} trigger                  - Represents the body of the trigger.
        * @param {string} trigger.id             - The id of the trigger.
        * @param {string} trigger.triggerType      - The type of the trigger, should be one of the values of {@link TriggerType}.
        * @param {string} trigger.triggerOperation - The trigger operation, should be one of the values of {@link TriggerOperation}.
        * @param {function} trigger.serverScript   - The body of the trigger, it can be passed as stringified too.
        * @param {RequestOptions} [options]        - The request options.
        * @param {RequestCallback} callback        - The callback for the request.
        */
        createTrigger: function (collectionLink, trigger, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (trigger.serverScript) {
                trigger.body = trigger.serverScript.toString();
            } else if (trigger.body) {
                trigger.body = trigger.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(trigger, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "triggers", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.create(trigger, path, "triggers", id, undefined, options, callback);
        },
        
        /**
         * Create a UserDefinedFunction.
         * <p>
         * DocumentDB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
         * For additional details, refer to the server-side JavaScript API documentation.
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink                - The self-link of the collection.
         * @param {object} udf                           - Represents the body of the userDefinedFunction.
         * @param {string} udf.id                      - The id of the udf.
         * @param {string} udf.userDefinedFunctionType   - The type of the udf, it should be one of the values of {@link UserDefinedFunctionType}
         * @param {function} udf.serverScript            - Represents the body of the udf, it can be passed as stringified too.
         * @param {RequestOptions} [options]             - The request options.
         * @param {RequestCallback} callback             - The callback for the request.
         */
        createUserDefinedFunction: function (collectionLink, udf, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (udf.serverScript) {
                udf.body = udf.serverScript.toString();
            } else if (udf.body) {
                udf.body = udf.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(udf, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "udfs", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.create(udf, path, "udfs", id, undefined, options, callback);
        },
        
        /**
         * Create a StoredProcedure.
         * <p>
         * DocumentDB allows stored procedures to be executed in the storage tier, directly against a document collection. The script <br>
         * gets executed under ACID transactions on the primary storage partition of the specified collection. For additional details, <br>
         * refer to the server-side JavaScript API documentation.
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink       - The self-link of the collection.
         * @param {object} sproc                - Represents the body of the stored procedure.
         * @param {string} sproc.id           - The id of the stored procedure.
         * @param {function} sproc.serverScript - The body of the stored procedure, it can be passed as stringified too.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        createStoredProcedure: function (collectionLink, sproc, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (sproc.serverScript) {
                sproc.body = sproc.serverScript.toString();
            } else if (sproc.body) {
                sproc.body = sproc.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(sproc, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "sprocs", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.create(sproc, path, "sprocs", id, undefined, options, callback);
        },
        
        /**
         * Create an attachment for the document object.
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink             - The self-link of the document.
         * @param {stream.Readable} readableStream  - the stream that represents the media itself that needs to be uploaded.
         * @param {MediaOptions} [options]          - The request options.
         * @param {RequestCallback} callback        - The callback for the request.
        */
        createAttachmentAndUploadMedia: function (documentLink, readableStream, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var initialHeaders = Base.extend({}, this.defaultHeaders);
            
            // Add required headers slug and content-type.
            if (options.slug) {
                initialHeaders[Constants.HttpHeaders.Slug] = options.slug;
            }
            
            if (options.contentType) {
                initialHeaders[Constants.HttpHeaders.ContentType] = options.contentType;
            } else {
                initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.OctetStream;
            }
            
            var isNameBased = Base.isLinkNameBased(documentLink);
            var path = this.getPathFromLink(documentLink, "attachments", isNameBased);
            var id = this.getIdFromLink(documentLink, isNameBased);
            
            this.create(readableStream, path, "attachments", id, initialHeaders, options, callback);
        },
        
        /** Reads a database.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink         - The self-link of the database.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
        */
        readDatabase: function (databaseLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(databaseLink);
            var path = this.getPathFromLink(databaseLink, "", isNameBased);
            var id = this.getIdFromLink(databaseLink, isNameBased);
            
            this.read(path, "dbs", id, undefined, options, callback);
        },
        
        /**
         * Reads a collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink       - The self-link of the collection.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        readCollection: function (collectionLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            var that = this;
            this.read(path, "colls", id, undefined, options, function (err, collection, headers) {
                if (err) return callback(err, collection, headers);
                that.partitionKeyDefinitionCache[collectionLink] = collection.partitionKey;
                callback(err, collection, headers);
            });
        },
        
        /**
         * Reads a document.
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink         - The self-link of the document.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        readDocument: function (documentLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(documentLink);
            var path = this.getPathFromLink(documentLink, "", isNameBased);
            var id = this.getIdFromLink(documentLink, isNameBased);
            
            this.read(path, "docs", id, undefined, options, callback);
        },
        
        /**
         * Reads an Attachment object.
         * @memberof DocumentClient
         * @instance
         * @param {string} attachmentLink    - The self-link of the attachment.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        readAttachment: function (attachmentLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(attachmentLink);
            var path = this.getPathFromLink(attachmentLink, "", isNameBased);
            var id = this.getIdFromLink(attachmentLink, isNameBased);
            
            this.read(path, "attachments", id, undefined, options, callback);
        },
        
        /**
         * Reads a user.
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink          - The self-link of the user.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        readUser: function (userLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(userLink);
            var path = this.getPathFromLink(userLink, "", isNameBased);
            var id = this.getIdFromLink(userLink, isNameBased);
            
            this.read(path, "users", id, undefined, options, callback);
        },
        
        /**
         * Reads a permission.
         * @memberof DocumentClient
         * @instance
         * @param {string} permissionLink    - The self-link of the permission.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        readPermission: function (permissionLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(permissionLink);
            var path = this.getPathFromLink(permissionLink, "", isNameBased);
            var id = this.getIdFromLink(permissionLink, isNameBased);
            
            this.read(path, "permissions", id, undefined, options, callback);
        },
        
        /**
         * Reads a trigger object.
         * @memberof DocumentClient
         * @instance
         * @param {string} triggerLink       - The self-link of the trigger.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        readTrigger: function (triggerLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var resourceInfo = Base.parseLink(triggerLink);
            
            var isNameBased = Base.isLinkNameBased(triggerLink);
            var path = this.getPathFromLink(triggerLink, "", isNameBased);
            var id = this.getIdFromLink(triggerLink, isNameBased);
            
            this.read(path, "triggers", id, undefined, options, callback);
        },
        
        /**
         * Reads a udf object.
         * @memberof DocumentClient
         * @instance
         * @param {string} udfLink           - The self-link of the user defined function.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        readUserDefinedFunction: function (udfLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(udfLink);
            var path = this.getPathFromLink(udfLink, "", isNameBased);
            var id = this.getIdFromLink(udfLink, isNameBased);
            
            this.read(path, "udfs", id, undefined, options, callback);
        },
        
        /**
         * Reads a StoredProcedure object.
         * @memberof DocumentClient
         * @instance
         * @param {string} sprocLink         - The self-link of the stored procedure.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        readStoredProcedure: function (sprocLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(sprocLink);
            var path = this.getPathFromLink(sprocLink, "", isNameBased);
            var id = this.getIdFromLink(sprocLink, isNameBased);
            
            this.read(path, "sprocs", id, undefined, options, callback);
        },
        
        /**
         * Reads a conflict.
         * @memberof DocumentClient
         * @instance
         * @param {string} conflictLink      - The self-link of the conflict.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        readConflict: function (conflictLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(conflictLink);
            var path = this.getPathFromLink(conflictLink, "", isNameBased);
            var id = this.getIdFromLink(conflictLink, isNameBased);
            
            this.read(path, "conflicts", id, undefined, options, callback);
        },
        
        /** Lists all databases.
         * @memberof DocumentClient
         * @instance
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
        */
        readDatabases: function (options) {
            return this.queryDatabases(undefined, options);
        },
        
        /**
         * Get all collections in this database.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink   - The self-link of the database.
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
         */
        readCollections: function (databaseLink, options) {
            return this.queryCollections(databaseLink, undefined, options);
        },
        
        /**
         * Get all documents in this collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
         */
        readDocuments: function (collectionLink, options) {
            return this.queryDocuments(collectionLink, undefined, options);
        },

        /**
         * Get all Partition key Ranges in this collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
         * @ignore
         */
        readPartitionKeyRanges: function (collectionLink, options) {
            return this.queryPartitionKeyRanges(collectionLink, undefined, options);
        },
        
        /**
        * Get all attachments for this document.
        * @memberof DocumentClient
        * @instance
        * @param {string} documentLink   - The self-link of the document.
        * @param {FeedOptions} [options] - The feed options.
        * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
       */
        readAttachments: function (documentLink, options) {
            return this.queryAttachments(documentLink, undefined, options);
        },
        
        /**
         * Get all users in this database.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink       - The self-link of the database.
         * @param {FeedOptions} [feedOptions] - The feed options.
         * @returns {QueryIterator}           - An instance of queryIterator to handle reading feed.
         */
        readUsers: function (databaseLink, options) {
            return this.queryUsers(databaseLink, undefined, options);
        },
        
        /**
         * Get all permissions for this user.
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink           - The self-link of the user.
         * @param {FeedOptions} [feedOptions] - The feed options.
         * @returns {QueryIterator}           - An instance of queryIterator to handle reading feed.
         */
        readPermissions: function (userLink, options) {
            return this.queryPermissions(userLink, undefined, options);
        },
        
        /**
         * Get all triggers in this collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink   - The self-link of the collection.
         * @param {FeedOptions} [options]   - The feed options.
         * @returns {QueryIterator}         - An instance of queryIterator to handle reading feed.
         */
        readTriggers: function (collectionLink, options) {
            return this.queryTriggers(collectionLink, undefined, options);
        },
        
        /**
         * Get all UserDefinedFunctions in this collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
         */
        readUserDefinedFunctions: function (collectionLink, options) {
            return this.queryUserDefinedFunctions(collectionLink, undefined, options);
        },
        
        /**
         * Get all StoredProcedures in this collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
         */
        readStoredProcedures: function (collectionLink, options) {
            return this.queryStoredProcedures(collectionLink, undefined, options);
        },
        
        /**
         * Get all conflicts in this collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of QueryIterator to handle reading feed.
         */
        readConflicts: function (collectionLink, options) {
            return this.queryConflicts(collectionLink, undefined, options);
        },
        
        /** Lists all databases that satisfy a query.
         * @memberof DocumentClient
         * @instance
         * @param {SqlQuerySpec | string} query - A SQL query.
         * @param {FeedOptions} [options]       - The feed options.
         * @returns {QueryIterator}             - An instance of QueryIterator to handle reading feed.
        */
        queryDatabases: function (query, options) {
            var that = this;
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                        that,
                        "/dbs",
                        "dbs",
                        "",
                        function (result) { return result.Databases; },
                        function (parent, body) { return body; },
                        query,
                        options,
                        callback);
            });
        },
        
        /**
         * Query the collections for the database.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink           - The self-link of the database.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryCollections: function (databaseLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(databaseLink);
            var path = this.getPathFromLink(databaseLink, "colls", isNameBased);
            var id = this.getIdFromLink(databaseLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "colls",
                    id,
                    function (result) { return result.DocumentCollections; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
        
        /**
         * Query the documents for the collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} documentsFeedOrDatabaseLink          - The collection link or database link if using a partition resolver
         * @param {SqlQuerySpec | string} query                 - A SQL query.
         * @param {FeedOptions} [options]                       - Represents the feed options.
         * @param {object} [options.partitionKey]               - Optional partition key to be used with the partition resolver
         * @returns {QueryIterator}                             - An instance of queryIterator to handle reading feed.
         */
        queryDocuments: function (documentsFeedOrDatabaseLink, query, options) {
            var partitionResolver = this.partitionResolvers[documentsFeedOrDatabaseLink];
            var collectionLinks;
            if (partitionResolver === undefined || partitionResolver === null) {
                collectionLinks = [documentsFeedOrDatabaseLink];
            } else {
                collectionLinks = partitionResolver.resolveForRead(options && options.partitionKey);
            }
            
            return this.queryDocumentsPrivate(collectionLinks, query, options);
        },

        /**
         * Query the partition key ranges
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink           - The self-link of the database.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         * @ignore
         */
        queryPartitionKeyRanges: function (collectionLink, query, options) {
            var that = this;

            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "pkranges", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);

            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "pkranges",
                    id,
                    function (result) { return result.PartitionKeyRanges; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },


        /**
         * Query the attachments for the document.
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink           - The self-link of the document.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
        */
        queryAttachments: function (documentLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(documentLink);
            var path = this.getPathFromLink(documentLink, "attachments", isNameBased);
            var id = this.getIdFromLink(documentLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                        that,
                        path,
                        "attachments",
                        id,
                        function (result) { return result.Attachments; },
                        function (parent, body) { return body; },
                        query,
                        options,
                        callback);
            });
        },
        
        /**
         * Query the users for the database.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink           - The self-link of the database.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryUsers: function (databaseLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(databaseLink);
            var path = this.getPathFromLink(databaseLink, "users", isNameBased);
            var id = this.getIdFromLink(databaseLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "users",
                    id,
                    function (result) { return result.Users; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
        
        /**
         * Query the permission for the user.
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink               - The self-link of the user.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryPermissions: function (userLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(userLink);
            var path = this.getPathFromLink(userLink, "permissions", isNameBased);
            var id = this.getIdFromLink(userLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "permissions",
                    id,
                    function (result) { return result.Permissions; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
        
        /**
         * Query the triggers for the collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink         - The self-link of the collection.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryTriggers: function (collectionLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "triggers", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "triggers",
                    id,
                    function (result) { return result.Triggers; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
        
        /**
         * Query the user defined functions for the collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink         - The self-link of the collection.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryUserDefinedFunctions: function (collectionLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "udfs", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "udfs",
                    id,
                    function (result) { return result.UserDefinedFunctions; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
        
        /**
         * Query the storedProcedures for the collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink         - The self-link of the collection.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryStoredProcedures: function (collectionLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "sprocs", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "sprocs",
                    id,
                    function (result) { return result.StoredProcedures; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
        
        /**
         * Query the conflicts for the collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink         - The self-link of the collection.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryConflicts: function (collectionLink, query, options) {
            var that = this;
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "conflicts", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "conflicts",
                    id,
                    function (result) { return result.Conflicts; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
        
        /**
         * Delete the database object.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink         - The self-link of the database.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
        */
        deleteDatabase: function (databaseLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(databaseLink);
            var path = this.getPathFromLink(databaseLink, "", isNameBased);
            var id = this.getIdFromLink(databaseLink, isNameBased);
            this.deleteResource(path, "dbs", id, undefined, options, callback);
        },
        
        /**
         * Delete the collection object.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink    - The self-link of the collection.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deleteCollection: function (collectionLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.deleteResource(path, "colls", id, undefined, options, callback);
        },
        
        /**
         * Delete the document object.
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink      - The self-link of the document.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deleteDocument: function (documentLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(documentLink);
            var path = this.getPathFromLink(documentLink, "", isNameBased);
            var id = this.getIdFromLink(documentLink, isNameBased);
            
            this.deleteResource(path, "docs", id, undefined, options, callback);
        },
        
        /**
         * Delete the attachment object.
         * @memberof DocumentClient
         * @instance
         * @param {string} attachmentLink    - The self-link of the attachment.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        deleteAttachment: function (attachmentLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(attachmentLink);
            var path = this.getPathFromLink(attachmentLink, "", isNameBased);
            var id = this.getIdFromLink(attachmentLink, isNameBased);
            
            this.deleteResource(path, "attachments", id, undefined, options, callback);
        },
        
        /**
         * Delete the user object.
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink          - The self-link of the user.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deleteUser: function (userLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(userLink);
            var path = this.getPathFromLink(userLink, "", isNameBased);
            var id = this.getIdFromLink(userLink, isNameBased);
            
            this.deleteResource(path, "users", id, undefined, options, callback);
        },
        
        /**
         * Delete the permission object.
         * @memberof DocumentClient
         * @instance
         * @param {string} permissionLink    - The self-link of the permission.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deletePermission: function (permissionLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(permissionLink);
            var path = this.getPathFromLink(permissionLink, "", isNameBased);
            var id = this.getIdFromLink(permissionLink, isNameBased);
            
            this.deleteResource(path, "permissions", id, undefined, options, callback);
        },
        
        /**
         * Delete the trigger object.
         * @memberof DocumentClient
         * @instance
         * @param {string} triggerLink       - The self-link of the trigger.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deleteTrigger: function (triggerLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(triggerLink);
            var path = this.getPathFromLink(triggerLink, "", isNameBased);
            var id = this.getIdFromLink(triggerLink, isNameBased);
            
            this.deleteResource(path, "triggers", id, undefined, options, callback);
        },
        
        /**
         * Delete the UserDefinedFunction object.
         * @memberof DocumentClient
         * @instance
         * @param {string} udfLink           - The self-link of the user defined function.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deleteUserDefinedFunction: function (udfLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(udfLink);
            var path = this.getPathFromLink(udfLink, "", isNameBased);
            var id = this.getIdFromLink(udfLink, isNameBased);
            
            this.deleteResource(path, "udfs", id, undefined, options, callback);
        },
        
        /**
         * Delete the StoredProcedure object.
         * @memberof DocumentClient
         * @instance
         * @param {string} sprocLink         - The self-link of the stored procedure.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deleteStoredProcedure: function (sprocLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(sprocLink);
            var path = this.getPathFromLink(sprocLink, "", isNameBased);
            var id = this.getIdFromLink(sprocLink, isNameBased);
            
            this.deleteResource(path, "sprocs", id, undefined, options, callback);
        },
        
        /**
         * Delete the conflict object.
         * @memberof DocumentClient
         * @instance
         * @param {string} conflictLink      - The self-link of the conflict.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        deleteConflict: function (conflictLink, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var isNameBased = Base.isLinkNameBased(conflictLink);
            var path = this.getPathFromLink(conflictLink, "", isNameBased);
            var id = this.getIdFromLink(conflictLink, isNameBased);
            
            this.deleteResource(path, "conflicts", id, undefined, options, callback);
        },
        
        /**
         * Replace the document collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink    - The self-link of the document collection.
         * @param {object} collection        - Represent the new document collection body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replaceCollection: function (collectionLink, collection, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(collection, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.replace(collection, path, "colls", id, undefined, options, callback);
        },
        
        /**
         * Replace the document object.
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink      - The self-link of the document.
         * @param {object} document          - Represent the new document body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replaceDocument: function (documentLink, newDocument, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var that = this;
            
            var task = function () {
                var err = {};
                if (!that.isResourceValid(newDocument, err)) {
                    callback(err);
                    return;
                }
                
                var isNameBased = Base.isLinkNameBased(documentLink);
                var path = that.getPathFromLink(documentLink, "", isNameBased);
                var id = that.getIdFromLink(documentLink, isNameBased);
                
                that.replace(newDocument, path, "docs", id, undefined, options, callback);
            };
            
            if (options.partitionKey === undefined) {
                this.getPartitionKeyDefinition(Base.getCollectionLink(documentLink), function (err, partitionKeyDefinition, response, headers) {
                    if (err) return callback(err, response, headers);
                    options.partitionKey = that.extractPartitionKey(newDocument, partitionKeyDefinition);
                    
                    task();
                });
            }
            else {
                task();
            }
        },
        
        /**
         * Replace the attachment object.
         * @memberof DocumentClient
         * @instance
         * @param {string} attachmentLink    - The self-link of the attachment.
         * @param {object} attachment        - Represent the new attachment body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
         */
        replaceAttachment: function (attachmentLink, attachment, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(attachment, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(attachmentLink);
            var path = this.getPathFromLink(attachmentLink, "", isNameBased);
            var id = this.getIdFromLink(attachmentLink, isNameBased);
            
            this.replace(attachment, path, "attachments", id, undefined, options, callback);
        },
        
        /**
         * Replace the user object.
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink          - The self-link of the user.
         * @param {object} user              - Represent the new user body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replaceUser: function (userLink, user, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(user, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(userLink);
            var path = this.getPathFromLink(userLink, "", isNameBased);
            var id = this.getIdFromLink(userLink, isNameBased);
            
            this.replace(user, path, "users", id, undefined, options, callback);
        },
        
        /**
         * Replace the permission object.
         * @memberof DocumentClient
         * @instance
         * @param {string} permissionLink    - The self-link of the permission.
         * @param {object} permission        - Represent the new permission body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replacePermission: function (permissionLink, permission, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(permission, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(permissionLink);
            var path = this.getPathFromLink(permissionLink, "", isNameBased);
            var id = this.getIdFromLink(permissionLink, isNameBased);
            
            this.replace(permission, path, "permissions", id, undefined, options, callback);
        },
        
        /**
         * Replace the trigger object.
         * @memberof DocumentClient
         * @instance
         * @param {string} triggerLink       - The self-link of the trigger.
         * @param {object} trigger           - Represent the new trigger body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replaceTrigger: function (triggerLink, trigger, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (trigger.serverScript) {
                trigger.body = trigger.serverScript.toString();
            } else if (trigger.body) {
                trigger.body = trigger.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(trigger, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(triggerLink);
            var path = this.getPathFromLink(triggerLink, "", isNameBased);
            var id = this.getIdFromLink(triggerLink, isNameBased);
            
            this.replace(trigger, path, "triggers", id, undefined, options, callback);
        },
        
        /**
         * Replace the UserDefinedFunction object.
         * @memberof DocumentClient
         * @instance
         * @param {string} udfLink           - The self-link of the user defined function.
         * @param {object} udf               - Represent the new udf body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replaceUserDefinedFunction: function (udfLink, udf, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (udf.serverScript) {
                udf.body = udf.serverScript.toString();
            } else if (udf.body) {
                udf.body = udf.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(udf, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(udfLink);
            var path = this.getPathFromLink(udfLink, "", isNameBased);
            var id = this.getIdFromLink(udfLink, isNameBased);
            
            this.replace(udf, path, "udfs", id, undefined, options, callback);
        },
        
        /**
         * Replace the StoredProcedure object.
         * @memberof DocumentClient
         * @instance
         * @param {string} sprocLink         - The self-link of the stored procedure.
         * @param {object} sproc             - Represent the new sproc body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replaceStoredProcedure: function (sprocLink, sproc, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (sproc.serverScript) {
                sproc.body = sproc.serverScript.toString();
            } else if (sproc.body) {
                sproc.body = sproc.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(sproc, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(sprocLink);
            var path = this.getPathFromLink(sprocLink, "", isNameBased);
            var id = this.getIdFromLink(sprocLink, isNameBased);
            
            this.replace(sproc, path, "sprocs", id, undefined, options, callback);
        },
        
        /**
         * Upsert a document.
         * <p>
         * There is no set schema for JSON documents. They may contain any number of custom properties as well as an optional list of attachments. <br>
         * A Document is an application resource and can be authorized using the master key or resource keys
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} documentsFeedOrDatabaseLink               - The collection link or database link if using a partition resolver
         * @param {object} body                                      - Represents the body of the document. Can contain any number of user defined properties.
         * @param {string} [body.id]                                 - The id of the document, MUST be unique for each document.
         * @param {number} body.ttl                                  - The time to live in seconds of the document.
         * @param {RequestOptions} [options]                         - The request options.
         * @param {boolean} [options.disableAutomaticIdGeneration]   - Disables the automatic id generation. If id is missing in the body and this option is true, an error will be returned.
         * @param {RequestCallback} callback                         - The callback for the request.
         */
        upsertDocument: function (documentsFeedOrDatabaseLink, body, options, callback) {
            var partitionResolver = this.partitionResolvers[documentsFeedOrDatabaseLink];
            
            var collectionLink;
            if (partitionResolver === undefined || partitionResolver === null) {
                collectionLink = documentsFeedOrDatabaseLink;
            } else {
                collectionLink = this.resolveCollectionLinkForCreate(partitionResolver, body);
            }
            
            this.upsertDocumentPrivate(collectionLink, body, options, callback);
        },
        
        /**
         * Upsert an attachment for the document object.
         * <p>
         * Each document may contain zero or more attachments. Attachments can be of any MIME type - text, image, binary data. <br>
         * These are stored externally in Azure Blob storage. Attachments are automatically deleted when the parent document is deleted.
         * </P>
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink         - The self-link of the document.
         * @param {Object} body                 - The metadata the defines the attachment media like media, contentType. It can include any other properties as part of the metedata.
         * @param {string} body.contentType     - The MIME contentType of the attachment.
         * @param {string} body.media           - Media link associated with the attachment content.
         * @param {RequestOptions} options      - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
        */
        upsertAttachment: function (documentLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(documentLink);
            var path = this.getPathFromLink(documentLink, "attachments", isNameBased);
            var id = this.getIdFromLink(documentLink, isNameBased);
            
            this.upsert(body, path, "attachments", id, undefined, options, callback);
        },
        
        /**
         * Upsert a database user.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink         - The self-link of the database.
         * @param {object} body                 - Represents the body of the user.
         * @param {string} body.id              - The id of the user.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        upsertUser: function (databaseLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(databaseLink);
            var path = this.getPathFromLink(databaseLink, "users", isNameBased);
            var id = this.getIdFromLink(databaseLink, isNameBased);
            
            this.upsert(body, path, "users", id, undefined, options, callback);
        },
        
        /**
         * Upsert a permission.
         * <p> A permission represents a per-User Permission to access a specific resource e.g. Document or Collection.  </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink             - The self-link of the user.
         * @param {object} body                 - Represents the body of the permission.
         * @param {string} body.id              - The id of the permission
         * @param {string} body.permissionMode  - The mode of the permission, must be a value of {@link PermissionMode}
         * @param {string} body.resource        - The link of the resource that the permission will be applied to.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        upsertPermission: function (userLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var err = {};
            if (!this.isResourceValid(body, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(userLink);
            var path = this.getPathFromLink(userLink, "permissions", isNameBased);
            var id = this.getIdFromLink(userLink, isNameBased);
            
            this.upsert(body, path, "permissions", id, undefined, options, callback);
        },
        
        /**
        * Upsert a trigger.
        * <p>
        * DocumentDB supports pre and post triggers defined in JavaScript to be executed on creates, updates and deletes. <br>
        * For additional details, refer to the server-side JavaScript API documentation.
        * </p>
        * @memberof DocumentClient
        * @instance
        * @param {string} collectionLink           - The self-link of the collection.
        * @param {object} trigger                  - Represents the body of the trigger.
        * @param {string} trigger.id             - The id of the trigger.
        * @param {string} trigger.triggerType      - The type of the trigger, should be one of the values of {@link TriggerType}.
        * @param {string} trigger.triggerOperation - The trigger operation, should be one of the values of {@link TriggerOperation}.
        * @param {function} trigger.serverScript   - The body of the trigger, it can be passed as stringified too.
        * @param {RequestOptions} [options]        - The request options.
        * @param {RequestCallback} callback        - The callback for the request.
        */
        upsertTrigger: function (collectionLink, trigger, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (trigger.serverScript) {
                trigger.body = trigger.serverScript.toString();
            } else if (trigger.body) {
                trigger.body = trigger.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(trigger, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "triggers", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.upsert(trigger, path, "triggers", id, undefined, options, callback);
        },
        
        /**
         * Upsert a UserDefinedFunction.
         * <p>
         * DocumentDB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
         * For additional details, refer to the server-side JavaScript API documentation.
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink                - The self-link of the collection.
         * @param {object} udf                           - Represents the body of the userDefinedFunction.
         * @param {string} udf.id                      - The id of the udf.
         * @param {string} udf.userDefinedFunctionType   - The type of the udf, it should be one of the values of {@link UserDefinedFunctionType}
         * @param {function} udf.serverScript            - Represents the body of the udf, it can be passed as stringified too.
         * @param {RequestOptions} [options]             - The request options.
         * @param {RequestCallback} callback             - The callback for the request.
         */
        upsertUserDefinedFunction: function (collectionLink, udf, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (udf.serverScript) {
                udf.body = udf.serverScript.toString();
            } else if (udf.body) {
                udf.body = udf.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(udf, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "udfs", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.upsert(udf, path, "udfs", id, undefined, options, callback);
        },
        
        /**
         * Upsert a StoredProcedure.
         * <p>
         * DocumentDB allows stored procedures to be executed in the storage tier, directly against a document collection. The script <br>
         * gets executed under ACID transactions on the primary storage partition of the specified collection. For additional details, <br>
         * refer to the server-side JavaScript API documentation.
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink       - The self-link of the collection.
         * @param {object} sproc                - Represents the body of the stored procedure.
         * @param {string} sproc.id           - The id of the stored procedure.
         * @param {function} sproc.serverScript - The body of the stored procedure, it can be passed as stringified too.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
         */
        upsertStoredProcedure: function (collectionLink, sproc, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            if (sproc.serverScript) {
                sproc.body = sproc.serverScript.toString();
            } else if (sproc.body) {
                sproc.body = sproc.body.toString();
            }
            
            var err = {};
            if (!this.isResourceValid(sproc, err)) {
                callback(err);
                return;
            }
            
            var isNameBased = Base.isLinkNameBased(collectionLink);
            var path = this.getPathFromLink(collectionLink, "sprocs", isNameBased);
            var id = this.getIdFromLink(collectionLink, isNameBased);
            
            this.upsert(sproc, path, "sprocs", id, undefined, options, callback);
        },
        
        /**
         * Upsert an attachment for the document object.
         * @memberof DocumentClient
         * @instance
         * @param {string} documentLink             - The self-link of the document.
         * @param {stream.Readable} readableStream  - the stream that represents the media itself that needs to be uploaded.
         * @param {MediaOptions} [options]          - The request options.
         * @param {RequestCallback} callback        - The callback for the request.
        */
        upsertAttachmentAndUploadMedia: function (documentLink, readableStream, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var initialHeaders = Base.extend({}, this.defaultHeaders);
            
            // Add required headers slug and content-type.
            if (options.slug) {
                initialHeaders[Constants.HttpHeaders.Slug] = options.slug;
            }
            
            if (options.contentType) {
                initialHeaders[Constants.HttpHeaders.ContentType] = options.contentType;
            } else {
                initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.OctetStream;
            }
            
            var isNameBased = Base.isLinkNameBased(documentLink);
            var path = this.getPathFromLink(documentLink, "attachments", isNameBased);
            var id = this.getIdFromLink(documentLink, isNameBased);
            
            this.upsert(readableStream, path, "attachments", id, initialHeaders, options, callback);
        },
        
        /**
          * Read the media for the attachment object.
          * @memberof DocumentClient
          * @instance
          * @param {string} mediaLink         - The media link of the media in the attachment.
          * @param {RequestCallback} callback - The callback for the request, the result parameter can be a buffer or a stream
          *                                     depending on the value of {@link MediaReadMode}.
          */
        readMedia: function (mediaLink, callback) {
            var resourceInfo = Base.parseLink(mediaLink);
            var path = "/" + mediaLink;
            var initialHeaders = Base.extend({}, this.defaultHeaders);
            initialHeaders[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Any;
            var attachmentId = Base.getAttachmentIdFromMediaId(resourceInfo.objectBody.id).toLowerCase();

            var headers = Base.getHeaders(this, initialHeaders, "get", path, attachmentId, "media", {});
            
            var that = this;
            // readMedia will always use WriteEndpoint since it's not replicated in readable Geo regions
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                that.get(writeEndpoint, path, headers, callback);
            });
        },
        
        /**
         * Update media for the attachment
         * @memberof DocumentClient
         * @instance
         * @param {string} mediaLink                - The media link of the media in the attachment.
         * @param {stream.Readable} readableStream  - The stream that represents the media itself that needs to be uploaded.
         * @param {MediaOptions} [options]          - options for the media
         * @param {RequestCallback} callback        - The callback for the request.
         */
        updateMedia: function (mediaLink, readableStream, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var defaultHeaders = this.defaultHeaders;
            var initialHeaders = Base.extend({}, defaultHeaders);
            
            // Add required headers slug and content-type in case the body is a stream
            if (options.slug) {
                initialHeaders[Constants.HttpHeaders.Slug] = options.slug;
            }
            
            if (options.contentType) {
                initialHeaders[Constants.HttpHeaders.ContentType] = options.contentType;
            } else {
                initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.OctetStream;
            }
            
            initialHeaders[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Any;
            
            var resourceInfo = Base.parseLink(mediaLink);
            var path = "/" + mediaLink;
            var attachmentId = Base.getAttachmentIdFromMediaId(resourceInfo.objectBody.id).toLowerCase();
            var headers = Base.getHeaders(this, initialHeaders, "put", path, attachmentId, "media", options);

            // updateMedia will use WriteEndpoint since it uses PUT operation
            var that = this;
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                that.put(writeEndpoint, path, readableStream, headers, callback);
            });
        },
        
        /**
         * Execute the StoredProcedure represented by the object with partition key.
         * @memberof DocumentClient
         * @instance
         * @param {string} sprocLink            - The self-link of the stored procedure.
         * @param {Array} [params]              - represent the parameters of the stored procedure.
         * @param {Object} [options]            - partition key
         * @param {RequestCallback} callback    - The callback for the request.
        */
        executeStoredProcedure: function (sprocLink, params, options, callback) {
            if (!callback && !options) {
                callback = params;
                params = null;
                options = {}
            }
            else if(!callback) {
                callback = options;
                options = {};
            }
            
            var defaultHeaders = this.defaultHeaders;
            var initialHeaders = {};
            initialHeaders = Base.extend(initialHeaders, defaultHeaders);
            
            // Accept a single parameter or an array of parameters.
            if (params !== null && params !== undefined && params.constructor !== Array) {
                params = [params];
            }
            
            var isNameBased = Base.isLinkNameBased(sprocLink);
            var path = this.getPathFromLink(sprocLink, "", isNameBased);
            var id = this.getIdFromLink(sprocLink, isNameBased);
            
            var headers = Base.getHeaders(this, initialHeaders, "post", path, id, "sprocs", options);
            
            // executeStoredProcedure will use WriteEndpoint since it uses POST operation
            var that = this;
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                that.post(writeEndpoint, path, params, headers, callback);
            });
        },
        
        /**
         * Replace the offer object.
         * @memberof DocumentClient
         * @instance
         * @param {string} offerLink         - The self-link of the offer.
         * @param {object} offer             - Represent the new offer body.
         * @param {RequestCallback} callback - The callback for the request.
         */
        replaceOffer: function (offerLink, offer, callback) {
            var err = {};
            if (!this.isResourceValid(offer, err)) {
                callback(err);
                return;
            }
            
            var path = "/" + offerLink;
            var id = Base.parseLink(offerLink).objectBody.id.toLowerCase();
            this.replace(offer, path, "offers", id, undefined, {}, callback);
        },
        
        /** Reads an offer.
         * @memberof DocumentClient
         * @instance
         * @param {string} offerLink         - The self-link of the offer.
         * @param {RequestCallback} callback    - The callback for the request.
        */
        readOffer: function (offerLink, callback) {
            var path = "/" + offerLink;
            var id = Base.parseLink(offerLink).objectBody.id.toLowerCase();
            this.read(path, "offers", id, undefined, {}, callback);
        },
        
        /** Lists all offers.
         * @memberof DocumentClient
         * @instance
         * @param {FeedOptions} [options] - The feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
        */
        readOffers: function (options) {
            return this.queryOffers(undefined, options);
        },
        
        /** Lists all offers that satisfy a query.
         * @memberof DocumentClient
         * @instance
         * @param {SqlQuerySpec | string} query - A SQL query.
         * @param {FeedOptions} [options]       - The feed options.
         * @returns {QueryIterator}             - An instance of QueryIterator to handle reading feed.
        */
        queryOffers: function (query, options) {
            var that = this;
            return new QueryIterator(this, query, options, function (options, callback) {
                that.queryFeed.call(that,
                        that,
                        "/offers",
                        "offers",
                        "",
                        function (result) { return result.Offers; },
                        function (parent, body) { return body; },
                        query,
                        options,
                        callback);
            });
        },
        
        /** Gets the Database account information.
       * @memberof DocumentClient
       * @instance
       * @param {string} [options.urlConnection]   - The endpoint url whose database account needs to be retrieved. If not present, current client's url will be used.
       * @param {RequestCallback} callback         - The callback for the request. The second parameter of the callback will be of type {@link DatabaseAccount}.
       */
        getDatabaseAccount: function (options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;

            var urlConnection = options.urlConnection || this.urlConnection;

            var headers = Base.getHeaders(this, this.defaultHeaders, "get", "", "", "", {});
            this.get(urlConnection, "", headers, function (err, result, headers) {
                if (err) return callback(err);
                
                var databaseAccount = new AzureDocuments.DatabaseAccount();
                databaseAccount.DatabasesLink = "/dbs/";
                databaseAccount.MediaLink = "/media/";
                databaseAccount.MaxMediaStorageUsageInMB = headers[Constants.HttpHeaders.MaxMediaStorageUsageInMB];
                databaseAccount.CurrentMediaStorageUsageInMB = headers[Constants.HttpHeaders.CurrentMediaStorageUsageInMB];
                databaseAccount.ConsistencyPolicy = result.userConsistencyPolicy;
                
                // WritableLocations and ReadableLocations properties will be available only for geo-replicated database accounts
                if (Constants.WritableLocations in result) {
                    databaseAccount._writableLocations = result[Constants.WritableLocations];
                }
                if (Constants.ReadableLocations in result) {
                    databaseAccount._readableLocations = result[Constants.ReadableLocations];
                }
                
                callback(undefined, databaseAccount, headers);
            });
        },
        
        /** @ignore */
        createDocumentPrivate: function (collectionLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var that = this;
            
            var task = function () {
                // Generate random document id if the id is missing in the payload and options.disableAutomaticIdGeneration != true
                if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
                    body.id = Base.generateGuidId();
                }
                
                var err = {};
                if (!that.isResourceValid(body, err)) {
                    callback(err);
                    return;
                }
                
                var isNameBased = Base.isLinkNameBased(collectionLink);
                var path = that.getPathFromLink(collectionLink, "docs", isNameBased);
                var id = that.getIdFromLink(collectionLink, isNameBased);
                
                that.create(body, path, "docs", id, undefined, options, callback);
            };
            
            if (options.partitionKey === undefined) {
                this.getPartitionKeyDefinition(collectionLink, function (err, partitionKeyDefinition, response, headers) {
                    if (err) return callback(err, response, headers);
                    options.partitionKey = that.extractPartitionKey(body, partitionKeyDefinition);
                    
                    task();
                });
            }
            else {
                task();
            }
        },
        
        /** @ignore */
        upsertDocumentPrivate: function (collectionLink, body, options, callback) {
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var that = this;
            
            var task = function () {
                // Generate random document id if the id is missing in the payload and options.disableAutomaticIdGeneration != true
                if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
                    body.id = Base.generateGuidId();
                }
                
                var err = {};
                if (!that.isResourceValid(body, err)) {
                    callback(err);
                    return;
                }
                
                var isNameBased = Base.isLinkNameBased(collectionLink);
                var path = that.getPathFromLink(collectionLink, "docs", isNameBased);
                var id = that.getIdFromLink(collectionLink, isNameBased);
                
                that.upsert(body, path, "docs", id, undefined, options, callback);
            };
            
            if (options.partitionKey === undefined) {
                this.getPartitionKeyDefinition(collectionLink, function (err, partitionKeyDefinition, response, headers) {
                    if (err) return callback(err, response, headers);
                    options.partitionKey = that.extractPartitionKey(body, partitionKeyDefinition);
                    
                    task();
                });
            }
            else {
                task();
            }
        },
        
        /** @ignore */
        queryDocumentsPrivate: function (collectionLinks, query, options) {
            var that = this;
            
            var fetchFunctions = Base.map(collectionLinks, function (collectionLink) {
                var isNameBased = Base.isLinkNameBased(collectionLink);
                var path = that.getPathFromLink(collectionLink, "docs", isNameBased);
                var id = that.getIdFromLink(collectionLink, isNameBased);
                
                return function (options, callback) {
                    that.queryFeed.call(that,
                    that,
                    path,
                    "docs",
                    id,
                    function (result) { return result.Documents; },
                    function (parent, body) { return body; },
                    query,
                    options,
                    callback);
                };
            });
            
            return new QueryIterator(this, query, options, fetchFunctions, collectionLinks);
        },
        
        /** @ignore */
        create: function (body, path, type, id, initialHeaders, options, callback) {
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "post", path, id, type, options);

            var that = this;
            // create will use WriteEndpoint since it uses POST operation
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                that.post(writeEndpoint, path, body, headers, callback);
            });
        },
        
        /** @ignore */
        upsert: function (body, path, type, id, initialHeaders, options, callback) {
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "post", path, id, type, options);
            this.setIsUpsertHeader(headers);

            var that = this;
            // upsert will use WriteEndpoint since it uses POST operation
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                that.post(writeEndpoint, path, body, headers, callback);
            });
        },
        
        /** @ignore */
        replace: function (resource, path, type, id, initialHeaders, options, callback) {
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "put", path, id, type, options);
            
            var that = this;
            // replace will use WriteEndpoint since it uses PUT operation
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                that.put(writeEndpoint, path, resource, headers, callback);
            });
        },
        
        /** @ignore */
        read: function (path, type, id, initialHeaders, options, callback) {
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "get", path, id, type, options);

            var that = this;
            // read will use ReadEndpoint since it uses GET operation
            this._globalEndpointManager.getReadEndpoint(function (readEndpoint) {
                that.get(readEndpoint, path, headers, callback);
            });
        },
        
        /** @ignore */
        deleteResource: function (path, type, id, initialHeaders, options, callback) {
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "delete", path, id, type, options);

            var that = this;
            // deleteResource will use WriteEndpoint since it uses DELETE operation
            this._globalEndpointManager.getWriteEndpoint(function (writeEndpoint) {
                that.delete(writeEndpoint, path, headers, callback);
            });
        },
        
        /** @ignore */
        get: function (url, path, headers, callback) {
            return RequestHandler.request(this._globalEndpointManager, this.connectionPolicy, "GET", url, path, undefined, this.defaultUrlParams, headers, callback);
        },
        
        /** @ignore */
        post: function (url, path, body, headers, callback) {
            return RequestHandler.request(this._globalEndpointManager, this.connectionPolicy, "POST", url, path, body, this.defaultUrlParams, headers, callback);
        },
        
        /** @ignore */
        put: function (url, path, body, headers, callback) {
            return RequestHandler.request(this._globalEndpointManager, this.connectionPolicy, "PUT", url, path, body, this.defaultUrlParams, headers, callback);
        },
        
        /** @ignore */
        head: function (url, path, headers, callback) {
            return RequestHandler.request(this._globalEndpointManager, this.connectionPolicy, "HEAD", url, path, undefined, this.defaultUrlParams, headers, callback);
        },
        
        /** @ignore */
        delete: function (url, path, headers, callback) {
            return RequestHandler.request(this._globalEndpointManager, this.connectionPolicy, "DELETE", url, path, undefined, this.defaultUrlParams, headers, callback);
        },
        
        /** Gets the partition key definition first by looking into the cache otherwise by reading the collection.
        * @ignore
        * @param {string} collectionLink   - Link to the collection whose partition key needs to be extracted.
        * @param {function} callback       - The arguments to the callback are(in order): error, partitionKeyDefinition, response object and response headers
        */
        getPartitionKeyDefinition: function (collectionLink, callback) {
            // $ISSUE-felixfan-2016-03-17: Make name based path and link based path use the same key
            // $ISSUE-felixfan-2016-03-17: Refresh partitionKeyDefinitionCache when necessary
            if (collectionLink in this.partitionKeyDefinitionCache) {
                return callback(undefined, this.partitionKeyDefinitionCache[collectionLink]);
            }
            
            var that = this;
            
            this.readCollection(collectionLink, function (err, collection, headers) {
                if (err) return callback(err, undefined, collection, headers);
                callback(err, that.partitionKeyDefinitionCache[collectionLink], collection, headers);
            });
        },
        
        extractPartitionKey: function (document, partitionKeyDefinition) {
            if (partitionKeyDefinition && partitionKeyDefinition.paths && partitionKeyDefinition.paths.length > 0) {
                var partitionKey = [];
                partitionKeyDefinition.paths.forEach(function (path) {
                    var pathParts = Base.parsePath(path);
                    
                    var obj = document;
                    for (var i = 0; i < pathParts.length; ++i) {
                        if (!(pathParts[i] in obj)) {
                            obj = {};
                            break;
                        }
                        
                        obj = obj[pathParts[i]];
                    }
                    
                    partitionKey.push(obj);
                });
                
                return partitionKey;
            }
            
            return undefined;
        },
        
        /** @ignore */
        queryFeed: function (documentclient, path, type, id, resultFn, createFn, query, options, callback, partitionKeyRangeId) {
            var that = this;
            
            var optionsCallbackTuple = this.validateOptionsAndCallback(options, callback);
            options = optionsCallbackTuple.options;
            callback = optionsCallbackTuple.callback;
            
            var successCallback = function (err, result, responseHeaders) {
                if (err) return callback(err, undefined, responseHeaders);
                var bodies;
                if (query) {
                    bodies = resultFn(result);
                }
                else {
                    bodies = Base.map(resultFn(result), function (body) {
                        return createFn(that, body);
                    });
                }
                
                callback(undefined, bodies, responseHeaders);
            };
            
            // Query operations will use ReadEndpoint even though it uses GET(for queryFeed) and POST(for regular query operations)
            this._globalEndpointManager.getReadEndpoint(function (readEndpoint) {
                var initialHeaders = Base.extend({}, documentclient.defaultHeaders);
                if (query === undefined) {
                    var headers = Base.getHeaders(documentclient, initialHeaders, "get", path, id, type, options, partitionKeyRangeId);

                    documentclient.get(readEndpoint, path, headers, successCallback);
                } else {
                    initialHeaders[Constants.HttpHeaders.IsQuery] = "true";
                    switch (that.queryCompatibilityMode) {
                        case AzureDocuments.QueryCompatibilityMode.SqlQuery:
                            initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.SQL;
                            break;
                        case AzureDocuments.QueryCompatibilityMode.Query:
                        case AzureDocuments.QueryCompatibilityMode.Default:
                        default:
                            if (typeof query === "string") {
                                query = { query: query };  // Converts query text to query object.
                            }
                            initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.QueryJson;
                            break;
                    }
                    
                    var headers = Base.getHeaders(documentclient, initialHeaders, "post", path, id, type, options, partitionKeyRangeId);
                    documentclient.post(readEndpoint, path, query, headers, successCallback);
                }
            });
        },
        
        /** @ignore */
        isResourceValid: function (resource, err) {
            if (resource.id) {
                if (typeof resource.id !== "string") {
                    err.message = "Id must be a string.";
                    return false;
                }

                if (resource.id.indexOf("/") !== -1 || resource.id.indexOf("\\") !== -1 || resource.id.indexOf("?") !== -1 || resource.id.indexOf("#") !== -1) {
                    err.message = "Id contains illegal chars.";
                    return false;
                }
                if (resource.id[resource.id.length - 1] === " ") {
                    err.message = "Id ends with a space.";
                    return false;
                }
            }
            return true;
        },
        
        /** @ignore */
        resolveCollectionLinkForCreate: function (partitionResolver, document) {
            var validation = this.isPartitionResolverValid(partitionResolver);
            if (!validation.valid) {
                throw validation.error;
            }
            
            var partitionKey = partitionResolver.getPartitionKey(document);
            return partitionResolver.resolveForCreate(partitionKey);
        },
        
        /** @ignore */
        isPartitionResolverValid: function (partionResolver) {
            if (partionResolver === null || partionResolver === undefined) {
                return {
                    valid: false,
                    error: new Error("The partition resolver is null or undefined")
                };
            }
            
            var validation = this.isPartitionResolveFunctionDefined(partionResolver, "getPartitionKey");
            if (!validation.valid) {
                return validation;
            }
            validation = this.isPartitionResolveFunctionDefined(partionResolver, "resolveForCreate");
            if (!validation.valid) {
                return validation;
            }
            validation = this.isPartitionResolveFunctionDefined(partionResolver, "resolveForRead");
            return validation;
        },
        
        /** @ignore */
        isPartitionResolveFunctionDefined: function (partionResolver, functionName) {
            if (partionResolver === null || partionResolver === undefined) {
                return {
                    valid: false,
                    error: new Error("The partition resolver is null or undefined")
                };
            }
            
            if (typeof partionResolver[functionName] === "function") {
                return {
                    valid: true
                };
            } else {
                return {
                    valid: false,
                    error: new Error(this.sprintf("The partition resolver does not implement method %s. The type of %s is \"%s\"", functionName, functionName, typeof partionResolver[functionName]))
                };
            }
        },
        
        /** @ignore */
        getIdFromLink: function (resourceLink, isNameBased) {
            if (isNameBased) {
                return resourceLink;
            } else {
                return Base.parseLink(resourceLink).objectBody.id.toLowerCase();
            }
        },
        
        /** @ignore */
        getPathFromLink: function (resourceLink, resourceType, isNameBased) {
            if (isNameBased) {
                if (resourceType) {
                    return "/" + encodeURI(resourceLink) + "/" + resourceType;
                } else {
                    return "/" + encodeURI(resourceLink);
                }
            } else {
                if (resourceType) {
                    return "/" + resourceLink + resourceType + "/";
                } else {
                    return "/" + resourceLink;
                }
            }
        },
        
        /** @ignore */
        setIsUpsertHeader: function (headers) {
            if (headers === undefined || headers === null) {
                throw new Error('The "headers" parameter must not be null or undefined');
            }
            
            if (!(headers instanceof Object)) {
                throw new Error(this.sprintf('The "headers" parameter must be an instance of "Object". Actual type is: "%s".', typeof headers));
            }
            
            headers[Constants.HttpHeaders.IsUpsert] = true;
        },
        
        /** @ignore */
        validateOptionsAndCallback: function (optionsIn, callbackIn) {
            var options, callback;
            
            // options
            if (optionsIn === undefined) {
                options = new Object();
            } else if (callbackIn === undefined && typeof optionsIn === 'function') {
                callback = optionsIn;
                options = new Object();
            } else if (typeof optionsIn !== 'object') {
                throw new Error(this.sprintf('The "options" parameter must be of type "object". Actual type is: "%s".', typeof optionsIn));
            } else {
                options = optionsIn;
            }
            
            // callback
            if (callbackIn !== undefined && typeof callbackIn !== 'function') {
                throw new Error(this.sprintf('The "callback" parameter must be of type "function". Actual type is: "%s".', typeof callbackIn));
            } else if (typeof callbackIn === 'function') {
                callback = callbackIn
            }
            
            return { options: options, callback: callback };
        },
        
        /** @ignore */
        // Like C sprintf, currently only works for %s and %%.
        sprintf: function (format) {
            var args = arguments;
            var i = 1;
            return format.replace(/%((%)|s)/g, function (matchStr, subMatch1, subMatch2) {
                // In case of %% subMatch2 would be '%'.
                return subMatch2 || args[i++];
            });
        }
    }
);
//SCRIPT END

/**
 * The request options
 * @typedef {Object} RequestOptions                          -         Options that can be specified for a requested issued to the DocumentDB servers.
 * @property {string} [preTriggerInclude]                    -         Indicates what is the pre trigger to be invoked before the operation.
 * @property {string} [postTriggerInclude]                   -         Indicates what is the post trigger to be invoked after the operation.
 * @property {object} [accessCondition]                      -         Conditions Associated with the request.
 * @property {string} accessCondition.type                   -         Conditional HTTP method header type (IfMatch or IfNoneMatch).
 * @property {string} accessCondition.condition              -         Conditional HTTP method header value (the _etag field from the last version you read).
 * @property {string} [indexingDirective]                    -         Specifies indexing directives (index, do not index .. etc).
 * @property {string} [consistencyLevel]                     -         Consistency level required by the client.
 * @property {string} [sessionToken]                         -         Token for use with Session consistency.
 * @property {number} [resourceTokenExpirySeconds]           -         Expiry time (in seconds) for resource token associated with permission (applicable only for requests on permissions).
 * @property {string} [offerType]                            -         Offer type when creating document collections.
 * @property {boolean} [offerEnableRUPerMinuteThroughput]    -         Represents Request Units(RU)/Minute throughput is enabled/disabled for a collection in the Azure DocumentDB database service. 
 *                                                                     <p>This option is only valid when creating a document collection.</p>
 * @property {boolean} [disableRUPerMinuteUsage]             -         DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity to serve the request if regular provisioned RUs/second is exhausted.
 */

/**
 * The feed options
 * @typedef {Object} FeedOptions                  -         The feed options and query methods.
 * @property {number} [maxItemCount]              -         Max number of items to be returned in the enumeration operation.
 * @property {string} [continuation]              -         Opaque token for continuing the enumeration.
 * @property {string} [sessionToken]              -         Token for use with Session consistency.
 * @property {boolean} [EnableScanInQuery]        -         Allow scan on the queries which couldn't be served as indexing was opted out on the requested paths.
 * @property {boolean} [disableRUPerMinuteUsage]  -         DisableRUPerMinuteUsage is used to enable/disable Request Units(RUs)/minute capacity to serve the request if regular provisioned RUs/second is exhausted.
 */

/**
* The media options
* @typedef {Object} MediaOptions                                          -         Options associated with upload media.
* @property {string} [slug]                                               -         HTTP Slug header value.
* @property {string} [contentType=application/octet-stream]               -         HTTP ContentType header value.
*
*/

/**
 * The Sql query parameter.
 * @typedef {Object} SqlParameter
 * @property {string} name         -       The name of the parameter.
 * @property {string} value        -       The value of the parameter.
 */

/**
* The Sql query specification.
* @typedef {Object} SqlQuerySpec
* @property {string} query                       -       The body of the query.
* @property {Array<SqlParameter>} parameters     -       The array of {@link SqlParameter}.
*/

/**
* The callback to execute after the request execution.
* @callback RequestCallback
* @param {object} error            -       Will contain error information if an error occurs, undefined otherwise.
* @param {number} error.code       -       The response code corresponding to the error.
* @param {string} error.body       -       A string represents the error information.
* @param {Object} resource         -       An object that represents the requested resource (Db, collection, document ... etc) if no error happens.
* @param {object} responseHeaders  -       An object that contain the response headers.
*/

/**
* The Indexing Policy represents the indexing policy configuration for a collection.
* @typedef {Object} IndexingPolicy
* @property {boolean} automatic                                           -         Specifies whether automatic indexing is enabled for a collection.
                                                                                   <p>In automatic indexing, documents can be explicitly excluded from indexing using {@link RequestOptions}.
                                                                                   In manual indexing, documents can be explicitly included. </p>
* @property {string} indexingMode                                         -         The indexing mode (consistent or lazy) {@link IndexingMode}.
* @property {Array} IncludedPaths                                         -         An array of {@link IncludedPath} represents the paths to be included for indexing.
* @property {Array} ExcludedPaths                                         -         An array of {@link ExcludedPath} represents the paths to be excluded from indexing.
*
*/

/**
* <p> Included path. <br>
* </p>
* @typedef {Object} IncludedPath
* @property {Array} Indexes                                               -         An array of {@link Indexes}.
* @property {string} Path                                                 -         Path to be indexed.
*
*/

/**
* <p> Index specification. <br>
* </p>
* @typedef {Object} Indexes
* @property {string} Kind                                                  -         The index kind {@link IndexKind}.
* @property {string} DataType                                              -         The data type {@link DataType}.
* @property {number} Precision                                             -         The precision.
*
*/

/**
* <p> Excluded path. <br>
* </p>
* @typedef {Object} ExcludedPath
* @property {string} Path                                                  -         Path to be indexed.
*
*/

if (typeof exports !== "undefined") {
    exports.DocumentClient = DocumentClient;
    exports.DocumentBase = AzureDocuments;
    exports.RetryOptions = RetryOptions;
    exports.Base = Base;
    exports.Constants = Constants;
}
