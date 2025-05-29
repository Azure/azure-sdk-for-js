"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseUri = createDatabaseUri;
exports.createDocumentCollectionUri = createDocumentCollectionUri;
exports.createUserUri = createUserUri;
exports.createDocumentUri = createDocumentUri;
exports.createPermissionUri = createPermissionUri;
exports.createStoredProcedureUri = createStoredProcedureUri;
exports.createTriggerUri = createTriggerUri;
exports.createUserDefinedFunctionUri = createUserDefinedFunctionUri;
exports.createConflictUri = createConflictUri;
exports.createAttachmentUri = createAttachmentUri;
exports.createPartitionKeyRangesUri = createPartitionKeyRangesUri;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const constants_js_1 = require("./constants.js");
const helper_js_1 = require("./helper.js");
/**
 * Would be used when creating or deleting a DocumentCollection
 * or a User in Azure Cosmos DB database service
 * @hidden
 * Given a database id, this creates a database link.
 * @param databaseId - The database id
 * @returns A database link in the format of `dbs/{0}`
 * with `{0}` being a Uri escaped version of the databaseId
 */
function createDatabaseUri(databaseId) {
    databaseId = (0, helper_js_1.trimSlashFromLeftAndRight)(databaseId);
    (0, helper_js_1.validateResourceId)(databaseId);
    return constants_js_1.Constants.Path.DatabasesPathSegment + "/" + databaseId;
}
/**
 * Given a database and collection id, this creates a collection link.
 * Would be used when updating or deleting a DocumentCollection, creating a
 * Document, a StoredProcedure, a Trigger, a UserDefinedFunction, or when executing a query
 * with CreateDocumentQuery in Azure Cosmos DB database service.
 * @param databaseId - The database id
 * @param collectionId - The collection id
 * @returns A collection link in the format of `dbs/{0}/colls/{1}`
 * with `{0}` being a Uri escaped version of the databaseId and `{1}` being collectionId
 * @hidden
 */
function createDocumentCollectionUri(databaseId, collectionId) {
    collectionId = (0, helper_js_1.trimSlashFromLeftAndRight)(collectionId);
    (0, helper_js_1.validateResourceId)(collectionId);
    return (createDatabaseUri(databaseId) + "/" + constants_js_1.Constants.Path.CollectionsPathSegment + "/" + collectionId);
}
/**
 * Given a database and user id, this creates a user link.
 * Would be used when creating a Permission, or when replacing or deleting
 * a User in Azure Cosmos DB database service
 * @param databaseId - The database id
 * @param userId - The user id
 * @returns A user link in the format of `dbs/{0}/users/{1}`
 * with `{0}` being a Uri escaped version of the databaseId and `{1}` being userId
 * @hidden
 */
function createUserUri(databaseId, userId) {
    userId = (0, helper_js_1.trimSlashFromLeftAndRight)(userId);
    (0, helper_js_1.validateResourceId)(userId);
    return createDatabaseUri(databaseId) + "/" + constants_js_1.Constants.Path.UsersPathSegment + "/" + userId;
}
/**
 * Given a database and collection id, this creates a collection link.
 * Would be used when creating an Attachment, or when replacing
 * or deleting a Document in Azure Cosmos DB database service
 * @param databaseId - The database id
 * @param collectionId - The collection id
 * @param documentId - The document id
 * @returns A document link in the format of
 * `dbs/{0}/colls/{1}/docs/{2}` with `{0}` being a Uri escaped version of
 * the databaseId, `{1}` being collectionId and `{2}` being the documentId
 * @hidden
 */
function createDocumentUri(databaseId, collectionId, documentId) {
    documentId = (0, helper_js_1.trimSlashFromLeftAndRight)(documentId);
    (0, helper_js_1.validateItemResourceId)(documentId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        constants_js_1.Constants.Path.DocumentsPathSegment +
        "/" +
        documentId);
}
/**
 * Given a database, collection and document id, this creates a document link.
 * Would be used when replacing or deleting a Permission in Azure Cosmos DB database service.
 * @param databaseId    -The database Id
 * @param userId        -The user Id
 * @param permissionId  - The permissionId
 * @returns A permission link in the format of `dbs/{0}/users/{1}/permissions/{2}`
 * with `{0}` being a Uri escaped version of the databaseId, `{1}` being userId and `{2}` being permissionId
 * @hidden
 */
function createPermissionUri(databaseId, userId, permissionId) {
    permissionId = (0, helper_js_1.trimSlashFromLeftAndRight)(permissionId);
    (0, helper_js_1.validateResourceId)(permissionId);
    return (createUserUri(databaseId, userId) +
        "/" +
        constants_js_1.Constants.Path.PermissionsPathSegment +
        "/" +
        permissionId);
}
/**
 * Given a database, collection and stored proc id, this creates a stored proc link.
 * Would be used when replacing, executing, or deleting a StoredProcedure in
 * Azure Cosmos DB database service.
 * @param databaseId        -The database Id
 * @param collectionId      -The collection Id
 * @param storedProcedureId -The stored procedure Id
 * @returns A stored procedure link in the format of
 * `dbs/{0}/colls/{1}/sprocs/{2}` with `{0}` being a Uri escaped version of the databaseId,
 * `{1}` being collectionId and `{2}` being the storedProcedureId
 * @hidden
 */
function createStoredProcedureUri(databaseId, collectionId, storedProcedureId) {
    storedProcedureId = (0, helper_js_1.trimSlashFromLeftAndRight)(storedProcedureId);
    (0, helper_js_1.validateResourceId)(storedProcedureId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        constants_js_1.Constants.Path.StoredProceduresPathSegment +
        "/" +
        storedProcedureId);
}
/**
 * Given a database, collection and trigger id, this creates a trigger link.
 * Would be used when replacing, executing, or deleting a Trigger in Azure Cosmos DB database service
 * @param databaseId        -The database Id
 * @param collectionId      -The collection Id
 * @param triggerId         -The trigger Id
 * @returns A trigger link in the format of
 * `dbs/{0}/colls/{1}/triggers/{2}` with `{0}` being a Uri escaped version of the databaseId,
 * `{1}` being collectionId and `{2}` being the triggerId
 * @hidden
 */
function createTriggerUri(databaseId, collectionId, triggerId) {
    triggerId = (0, helper_js_1.trimSlashFromLeftAndRight)(triggerId);
    (0, helper_js_1.validateResourceId)(triggerId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        constants_js_1.Constants.Path.TriggersPathSegment +
        "/" +
        triggerId);
}
/**
 * Given a database, collection and udf id, this creates a udf link.
 * Would be used when replacing, executing, or deleting a UserDefinedFunction in
 * Azure Cosmos DB database service
 * @param databaseId        -The database Id
 * @param collectionId      -The collection Id
 * @param udfId             -The User Defined Function Id
 * @returns A udf link in the format of `dbs/{0}/colls/{1}/udfs/{2}`
 * with `{0}` being a Uri escaped version of the databaseId, `{1}` being collectionId and `{2}` being the udfId
 * @hidden
 */
function createUserDefinedFunctionUri(databaseId, collectionId, udfId) {
    udfId = (0, helper_js_1.trimSlashFromLeftAndRight)(udfId);
    (0, helper_js_1.validateResourceId)(udfId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        constants_js_1.Constants.Path.UserDefinedFunctionsPathSegment +
        "/" +
        udfId);
}
/**
 * Given a database, collection and conflict id, this creates a conflict link.
 * Would be used when creating a Conflict in Azure Cosmos DB database service.
 * @param databaseId        -The database Id
 * @param collectionId      -The collection Id
 * @param conflictId        -The conflict Id
 * @returns A conflict link in the format of `dbs/{0}/colls/{1}/conflicts/{2}`
 * with `{0}` being a Uri escaped version of the databaseId, `{1}` being collectionId and `{2}` being the conflictId
 * @hidden
 */
function createConflictUri(databaseId, collectionId, conflictId) {
    conflictId = (0, helper_js_1.trimSlashFromLeftAndRight)(conflictId);
    (0, helper_js_1.validateResourceId)(conflictId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        constants_js_1.Constants.Path.ConflictsPathSegment +
        "/" +
        conflictId);
}
/**
 * Given a database, collection and conflict id, this creates a conflict link.
 * Would be used when creating a Conflict in Azure Cosmos DB database service.
 * @param databaseId        -The database Id
 * @param collectionId      -The collection Id
 * @param documentId        -The document Id
 * @param attachmentId      -The attachment Id
 * @returns A conflict link in the format of `dbs/{0}/colls/{1}/conflicts/{2}`
 * with `{0}` being a Uri escaped version of the databaseId, `{1}` being collectionId and `{2}` being the conflictId
 * @hidden
 */
function createAttachmentUri(databaseId, collectionId, documentId, attachmentId) {
    attachmentId = (0, helper_js_1.trimSlashFromLeftAndRight)(attachmentId);
    (0, helper_js_1.validateResourceId)(attachmentId);
    return (createDocumentUri(databaseId, collectionId, documentId) +
        "/" +
        constants_js_1.Constants.Path.AttachmentsPathSegment +
        "/" +
        attachmentId);
}
/**
 * Given a database and collection, this creates a partition key ranges link in
 *  the Azure Cosmos DB database service.
 * @param databaseId - The database Id
 * @param collectionId - The collection Id
 * @returns A partition key ranges link in the format of
 * `dbs/{0}/colls/{1}/pkranges` with `{0}` being a Uri escaped version of the databaseId and `{1}` being collectionId
 * @hidden
 */
function createPartitionKeyRangesUri(databaseId, collectionId) {
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        constants_js_1.Constants.Path.PartitionKeyRangesPathSegment);
}
//# sourceMappingURL=uriFactory.js.map