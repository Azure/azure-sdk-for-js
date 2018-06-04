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

    describe("Validate Queries CRUD", function () {
        const queriesCRUDTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create a database
                const databaseDefinition = { id: "sample database" };
                const { result: db } = await client.createDatabase(databaseDefinition);
                assert.equal(db.id, databaseDefinition.id);
                // query databases
                const querySpec0 = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: databaseDefinition.id,
                        },
                    ],
                };
                const { result: results } = await client.queryDatabases(querySpec0).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");
                const querySpec1 = {
                    query: "SELECT * FROM root r WHERE r.id='" + databaseDefinition.id + "'",
                };
                const { result: results2 } = await client.queryDatabases(querySpec1).toArray();
                assert(results2.length > 0, "number of results for the query should be > 0");
                const querySpec2 = "SELECT * FROM root r WHERE r.id='" + databaseDefinition.id + "'";
                const { result: results3 } = await client.queryDatabases(querySpec2).toArray();
                assert(results3.length > 0, "number of results for the query should be > 0");
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do queries CRUD operations successfully name based", async function () {
            try {
                await queriesCRUDTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do queries CRUD operations successfully rid based", async function () {
            try {
                await queriesCRUDTest(false);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("Validate QueryIterator Functionality For Multiple Partition Collection", function () {

        const client = new CosmosClient(host, { masterKey });

        const documentDefinitions = [
            { id: "document1" },
            { id: "document2", key: null, prop: 1 },
            { id: "document3", key: false, prop: 1 },
            { id: "document4", key: true, prop: 1 },
            { id: "document5", key: 1, prop: 1 },
            { id: "document6", key: "A", prop: 1 },
        ];

        let db: any;
        let collection: any;
        const isNameBased = false;

        // creates a new database, creates a new collecton, bulk inserts documents to the collection
        beforeEach(async function () {
            try {
                const { result: createdDB } = await client.createDatabase({ id: "sample 中文 database" });
                db = createdDB;

                const partitionKey = "key";
                const collectionDefinition = {
                    id: "coll1",
                    partitionKey: {
                        paths: ["/" + partitionKey],
                        kind: DocumentBase.PartitionKind.Hash,
                    },
                };

                const collectionOptions = { offerThroughput: 12000 };
                const { result: createdCollection } =
                    await client.createCollection("dbs/sample 中文 database", collectionDefinition, collectionOptions);
                collection = createdCollection;

                const insertedDocs =
                    await TestHelpers.bulkInsertDocuments(client, isNameBased, db, collection, documentDefinitions);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi validate QueryIterator nextItem on Multiple Partition Colleciton", async function () {
            try {
                // obtain an instance of queryIterator
                const queryIterator = client.queryDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection));
                let cnt = 0;
                while (queryIterator.hasMoreResults()) {
                    const { result: resource } = await queryIterator.nextItem();
                    cnt++;
                }
                assert.equal(cnt, documentDefinitions.length);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("Validate QueryIterator Functionality", function () {
        this.timeout(30000);
        const createResources = async function (isNameBased: boolean, client: CosmosClient) {
            try {
                const { result: db } = await client.createDatabase({ id: "sample database" + Math.random() });
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });
                const { result: doc1 } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "doc1", prop1: "value1" });
                const { result: doc2 } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "doc2", prop1: "value2" });
                const { result: doc3 } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "doc3", prop1: "value3" });
                const resources = {
                    db,
                    coll: collection,
                    doc1,
                    doc2,
                    doc3,
                };
                return resources;
            } catch (err) {
                throw err;
            }
        };

        const queryIteratorToArrayTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                const resources = await createResources(isNameBased, client);
                const queryIterator = client.readDocuments(
                    TestHelpers.getCollectionLink(isNameBased, resources.db, resources.coll), { maxItemCount: 2 });
                const { result: docs } = await queryIterator.toArray();
                assert.equal(docs.length, 3, "queryIterator should return all documents using continuation");
                assert.equal(docs[0].id, resources.doc1.id);
                assert.equal(docs[1].id, resources.doc2.id);
                assert.equal(docs[2].id, resources.doc3.id);
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi validate QueryIterator iterator toArray name based", async function () {
            try {
                await queryIteratorToArrayTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi validate QueryIterator iterator toArray rid based", async function () {
            try {
                await queryIteratorToArrayTest(false);
            } catch (err) {
                throw err;
            }
        });

        const queryIteratorForEachTest = async function (isNameBased: boolean) {
            const client = new CosmosClient(host, { masterKey });
            const resources = await createResources(isNameBased, client);
            const queryIterator = client.readDocuments(
                TestHelpers.getCollectionLink(isNameBased, resources.db, resources.coll), { maxItemCount: 2 });
            let counter = 0;
            // test queryIterator.forEach
            return new Promise((resolve, reject) => {
                queryIterator.forEach((err, doc) => {
                    try {
                        counter++;
                        if (counter === 1) {
                            assert.equal(doc.id, resources.doc1.id, "first document should be doc1");
                        } else if (counter === 2) {
                            assert.equal(doc.id, resources.doc2.id, "second document should be doc2");
                        } else if (counter === 3) {
                            assert.equal(doc.id, resources.doc3.id, "third document should be doc3");
                        }

                        if (doc === undefined) {
                            assert(counter < 5, "iterator should have stopped");
                            resolve();
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        };

        it("nativeApi validate queryIterator iterator forEach name based", async function () {
            try {
                await queryIteratorForEachTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi validate queryIterator iterator forEach rid based", async function () {
            try {
                await queryIteratorForEachTest(false);
            } catch (err) {
                throw err;
            }
        });

        const queryIteratorNextAndMoreTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                const resources = await createResources(isNameBased, client);
                const queryIterator = client.readDocuments(
                    TestHelpers.getCollectionLink(isNameBased, resources.db, resources.coll), { maxItemCount: 2 });
                assert.equal(queryIterator.hasMoreResults(), true);
                const { result: doc1 } = await queryIterator.current();
                assert.equal(doc1.id, resources.doc1.id, "call queryIterator.current after reset should return first document");
                const { result: doc2 } = await queryIterator.nextItem();
                assert.equal(doc2.id, resources.doc1.id, "call queryIterator.nextItem after reset should return first document");
                assert.equal(queryIterator.hasMoreResults(), true);
                const { result: doc3 } = await queryIterator.current();
                assert.equal(doc3.id, resources.doc2.id, "call queryIterator.current should return second document");
                const { result: doc4 } = await queryIterator.nextItem();
                assert.equal(doc4.id, resources.doc2.id, "call queryIterator.nextItem again should return second document");
                assert.equal(queryIterator.hasMoreResults(), true);
                const { result: doc5 } = await queryIterator.current();
                assert.equal(doc5.id, resources.doc3.id, "call queryIterator.current should return third document");
                const { result: doc6 } = await queryIterator.nextItem();
                assert.equal(doc6.id, resources.doc3.id, "call queryIterator.nextItem again should return third document");
                const { result: doc7 } = await queryIterator.nextItem();
                assert.equal(doc7, undefined, "queryIterator should return undefined if there is no elements");
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi validate queryIterator nextItem and hasMoreResults name based", async function () {
            try {
                await queryIteratorNextAndMoreTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi validate queryIterator nextItem and hasMoreResults rid based", async function () {
            try {
                await queryIteratorNextAndMoreTest(false);
            } catch (err) {
                throw err;
            }
        });

        const queryIteratorExecuteNextTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                const resources = await createResources(isNameBased, client);
                let queryIterator = client.readDocuments(
                    TestHelpers.getCollectionLink(isNameBased, resources.db, resources.coll), { maxItemCount: 2 });
                const { result: docs, headers } = await queryIterator.executeNext();

                assert(headers !== undefined, "executeNext should pass headers as the third parameter to the callback");
                assert(headers[Constants.HttpHeaders.RequestCharge] > 0, "RequestCharge has to be non-zero");
                assert.equal(docs.length, 2, "first batch size should be 2");
                assert.equal(docs[0].id, resources.doc1.id, "first batch first document should be doc1");
                assert.equal(docs[1].id, resources.doc2.id, "batch first second document should be doc2");
                const { result: docs2 } = await queryIterator.executeNext();
                assert.equal(docs2.length, 1, "second batch size is unexpected");
                assert.equal(docs2[0].id, resources.doc3.id, "second batch element should be doc3");

                // validate Iterator.executeNext with continuation token
                queryIterator = client.readDocuments(
                    TestHelpers.getCollectionLink(isNameBased, resources.db, resources.coll),
                    { maxItemCount: 2, continuation: headers[Constants.HttpHeaders.Continuation] as string });
                const { result: docsWithContinuation, headers: headersWithContinuation } = await queryIterator.executeNext();
                assert(headersWithContinuation !== undefined, "executeNext should pass headers as the third parameter to the callback");
                assert(headersWithContinuation[Constants.HttpHeaders.RequestCharge] > 0, "RequestCharge has to be non-zero");
                assert.equal(docsWithContinuation.length, 1, "second batch size with continuation token is unexpected");
                assert.equal(docsWithContinuation[0].id, resources.doc3.id, "second batch element should be doc3");
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi validate queryIterator iterator executeNext name based", async function () {
            try {
                await queryIteratorExecuteNextTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi validate queryIterator iterator executeNext rid based", async function () {
            try {
                await queryIteratorExecuteNextTest(false);
            } catch (err) {
                throw err;
            }
        });
    });
});
