//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

'use strict';

var Base = require("./base")
  , AzureDocuments = require('./documents')
  , QueryIterator = require('./queryIterator')
  , RequestHandler = require('./request')
  , Constants = require('./constants');

//SCRIPT START
var DocumentClient = Base.defineClass(
    /**
     * Provides a client-side logical representation of the Azure DocumentDB database account. This client is used to configure and execute requests against the service.
     * @constructor DocumentClient
     * @param {string} urlConnection           - The service endpoint to use to create the client.
     * @param {object} auth                    - An object that is used for authenticating requests and must contains one of the options
     * @param {string} [auth.masterkey]        - The authorization master key to use to create the client.
     * @param {Object} [auth.resourceTokens]   - An object that contains resources tokens. Keys for the object are resource Ids and values are the resource tokens.
     * @param {Array}  [auth.permissionFeed]   - An array of {@link Permission} objects.                              
     * @param {object} [connectionPolicy]      - An instance of {@link ConnectionPolicy} class. This parameter is optional and the default connectionPolicy will be used if omitted.
     * @param {string} [consistencyLevel]      - An optional parameter that represents the consistency level. It can take any value from {@link ConsistencyLevel}.
    */
    function DocumentClient(urlConnection, auth, connectionPolicy, consistencyLevel) {
        this.urlConnection = urlConnection;
        if( auth !== undefined ) {
            this.masterKey = auth.masterKey;
            this.resourceTokens = auth.resourceTokens;
            if (auth.permissionFeed) {
                this.resourceTokens = {};
                for (var i = 0; i < auth.permissionFeed.length; i++ ){
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
        if (consistencyLevel !== undefined){
            this.defaultHeaders[Constants.HttpHeaders.ConsistencyLevel] = consistencyLevel;
        }
        
        if (Constants.UserAgent) {
            this.defaultHeaders[Constants.HttpHeaders.UserAgent] = Constants.UserAgent;
        }
        
        // overide this for default query params to be added to the url.
        this.defaultUrlParams = "";

        // Query compatibility mode.
        // Allows to specify compatibility mode used by client when making query requests. Should be removed when
        // application/sql is no longer supported.
        this.queryCompatibilityMode = AzureDocuments.QueryCompatibilityMode.Default;
    },
    {
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
            if (!callback) {
                callback = options;
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
         * @param {RequestOptions} [options]             - The request options.
         * @param {RequestCallback} callback             - The callback for the request.
         */
        createCollection: function (databaseLink, body, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }
            
            var path = "/" + databaseLink + "colls/";
            var resourceInfo = Base.parsePath(databaseLink);
            this.create(body, path, "colls", resourceInfo.objectBody.id, undefined, options, callback);
        },
        
        /**
         * Create a document.
         * <p> 
         * There is no set schema for JSON documents. They may contain any number of custom properties as well as an optional list of attachments. <br>
         * A Document is an application resource and can be authorized using the master key or resource keys
         * </p>
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink    						- The self-link of the collection.
         * @param {object} body              						- Represents the body of the document. Can contain any number of user defined properties.
         * @param {string} [body.id]         						- The id of the document, MUST be unique for each document.
         * @param {RequestOptions} [options] 						- The request options.
		 * @param {boolean} [options.disableAutomaticIdGeneration]	- Disables the automatic id generation. If id is missing in the body and this option is true, an error will be returned.
         * @param {RequestCallback} callback 						- The callback for the request.
         */
        createDocument: function (collectionLink, body, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

			// Generate random document id if the id is missing in the payload and options.disableAutomaticIdGeneration != true
			if ((body.id === undefined || body.id === "") && !options.disableAutomaticIdGeneration) {
				body.id = Base.generateGuidId();
			}
			
            var path = "/" + collectionLink + "docs/";
            var resourceInfo = Base.parsePath(collectionLink);
            this.create(body, path, "docs", resourceInfo.objectBody.id, undefined, options, callback);
        },

        /**
         * Create an attachment for the document object.
         * <p>
         * Each document may contain zero or more attachemnts. Attachments can be of any MIME type - text, image, binary data. <br>
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + documentLink + "attachments/";
            var resourceInfo = Base.parsePath(documentLink);
            this.create(body, path, "attachments", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + databaseLink + "users/";
            var resourceInfo = Base.parsePath(databaseLink);
            this.create(body, path, "users", resourceInfo.objectBody.id, undefined, options, callback);
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
        createPermission: function(userLink, body, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }
            
            var path = "/" + userLink + "permissions/";
            var resourceInfo = Base.parsePath(userLink);
            this.create(body, path, "permissions", resourceInfo.objectBody.id, undefined, options, callback);
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
            var that = this;

            if (!callback) {
                callback = options;
                options = {};
            }

            if (trigger.serverScript) {
                trigger.body = trigger.serverScript.toString();
            } else if (trigger.body) {
                trigger.body = trigger.body.toString();
            } 
            
            var resourceInfo = Base.parsePath(collectionLink);
            var path = "/" + collectionLink + "triggers/";
            this.create(trigger, path, "triggers", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }
            
            if (udf.serverScript) {
                udf.body = udf.serverScript.toString();
            } else if (udf.body) {
                udf.body = udf.body.toString();
            } 
            
            var path = "/" + collectionLink + "udfs/";
            var resourceInfo = Base.parsePath(collectionLink);
            this.create(udf, path, "udfs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            if (sproc.serverScript) {
                sproc.body = sproc.serverScript.toString();
            } else if (sproc.body) {
                sproc.body = sproc.body.toString();
            }
            
            var path = "/" + collectionLink + "sprocs/";
            var resourceInfo = Base.parsePath(collectionLink);
            this.create(sproc, path, "sprocs", resourceInfo.objectBody.id, undefined, options, callback);
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
        createAttachmentAndUploadMedia: function(documentLink, readableStream, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }
            
            options = options || {};
            
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
            
            var path = "/" + documentLink + "attachments/";
            var resourceInfo = Base.parsePath(documentLink);
            this.create(readableStream, path, "attachments", resourceInfo.objectBody.id, initialHeaders, options, callback);
        },
        
        /** Reads a database. 
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink         - The self-link of the database.
         * @param {RequestOptions} [options]    - The request options.
         * @param {RequestCallback} callback    - The callback for the request.
        */
        readDatabase: function (databaseLink, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + databaseLink;
            var resourceInfo = Base.parsePath(databaseLink);
            this.read(path, "dbs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + collectionLink;
            var resourceInfo = Base.parsePath(collectionLink);
            this.read(path, "colls", resourceInfo.objectBody.id, undefined, options, callback)
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + documentLink;
            var resourceInfo = Base.parsePath(documentLink);
            this.read(path, "docs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + attachmentLink;
            var resourceInfo = Base.parsePath(attachmentLink);
            this.read(path, "attachments", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + userLink;
            var resourceInfo = Base.parsePath(userLink);
            this.read(path, "users", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + permissionLink;
            var resourceInfo = Base.parsePath(permissionLink);
            this.read(path, "permissions", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var resourceInfo = Base.parsePath(triggerLink);
            var path = "/" + triggerLink;
            this.read(path, "triggers", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + udfLink;
            var resourceInfo = Base.parsePath(udfLink);
            this.read(path, "udfs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + sprocLink;
            var resourceInfo = Base.parsePath(sprocLink);
            this.read(path, "sprocs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + conflictLink;
            var resourceInfo = Base.parsePath(conflictLink);
            this.read(path, "conflicts", resourceInfo.objectBody.id, undefined, options, callback);
        },
       
        /** lLsts all databases. 
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
        readDocuments:  function (collectionLink, options) {
            return this.queryDocuments(collectionLink, undefined, options);
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
        readPermissions: function(userLink, options) {
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
        readTriggers:  function (collectionLink, options) {
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
        readUserDefinedFunctions:  function (collectionLink, options) {
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
        readStoredProcedures:  function (collectionLink, options, callback) {
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
        readConflicts:  function (collectionLink, options) {
            var that = this;
            var path = "/" + collectionLink + "conflicts/";
            var resourceInfo = Base.parsePath(collectionLink);
            return new QueryIterator(this, "", options, function(options, callback){
                that.queryFeed.call(that,
                    that,
                    path,
                    "conflicts",
                    resourceInfo.objectBody.id,
                    function(result) { return result.Conflicts; },
                    function(parent, body) { return body; },
                    "",
                    options,
                    callback);
            }); 
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
            var path = "/" + databaseLink + "colls/";
            var resourceInfo = Base.parsePath(databaseLink);
            return new QueryIterator(this, query, options, function(options, callback) {
                that.queryFeed.call(that,
                    that,
                    path,
                    "colls",
                    resourceInfo.objectBody.id,
                    function(result) { return result.DocumentCollections; },
                    function(parent, body) { return body; },
                    query,
                    options,
                    callback);
            });
        },
         
        /**
         * Query the documents for the collection.
         * @memberof DocumentClient
         * @instance
         * @param {string} collectionLink         - The self-link of the collection.
         * @param {SqlQuerySpec | string} query   - A SQL query.
         * @param {FeedOptions} [options]         - Represents the feed options.
         * @returns {QueryIterator}               - An instance of queryIterator to handle reading feed.
         */
        queryDocuments: function (collectionLink, query, options) {
            var that = this;
            var path = "/" + collectionLink + "docs/";
            var resourceInfo = Base.parsePath(collectionLink);
            return new QueryIterator(this, query, options, function(options, callback){
                that.queryFeed.call(that,
                    that,
                    path,
                    "docs",
                    resourceInfo.objectBody.id,
                    function(result) { return result.Documents; },
                    function(parent, body) { return body; },
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
            var path = "/" + documentLink + "attachments/";
            var resourceInfo = Base.parsePath(documentLink);
            return new QueryIterator(this, query, options, function(options, callback){
                that.queryFeed.call(that,
                        that,
                        path,
                        "attachments",
                        resourceInfo.objectBody.id,
                        function(result) { return result.Attachments; },
                        function(parent, body) { return body;},
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
        queryUsers: function(databaseLink, query, options) {
            var that = this;
            var path = "/" + databaseLink + "users/";
            var resourceInfo = Base.parsePath(databaseLink);
            return new QueryIterator(this, query, options, function(options, callback){
                that.queryFeed.call(that,
                    that,
                    path,
                    "users",
                    resourceInfo.objectBody.id,
                    function(result) { return result.Users; },
                    function(parent, body) { return body; },
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
        queryPermissions: function(userLink, query, options) {
            var that = this;
            var resourceInfo = Base.parsePath(userLink);
            var path = "/" + userLink + "permissions/";
            return new QueryIterator(this, query, options, function(options, callback){
                that.queryFeed.call(that,
                    that,
                    path,
                    "permissions",
                    resourceInfo.objectBody.id,
                    function(result) { return result.Permissions; },
                    function(parent, body) { return body; },
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
            var resourceInfo = Base.parsePath(collectionLink);
            var path = "/" + collectionLink + "triggers/";
            return new QueryIterator(this, query, options, function(options, callback){
                that.queryFeed.call(that,
                    that,
                    path,
                    "triggers",
                    resourceInfo.objectBody.id,
                    function(result) { return result.Triggers; },
                    function(parent, body) { return body; },
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
            var path = "/" + collectionLink + "udfs/";
            var resourceInfo = Base.parsePath(collectionLink);
            return new QueryIterator(this, query, options, function(options, callback){
                that.queryFeed.call(that,
                    that,
                    path,
                    "udfs",
                    resourceInfo.objectBody.id,
                    function(result) { return result.UserDefinedFunctions; },
                    function(parent, body) { return body; },
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
            var resourceInfo = Base.parsePath(collectionLink);
            var path = "/" + collectionLink + "sprocs/";
            return new QueryIterator(this, query, options, function(options, callback){
                that.queryFeed.call(that,
                    that,
                    path,
                    "sprocs",
                    resourceInfo.objectBody.id,
                    function(result) { return result.StoredProcedures; },
                    function(parent, body) { return body; },
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + databaseLink;
            var resourceInfo = Base.parsePath(databaseLink);
            this.deleteResource(path, "dbs", resourceInfo.objectBody.id, undefined, options, callback);
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
            var that = this;

            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + collectionLink;
            var resourceInfo = Base.parsePath(collectionLink);
            this.deleteResource(path, "colls", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + documentLink;
            var resourceInfo = Base.parsePath(documentLink);
            this.deleteResource(path, "docs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + attachmentLink;
            var resourceInfo = Base.parsePath(attachmentLink);
            this.deleteResource(path, "attachments", resourceInfo.objectBody.id, undefined, options, callback)
        },
        
        /**
         * Delete the user object.
         * @memberof DocumentClient
         * @instance
         * @param {string} userLink          - The self-link of the user.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request. 
        */
        deleteUser: function(userLink, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + userLink;
            var resourceInfo = Base.parsePath(userLink);
            this.deleteResource(path, "users", resourceInfo.objectBody.id, undefined, options, callback);
        },
        
        /**
         * Delete the permission object.
         * @memberof DocumentClient
         * @instance
         * @param {string} permissionLink    - The self-link of the permission.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request. 
        */
        deletePermission: function(permissionLink, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + permissionLink;
            var resourceInfo = Base.parsePath(permissionLink);
            this.deleteResource(path, "permissions", resourceInfo.objectBody.id, undefined, options, callback);
        },
        
        /**
         * Delete the trigger object.
         * @memberof DocumentClient
         * @instance
         * @param {string} triggerLink       - The self-link of the trigger.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request. 
        */
        deleteTrigger: function(triggerLink, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + triggerLink;
            var resourceInfo = Base.parsePath(triggerLink);
            this.deleteResource(path, "triggers", resourceInfo.objectBody.id, undefined, options, callback)
        },
        
        /**
         * Delete the UserDefinedFunction object.
         * @memberof DocumentClient
         * @instance
         * @param {string} udfLink           - The self-link of the user defined function.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request. 
        */
        deleteUserDefinedFunction: function(udfLink, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + udfLink;
            var resourceInfo = Base.parsePath(udfLink);
            this.deleteResource(path, "udfs", resourceInfo.objectBody.id, undefined, options, callback)
        },
        
        /**
         * Delete the StoredProcedure object.
         * @memberof DocumentClient
         * @instance
         * @param {string} sprocLink         - The self-link of the stored procedure.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request. 
        */
        deleteStoredProcedure: function(sprocLink, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + sprocLink;
            var resourceInfo = Base.parsePath(sprocLink);
            this.deleteResource(path, "sprocs", resourceInfo.objectBody.id, undefined, options, callback)
        },
       
        /**
         * Delete the conflict object.
         * @memberof DocumentClient
         * @instance
         * @param {string} conflictLink      - The self-link of the conflict.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request. 
        */
        deleteConflict: function(conflictLink, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + conflictLink;
            var resourceInfo = Base.parsePath(conflictLink);
            this.deleteResource(path, "conflicts", resourceInfo.objectBody.id, undefined, options, callback);
        },
        
        /**
         * Replace the database object.
         * @memberof DocumentClient
         * @instance
         * @param {string} databaseLink      - The self-link of the database.
         * @param {object} db                - Represent the new database body.
         * @param {RequestOptions} [options] - The request options.
         * @param {RequestCallback} callback - The callback for the request.
        */
        replaceDatabase: function (databaseLink, db, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + databaseLink;
            var resourceInfo = Base.parsePath(databaseLink);
            this.replace(db, path, "dbs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + documentLink;
            var resourceInfo = Base.parsePath(documentLink);
            this.replace(newDocument, path, "docs", resourceInfo.objectBody.id, undefined, options, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + attachmentLink;
            var resourceInfo = Base.parsePath(attachmentLink);
            this.replace(attachment, path, "attachments", resourceInfo.objectBody.id, undefined, options, callback);
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
        replaceUser: function(userLink, user, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + userLink;
            var resourceInfo = Base.parsePath(userLink);
            this.replace(user, path, "users", resourceInfo.objectBody.id, undefined, options, callback);
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
        replacePermission: function(permissionLink, permission, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            var path = "/" + permissionLink;
            var resourceInfo = Base.parsePath(permissionLink);
            this.replace(permission, path, "permissions", resourceInfo.objectBody.id, undefined, options, callback);
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
        replaceTrigger: function(triggerLink, trigger, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            if (trigger.serverScript) {
                trigger.body = trigger.serverScript.toString();
            } else if (trigger.body) {
                trigger.body = trigger.body.toString();
            } 
            
            var path = "/" + triggerLink;
            var resourceInfo = Base.parsePath(triggerLink);
            this.replace(trigger, path, "triggers", resourceInfo.objectBody.id, undefined, options, callback);
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
        replaceUserDefinedFunction: function(udfLink, udf, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            if (udf.serverScript) {
                udf.body = udf.serverScript.toString();
            } else if (udf.body) {
                udf.body = udf.body.toString();
            } 
            
            var path = "/" + udfLink;
            var resourceInfo = Base.parsePath(udfLink);
            this.replace(udf, path, "udfs", resourceInfo.objectBody.id, undefined, options, callback);
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
        replaceStoredProcedure: function(sprocLink, sproc, options, callback) {
            if (!callback) {
                callback = options;
                options = {};
            }

            if (sproc.serverScript) {
                sproc.body = sproc.serverScript.toString();
            } else if (sproc.body) {
                sproc.body = sproc.body.toString();
            }
           
            var path = "/" + sprocLink;
            var resourceInfo = Base.parsePath(sprocLink);
            this.replace(sproc, path, "sprocs", resourceInfo.objectBody.id, undefined, options, callback);
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
            var resourceInfo = Base.parsePath(mediaLink);
            var path = "/" + mediaLink;
            var initialHeaders = Base.extend({}, this.defaultHeaders);
            initialHeaders[Constants.HttpHeaders.Accept] = Constants.MediaTypes.Any;
            var attachmentId = Base.getAttachmentIdFromMediaId(resourceInfo.objectBody.id);
            var headers = Base.getHeaders(this, initialHeaders, "get", path, attachmentId, "media", {});
            this.get(this.urlConnection, path, headers, callback);
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
            if (!callback) {
                callback = options;
                options = {};
            }
            
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
            
            var urlConnection = this.urlConnection;
            var resourceInfo = Base.parsePath(mediaLink);
            var path = "/" + mediaLink;
            var attachmentId = Base.getAttachmentIdFromMediaId(resourceInfo.objectBody.id);
            var headers = Base.getHeaders(this, initialHeaders, "put", path, attachmentId, "media", options);

            this.put(urlConnection, path, readableStream, headers, callback);
        },
        
        /**
         * Execute the StoredProcedure represented by the object.
         * @memberof DocumentClient
         * @instance
         * @param {string} sprocLink            - The self-link of the stored procedure.
         * @param {Array} [params]              - represent the parameters of the stored procedure.
         * @param {RequestCallback} callback    - The callback for the request.
        */
        executeStoredProcedure: function(sprocLink, params, callback) {
            if (!callback) {
                callback = params;
                params = null;
            }
            
            var defaultHeaders = this.defaultHeaders;
            var initialHeaders = {};
            initialHeaders = Base.extend(initialHeaders, defaultHeaders);
            
            // Accept a single parameter or an array of parameters.
            if (params && params.constructor !== Array) {
                params = [params];
            }
            
            var urlConnection = this.urlConnection;
            var path = "/" + sprocLink;
            var resourceInfo = Base.parsePath(sprocLink);         
            var headers = Base.getHeaders(this, initialHeaders, "post", path, resourceInfo.objectBody.id, "sprocs", {});
            
            this.post(urlConnection, path, params, headers, callback);
        },
        
         /** Gets the Database account information.
        * @memberof DocumentClient
        * @instance
        * @param {RequestCallback} callback - The callback for the request. The second parameter of the callback will be of type {@link DatabaseAccount}.
        */
        getDatabaseAccount: function(callback) {
            var headers = Base.getHeaders(this, this.defaultHeaders, "get", "", "", "", {});
            this.get(this.urlConnection, "", headers, function(err, result, headers) {
                if (err) return callback(err);
                
                var databaseAccount = new AzureDocuments.DatabaseAccount();
                databaseAccount.DatabasesLink                    = "/dbs/";
                databaseAccount.MediaLink                        = "/media/";
                databaseAccount.MaxMediaStorageUsageInMB         = headers[Constants.HttpHeaders.MaxMediaStorageUsageInMB];
                databaseAccount.CurrentMediaStorageUsageInMB     = headers[Constants.HttpHeaders.CurrentMediaStorageUsageInMB];
                databaseAccount.CapacityUnitsConsumed            = headers[Constants.HttpHeaders.DatabaseAccountCapacityUnitsConsumed];
                databaseAccount.CapacityUnitsProvisioned         = headers[Constants.HttpHeaders.DatabaseAccountCapacityUnitsProvisioned];
                databaseAccount.ConsumedDocumentStorageInMB      = headers[Constants.HttpHeaders.DatabaseAccountConsumedDocumentStorageInMB];
                databaseAccount.ReservedDocumentStorageInMB      = headers[Constants.HttpHeaders.DatabaseAccountReservedDocumentStorageInMB];
                databaseAccount.ProvisionedDocumentStorageInMB   = headers[Constants.HttpHeaders.DatabaseAccountProvisionedDocumentStorageInMB];
                databaseAccount.ConsistencyPolicy                = result.userConsistencyPolicy;
                
                callback(undefined, databaseAccount, headers);
            });
        },

        /** @ignore */
        create: function (body, path, type, id, initialHeaders, options, callback) {
            var that = this;
            var urlConnection = this.urlConnection;
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "post", path, id, type, options);
            this.post(urlConnection, path, body, headers, callback);
        },

        /** @ignore */
        replace: function (resource, path, type, id, initialHeaders, options, callback) {
            var that = this;
            var urlConnection = this.urlConnection;
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "put", path, id, type, options);
            this.put(urlConnection, path, resource, headers, callback);
        },

        /** @ignore */
        read: function (path, type, id, initialHeaders, options, callback) {
            var that = this;
            var urlConnection = this.urlConnection;
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "get", path, id, type, options);
            this.get(this.urlConnection, path, headers, callback);
        },

        /** @ignore */
        deleteResource: function (path, type, id, initialHeaders, options, callback) {
            var that = this;
            var urlConnection = this.urlConnection;
            initialHeaders = initialHeaders || this.defaultHeaders;
            var headers = Base.getHeaders(this, initialHeaders, "delete", path, id, type, options);
            this.delete(urlConnection, path, headers, callback);
        },
        
        /** @ignore */
        get: function(url, path, headers, callback) {
            return RequestHandler.request(this.connectionPolicy, "GET", url, path, undefined, this.defaultUrlParams, headers, callback);
        },
        
        /** @ignore */
        post: function(url, path, body, headers, callback) {
            return RequestHandler.request(this.connectionPolicy, "POST", url, path, body, this.defaultUrlParams, headers, callback);
        },

        /** @ignore */
        put: function(url, path, body, headers, callback) {
            return RequestHandler.request(this.connectionPolicy, "PUT", url, path, body, this.defaultUrlParams, headers, callback);
        },
        
        /** @ignore */
        head: function(url, path, headers, callback) {
            return RequestHandler.request(this.connectionPolicy, "HEAD", url, path, undefined, this.defaultUrlParams, headers, callback);
        },

        /** @ignore */
        delete: function(url, path, headers, callback) {
            return RequestHandler.request(this.connectionPolicy, "DELETE", url, path, undefined, this.defaultUrlParams, headers, callback);
        },
        
        /** @ignore */
        queryFeed: function(documentclient, path, type, id, resultFn, createFn, query, options, callback) {
            var that = this;

            if (!callback) {
                callback = options;
                options = {};
            }
            
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
            
            var urlConnection = documentclient.urlConnection;
            var initialHeaders = Base.extend({}, documentclient.defaultHeaders);
            if (query === undefined) {
                var headers = Base.getHeaders(documentclient, initialHeaders, "get", path, id, type, options);
                documentclient.get(urlConnection, path, headers, successCallback);
            } else {
                initialHeaders[Constants.HttpHeaders.IsQuery] = "true";
                switch (this.queryCompatibilityMode) {
                    case AzureDocuments.QueryCompatibilityMode.SqlQuery:
                        initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.SQL;
                        break;
                    case AzureDocuments.QueryCompatibilityMode.Query:
                    case AzureDocuments.QueryCompatibilityMode.Default:
                    default:
                        if (typeof query === 'string') {
                            query = { query: query }  // Converts query text to query object.
                        }
                        initialHeaders[Constants.HttpHeaders.ContentType] = Constants.MediaTypes.QueryJson;
                        break;
                }

				var headers = Base.getHeaders(documentclient, initialHeaders, "post", path, id, type, options);
				documentclient.post(urlConnection, path, query, headers, successCallback);
            }
        }  
    }
);
//SCRIPT END
    
/**
 * The request options
 * @typedef {Object} RequestOptions               -         Options that can be specified for a requested issued to the DocumentDB servers.
 * @property {string} [preTriggerInclude]         -         Indicates what is the pre trigger to be invoked before the operation. 
 * @property {string} [postTriggerInclude]        -         Indicates what is the post trigger to be invoked after the operation. 
 * @property {object} [accessCondition]           -         Conditions Associated with the request.
 * @property {string} accessCondition.type        -         Conditional HTTP method header type.
 * @property {string} accessCondition.condition   -         Conditional HTTP method header value.
 * @property {string} [indexingDirective]         -         Specifies indexing directives (index, do not index .. etc).
 * @property {string} [consistencyLevel]          -         Consistency level required by the client.
 * @property {string} [sessionToken]              -         Token for use with Session consistency.
 * @property {number} [resourceTokenExpirySeconds]-         Expiry time (in seconds) for resource token associated with permission (applicable only for requests on permissions).
 */
 
/**
 * The feed options
 * @typedef {Object} FeedOptions                  -         The feed options and query methods.
 * @property {number} [maxItemCount]              -         Max number of items to be returned in the enumeration operation.
 * @property {string} [continuation]              -         Opaque token for continuing the enumeration.
 * @property {string} [sessionToken]              -         Token for use with Session consistency.
 * @property {boolean} [EnableScanInQuery]        -         Allow scan on the queries which couldn't be served as indexing was opted out on the requested paths.
 *
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
 * @property {Array} IncludedPaths                                           -         An array of {@link IndexingPath} represents The paths to be incuded for indexing.
 * @property {Array} ExcludedPaths                                            -         An array of strings representing the paths to be excluded from indexing.
 *
 */
 
 /**
 * <p> Indexing paths hints to optimize indexing. <br>
 *     Indexing paths allow tradeoff between indexing storage and query performance
 * </p>
 * @typedef {Object}  IndexingPath                                        
 * @property {string} IndexType                                                      -         The indexing type (range or hash) {@link IndexType}. 
 * @property {string} Path                                                            -         Path to be indexed.
 * @property {number} NempericPrecission                                            -         Precision for this particular Index type for numeric data.
 * @property {number} StringPrecission                                              -         Precision for this particular Index type for string data.
 *
 */
 
if (typeof exports !== "undefined") {
    exports.DocumentClient = DocumentClient;
    exports.DocumentBase = AzureDocuments;
    exports.Base = Base;
}
