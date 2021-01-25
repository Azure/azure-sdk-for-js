// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "./constants";
import { trimSlashFromLeftAndRight, validateResourceId } from "./helper";

/**
 * @ignore
 * Given a database id, this creates a database link.
 * @param {string} databaseId -The database id
 * @returns {string}          -A database link in the format of dbs/{0} \
 * with {0} being a Uri escaped version of the databaseId
 * @description Would be used when creating or deleting a DocumentCollection \
 * or a User in Azure Cosmos DB database service
 */
export function createDatabaseUri(databaseId: string) {
  databaseId = trimSlashFromLeftAndRight(databaseId);
  validateResourceId(databaseId);

  return Constants.Path.DatabasesPathSegment + "/" + databaseId;
}

/**
 * Given a database and collection id, this creates a collection link.
 * @param {string} databaseId        -The database id
 * @param {string} collectionId      -The collection id
 * @returns {string}                 A collection link in the format of dbs/{0}/colls/{1} \
 * with {0} being a Uri escaped version of the databaseId and {1} being collectionId
 * @description Would be used when updating or deleting a DocumentCollection, creating a \
 * Document, a StoredProcedure, a Trigger, a UserDefinedFunction, or when executing a query \
 * with CreateDocumentQuery in Azure Cosmos DB database service.
 * @ignore
 */
export function createDocumentCollectionUri(databaseId: string, collectionId: string) {
  collectionId = trimSlashFromLeftAndRight(collectionId);
  validateResourceId(collectionId);

  return (
    createDatabaseUri(databaseId) + "/" + Constants.Path.CollectionsPathSegment + "/" + collectionId
  );
}

/**
 * Given a database and user id, this creates a user link.
 * @param {string} databaseId        -The database id
 * @param {string} userId            -The user id
 * @returns {string}                 A user link in the format of dbs/{0}/users/{1} \
 * with {0} being a Uri escaped version of the databaseId and {1} being userId
 * @description Would be used when creating a Permission, or when replacing or deleting \
 * a User in Azure Cosmos DB database service
 * @ignore
 */
export function createUserUri(databaseId: string, userId: string) {
  userId = trimSlashFromLeftAndRight(userId);
  validateResourceId(userId);

  return createDatabaseUri(databaseId) + "/" + Constants.Path.UsersPathSegment + "/" + userId;
}

/**
 * Given a database and collection id, this creates a collection link.
 * @param {string} databaseId        -The database id
 * @param {string} collectionId      -The collection id
 * @param {string} documentId        -The document id
 * @returns {string}                 -A document link in the format of \
 * dbs/{0}/colls/{1}/docs/{2} with {0} being a Uri escaped version of \
 * the databaseId, {1} being collectionId and {2} being the documentId
 * @description Would be used when creating an Attachment, or when replacing \
 * or deleting a Document in Azure Cosmos DB database service
 * @ignore
 */
export function createDocumentUri(databaseId: string, collectionId: string, documentId: string) {
  documentId = trimSlashFromLeftAndRight(documentId);
  validateResourceId(documentId);

  return (
    createDocumentCollectionUri(databaseId, collectionId) +
    "/" +
    Constants.Path.DocumentsPathSegment +
    "/" +
    documentId
  );
}

/**
 * Given a database, collection and document id, this creates a document link.
 * @param {string} databaseId    -The database Id
 * @param {string} userId        -The user Id
 * @param {string} permissionId  - The permissionId
 * @returns {string} A permission link in the format of dbs/{0}/users/{1}/permissions/{2} \
 * with {0} being a Uri escaped version of the databaseId, {1} being userId and {2} being permissionId
 * @description Would be used when replacing or deleting a Permission in Azure Cosmos DB database service.
 * @ignore
 */
export function createPermissionUri(databaseId: string, userId: string, permissionId: string) {
  permissionId = trimSlashFromLeftAndRight(permissionId);
  validateResourceId(permissionId);

  return (
    createUserUri(databaseId, userId) +
    "/" +
    Constants.Path.PermissionsPathSegment +
    "/" +
    permissionId
  );
}

/**
 * Given a database, collection and stored proc id, this creates a stored proc link.
 * @param {string} databaseId        -The database Id
 * @param {string} collectionId      -The collection Id
 * @param {string} storedProcedureId -The stored procedure Id
 * @returns {string}                 -A stored procedure link in the format of \
 * dbs/{0}/colls/{1}/sprocs/{2} with {0} being a Uri escaped version of the databaseId, \
 * {1} being collectionId and {2} being the storedProcedureId
 * @description Would be used when replacing, executing, or deleting a StoredProcedure in \
 * Azure Cosmos DB database service.
 * @ignore
 */
export function createStoredProcedureUri(
  databaseId: string,
  collectionId: string,
  storedProcedureId: string
) {
  storedProcedureId = trimSlashFromLeftAndRight(storedProcedureId);
  validateResourceId(storedProcedureId);

  return (
    createDocumentCollectionUri(databaseId, collectionId) +
    "/" +
    Constants.Path.StoredProceduresPathSegment +
    "/" +
    storedProcedureId
  );
}

/**
 * @summary Given a database, collection and trigger id, this creates a trigger link.
 * @param {string} databaseId        -The database Id
 * @param {string} collectionId      -The collection Id
 * @param {string} triggerId         -The trigger Id
 * @returns {string}                 -A trigger link in the format of \
 * dbs/{0}/colls/{1}/triggers/{2} with {0} being a Uri escaped version of the databaseId, \
 * {1} being collectionId and {2} being the triggerId
 * @description Would be used when replacing, executing, or deleting a Trigger in Azure Cosmos DB database service
 * @ignore
 */
export function createTriggerUri(databaseId: string, collectionId: string, triggerId: string) {
  triggerId = trimSlashFromLeftAndRight(triggerId);
  validateResourceId(triggerId);

  return (
    createDocumentCollectionUri(databaseId, collectionId) +
    "/" +
    Constants.Path.TriggersPathSegment +
    "/" +
    triggerId
  );
}

/**
 * @summary Given a database, collection and udf id, this creates a udf link.
 * @param {string} databaseId        -The database Id
 * @param {string} collectionId      -The collection Id
 * @param {string} udfId             -The User Defined Function Id
 * @returns {string}                 -A udf link in the format of dbs/{0}/colls/{1}/udfs/{2} \
 * with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the udfId
 * @description Would be used when replacing, executing, or deleting a UserDefinedFunction in \
 * Azure Cosmos DB database service
 * @ignore
 */
export function createUserDefinedFunctionUri(
  databaseId: string,
  collectionId: string,
  udfId: string
) {
  udfId = trimSlashFromLeftAndRight(udfId);
  validateResourceId(udfId);

  return (
    createDocumentCollectionUri(databaseId, collectionId) +
    "/" +
    Constants.Path.UserDefinedFunctionsPathSegment +
    "/" +
    udfId
  );
}

/**
 * @summary Given a database, collection and conflict id, this creates a conflict link.
 * @param {string} databaseId        -The database Id
 * @param {string} collectionId      -The collection Id
 * @param {string} conflictId        -The conflict Id
 * @returns {string}                 -A conflict link in the format of dbs/{0}/colls/{1}/conflicts/{2} \
 * with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the conflictId
 * @description Would be used when creating a Conflict in Azure Cosmos DB database service.
 * @ignore
 */
export function createConflictUri(databaseId: string, collectionId: string, conflictId: string) {
  conflictId = trimSlashFromLeftAndRight(conflictId);
  validateResourceId(conflictId);

  return (
    createDocumentCollectionUri(databaseId, collectionId) +
    "/" +
    Constants.Path.ConflictsPathSegment +
    "/" +
    conflictId
  );
}

/**
 * @summary Given a database, collection and conflict id, this creates a conflict link.
 * @param {string} databaseId        -The database Id
 * @param {string} collectionId      -The collection Id
 * @param {string} documentId        -The document Id\
 * @param {string} attachmentId      -The attachment Id
 * @returns {string}                 -A conflict link in the format of dbs/{0}/colls/{1}/conflicts/{2} \
 * with {0} being a Uri escaped version of the databaseId, {1} being collectionId and {2} being the conflictId
 * @description Would be used when creating a Conflict in Azure Cosmos DB database service.
 * @ignore
 */
export function createAttachmentUri(
  databaseId: string,
  collectionId: string,
  documentId: string,
  attachmentId: string
) {
  attachmentId = trimSlashFromLeftAndRight(attachmentId);
  validateResourceId(attachmentId);

  return (
    createDocumentUri(databaseId, collectionId, documentId) +
    "/" +
    Constants.Path.AttachmentsPathSegment +
    "/" +
    attachmentId
  );
}

/**
 * @summary Given a database and collection, this creates a partition key ranges link in\
 *  the Azure Cosmos DB database service.
 * @param {string} databaseId        -The database Id
 * @param {string} collectionId      -The collection Id
 * @returns {string}                 -A partition key ranges link in the format of \
 * dbs/{0}/colls/{1}/pkranges with {0} being a Uri escaped version of the databaseId and {1} being collectionId
 * @ignore
 */
export function createPartitionKeyRangesUri(databaseId: string, collectionId: string) {
  return (
    createDocumentCollectionUri(databaseId, collectionId) +
    "/" +
    Constants.Path.PartitionKeyRangesPathSegment
  );
}
