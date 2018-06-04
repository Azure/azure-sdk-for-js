import * as assert from "assert";
import * as Stream from "stream";
import {
    AzureDocuments, Base, Constants, CosmosClient,
    DocumentBase, HashPartitionResolver, Range,
    RangePartitionResolver, Response, RetryOptions,
} from "../../";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

// Used for sproc
declare var getContext: any;
// declare var body: (input?: any) => void; // TODO: remove this if it's not necessary

// TODO: should fix long lines
// tslint:disable:max-line-length

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("NodeJS CRUD Tests", function () {
    this.timeout(process.env.MOCHA_TIMEOUT || 10000);
    // remove all databases from the endpoint before each test
    beforeEach(async function () {
        this.timeout(10000);
        try {
            await TestHelpers.removeAllDatabases(host, masterKey);
        } catch (err) {
            throw err;
        }
    });

    describe("TTL tests", function () {
        this.timeout(60000);

        async function sleep(time: number) {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, time);
            });
        }

        async function createCollectionWithInvalidDefaultTtl(client: CosmosClient, db: any, collectionDefinition: any, collId: any, defaultTtl: number) {
            collectionDefinition.id = collId;
            collectionDefinition.defaultTtl = defaultTtl;
            try {
                await client.createCollection(db._self, collectionDefinition);
            } catch (err) {
                const badRequestErrorCode = 400;
                assert.equal(err.code, badRequestErrorCode, "response should return error code " + badRequestErrorCode);
            }
        }

        async function createDocumentWithInvalidTtl(client: CosmosClient, collection: any, documentDefinition: any, docId: any, ttl: number) {
            documentDefinition.id = docId;
            documentDefinition.ttl = ttl;

            try {
                await client.createDocument(collection._self, documentDefinition);
                assert.fail("Must throw if using invalid TTL");
            } catch (err) {
                const badRequestErrorCode = 400;
                assert.equal(err.code, badRequestErrorCode, "response should return error code " + badRequestErrorCode);
            }
        }

        it("nativeApi Validate Collection and Document TTL values.", async function () {
            try {
                const client = new CosmosClient(host, { masterKey });

                const { result: db } = await client.createDatabase({ id: "sample database" });

                const collectionDefinition = {
                    id: "sample collection1",
                    defaultTtl: 5,
                };

                const { result: collection } = await client.createCollection(db._self, collectionDefinition);
                assert.equal(collectionDefinition.defaultTtl, collection.defaultTtl);

                // null, 0, -10 are unsupported value for defaultTtl.Valid values are -1 or a non-zero positive 32-bit integer value
                await createCollectionWithInvalidDefaultTtl(client, db, collectionDefinition, "sample collection2", null);
                await createCollectionWithInvalidDefaultTtl(client, db, collectionDefinition, "sample collection3", 0);
                await createCollectionWithInvalidDefaultTtl(client, db, collectionDefinition, "sample collection4", -10);

                const documentDefinition = {
                    id: "doc",
                    name: "sample document",
                    key: "value",
                    ttl: 2,
                };

                // 0, null, -10 are unsupported value for ttl.Valid values are -1 or a non-zero positive 32-bit integer value
                await createDocumentWithInvalidTtl(client, collection, documentDefinition, "doc1", 0);
                await createDocumentWithInvalidTtl(client, collection, documentDefinition, "doc2", null);
                await createDocumentWithInvalidTtl(client, collection, documentDefinition, "doc3", -10);
            } catch (err) {
                throw err;
            }
        });

        async function checkDocumentGone(client: CosmosClient, collection: any, createdDocument: any) {
            try {
                await client.readDocument(createdDocument._self);
                assert.fail("Must throw if the document isn't there");
            } catch (err) {
                const badRequestErrorCode = 404;
                assert.equal(err.code, badRequestErrorCode, "response should return error code " + badRequestErrorCode);
            }
        }

        async function checkDocumentExists(client: CosmosClient, collection: any, createdDocument: any) {
            try {
                const { result: readDocument } = await client.readDocument(createdDocument._self);
                assert.equal(readDocument.ttl, createdDocument.ttl);
            } catch (err) {
                throw err;
            }
        }

        async function positiveDefaultTtlStep4(client: CosmosClient, collection: any, createdDocument: any) {
            // the created document should NOT be gone as it 's ttl value is set to 8 which overrides the collections' s defaultTtl value(5)
            try {
                await checkDocumentExists(client, collection, createdDocument);
                await sleep(4000);
                await checkDocumentGone(client, collection, createdDocument);
            } catch (err) {
                throw err;
            }
        }

        async function positiveDefaultTtlStep3(client: CosmosClient, collection: any, createdDocument: any, documentDefinition: any) {
            // the created document should be gone now as it 's ttl value is set to 2 which overrides the collections' s defaultTtl value(5)
            try {
                await checkDocumentGone(client, collection, createdDocument);
                documentDefinition.id = "doc4";
                documentDefinition.ttl = 8;

                const { result: doc } = await client.createDocument(collection._self, documentDefinition);
                await sleep(6000);
                await positiveDefaultTtlStep4(client, collection, doc);
            } catch (err) {
                throw err;
            }
        }

        async function positiveDefaultTtlStep2(client: CosmosClient, collection: any, createdDocument: any, documentDefinition: any) {
            // the created document should NOT be gone as it 's ttl value is set to -1(never expire) which overrides the collections' s defaultTtl value
            try {
                await checkDocumentExists(client, collection, createdDocument);
                documentDefinition.id = "doc3";
                documentDefinition.ttl = 2;

                const { result: doc } = await client.createDocument(collection._self, documentDefinition);
                await sleep(4000);
                await positiveDefaultTtlStep3(client, collection, doc, documentDefinition);
            } catch (err) {
                throw err;
            }
        }

        async function positiveDefaultTtlStep1(client: CosmosClient, collection: any, createdDocument: any, documentDefinition: any) {
            try {
                // the created document should be gone now as it 's ttl value would be same as defaultTtl value of the collection
                await checkDocumentGone(client, collection, createdDocument);
                documentDefinition.id = "doc2";
                documentDefinition.ttl = -1;

                const { result: doc } = await client.createDocument(collection._self, documentDefinition);
                await sleep(5000);
                await positiveDefaultTtlStep2(client, collection, doc, documentDefinition);
            } catch (err) {
                throw err;
            }
        }

        it("nativeApi Validate Document TTL with positive defaultTtl.", async function () {
            try {
                const client = new CosmosClient(host, { masterKey });

                const { result: db } = await client.createDatabase({ id: "sample database" });

                const collectionDefinition = {
                    id: "sample collection",
                    defaultTtl: 5,
                };

                const { result: collection } = await client.createCollection(db._self, collectionDefinition);

                const documentDefinition = {
                    id: "doc1",
                    name: "sample document",
                    key: "value",
                };

                const { result: createdDocument } = await client.createDocument(collection._self, documentDefinition);
                await sleep(7000);
                await positiveDefaultTtlStep1(client, collection, createdDocument, documentDefinition);
            } catch (err) {
                throw err;
            }
        });

        async function minusOneDefaultTtlStep1(client: CosmosClient, collection: any, createdDocument1: any, createdDocument2: any, createdDocument3: any) {
            try {
                // the created document should be gone now as it 's ttl value is set to 2 which overrides the collections' s defaultTtl value(-1)
                await checkDocumentGone(client, collection, createdDocument3);

                // The documents with id doc1 and doc2 will never expire
                const { result: readDocument1 } = await client.readDocument(createdDocument1._self);
                assert.equal(readDocument1.id, createdDocument1.id);

                const { result: readDocument2 } = await client.readDocument(createdDocument2._self);
                assert.equal(readDocument2.id, createdDocument2.id);
            } catch (err) {
                throw err;
            }
        }

        it("nativeApi Validate Document TTL with -1 defaultTtl.", async function () {
            try {
                const client = new CosmosClient(host, { masterKey });

                const { result: db } = await client.createDatabase({ id: "sample database" });

                const collectionDefinition = {
                    id: "sample collection",
                    defaultTtl: -1,
                };

                const { result: collection } = await client.createCollection(db._self, collectionDefinition);

                const documentDefinition: any = {
                    id: "doc1",
                    name: "sample document",
                    key: "value",
                };

                // the created document 's ttl value would be -1 inherited from the collection' s defaultTtl and this document will never expire
                const { result: createdDocument1 } = await client.createDocument(collection._self, documentDefinition);

                // This document is also set to never expire explicitly
                documentDefinition.id = "doc2";
                documentDefinition.ttl = -1;

                const { result: createdDocument2 } = await client.createDocument(collection._self, documentDefinition);

                documentDefinition.id = "doc3";
                documentDefinition.ttl = 2;

                const { result: createdDocument3 } = await client.createDocument(collection._self, documentDefinition);
                await sleep(4000);
                await minusOneDefaultTtlStep1(client, collection, createdDocument1, createdDocument2, createdDocument3);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Validate Document TTL with no defaultTtl.", async function () {
            try {
                const client = new CosmosClient(host, { masterKey });

                const { result: db } = await client.createDatabase({ id: "sample database" });

                const collectionDefinition = { id: "sample collection" };

                const { result: collection } = await client.createCollection(db._self, collectionDefinition);

                const documentDefinition = {
                    id: "doc1",
                    name: "sample document",
                    key: "value",
                    ttl: 5,
                };

                const { result: createdDocument } = await client.createDocument(collection._self, documentDefinition);

                // Created document still exists even after ttl time has passed since the TTL is disabled at collection level(no defaultTtl property defined)
                await sleep(7000);
                await checkDocumentExists(client, collection, createdDocument);
            } catch (err) {
                throw err;
            }
        });

        async function miscCasesStep4(client: CosmosClient, collection: any, createdDocument: any, documentDefinition: any) {
            // Created document still exists even after ttl time has passed since the TTL is disabled at collection level
            try {
                await checkDocumentExists(client, collection, createdDocument);
            } catch (err) {
                throw err;
            }
        }

        async function miscCasesStep3(client: CosmosClient, collection: any, upsertedDocument: any, documentDefinition: any) {
            // the upserted document should be gone now after 10 secs from the last write(upsert) of the document
            try {
                await checkDocumentGone(client, collection, upsertedDocument);
                const query = "SELECT * FROM root r";
                const { result: results } = await client.queryDocuments(collection._self, query).toArray();
                assert.equal(results.length, 0);

                // Use a collection definition without defaultTtl to disable ttl at collection level
                const collectionDefinition = { id: collection.id };

                const { result: replacedCollection } = await client.replaceCollection(collection._self, collectionDefinition);

                documentDefinition.id = "doc2";

                const { result: createdDocument } = await client.createDocument(replacedCollection._self, documentDefinition);
                await sleep(5000);
                await miscCasesStep4(client, replacedCollection, createdDocument, documentDefinition);
            } catch (err) {
                throw err;
            }
        }

        async function miscCasesStep2(client: CosmosClient, collection: any, documentDefinition: any) {
            // Upsert the document after 3 secs to reset the document 's ttl
            try {
                documentDefinition.key = "value2";
                const { result: upsertedDocument } = await client.upsertDocument(collection._self, documentDefinition);
                await sleep(7000);
                // Upserted document still exists after (3+7)10 secs from document creation time( with collection 's defaultTtl set to 8) since it' s ttl was reset after 3 secs by upserting it
                await checkDocumentExists(client, collection, upsertedDocument);
                await sleep(3000);
                await miscCasesStep3(client, collection, upsertedDocument, documentDefinition);
            } catch (err) {
                throw err;
            }
        }

        async function miscCasesStep1(client: CosmosClient, collection: any, createdDocument: any, documentDefinition: any) {
            try {
                // the created document should be gone now as the ttl time expired
                await checkDocumentGone(client, collection, createdDocument);
                // We can create a document with the same id after the ttl time has expired
                const { result: doc } = await client.createDocument(collection._self, documentDefinition);
                assert.equal(documentDefinition.id, doc.id);
                await sleep(3000);
                miscCasesStep2(client, collection, documentDefinition);
            } catch (err) {
                throw err;
            }
        }

        it("nativeApi Validate Document TTL Misc cases.", async function () {
            try {
                const client = new CosmosClient(host, { masterKey });

                const { result: db } = await client.createDatabase({ id: "sample database" });

                const collectionDefinition = {
                    id: "sample collection",
                    defaultTtl: 8,
                };

                const { result: collection } = await client.createCollection(db._self, collectionDefinition);

                const documentDefinition = {
                    id: "doc1",
                    name: "sample document",
                    key: "value",
                };

                const { result: createdDocument } = await client.createDocument(collection._self, documentDefinition);

                await sleep(10000);
                await miscCasesStep1(client, collection, createdDocument, documentDefinition);
            } catch (err) {
                throw err;
            }
        });
    });
});
