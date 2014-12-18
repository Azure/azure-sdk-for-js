//----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//----------------------------------------------------------------------------

var Base = require("documentdb").Base
  , DocumentClient = require("documentdb").DocumentClient
  , DocumentBase = require("documentdb").DocumentBase
  , Q = require("q");

function createOperationPromise(contextObject, functionName, parentLink, body, options){
    var deferred = Q.defer();
    var cb = function (error, resource, responseHeaders) {
        if (error) {
            deferred.reject({error: error, headers: responseHeaders});
        } else {
            deferred.resolve({resource: resource, headers: responseHeaders});
        }
    };
    
    if (parentLink) {
        contextObject[functionName](parentLink, body, options, cb);
    } else {
        contextObject[functionName](body, options, cb);
    }
    
    return deferred.promise;
}

function deleteOperationPromise(contextObject, functionName, resourceLink, options){
    var deferred = Q.defer();
    contextObject[functionName](resourceLink, options, function (error, resource, responseHeaders) {
        if (error) {
            deferred.reject({error: error, headers: responseHeaders});
        } else {
            deferred.resolve({resource: resource, headers: responseHeaders});
        }
    });
    
    return deferred.promise;
}

function replaceOperationPromise(contextObject, functionName, resourceLink, newResource, options){
    var deferred = Q.defer();
    contextObject[functionName](resourceLink, newResource, options, function (error, resource, responseHeaders) {
        if (error) {
            deferred.reject({error: error, headers: responseHeaders});
        } else {
            deferred.resolve({resource: resource, headers: responseHeaders});
        }
    });
    
    return deferred.promise;
}

function readOperationPromise(contextObject, functionName, resourceLink, options){
    var deferred = Q.defer();
    contextObject[functionName](resourceLink, options, function (error, resource, responseHeaders) {
        if (error) {
            deferred.reject({error: error, headers: responseHeaders});
        } else {
            deferred.resolve({resource: resource, headers: responseHeaders});
        }
    });
    
    return deferred.promise;
}

function noParameterPromise(contextObject, functionName, resourceLink){
    var deferred = Q.defer();
    contextObject[functionName](resourceLink, function (error, resources, responseHeaders) {
        if (error) {
            deferred.reject({error: error, headers: responseHeaders});
        } else {
            deferred.resolve({result: resources, headers: responseHeaders});
        }
    });
    
    return deferred.promise;
}


var DocumentClientWrapper = Base.defineClass(
     /**
     * Provides a wrapper for all the functions of {@link DocumentClient} that uses the Q module promise API instead of the callback model.
     * @constructor DocumentClientWrapper
     * @param {string} urlConnection         - The service endpoint to use to create the client.
     * @param {object} auth                  - An object that is used for authenticating requests and must contains one of the options
     * @param {string} [auth.masterkey]      - The authorization master key to use to create the client.
     * @param {Object} [auth.resourceTokens] - An object that contains resources tokens. Keys for the object are resource Ids and values are the resource tokens.
     * @param {Array}  [auth.permissionFeed] - An array of {@link Permission} objects.                              
     * @param {object} [connectionPolicy]    - An instance of {@link ConnectionPolicy} class. this parameter is optional and the default connectionPolicy will be used if omitted.
     * @param {string} [consistencyLevel]    - An optional parameter that represent the consistency level. It can take any value from {@link ConsistencyLevel}.
    */
    function(urlConnection, auth, connectionPolicy, consistencyLevel) {
        this._innerDocumentclient = new DocumentClient(urlConnection, auth, connectionPolicy, consistencyLevel);
        Base.extend(this, this._innerDocumentclient);
    },
    {
        /** Send a request for creating a database. 
         * <p>
         *  A database manages users, permissions and a set of collections.  <br>
         *  Each Azure DocumentDB Database Account is able to support multiple independent named databases, with the database being the logical container for data. <br>
         *  Each Database consists of one or more collections, each of which in turn contain one or more documents. Since databases are an an administrative resource, the Service Master Key will be required in order to access and successfully complete any action using the User APIs. <br>
         * </p>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {Object} body              - A json object represents The database to be created.
         * @param {string} body.id           - The id of the database.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        createDatabaseAsync: function (body, options) {
           return createOperationPromise(this._innerDocumentclient, "createDatabase", undefined, body, options);
        },
        
        /** read a database. 
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink      - The self-link of the database.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        readDatabaseAsync: function (databaseLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readDatabase", databaseLink, options);
        },
        
         /** lists all databases. 
         * @memberof DocumentClientWrapper
         * @instance
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator}       - An instance of queryIterator to handle reading feed.
        */
        readDatabases: function (options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readDatabases(options));
        },
        
        /** lists all databases that satisfy a query. 
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
        */
        queryDatabases: function (query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryDatabases(query, options));
        },
        
        /** Gets the Database account information.
         * @memberof DocumentClientWrapper
        * @instance
        * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link DatabaseAccount} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        getDatabaseAccountAsync: function() {
            return noParameterPromise(this._innerDocumentclient, "getStorageStatistics", function(result) { return result; });
        },
        
        /**
         * Get all collections in this database.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {FeedOptions} [options] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        readCollections: function (databaseLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readCollections(databaseLink, options));
        },

        /**
         * Query the collections for the database.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        queryCollections: function (databaseLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryCollections(databaseLink, query, options));
        },

        /**
         * Create a collection.
         * <p>
         * A collection is a named logical container for documents. <br>
         * A database may contain zero or more named collections and each collection consists of zero or more JSON documents. <br>
         * Being schema-free, the documents in a collection do not need to share the same structure or fields. <br>
         * Since collections are application resources, they can be authorized using either the master key or resource keys. <br>
         * </p>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {object} body -                             Represents the body of the collection.
         * @param {string} body.id   -                        The id of the collection.
         * @param {IndexingPolicy} body.indexingPolicy -      The indexing policy associated with the collection.
         * @param {RequestOptions} [options] -                The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        createCollectionAsync: function (databaseLink, body, options) {
            return createOperationPromise(this._innerDocumentclient, "createCollection", databaseLink, body, options);
        },

         /**
         * Reads a collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        readCollectionAsync: function (collectionLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readCollection", collectionLink, options);
        },

         /**
         * Create a user.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {object} body - represents the body of the user.
         * @param {string} body.id   - The id of the user.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        createUserAsync: function (databaseLink, body, options) {
           return createOperationPromise(this._innerDocumentclient, "createUser", databaseLink, body, options);
        },

        /**
         * Get all users in this database.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {FeedOptions} [feedOptions] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        readUsers: function (databaseLink, options) {
           return new QueryIteratorWrapper(this._innerDocumentclient.readUsers(databaseLink, options));
        },

        /**
         * Reads a user.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} userLink - The self-link of the user.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        readUserAsync: function (userLink, options) {
           return readOperationPromise(this._innerDocumentclient, "readUser", userLink, options);
        },
        
        /**
         * Query the users for the database.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        queryUsers: function(databaseLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryUsers(databaseLink, query, options));
        },

         /**
         * Replace the database object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {Database} db - Represent the new database body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replaceDatabaseAsync: function (databaseLink, db, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceDatabase", databaseLink, db, options);
        },

        /**
         * Delete the database object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} databaseLink - The self-link of the database.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deleteDatabaseAsync: function (databaseLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteDatabase", databaseLink, options);
        },
        
        /**
         * Create a permission.
         * <p> A permission represents a per-User Permission to access a specific resource e.g. Document or Collection.  </p>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} userLink - The self-link of the user.
         * @param {object} body - represents the body of the permission.
         * @param {string} body.id   - The id of the permission
         * @param {string} body.permissionMode - The mode of the permission, must be a value of {@link PermissionMode}
         * @param {string} body.resource - the link of the resource that the permission will be applied to.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        createPermissionAsync: function(userLink, body, options) {
            return createOperationPromise(this._innerDocumentclient, "createPermission", userLink, body, options);
        },
          
        /**
         * Reads a permission.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} permissionLink - The self-link of the permission.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        readPermissionAsync: function (permissionLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readPermission", permissionLink, options);
        },
            
         /**
         * Get all permissions for this user.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} userLink - The self-link of the user.
         * @param {FeedOptions} [feedOptions] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        readPermissions: function(userLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readPermissions(userLink, options));
        },

        /**
         * Query the permission for the user.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} userLink - The self-link of the user.
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        queryPermissions: function(userLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryPermissions(userLink, query, options));
        },

        /**
         * Replace the user object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} userLink - The self-link of the user.
         * @param {User} user - Represent the new user body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replaceUserAsync: function(userLink, user, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceUser", userLink, user, options);
        },

        /**
         * Delete the user object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} userLink - The self-link of the user.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deleteUserAsync: function(userLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteUser", userLink, options);
        },

        /**
         * Replace the permission object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} permissionLink - The self-link of the permission.
         * @param {Permission} permission - Represent the new permission body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replacePermissionAsync: function(permissionLink, permission, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replacePermission", permissionLink, permission, options);
        },

        /**
         * Delete the permission object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} permissionLink - The self-link of the permission.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deletePermissionAsync: function(permissionLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deletePermission", permissionLink, options);
        },
        
        /**
         * Get all documents in this collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        readDocuments:  function (collectionLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readDocuments(collectionLink, options));
        },

        /**
         * Query the documents for the collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        queryDocuments: function (collectionLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryDocuments(collectionLink, query, options));
        },

        /**
         * Create a document.
         * <p> 
         * There is no set schema for JSON documents. They may contain any number of custom properties as well as an optional list of attachments. <br>
         * A Document is an application resource and can be authorized using the master key or resource keys
         * </p>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink    						- The self-link of the collection.
         * @param {object} body              						- Represents the body of the document. Can contain any number of user defined properties.
         * @param {string} [body.id]         						- The id of the document, MUST be unique for each document.
         * @param {RequestOptions} [options] 						- The request options.
		 * @param {boolean} [options.disableAutomaticIdGeneration]	- Disables the automatic id generation. If id is missing in the body and this option is true, an error will be returned.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        createDocumentAsync: function (collectionLink, body, options) {
            return createOperationPromise(this._innerDocumentclient, "createDocument", collectionLink, body, options);
        },
           
        /**
         * Reads a document.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} documentLink - The self-link of the document.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        readDocumentAsync: function (documentLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readDocument", documentLink, options);
        },

        /**
         * Get all triggers in this collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        readTriggers:  function (collectionLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readTriggers(collectionLink, options));
        },

        /**
         * Query the triggers for the collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        queryTriggers: function (collectionLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryTriggers(collectionLink, query, options));
        },

        /**
         * Create a trigger.
         * <p>
         * DocumentDB supports pre and post triggers defined in JavaScript to be executed on creates, updates and deletes. <br>
         * For additional details, refer to the server-side JavaScript API documentation. 
         * </p>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {object} trigger - represents the body of the trigger.
         * @param {string} trigger.id - represents The id of the trigger.
         * @param {string} trigger.triggerType - represents the type of the trigger, should be one of the values of {@link TriggerType}.
         * @param {string} trigger.triggerOperation - represents the trigger operation, should be one of the values of {@link TriggerOperation}.
         * @param {function} trigger.serverScript - represents the body of the trigger, it can be passed as stringified too.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        createTriggerAsync: function (collectionLink, trigger, options) {
            return createOperationPromise(this._innerDocumentclient, "createTrigger", collectionLink, trigger, options);
        },
 
        /**
         * Reads a trigger object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} triggerLink - The self-link of the trigger.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        readTriggerAsync: function (triggerLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readTrigger", triggerLink, options);
        },
        
        /**
         * Get all UserDefinedFunctions in this collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        readUserDefinedFunctions:  function (collectionLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readUserDefinedFunctions(collectionLink, options));
        },

        /**
         * Query the user defined functions for the collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        queryUserDefinedFunctions: function (collectionLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryUserDefinedFunctions(collectionLink, query, options));
        },

        /**
         * Create a UserDefinedFunction.
         * <p>
         * DocumentDB supports JavaScript UDFs which can be used inside queries, stored procedures and triggers. <br>
         * For additional details, refer to the server-side JavaScript API documentation.
         * </p>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {object} udf - represents the body of the userDefinedFunction.
         * @param {string} udf.id - represents The id of the udf.
         * @param {string} udf.userDefinedFunctionType - the type of the udf, it should be one of the values of {@link UserDefinedFunctionType}
         * @param {function} udf.serverScript - represents the body of the udf, it can be passed as stringified too.
         * @param {RequestOptions} [options]  - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        createUserDefinedFunctionAsync: function (collectionLink, udf, options) {
            return createOperationPromise(this._innerDocumentclient, "createUserDefinedFunction", collectionLink, udf, options);
        },

        /**
         * Reads a udf object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} udfLink - The self-link of the user defined function.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        readUserDefinedFunctionAsync: function (udfLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readUserDefinedFunction", udfLink, options);
        },
        
        /**
         * Get all StoredProcedures in this collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        readStoredProcedures:  function (collectionLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readStoredProcedures(collectionLink, options));
        },

        /**
         * Query the storedProcedures for the collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {string} query - A SQL query string.
         * @param {FeedOptions} [options] - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
        queryStoredProcedures: function (collectionLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryStoredProcedures(collectionLink, query, options));
        },
 
        /**
         * Create a StoredProcedure object.
         * <p>
         * DocumentDB allows stored procedures to be executed in the storage tier, directly against a document collection. The script <br>
         * gets executed under ACID transactions on the primary storage partition of the specified collection. For additional details, <br>
         * refer to the server-side JavaScript API documentation. 
         * </p>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {object} sproc - represents the body of the stored procedure.
         * @param {string} sproc.id - represents The id of the stored procedure.
         * @param {function} sproc.serverScript - represents the body of the stored procedure, it can be passed as stringified too.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        createStoredProcedureAsync: function (collectionLink, sproc, options) {
            return createOperationPromise(this._innerDocumentclient, "createStoredProcedure", collectionLink, sproc, options);
        },

        /**
         * Reads a StoredProcedure object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} sprocLink - The self-link of the stored procedure.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        readStoredProcedureAsync: function (sprocLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readStoredProcedure", sprocLink, options);
        },
		
        /**
         * Get all conflicts in this collection.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {FeedOptions} [options] - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
         */
		readConflicts:  function (collectionLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readConflicts(collectionLink, options));
        },
		
        /**
         * Reads a conflict.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} conflictLink - The self-link of the conflict.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
		readConflictAsync: function (conflictLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readConflict", conflictLink, options);
        },
         
        /**
         * Replace the collection object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink - The self-link of the collection.
         * @param {object} collection - Represent the new collection body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replaceCollectionAsync: function(collectionLink, collection, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceCollection", collectionLink, collection, options);
        },

        /**
         * Delete the collection object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} collectionLink    - The self-link of the collection.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deleteCollectionAsync: function(collectionLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteCollection", collectionLink, options);
        },
        
        /**
         * Replace the document object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} documentLink      - The self-link of the document.
         * @param {object} document          - Represent the new document body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replaceDocumentAsync: function(documentLink, document, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceDocument", documentLink, document, options);
        },
        
        /**
         * Delete the document object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} documentLink      - The self-link of the document.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deleteDocumentAsync: function(documentLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteDocument", documentLink, options);
        },

        /**
         * Create an attachment for the document object.
         * <p>
         * Each document may contain zero or more attachemnts. Attachments can be of any MIME type - text, image, binary data. <br>
         * These are stored externally in Azure Blob storage. Attachments are automatically deleted when the parent document is deleted. 
         * </P>
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} documentLink      - The self-link of the document.
         * @param {Object} body              - The metadata the defines the attachment media like media, contentType. It can include any other properties as part of the metedata.
         * @param {string} body.contentType  - the MIME contentType of the attachment.
         * @param {string} body.media        - Media link associated with the attachment content.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        createAttachmentAsync: function (documentLink, body, options) {
            return createOperationPromise(this._innerDocumentclient, "createAttachment", documentLink, body, options);
        },
        
        /**
         * Create an attachment for the document object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} documentLink             - The self-link of the document.
         * @param {stream.Readable} readableStream  - the stream that represents the media itself that needs to be uploaded.
         * @param {MediaOptions} [options]          - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        createAttachmentAndUploadMediaAsync: function(documentLink, readableStream, options) {
            return createOperationPromise(this._innerDocumentclient, "createAttachmentAndUploadMedia", documentLink, readableStream, options);
        },

        /**
         * Reads an Attachment object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} attachmentLink    - The self-link of the attachment.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        readAttachmentAsync: function (attachmentLink, options) {
            return readOperationPromise(this._innerDocumentclient, "readAttachment", attachmentLink, options);
        },
        
        /**
         * Get all attachments for this document.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} documentLink     - The self-link of the document.
         * @param {FeedOptions} [options]   - The feed options
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
        */
        readAttachments: function (documentLink, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.readAttachments(documentLink, options));
        },

        /**
         * Query the attachments for the document.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} documentLink     - The self-link of the document.
         * @param {string} query            - A SQL query string.
         * @param {FeedOptions} [options]   - Represents the feed options.
         * @returns {QueryIterator} - An instance of queryIterator to handle reading feed.
        */
        queryAttachments: function (documentLink, query, options) {
            return new QueryIteratorWrapper(this._innerDocumentclient.queryAttachments(documentLink, query, options));
        },
        
        /**
         * Read the media for the attachment object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} mediaLink - The media link of the media in the attachment.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link Response} and the OnError callback takes a parameter of type {@link ResponseError}</p>
                             <p>The result parameter can be a buffer or a stream depending on the value of {@link MediaReadMode}.</p>
         */
        readMediaAsync: function (mediaLink) {
            return noParameterPromise(this._innerDocumentclient, "readMedia", mediaLink);
        },

        /**
         * Update media for the attachment
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} mediaLink               - The media link of the media in the attachment.
         * @param {stream.Readable} readableStream - the stream that represents the media itself that needs to be uploaded.
         * @param {MediaOptions} [options]         - options for the media
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        updateMediaAsync: function (mediaLink, readableStream, options) {
            return replaceOperationPromise(this._innerDocumentclient, "updateMedia", mediaLink, readableStream, options);
        },
        
         /**
         * Replace the attachment object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} attachmentLink    - The self-link of the attachment.
         * @param {object} attachment        - Represent the new attachment body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        replaceAttachmentAsync: function(attachmentLink, attachment, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceAttachment", attachmentLink, attachment, options);
        },

         /**
         * Delete the attachment object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} attachmentLink    - The self-link of the attachment.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
         */
        deleteAttachmentAsync: function(attachmentLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteAttachment", attachmentLink, options);
        },
        
        /**
         * Replace the trigger object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} triggerLink       - The self-link of the trigger.
         * @param {object} trigger           - Represent the new trigger body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replaceTriggerAsync: function(triggerLink, trigger, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceTrigger", triggerLink, trigger, options);
        },

        /**
         * Delete the trigger object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} triggerLink       - The self-link of the trigger.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
       */
        deleteTriggerAsync: function(triggerLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteTrigger", triggerLink, options);
        },
        
        /**
         * Replace the UserDefinedFunction object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} udfLink           - The self-link of the user defined function.
         * @param {object} udf               - Represent the new udf body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replaceUserDefinedFunctionAsync: function(udfLink, udf, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceUserDefinedFunction", udfLink, udf, options);
        },

        /**
         * Delete the UserDefinedFunction object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} udfLink           - The self-link of the user defined function.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deleteUserDefinedFunctionAsync: function(udfLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteUserDefinedFunction", udfLink, options);
        },
        
        /**
         * Execute the StoredProcedure represented by the object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} sprocLink    - The self-link of the stored procedure.
         * @param {Array} [params]      - Represent the parameters of the stored procedure.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link Response} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        executeStoredProcedureAsync: function(sprocLink, params) {
            var deferred = Q.defer();
            this._innerDocumentclient.executeStoredProcedure(sprocLink, params, function (error, result, responseHeaders) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve({result: result, headers: responseHeaders});
                }
            });
            return deferred.promise;
        },
        
        /**
         * Replace the StoredProcedure object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} sprocLink         - The self-link of the stored procedure.
         * @param {object} sproc             - Represent the new sproc body.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        replaceStoredProcedureAsync: function(sprocLink, sproc, options) {
            return replaceOperationPromise(this._innerDocumentclient, "replaceStoredProcedure", sprocLink, sproc, options);
        },

         /**
         * Delete the StoredProcedure object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} sprocLink         - The self-link of the stored procedure.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deleteStoredProcedureAsync: function(sprocLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteStoredProcedure", sprocLink, options);
        },
        
         /**
         * Delete the conflict object.
         * @memberof DocumentClientWrapper
         * @instance
         * @param {string} conflictLink      - The self-link of the conflict.
         * @param {RequestOptions} [options] - The request options.
         * @Returns {Object} <p>A promise object for the request completion. <br>
                             The onFulfilled callback takes a parameter of type {@link ResourceResponse} and the OnError callback takes a parameter of type {@link ResponseError}</p>
        */
        deleteConflictAsync: function(conflictLink, options) {
            return deleteOperationPromise(this._innerDocumentclient, "deleteConflict", conflictLink, options);
        }
    }
);


function readFeedOperationPromise(contextObject, functionName, query, options, successFn){
    var deferred = Q.defer();
    contextObject[functionName](query, options, function (error, resources, responseHeaders) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(successFn(resources), responseHeaders);
        }
    });
    
    return deferred.promise;
}

var QueryIteratorWrapper = Base.defineClass(
    /**
    * Provides a wrapper for all the functions of {@link QueryIterator} that uses the Q module promise API instead of the callback model.    
    * @constructor QueryIteratorWrapper
    */
    function(queryIterator) {
        this._innerQueryIterator = queryIterator;
    },
    {
        /**
         * Execute a provided function once per feed element.
         * @memberof QueryIteratorWrapper
         * @instance
         * @param {callback} callback - Function to execute for each element. the function takes two parameters error, element.
         * Note: the last element the callback will be called on will be undefined.
         * If the callback explicitly returned false, the loop gets stopped.
         */
        forEach: function(callback){
            this._innerQueryIterator.forEach(callback);
        },
        
         /**
         * Execute a provided function on the next element in the QueryIterator.
         * @memberof QueryIteratorWrapper
         * @instance
         * @Returns {Object} A promise object for the request completion. the onFulfilled callback is of type {@link FeedResponse} and onError callback is of type {@link ResponseError}
         */
        toArrayAsync: function(){
            var deferred = Q.defer();
            var that = this;
            this._innerQueryIterator.toArray(function(error, resources, responseHeaders) {
				if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve({feed: resources, headers: responseHeaders});
                }
            });
            
            return deferred.promise;
        },
        
         /**
         * Gets the next element in the QueryIterator.
         * @memberof QueryIteratorWrapper
         * @instance
         * @Returns {Object} A promise object for the request completion. The onFulfilled callback is of type {@link ResourceResponse} and onError callback is of type {@link ResponseError}
         */
        nextItemAsync: function(){
            var deferred = Q.defer();
            var that = this;
            this._innerQueryIterator.nextItem(function(error, item, responseHeaders) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve({resource: item, headers: responseHeaders});
                }
            });
            
            return deferred.promise;
        },
        
        /**
         * Retrieve the next batch of the feed and pass them as an array to a function
         * @memberof QueryIteratorWrapper
         * @instance
         * @Returns {Object} A promise object for the request completion. the onFulfilled callback is of type {@link FeedResponse} and onError callback is of type {@link ResponseError}
         */
        executeNextAsync: function() {
            var deferred = Q.defer();
            var that = this;
            this._innerQueryIterator.executeNext(function(error, resources, responseHeaders) {
                if (error) {
                    deferred.reject(error);
                } else {                    
                    deferred.resolve({feed: resources, headers: responseHeaders});
                }
            });
            
            return deferred.promise;
        },
        
        /**
         * Retrieve the current element on the QueryIterator.
         * @memberof QueryIteratorWrapper
         * @instance
         * @returns {Object} The current resource in the QueryIterator, undefined if there isn't.
         */ 
        current: function(){
            return this._innerQueryIterator.current();
        },
        
        /**
         * Determine if there are still remaining resources to processs based on the value of the continuation token or the elements remaining on the current batch in the QueryIterator.
         * @memberof QueryIteratorWrapper
         * @instance
         * @returns {Boolean} true if there is other elements to process in the QueryIterator.
         */ 
        hasMoreResults: function(){
            return this._innerQueryIterator.hasMoreResults();
        },
        
        /**
         * Reset the QueryIterator to the beginning and clear all the resources inside it
         * @memberof QueryIteratorWrapper
         * @instance
         */
        reset: function(){
            return this._innerQueryIterator.reset();
        }
    }
);

/**
 * The response of a request
 * @typedef {Object} Response                  
 * @property {Object} result           -        An object that represents the result of the request.
 * @property {Object} headers          -        An object that contain the response headers.
 *
 */
 
 /**
 * The response of a request that contains a resource.
 * @typedef {Object} ResourceResponse                  
 * @property {Object} resource         -        An object that represents the requested resource (Db, collection, document ... etc).
 * @property {Object} headers          -        An object that contain the response headers.
 *
 */
 
 /**
 * The feed response of a request
 * @typedef {Object} FeedResponse                  
 * @property {Object} feed             -        An Array of objects that represents the resources (Db, collection, document ... etc).
 * @property {Object} headers          -        An object that contain the response headers.
 *
 */
 
  /**
 * The error of a request
 * @typedef {Object} ResponseError             Contains error information if an error occurs.
 * @param {int} code                   -       The response code corresponding to the error.
 * @param {string} body                -       A string represents the error information.
 *
 */

if (typeof exports !== "undefined") {
    exports.DocumentClientWrapper = DocumentClientWrapper;
    exports.DocumentClient = DocumentClient;
    exports.DocumentBase = DocumentBase;
}