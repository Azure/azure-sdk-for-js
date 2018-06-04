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

    describe("Validate Document CRUD", function () {
        const documentCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create database
                const { result: db } = await client.createDatabase({ id: "sample 中文 database" });
                // create collection
                const { result: collection } =
                    await client.createCollection("dbs/sample 中文 database", { id: "sample collection" });
                // read documents
                const { result: documents } = await client.readDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert(Array.isArray(documents), "Value should be an array");
                // create a document
                const beforeCreateDocumentsCount = documents.length;
                const documentDefinition = {
                    name: "sample document",
                    foo: "bar",
                    key: "value",
                    replace: "new property",
                };
                try {
                    const { result: badUpdate } = await TestHelpers.createOrUpsertDocument(
                        TestHelpers.getCollectionLink(isNameBased, db, collection), documentDefinition,
                        { disableAutomaticIdGeneration: true }, client, isUpsertTest);
                    assert.fail("id generation disabled must throw with invalid id");
                } catch (err) {
                    assert(err !== undefined, "should throw an error because automatic id generation is disabled");
                }
                const { result: document } = await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    documentDefinition, undefined, client, isUpsertTest);
                assert.equal(document.name, documentDefinition.name);
                assert(document.id !== undefined);
                // read documents after creation
                const { result: documents2 } = await client.readDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert.equal(documents2.length, beforeCreateDocumentsCount + 1,
                    "create should increase the number of documents");
                // query documents
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: document.id,
                        },
                    ],
                };
                const { result: results } = await client.queryDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");
                const { result: results2 } = await client.queryDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    querySpec, { enableScanInQuery: true }).toArray();
                assert(results2.length > 0, "number of results for the query should be > 0");

                // replace document
                document.name = "replaced document";
                document.foo = "not bar";
                const { result: replacedDocument } = await TestHelpers.replaceOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                    document, undefined, client, isUpsertTest);
                assert.equal(replacedDocument.name, "replaced document", "document name property should change");
                assert.equal(replacedDocument.foo, "not bar", "property should have changed");
                assert.equal(document.id, replacedDocument.id, "document id should stay the same");
                // read document
                const { result: document2 } = await client.readDocument(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, replacedDocument));
                assert.equal(replacedDocument.id, document.id);
                // delete document
                const { result: res } = await client.deleteDocument(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, replacedDocument));

                // read documents after deletion
                try {
                    const { result: document3 } = await client.readDocument(
                        TestHelpers.getDocumentLink(isNameBased, db, collection, document));
                    assert.fail("must throw if document doesn't exist");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        const documentCRUDMultiplePartitionsTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create database
                const { result: db } = await client.createDatabase({ id: "db1" });

                const partitionKey = "key";

                // create collection
                const collectionDefinition = {
                    id: "coll1",
                    partitionKey: { paths: ["/" + partitionKey], kind: DocumentBase.PartitionKind.Hash },
                };

                const { result: collection } =
                    await client.createCollection(
                        TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition, { offerThroughput: 12000 });

                const documents = [
                    { id: "document1" },
                    { id: "document2", key: null, prop: 1 },
                    { id: "document3", key: false, prop: 1 },
                    { id: "document4", key: true, prop: 1 },
                    { id: "document5", key: 1, prop: 1 },
                    { id: "document6", key: "A", prop: 1 },
                ];

                let returnedDocuments =
                    await TestHelpers.bulkInsertDocuments(client, isNameBased, db, collection, documents);

                assert.equal(returnedDocuments.length, documents.length);
                returnedDocuments.sort(function (doc1, doc2) {
                    return doc1.id.localeCompare(doc2.id);
                });
                await TestHelpers.bulkReadDocuments(
                    client, isNameBased, db, collection, returnedDocuments, partitionKey);
                const { result: successDocuments } = await client.readDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert(successDocuments !== undefined, "error reading documents");
                assert.equal(successDocuments.length, returnedDocuments.length,
                    "Expected " + returnedDocuments.length + " documents to be succesfully read");
                successDocuments.sort(function (doc1, doc2) {
                    return doc1.id.localeCompare(doc2.id);
                });
                assert.equal(JSON.stringify(successDocuments), JSON.stringify(returnedDocuments),
                    "Unexpected documents are returned");

                returnedDocuments.forEach(function (document) { ++document.prop; });
                const newReturnedDocuments =
                    await TestHelpers.bulkReplaceDocuments(client, isNameBased, db,
                        collection, returnedDocuments, partitionKey);
                returnedDocuments = newReturnedDocuments;
                await TestHelpers.bulkQueryDocumentsWithPartitionKey(client, isNameBased, db,
                    collection, returnedDocuments, partitionKey);
                const querySpec = {
                    query: "SELECT * FROM Root",
                };
                try {
                    const { result: badUpdate } = await client.queryDocuments(
                        TestHelpers.getCollectionLink(isNameBased, db, collection),
                        querySpec, { enableScanInQuery: true }).toArray();
                    assert.fail("Must fail");
                } catch (err) {
                    const badRequestErrorCode = 400;
                    assert.equal(err.code, badRequestErrorCode,
                        "response should return error code " + badRequestErrorCode);
                }
                const { result: results } = await client.queryDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), querySpec,
                    { enableScanInQuery: true, enableCrossPartitionQuery: true }).toArray();
                assert(results !== undefined, "error querying documents");
                results.sort(function (doc1, doc2) {
                    return doc1.id.localeCompare(doc2.id);
                });
                assert.equal(results.length, returnedDocuments.length,
                    "Expected " + returnedDocuments.length + " documents to be succesfully queried");
                assert.equal(JSON.stringify(results), JSON.stringify(returnedDocuments), "Unexpected query results");

                await TestHelpers.bulkDeleteDocuments(
                    client, isNameBased, db, collection, returnedDocuments, partitionKey);
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do document CRUD operations successfully name based", async function () {
            try {
                await documentCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do document CRUD operations successfully rid based", async function () {
            try {
                await documentCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do document CRUD operations successfully name based with upsert", async function () {
            try {
                await documentCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do document CRUD operations successfully rid based with upsert", async function () {
            try {
                await documentCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do document CRUD operations over multiple partitions successfully name based",
            async function () {
                try {
                    await documentCRUDMultiplePartitionsTest(true);
                } catch (err) {
                    throw err;
                }
            });

        it("nativeApi Should do document CRUD operations over multiple partitions successfully rid based",
            async function () {
                try {
                    await documentCRUDMultiplePartitionsTest(false);
                } catch (err) {
                    throw err;
                }
            });
    });
});
