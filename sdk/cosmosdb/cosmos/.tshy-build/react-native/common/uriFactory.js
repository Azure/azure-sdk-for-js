// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "./constants.js";
import { trimSlashFromLeftAndRight, validateResourceId, validateItemResourceId } from "./helper.js";
/**
 * Would be used when creating or deleting a DocumentCollection
 * or a User in Azure Cosmos DB database service
 * @hidden
 * Given a database id, this creates a database link.
 * @param databaseId - The database id
 * @returns A database link in the format of `dbs/{0}`
 * with `{0}` being a Uri escaped version of the databaseId
 */
export function createDatabaseUri(databaseId) {
    databaseId = trimSlashFromLeftAndRight(databaseId);
    validateResourceId(databaseId);
    return Constants.Path.DatabasesPathSegment + "/" + databaseId;
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
export function createDocumentCollectionUri(databaseId, collectionId) {
    collectionId = trimSlashFromLeftAndRight(collectionId);
    validateResourceId(collectionId);
    return (createDatabaseUri(databaseId) + "/" + Constants.Path.CollectionsPathSegment + "/" + collectionId);
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
export function createUserUri(databaseId, userId) {
    userId = trimSlashFromLeftAndRight(userId);
    validateResourceId(userId);
    return createDatabaseUri(databaseId) + "/" + Constants.Path.UsersPathSegment + "/" + userId;
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
export function createDocumentUri(databaseId, collectionId, documentId) {
    documentId = trimSlashFromLeftAndRight(documentId);
    validateItemResourceId(documentId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        Constants.Path.DocumentsPathSegment +
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
export function createPermissionUri(databaseId, userId, permissionId) {
    permissionId = trimSlashFromLeftAndRight(permissionId);
    validateResourceId(permissionId);
    return (createUserUri(databaseId, userId) +
        "/" +
        Constants.Path.PermissionsPathSegment +
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
export function createStoredProcedureUri(databaseId, collectionId, storedProcedureId) {
    storedProcedureId = trimSlashFromLeftAndRight(storedProcedureId);
    validateResourceId(storedProcedureId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        Constants.Path.StoredProceduresPathSegment +
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
export function createTriggerUri(databaseId, collectionId, triggerId) {
    triggerId = trimSlashFromLeftAndRight(triggerId);
    validateResourceId(triggerId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        Constants.Path.TriggersPathSegment +
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
export function createUserDefinedFunctionUri(databaseId, collectionId, udfId) {
    udfId = trimSlashFromLeftAndRight(udfId);
    validateResourceId(udfId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        Constants.Path.UserDefinedFunctionsPathSegment +
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
export function createConflictUri(databaseId, collectionId, conflictId) {
    conflictId = trimSlashFromLeftAndRight(conflictId);
    validateResourceId(conflictId);
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        Constants.Path.ConflictsPathSegment +
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
export function createAttachmentUri(databaseId, collectionId, documentId, attachmentId) {
    attachmentId = trimSlashFromLeftAndRight(attachmentId);
    validateResourceId(attachmentId);
    return (createDocumentUri(databaseId, collectionId, documentId) +
        "/" +
        Constants.Path.AttachmentsPathSegment +
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
export function createPartitionKeyRangesUri(databaseId, collectionId) {
    return (createDocumentCollectionUri(databaseId, collectionId) +
        "/" +
        Constants.Path.PartitionKeyRangesPathSegment);
}
//# sourceMappingURL=uriFactory.js.map