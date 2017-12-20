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
    , Constants = require("./constants")
    , Helper = require("./helper").Helper;


//SCRIPT START
var UriFactory = Base.defineClass(

    /**************************CONSTRUCTORS**************************/
    undefined,

    /************************INSTANCE MEMBERS************************/
    undefined,

    /*************************STATIC METHODS*************************/
    {
        /**
        * Given a database id, this creates a database link.
        * @param {string} databaseId -The database id
        * @returns {string}          -A database link in the format of dbs/{0} with {0} being a Uri escaped version of the databaseId
        * @description Would be used when creating or deleting a DocumentCollection or a User in Azure Cosmos DB database service
        */
        createDatabaseUri: function (databaseId) {
            databaseId = Helper.trimSlashFromLeftAndRight(databaseId);
            Helper.validateResourceId(databaseId);

            return Constants.Path.DatabasesPathSegment + "/" +
                databaseId;
        },

        /**
        * Given a database and collection id, this creates a collection link.
        * @param {string} databaseId        -The database id
        * @param {string} collectionId      -The collection id
        * @returns {string}                 A collection link in the format of dbs/{0}/colls/{1} with {0} being a Uri escaped version of the databaseId and {1} being collectionId
        * @description Would be used when updating or deleting a DocumentCollection, creating a Document, a StoredProcedure, a Trigger, a UserDefinedFunction, or when executing a query with CreateDocumentQuery in Azure Cosmos DB database service.
        */
        createDocumentCollectionUri: function (databaseId, collectionId) {
            collectionId = Helper.trimSlashFromLeftAndRight(collectionId);
            Helper.validateResourceId(collectionId);

            return this.createDatabaseUri(databaseId) + "/" +
                Constants.Path.CollectionsPathSegment + "/" +
                collectionId;
        },

        /**
        * Given a database and user id, this creates a user link.
        * @param {string} databaseId        -The database id
        * @param {string} userId            -The user id
        * @returns {string}                 A user link in the format of dbs/{0}/users/{1} with {0} being a Uri escaped version of the databaseId and {1} being userId
        * @description Would be used when creating a Permission, or when replacing or deleting a User in Azure Cosmos DB database service
        */
        createUserUri: function (databaseId, userId) {
            userId = Helper.trimSlashFromLeftAndRight(userId);
            Helper.validateResourceId(userId);

            return this.createDatabaseUri(databaseId) + "/" +
                Constants.Path.UsersPathSegment + "/" +
                userId;
        },

        /**
        * Given a database and collection id, this creates a collection link.
        * @param {string} databaseId        -The database id
        * @param {string} collectionId      -The collection id
        * @param {string} documentId        -The document id
        * @returns {string}                 -A document link in the format of dbs/{0}/colls/{1}/docs/{2} with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the documentId
        * @description Would be used when creating an Attachment, or when replacing or deleting a Document in Azure Cosmos DB database service
        */
        createDocumentUri: function (databaseId, collectionId, documentId) {
            documentId = Helper.trimSlashFromLeftAndRight(documentId);
            Helper.validateResourceId(documentId);

            return this.createDocumentCollectionUri(databaseId, collectionId) + "/" +
                Constants.Path.DocumentsPathSegment + "/" +
                documentId;
        },

        /**
        * Given a database, collection and document id, this creates a document link.
        * @param {string} databaseId    -The database Id
        * @param {string} userId        -The user Id
        * @param {string} permissionId  - The permissionId
        * @returns {string} A permission link in the format of dbs/{0}/users/{1}/permissions/{2} with {0} being a Uri escaped version of the databaseId, {1} being userId and {2} being permissionId
        * @description Would be used when replacing or deleting a Permission in Azure Cosmos DB database service.
        */
        createPermissionUri: function (databaseId, userId, permissionId) {
            permissionId = Helper.trimSlashFromLeftAndRight(permissionId);
            Helper.validateResourceId(permissionId);
            
            return this.createUserUri(databaseId, userId) + "/" +
                Constants.Path.PermissionsPathSegment + "/" +
                permissionId;
        },

        /**
        * Given a database, collection and stored proc id, this creates a stored proc link.
        * @param {string} databaseId        -The database Id
        * @param {string} collectionId      -The collection Id
        * @param {string} storedProcedureId -The stored procedure Id
        * @returns {string}                 -A stored procedure link in the format of dbs/{0}/colls/{1}/sprocs/{2} with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the storedProcedureId
        * @description Would be used when replacing, executing, or deleting a StoredProcedure in Azure Cosmos DB database service.
        */
        createStoredProcedureUri: function (databaseId, collectionId, storedProcedureId) {
            storedProcedureId = Helper.trimSlashFromLeftAndRight(storedProcedureId);
            Helper.validateResourceId(storedProcedureId);

            return this.createDocumentCollectionUri(databaseId, collectionId) + "/" +
                Constants.Path.StoredProceduresPathSegment + "/" +
                storedProcedureId;
        },

        /**
        * @summary Given a database, collection and trigger id, this creates a trigger link.
        * @param {string} databaseId        -The database Id
        * @param {string} collectionId      -The collection Id
        * @param {string} triggerId         -The trigger Id
        * @returns {string}                 -A trigger link in the format of dbs/{0}/colls/{1}/triggers/{2} with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the triggerId
        * @description Would be used when replacing, executing, or deleting a Trigger in Azure Cosmos DB database service
        */
        createTriggerUri: function (databaseId, collectionId, triggerId) {
            triggerId = Helper.trimSlashFromLeftAndRight(triggerId);
            Helper.validateResourceId(triggerId);

            return this.createDocumentCollectionUri(databaseId, collectionId) + "/" +
                Constants.Path.TriggersPathSegment + "/" +
                triggerId;
        },

        /**
        * @summary Given a database, collection and udf id, this creates a udf link.
        * @param {string} databaseId        -The database Id
        * @param {string} collectionId      -The collection Id
        * @param {string} udfId             -The User Defined Function Id
        * @returns {string}                 -A udf link in the format of dbs/{0}/colls/{1}/udfs/{2} with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the udfId
        * @description Would be used when replacing, executing, or deleting a UserDefinedFunction in Azure Cosmos DB database service
        */
        createUserDefinedFunctionUri: function (databaseId, collectionId, udfId) {
            udfId = Helper.trimSlashFromLeftAndRight(udfId);
            Helper.validateResourceId(udfId);

            return this.createDocumentCollectionUri(databaseId, collectionId) + "/" +
                Constants.Path.UserDefinedFunctionsPathSegment + "/" +
                udfId;
        },

        /**
        * @summary Given a database, collection and conflict id, this creates a conflict link.
        * @param {string} databaseId        -The database Id
        * @param {string} collectionId      -The collection Id
        * @param {string} conflictId        -The conflict Id
        * @returns {string}                 -A conflict link in the format of dbs/{0}/colls/{1}/conflicts/{2} with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the conflictId
        * @description Would be used when creating a Conflict in Azure Cosmos DB database service.
        */
        createConflictUri: function (databaseId, collectionId, conflictId) {
            conflictId = Helper.trimSlashFromLeftAndRight(conflictId);
            Helper.validateResourceId(conflictId);

            return this.createDocumentCollectionUri(databaseId, collectionId) + "/" +
                Constants.Path.ConflictsPathSegment + "/" +
                conflictId;
        },

        /**
         * @summary Given a database, collection and conflict id, this creates a conflict link.
         * @param {string} databaseId        -The database Id
         * @param {string} collectionId      -The collection Id
         * @param {string} documentId        -The document Id\
         * @param {string} attachmentId      -The attachment Id
         * @returns {string}                 -A conflict link in the format of dbs/{0}/colls/{1}/conflicts/{2} with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the conflictId
         * @description Would be used when creating a Conflict in Azure Cosmos DB database service.
        */
        createAttachmentUri: function (databaseId, collectionId, documentId, attachmentId) {
            attachmentId = Helper.trimSlashFromLeftAndRight(attachmentId);
            Helper.validateResourceId(attachmentId);

            return this.createDocumentUri(databaseId, collectionId, documentId) + "/" +
                Constants.Path.AttachmentsPathSegment + "/" +
                attachmentId;
        },

        /**
         * @summary Given a database and collection, this creates a partition key ranges link in the Azure Cosmos DB database service.
         * @param {string} databaseId        -The database Id
         * @param {string} collectionId      -The collection Id
         * @returns {string}                 -A partition key ranges link in the format of dbs/{0}/colls/{1}/pkranges with {0} being a Uri escaped version of the databaseId and {1} being collectionId
         */
        createPartitionKeyRangesUri: function (databaseId, collectionId) {
            return this.createDocumentCollectionUri(databaseId, collectionId) + "/" +
                Constants.Path.PartitionKeyRangesPathSegment;
        }
    }

);
//SCRIPT END

if (typeof exports !== "undefined") {
    exports.UriFactory = UriFactory;
}
