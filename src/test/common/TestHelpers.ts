import * as assert from "assert";
import { DocumentBase, DocumentClient, Response } from "../../";

export class TestHelpers {
    public static async removeAllDatabases(host: string, masterKey: string) {
        try {
            const client = new DocumentClient(host, { masterKey });
            const { result: databases } = await client.readDatabases().toArray();

            const length = databases.length;

            if (length === 0) {
                return;
            }

            const count = 0;
            await Promise.all(databases.map<Promise<any>>(async (database) => client.deleteDatabase(database._self)));
        } catch (err) {
            // TODO: remove console logging for errors and add ts-lint flag back
            console.log("An error occured", err);
            assert.fail(err);
            throw err;
        }
    }

    public static getDatabaseLink(isNameBasedLink: boolean, db: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id;
        } else {
            return db._self;
        }
    }

    public static getCollectionLink(isNameBasedLink: boolean, db: any, coll: any) {
        if (!(db && coll)) {
            throw new Error("db and coll must be set");
        }

        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id;
        } else {
            return coll._self;
        }
    }

    public static getUserLink(isNameBasedLink: boolean, db: any, user: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/users/" + user.id;
        } else {
            return user._self;
        }
    }

    public static getDocumentLink(isNameBasedLink: boolean, db: any, coll: any, doc: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id + "/docs/" + doc.id;
        } else {
            return doc._self;
        }
    }

    public static getAttachmentLink(isNameBasedLink: boolean, db: any, coll: any, doc: any, attachment: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id + "/docs/" + doc.id + "/attachments/" + attachment.id;
        } else {
            return attachment._self;
        }
    }

    public static getPermissionLink(isNameBasedLink: boolean, db: any, user: any, permission: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/users/" + user.id + "/permissions/" + permission.id;
        } else {
            return permission._self;
        }
    }

    public static getTriggerLink(isNameBasedLink: boolean, db: any, coll: any, trigger: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id + "/triggers/" + trigger.id;
        } else {
            return trigger._self;
        }
    }

    public static getUserDefinedFunctionLink(isNameBasedLink: boolean, db: any, coll: any, udf: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id + "/udfs/" + udf.id;
        } else {
            return udf._self;
        }
    }

    public static getStoredProcedureLink(isNameBasedLink: boolean, db: any, coll: any, sproc: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id + "/sprocs/" + sproc.id;
        } else {
            return sproc._self;
        }
    }

    public static getConflictLink(isNameBasedLink: boolean, db: any, coll: any, conflict: any) {
        if (isNameBasedLink) {
            return "dbs/" + db.id + "/colls/" + coll.id + "/conflicts/" + conflict.id;
        } else {
            return conflict._self;
        }
    }

    public static async bulkInsertDocuments(
        client: DocumentClient, isNameBased: boolean, db: any, collection: any, documents: any) {
        const returnedDocuments = [];
        for (const doc of documents) {
            try {
                const { result: document } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), doc);
                returnedDocuments.push(document);
            } catch (err) {
                throw err;
            }
        }
        return returnedDocuments;
    }

    public static async bulkReadDocuments(
        client: DocumentClient, isNameBased: boolean, db: any,
        collection: any, documents: any[], partitionKey: string) {
        for (const document of documents) {
            try {
                const options = (partitionKey && document.hasOwnProperty(partitionKey))
                    ? { partitionKey: document[partitionKey] }
                    : { partitionKey: {} };

                // TODO: should we block or do all requests in parallel?
                const { result: doc } = await client.readDocument(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document), options);
                assert.equal(JSON.stringify(doc), JSON.stringify(document));
            } catch (err) {
                throw err;
            }
        }
    }

    public static async bulkReplaceDocuments(
        client: DocumentClient, isNameBased: boolean, db: any,
        collection: any, documents: any[], partitionKey: string): Promise<any[]> {
        const returnedDocuments: any[] = [];
        for (const document of documents) {
            try {
                const { result: doc } =
                    await client.replaceDocument(
                        TestHelpers.getDocumentLink(isNameBased, db, collection, document), document);
                const expectedModifiedDocument = JSON.parse(JSON.stringify(document));
                delete expectedModifiedDocument._etag;
                delete expectedModifiedDocument._ts;
                const actualModifiedDocument = JSON.parse(JSON.stringify(doc));
                delete actualModifiedDocument._etag;
                delete actualModifiedDocument._ts;
                assert.equal(JSON.stringify(actualModifiedDocument), JSON.stringify(expectedModifiedDocument));
                returnedDocuments.push(doc);
            } catch (err) {
                throw err;
            }
        }
        return returnedDocuments;
    }

    public static async bulkDeleteDocuments(
        client: DocumentClient, isNameBased: boolean, db: any,
        collection: any, documents: any[], partitionKey: string): Promise<void> {
        for (const document of documents) {
            try {
                const options = (partitionKey && document.hasOwnProperty(partitionKey))
                    ? { partitionKey: document[partitionKey] }
                    : { partitionKey: {} };

                const { result } = await client.deleteDocument(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document), options);
            } catch (err) {
                throw err;
            }
        }
    }

    public static async bulkQueryDocumentsWithPartitionKey(
        client: DocumentClient, isNameBased: boolean,
        db: any, collection: any, documents: any[], partitionKey: any): Promise<void> {
        for (const document of documents) {
            try {
                if (!document.hasOwnProperty(partitionKey)) {
                    continue;
                }

                const querySpec = {
                    query: "SELECT * FROM root r WHERE r." + partitionKey + "=@key",
                    parameters: [
                        {
                            name: "@key",
                            value: document[partitionKey],
                        },
                    ],
                };

                const { result: results } = await client.queryDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), querySpec).toArray();
                assert.equal(results.length, 1, "Expected exactly 1 document");
                assert.equal(JSON.stringify(results[0]), JSON.stringify(document));
            } catch (err) {
                throw err;
            }
        }
    }

    // Document
    public static async createOrUpsertDocument(
        collectionLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertDocument(collectionLink, body, options);
        } else {
            return client.createDocument(collectionLink, body, options);
        }
    }

    public static async replaceOrUpsertDocument(
        collectionLink: string, documentLink: string, body: any,
        options: any, client: DocumentClient, isUpsertTest: boolean) {
        if (isUpsertTest) {
            return client.upsertDocument(collectionLink, body, options);
        } else {
            return client.replaceDocument(documentLink, body, options);
        }
    }

    // Attachment
    public static async createOrUpsertAttachment(
        documentLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertAttachment(documentLink, body, options);
        } else {
            return client.createAttachment(documentLink, body, options);
        }
    }

    public static replaceOrUpsertAttachment(
        documentLink: string, attachmentLink: string, body: any,
        options: any, client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertAttachment(documentLink, body, options);
        } else {
            return client.replaceAttachment(attachmentLink, body, options);
        }
    }

    // User
    public static createOrUpsertUser(
        databaseLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertUser(databaseLink, body, options);
        } else {
            return client.createUser(databaseLink, body, options);
        }
    }
    public static replaceOrUpsertUser(
        databaseLink: string, userLink: string, body: any,
        options: any, client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertUser(databaseLink, body, options);
        } else {
            return client.replaceUser(userLink, body, options);
        }
    }

    // Permission
    public static createOrUpsertPermission(
        userLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertPermission(userLink, body, options);
        } else {
            return client.createPermission(userLink, body, options);
        }
    }

    public static replaceOrUpsertPermission(
        userLink: string, permissionLink: string, body: any,
        options: any, client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertPermission(userLink, body, options);
        } else {
            return client.replacePermission(permissionLink, body, options);
        }
    }

    // Trigger
    public static createOrUpsertTrigger(
        collectionLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertTrigger(collectionLink, body, options);
        } else {
            return client.createTrigger(collectionLink, body, options);
        }
    }
    public static replaceOrUpsertTrigger(
        collectionLink: string, triggerLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertTrigger(collectionLink, body, options);
        } else {
            return client.replaceTrigger(triggerLink, body, options);
        }
    }

    // User Defined Function
    public static createOrUpsertUserDefinedFunction(
        collectionLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertUserDefinedFunction(collectionLink, body, options);
        } else {
            return client.createUserDefinedFunction(collectionLink, body, options);
        }
    }
    public static replaceOrUpsertUserDefinedFunction(
        collectionLink: string, udfLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertUserDefinedFunction(collectionLink, body, options);
        } else {
            return client.replaceUserDefinedFunction(udfLink, body, options);
        }
    }

    // Stored Procedure
    public static createOrUpsertStoredProcedure(
        collectionLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertStoredProcedure(collectionLink, body, options);
        } else {
            return client.createStoredProcedure(collectionLink, body, options);
        }
    }
    public static replaceOrUpsertStoredProcedure(
        collectionLink: string, sprocLink: string, body: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertStoredProcedure(collectionLink, body, options);
        } else {
            return client.replaceStoredProcedure(sprocLink, body, options);
        }
    }

    // Attachment and Upload Media
    public static createOrUpsertAttachmentAndUploadMedia(
        documentLink: string, readableStream: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertAttachmentAndUploadMedia(documentLink, readableStream, options);
        } else {
            return client.createAttachmentAndUploadMedia(documentLink, readableStream, options);
        }
    }

    public static updateOrUpsertMedia(
        documentLink: string, mediaLink: string, readableStream: any, options: any,
        client: DocumentClient, isUpsertTest: boolean): Promise<Response<any>> {
        if (isUpsertTest) {
            return client.upsertAttachmentAndUploadMedia(documentLink, readableStream, options);
        } else {
            return client.updateMedia(mediaLink, readableStream, options);
        }
    }
}
