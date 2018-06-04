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
    describe("Validate Authorization", function () {
        const setupEntities = async function (isNameBased: boolean, isUpsertTest: boolean, client: CosmosClient) {
            try {
                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection1
                const { result: collection1 } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });
                // create document1
                const { result: document1 } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection1), { id: "coll1doc1", foo: "bar", key: "value" });
                // create document 2
                const { result: document2 } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection1), { id: "coll1doc2", foo: "bar2", key: "value2" });
                // create attachment
                const dynamicAttachment = {
                    id: "dynamic attachment",
                    media: "http://xstore.",
                    MediaType: "Book",
                    Author: "My Book Author",
                    Title: "My Book Title",
                    contentType: "application/text",
                };
                const { result: attachment } = await client.createAttachment(
                    TestHelpers.getDocumentLink(isNameBased, db, collection1, document1), dynamicAttachment);
                // create collection 2
                const { result: collection2 } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection2" });
                // create user1
                const { result: user1 } = await client.createUser(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "user1" });
                let permission = { id: "permission On Coll1", permissionMode: DocumentBase.PermissionMode.Read, resource: collection1._self };
                // create permission for collection1
                const { result: permissionOnColl1 } = await TestHelpers.createOrUpsertPermission(
                    TestHelpers.getUserLink(isNameBased, db, user1), permission, undefined, client, isUpsertTest);
                assert(permissionOnColl1._token !== undefined, "permission token is invalid");
                permission = { id: "permission On Doc1", permissionMode: DocumentBase.PermissionMode.All, resource: document2._self };
                // create permission for document 2
                const { result: permissionOnDoc2 } = await TestHelpers.createOrUpsertPermission(
                    TestHelpers.getUserLink(isNameBased, db, user1), permission, undefined, client, isUpsertTest);
                assert(permissionOnDoc2._token !== undefined, "permission token is invalid");
                // create user 2
                const { result: user2 } = await client.createUser(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "user2" });
                permission = { id: "permission On coll2", permissionMode: DocumentBase.PermissionMode.All, resource: collection2._self };
                // create permission on collection 2
                const { result: permissionOnColl2 } = await TestHelpers.createOrUpsertPermission(
                    TestHelpers.getUserLink(isNameBased, db, user2), permission, undefined, client, isUpsertTest);
                const entities = {
                    db,
                    coll1: collection1,
                    coll2: collection2,
                    doc1: document1,
                    doc2: document2,
                    user1,
                    user2,
                    attachment,
                    permissionOnColl1,
                    permissionOnDoc2,
                    permissionOnColl2,
                };

                return entities;
            } catch (err) {
                throw err;
            }
        };

        const authorizationCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                try {
                    const badclient = new CosmosClient(host, undefined);
                    const { result: databases } = await badclient.readDatabases().toArray();
                    assert.fail("Must fail");
                } catch (err) {
                    assert(err !== undefined, "error should not be undefined");
                    const unauthorizedErrorCode = 401;
                    assert.equal(err.code, unauthorizedErrorCode, "error code should be equal to 401");
                }

                const client = new CosmosClient(host, { masterKey });

                // setup entities
                const entities = await setupEntities(isNameBased, isUpsertTest, client);
                const resourceTokens: any = {};
                if (isNameBased) {
                    resourceTokens[entities.coll1.id] = entities.permissionOnColl1._token;
                    resourceTokens[entities.doc1.id] = entities.permissionOnColl1._token;
                } else {
                    resourceTokens[entities.coll1._rid] = entities.permissionOnColl1._token;
                    resourceTokens[entities.doc1._rid] = entities.permissionOnColl1._token;
                }

                const col1Client = new CosmosClient(host, { resourceTokens });
                const coll1Link = TestHelpers.getCollectionLink(isNameBased, entities.db, entities.coll1);

                // 1. Success-- Use Col1 Permission to Read
                const { result: successColl1 } = await col1Client.readCollection(coll1Link);
                assert(successColl1 !== undefined, "error reading collection");

                // 2. Failure-- Use Col1 Permission to delete
                try {
                    const { result: result } = await col1Client.deleteCollection(coll1Link);
                    assert.fail("must fail if no permission");
                } catch (err) {
                    assert(err !== undefined, "expected to fail, no permission to delete");
                    assert.equal(err.code, 403, "Must return a code for not authorized");
                }

                // 3. Success-- Use Col1 Permission to Read All Docs
                const { result: successDocuments } = await col1Client.readDocuments(coll1Link).toArray();
                assert(successDocuments !== undefined, "error reading documents");
                assert.equal(successDocuments.length, 2, "Expected 2 Documents to be succesfully read");

                // 4. Success-- Use Col1 Permission to Read Col1Doc1
                const doc1Link = TestHelpers.getDocumentLink(isNameBased, entities.db, entities.coll1, entities.doc1);
                const { result: successDoc } = await col1Client.readDocument(doc1Link);
                assert(successDoc !== undefined, "error reading document");
                assert.equal(successDoc.id, entities.doc1.id, "Expected to read children using parent permissions");

                const col2Client = new CosmosClient(host, { permissionFeed: [entities.permissionOnColl2] });
                const doc = { id: "new doc", CustomProperty1: "BBBBBB", customProperty2: 1000 };
                const { result: successDoc2 } = await TestHelpers.createOrUpsertDocument(entities.coll2._self, doc, undefined, col2Client, isUpsertTest);
                assert(successDoc2 !== undefined, "error creating document");
                assert.equal(successDoc2.CustomProperty1, doc.CustomProperty1, "document should have been created successfully");
            } catch (err) {
                throw err;
            }
        };

        const authorizationCRUDOverMultiplePartitionsTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const partitionKey = "key";
                const collectionDefinition = {
                    id: "coll1",
                    partitionKey: { paths: ["/" + partitionKey], kind: DocumentBase.PartitionKind.Hash },
                };
                const { result: coll } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition, { offerThroughput: 12000 });
                // create user
                const { result: user } = await client.createUser(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "user1" });

                const key = 1;
                const permissionDefinition = {
                    id: "permission1",
                    permissionMode: DocumentBase.PermissionMode.All,
                    resource: TestHelpers.getCollectionLink(isNameBased, db, coll),
                    resourcePartitionKey: [key],
                };
                // create permission
                const { result: permission } = await client.createPermission(
                    TestHelpers.getUserLink(isNameBased, db, user), permissionDefinition);
                assert(permission._token !== undefined, "permission token is invalid");
                const resourceTokens: any = {};
                if (isNameBased) {
                    resourceTokens[coll.id] = permission._token;
                } else {
                    resourceTokens[coll._rid] = permission._token;
                }

                const restrictedClient = new CosmosClient(host, { resourceTokens });

                const { result: document } = await restrictedClient.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, coll), { id: "document1", key: 1 });
                try {
                    const { result: baddocument } = await restrictedClient.createDocument(
                        TestHelpers.getCollectionLink(isNameBased, db, coll), { id: "document2", key: 2 });
                    assert.fail("Must throw unauthorized on read");
                } catch (err) {
                    const unauthorizedErrorCode = 403;
                    assert.equal(err.code, unauthorizedErrorCode);
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do authorization successfully name based", async function () {
            try {
                await authorizationCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do authorization successfully rid based", async function () {
            try {
                await authorizationCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do authorization successfully name based with upsert", async function () {
            try {
                await authorizationCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do authorization successfully rid based with upsert", async function () {
            try {
                await authorizationCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do authorization over multiple partitions successfully name based", async function () {
            try {
                await authorizationCRUDOverMultiplePartitionsTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do authorization over multiple partitions successfully rid based", async function () {
            try {
                await authorizationCRUDOverMultiplePartitionsTest(false);
            } catch (err) {
                throw err;
            }
        });
    });
});
