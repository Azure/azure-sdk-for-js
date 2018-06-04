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

    describe("Validate Collection CRUD", function () {
        const collectionCRUDTest = async function (isNameBased: boolean, hasPartitionKey: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                const { result: emptyColls } = await client.readCollections(
                    TestHelpers.getDatabaseLink(isNameBased, db)).toArray();
                assert(Array.isArray(emptyColls), "Value should be an array");
                // create a collection
                const beforeCreateCollectionsCount = emptyColls.length;
                const collectionDefinition: any = {
                    id: "sample collection",
                    indexingPolicy: { indexingMode: "Consistent" },
                };

                if (hasPartitionKey) {
                    collectionDefinition.partitionKey = { paths: ["/id"], kind: DocumentBase.PartitionKind.Hash };
                }

                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition);
                assert.equal(collectionDefinition.id, collection.id);
                assert.equal("consistent", collection.indexingPolicy.indexingMode);
                assert.equal(JSON.stringify(collection.partitionKey),
                    JSON.stringify(collectionDefinition.partitionKey));
                // read collections after creation
                const { result: collections } = await client.readCollections(
                    TestHelpers.getDatabaseLink(isNameBased, db)).toArray();

                assert.equal(collections.length, beforeCreateCollectionsCount + 1,
                    "create should increase the number of collections");
                // query collections
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: collectionDefinition.id,
                        },
                    ],
                };
                const { result: results } = await client.queryCollections(
                    TestHelpers.getDatabaseLink(isNameBased, db), querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");

                // Replacing indexing policy is allowed.
                collection.indexingPolicy.indexingMode = "Lazy";
                const { result: replacedCollection } = await client.replaceCollection(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), collection);
                assert.equal("lazy", replacedCollection.indexingPolicy.indexingMode);

                // Replacing partition key is not allowed.
                try {
                    collection.partitionKey = { paths: ["/key"], kind: DocumentBase.PartitionKind.Hash };
                    const { result: badUpdate } = await client.replaceCollection(
                        TestHelpers.getCollectionLink(isNameBased, db, collection), collection);
                    assert.fail("Replacing paritionkey must throw");
                } catch (err) {
                    const badRequestErrorCode = 400;
                    assert.equal(err.code, badRequestErrorCode,
                        "response should return error code " + badRequestErrorCode);
                } finally {
                    collection.partitionKey = collectionDefinition.partitionKey; // Resume partition key
                }
                // Replacing id is not allowed.
                try {
                    collection.id = "try_to_replace_id";
                    const { result: badUpdate } = await client.replaceCollection(
                        TestHelpers.getCollectionLink(isNameBased, db, collection), collection);
                    assert.fail("Replacing collection id must throw");
                } catch (err) {
                    if (isNameBased) {
                        const notFoundErrorCode = 404;
                        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                    } else {
                        const badRequestErrorCode = 400;
                        assert.equal(err.code, badRequestErrorCode, "response should return error code 400");
                    }
                }

                // read collection
                collection.id = collectionDefinition.id;  // Resume Id.
                const { result: readcollection } = await client.readCollection(
                    TestHelpers.getCollectionLink(isNameBased, db, collection));
                assert.equal(collectionDefinition.id, readcollection.id);
                // delete collection
                const { result: res } = await client.deleteCollection(
                    TestHelpers.getCollectionLink(isNameBased, db, collection));
                // read collection after deletion
                try {
                    const { result: deletedcollection } = await client.readCollection(
                        TestHelpers.getCollectionLink(isNameBased, db, collection));
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        const badPartitionKeyDefinitionTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create a collection
                const collectionDefinition = {
                    id: "sample collection",
                    indexingPolicy: { indexingMode: "Consistent" },
                    partitionKey: { paths: "/id", kind: DocumentBase.PartitionKind.Hash },
                };

                try {
                    const { result: collection } = await client.createCollection(
                        TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition);
                } catch (err) {
                    assert.equal(err.code, 400);
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do collection CRUD operations successfully name based", async function () {
            try {
                await collectionCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do collection CRUD operations successfully rid based", async function () {
            try {
                await collectionCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do elastic collection CRUD operations successfully name based", async function () {
            try {
                await collectionCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do elastic collection CRUD operations successfully rid based", async function () {
            try {
                await collectionCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Collection with bad partition key definition name based", async function () {
            try {
                await badPartitionKeyDefinitionTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Collection with bad partition key definition name based", async function () {
            try {
                await badPartitionKeyDefinitionTest(false);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("Validate collection indexing policy", function () {
        const indexPolicyTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });

                // create collection
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });

                assert.equal(collection.indexingPolicy.indexingMode, DocumentBase.IndexingMode.Consistent, "default indexing mode should be consistent");
                const lazyCollectionDefinition = { id: "lazy collection", indexingPolicy: { indexingMode: DocumentBase.IndexingMode.Lazy } };
                await client.deleteCollection(
                    TestHelpers.getCollectionLink(isNameBased, db, collection));

                const { result: lazyCollection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), lazyCollectionDefinition);

                assert.equal(lazyCollection.indexingPolicy.indexingMode, DocumentBase.IndexingMode.Lazy, "indexing mode should be lazy");
                const consistentCollectionDefinition = { id: "lazy collection", indexingPolicy: { indexingMode: DocumentBase.IndexingMode.Consistent } };
                await client.deleteCollection(
                    TestHelpers.getCollectionLink(isNameBased, db, lazyCollection));
                const { result: consistentCollection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), consistentCollectionDefinition);
                assert.equal(collection.indexingPolicy.indexingMode, DocumentBase.IndexingMode.Consistent, "indexing mode should be consistent");
                const collectionDefinition = {
                    id: "CollectionWithIndexingPolicy",
                    indexingPolicy: {
                        automatic: true,
                        indexingMode: DocumentBase.IndexingMode.Consistent,
                        includedPaths: [
                            {
                                path: "/",
                                indexes: [
                                    {
                                        kind: DocumentBase.IndexKind.Hash,
                                        dataType: DocumentBase.DataType.Number,
                                        precision: 2,
                                    },
                                ],
                            },
                        ],
                        excludedPaths: [
                            {
                                path: "/\"systemMetadata\"/*",
                            },
                        ],
                    },

                };

                const { result: coll } = await client.deleteCollection(
                    TestHelpers.getCollectionLink(isNameBased, db, consistentCollection));
                const { result: collectionWithIndexingPolicy } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition);

                // Two included paths.
                assert.equal(1, collectionWithIndexingPolicy.indexingPolicy.includedPaths.length, "Unexpected includedPaths length");
                // The first included path is what we created.
                assert.equal("/", collectionWithIndexingPolicy.indexingPolicy.includedPaths[0].path);
                assert(collectionWithIndexingPolicy.indexingPolicy.includedPaths[0].indexes.length > 1);  // Backend adds a default index
                assert.equal(DocumentBase.IndexKind.Hash, collectionWithIndexingPolicy.indexingPolicy.includedPaths[0].indexes[0].kind);
                // The second included path is a timestamp index created by the server.

                // And one excluded path.
                assert.equal(1, collectionWithIndexingPolicy.indexingPolicy.excludedPaths.length, "Unexpected excludedPaths length");
                assert.equal("/\"systemMetadata\"/*", collectionWithIndexingPolicy.indexingPolicy.excludedPaths[0].path);
            } catch (err) {
                throw err;
            }

        };

        it("nativeApi Should create collection with correct indexing policy name based", async function () {
            try {
                await indexPolicyTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should create collection with correct indexing policy rid based", async function () {
            try {
                await indexPolicyTest(false);
            } catch (err) {
                throw err;
            }
        });

        const checkDefaultIndexingPolicyPaths = function (indexingPolicy: any) {
            // no excluded paths.
            assert.equal(0, indexingPolicy["excludedPaths"].length);
            // included paths should be 1 "/".
            assert.equal(1, indexingPolicy["includedPaths"].length);

            let rootIncludedPath: any = null;
            if (indexingPolicy["includedPaths"][0]["path"] === "/*") {
                rootIncludedPath = indexingPolicy["includedPaths"][0];
            }

            assert(rootIncludedPath);  // root path should exist.

            // In the root path, there should be one HashIndex for Strings, and one RangeIndex for Numbers.
            assert.equal(2, rootIncludedPath["indexes"].length);

            let hashIndex: any = null;
            let rangeIndex: any = null;

            for (let i = 0; i < 2; ++i) {
                if (rootIncludedPath["indexes"][i]["kind"] === "Hash") {
                    hashIndex = rootIncludedPath["indexes"][i];
                } else if (rootIncludedPath["indexes"][i]["kind"] === "Range") {
                    rangeIndex = rootIncludedPath["indexes"][i];
                }
            }

            assert(hashIndex);
            assert.equal("String", hashIndex["dataType"]);
            assert(rangeIndex);
            assert.equal("Number", rangeIndex["dataType"]);
        };

        const defaultIndexingPolicyTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection with no indexing policy specified.
                const collectionDefinition01 = { id: "TestCreateDefaultPolicy01" };
                const { result: collectionNoIndexPolicy } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition01);
                checkDefaultIndexingPolicyPaths(collectionNoIndexPolicy["indexingPolicy"]);

                // create collection with partial policy specified.
                const collectionDefinition02 = {
                    id: "TestCreateDefaultPolicy02",
                    indexingPolicy: {
                        indexingMode: "Lazy",
                        automatic: true,
                    },
                };

                const { result: collectionWithPartialPolicy } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition02);
                checkDefaultIndexingPolicyPaths(collectionWithPartialPolicy["indexingPolicy"]);

                // create collection with default policy.
                const collectionDefinition03 = {
                    id: "TestCreateDefaultPolicy03",
                    indexingPolicy: {},
                };
                const { result: collectionDefaultPolicy } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition03);
                checkDefaultIndexingPolicyPaths(collectionDefaultPolicy["indexingPolicy"]);

                // create collection with indexing policy missing indexes.
                const collectionDefinition04 = {
                    id: "TestCreateDefaultPolicy04",
                    indexingPolicy: {
                        includedPaths: [
                            {
                                path: "/*",
                            },
                        ],
                    },
                };
                const { result: collectionMissingIndexes } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition04);
                checkDefaultIndexingPolicyPaths(collectionMissingIndexes["indexingPolicy"]);

                // create collection with indexing policy missing precision.
                const collectionDefinition05 = {
                    id: "TestCreateDefaultPolicy05",
                    indexingPolicy: {
                        includedPaths: [
                            {
                                path: "/*",
                                indexes: [
                                    {
                                        kind: "Hash",
                                        dataType: "String",
                                    },
                                    {
                                        kind: "Range",
                                        dataType: "Number",
                                    },
                                ],
                            },
                        ],
                    },
                };
                const { result: collectionMissingPrecision } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition05);
                checkDefaultIndexingPolicyPaths(collectionMissingPrecision["indexingPolicy"]);
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should create collection with default indexing policy name based", async function () {
            try {
                await defaultIndexingPolicyTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should create collection with default indexing policy rid based", async function () {
            try {
                await defaultIndexingPolicyTest(false);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("Validate response headers", function () {
        const createThenReadCollection = async function (isNameBased: boolean, client: CosmosClient, db: any, body: any) {
            try {
                const { result: createdCollection, headers } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), body);
                const response = await client.readCollection(
                    TestHelpers.getCollectionLink(isNameBased, db, createdCollection));
                return response;
            } catch (err) {
                throw err;
            }
        };

        const indexProgressHeadersTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                const { result: db } = await client.createDatabase({ id: "sample database" });
                const { headers: headers1 } = await createThenReadCollection(isNameBased, client, db, { id: "consistent_coll" });
                assert.notEqual(headers1[Constants.HttpHeaders.IndexTransformationProgress], undefined);
                assert.equal(headers1[Constants.HttpHeaders.LazyIndexingProgress], undefined);

                const lazyCollectionDefinition = {
                    id: "lazy_coll",
                    indexingPolicy: { indexingMode: DocumentBase.IndexingMode.Lazy },
                };
                const { headers: headers2 } = await createThenReadCollection(isNameBased, client, db, lazyCollectionDefinition);
                assert.notEqual(headers2[Constants.HttpHeaders.IndexTransformationProgress], undefined);
                assert.notEqual(headers2[Constants.HttpHeaders.LazyIndexingProgress], undefined);

                const noneCollectionDefinition = {
                    id: "none_coll",
                    indexingPolicy: { indexingMode: DocumentBase.IndexingMode.None, automatic: false },
                };
                const { headers: headers3 } = await createThenReadCollection(isNameBased, client, db, noneCollectionDefinition);
                assert.notEqual(headers3[Constants.HttpHeaders.IndexTransformationProgress], undefined);
                assert.equal(headers3[Constants.HttpHeaders.LazyIndexingProgress], undefined);
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Validate index progress headers name based", async function () {
            try {
                await indexProgressHeadersTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Validate index progress headers rid based", async function () {
            try {
                await indexProgressHeadersTest(false);
            } catch (err) {
                throw err;
            }
        });
    });
});
