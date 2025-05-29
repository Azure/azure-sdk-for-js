/**
 * Would be used when creating or deleting a DocumentCollection
 * or a User in Azure Cosmos DB database service
 * @hidden
 * Given a database id, this creates a database link.
 * @param databaseId - The database id
 * @returns A database link in the format of `dbs/{0}`
 * with `{0}` being a Uri escaped version of the databaseId
 */
export declare function createDatabaseUri(databaseId: string): string;
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
export declare function createDocumentCollectionUri(databaseId: string, collectionId: string): string;
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
export declare function createUserUri(databaseId: string, userId: string): string;
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
export declare function createDocumentUri(databaseId: string, collectionId: string, documentId: string): string;
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
export declare function createPermissionUri(databaseId: string, userId: string, permissionId: string): string;
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
export declare function createStoredProcedureUri(databaseId: string, collectionId: string, storedProcedureId: string): string;
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
export declare function createTriggerUri(databaseId: string, collectionId: string, triggerId: string): string;
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
export declare function createUserDefinedFunctionUri(databaseId: string, collectionId: string, udfId: string): string;
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
export declare function createConflictUri(databaseId: string, collectionId: string, conflictId: string): string;
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
export declare function createAttachmentUri(databaseId: string, collectionId: string, documentId: string, attachmentId: string): string;
/**
 * Given a database and collection, this creates a partition key ranges link in
 *  the Azure Cosmos DB database service.
 * @param databaseId - The database Id
 * @param collectionId - The collection Id
 * @returns A partition key ranges link in the format of
 * `dbs/{0}/colls/{1}/pkranges` with `{0}` being a Uri escaped version of the databaseId and `{1}` being collectionId
 * @hidden
 */
export declare function createPartitionKeyRangesUri(databaseId: string, collectionId: string): string;
//# sourceMappingURL=uriFactory.d.ts.map