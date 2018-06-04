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
    describe("Validate Permission CRUD", function () {
        const permissionCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                const { result: coll } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample coll" });

                // create user
                const { result: user } = await client.createUser(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "new user" });

                // list permissions
                const { result: permissions } = await client.readPermissions(
                    TestHelpers.getUserLink(isNameBased, db, user)).toArray();
                assert.equal(permissions.constructor, Array, "Value should be an array");
                const beforeCreateCount = permissions.length;
                const permission = { id: "new permission", permissionMode: DocumentBase.PermissionMode.Read, resource: coll._self };

                // create permission
                const { result: createdPermission } = await TestHelpers.createOrUpsertPermission(
                    TestHelpers.getUserLink(isNameBased, db, user), permission, undefined, client, isUpsertTest);
                assert.equal(createdPermission.id, "new permission", "permission name error");

                // list permissions after creation
                const { result: permissionsAfterCreation } = await client.readPermissions(
                    TestHelpers.getUserLink(isNameBased, db, user)).toArray();
                assert.equal(permissionsAfterCreation.length, beforeCreateCount + 1);

                // query permissions
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: permission.id,
                        },
                    ],
                };
                const { result: results } = await client.queryPermissions(
                    TestHelpers.getUserLink(isNameBased, db, user), querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");
                permission.permissionMode = DocumentBase.PermissionMode.All;
                const { result: replacedPermission } = await TestHelpers.replaceOrUpsertPermission(
                    TestHelpers.getUserLink(isNameBased, db, user), createdPermission._self, permission, undefined, client, isUpsertTest);
                assert.equal(replacedPermission.permissionMode, DocumentBase.PermissionMode.All, "permission mode should change");
                assert.equal(permission.id, replacedPermission.id, "permission id should stay the same");

                // to change the id of an existing resourcewe have to use replace
                permission.id = "replaced permission";
                const { result: replacedPermission2 } = await client.replacePermission(createdPermission._self, permission);
                assert.equal(replacedPermission2.id, "replaced permission", "permission name should change");
                assert.equal(permission.id, replacedPermission2.id, "permission id should stay the same");

                // read permission
                const { result: permissionAfterReplace } = await client.readPermission(
                    TestHelpers.getPermissionLink(isNameBased, db, user, replacedPermission2));
                assert.equal(permissionAfterReplace.id, permission.id);

                // delete permission
                const { result: res } = await client.deletePermission(
                    TestHelpers.getPermissionLink(isNameBased, db, user, replacedPermission2));

                // read permission after deletion
                try {
                    const { result: badPermission } = await client.readPermission(
                        TestHelpers.getPermissionLink(isNameBased, db, user, replacedPermission2));
                    assert.fail("Must fail to read permission after deletion");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        const permissionCRUDOverMultiplePartitionsTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const partitionKey = "id";
                const collectionDefinition = {
                    id: "coll1",
                    partitionKey: { paths: ["/" + partitionKey], kind: DocumentBase.PartitionKind.Hash },
                };
                const { result: coll } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition, { offerThroughput: 12000 });

                // create user
                const { result: user } = await client.createUser(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "new user" });

                // list permissions
                const { result: permissions } = await client.readPermissions(
                    TestHelpers.getUserLink(isNameBased, db, user)).toArray();
                assert(Array.isArray(permissions), "Value should be an array");
                const beforeCreateCount = permissions.length;
                const permissionDefinition = { id: "new permission", permissionMode: DocumentBase.PermissionMode.Read, resource: coll._self, resourcePartitionKey: [1] };

                // create permission
                const { result: permission } = await TestHelpers.createOrUpsertPermission(
                    TestHelpers.getUserLink(isNameBased, db, user), permissionDefinition, undefined, client, isUpsertTest);
                assert.equal(permission.id, permissionDefinition.id, "permission name error");
                assert.equal(JSON.stringify(permission.resourcePartitionKey), JSON.stringify(permissionDefinition.resourcePartitionKey), "permission resource partition key error");

                // list permissions after creation
                const { result: permissionsAfterCreation } = await client.readPermissions(
                    TestHelpers.getUserLink(isNameBased, db, user)).toArray();
                assert.equal(permissionsAfterCreation.length, beforeCreateCount + 1);

                // query permissions
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: permission.id,
                        },
                    ],
                };
                const { result: results } = await client.queryPermissions(
                    TestHelpers.getUserLink(isNameBased, db, user), querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");
                permission.permissionMode = DocumentBase.PermissionMode.All;
                const { result: replacedPermission } = await TestHelpers.replaceOrUpsertPermission(
                    TestHelpers.getUserLink(isNameBased, db, user), permission._self, permission, undefined, client, isUpsertTest);
                assert.equal(replacedPermission.permissionMode, DocumentBase.PermissionMode.All, "permission mode should change");
                assert.equal(replacedPermission.id, permission.id, "permission id should stay the same");
                assert.equal(JSON.stringify(replacedPermission.resourcePartitionKey), JSON.stringify(permission.resourcePartitionKey), "permission resource partition key error");

                // to change the id of an existing resourcewe have to use replace
                permission.id = "replaced permission";
                const { result: replacedPermission2 } = await client.replacePermission(permission._self, permission);
                assert.equal(replacedPermission2.id, permission.id);

                // read permission
                const { result: permissionAfterReplace } = await client.readPermission(
                    TestHelpers.getPermissionLink(isNameBased, db, user, replacedPermission2));
                assert.equal(permissionAfterReplace.id, replacedPermission2.id);

                // delete permission
                const { result: res } = await client.deletePermission(
                    TestHelpers.getPermissionLink(isNameBased, db, user, permissionAfterReplace));

                // read permission after deletion
                try {
                    const { result: badPermission } = await client.readPermission(
                        TestHelpers.getPermissionLink(isNameBased, db, user, permissionAfterReplace));
                    assert.fail("Must throw on read after delete");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }

        };

        it("nativeApi Should do Permission CRUD operations successfully name based", async function () {
            try {
                await permissionCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do Permission CRUD operations successfully rid based", async function () {
            try {
                await permissionCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do Permission CRUD operations successfully name based with upsert", async function () {
            try {
                await permissionCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do Permission CRUD operations successfully rid based with upsert", async function () {
            try {
                await permissionCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do Permission CRUD operations over multiple partitions successfully name based", async function () {
            try {
                await permissionCRUDOverMultiplePartitionsTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do Permission CRUD operations over multiple partitions successfully rid based", async function () {
            try {
                await permissionCRUDOverMultiplePartitionsTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do Permission CRUD operations over multiple partitions successfully name based with upsert", async function () {
            try {
                await permissionCRUDOverMultiplePartitionsTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do Permission CRUD operations over multiple partitions successfully rid based with upsert", async function () {
            try {
                await permissionCRUDOverMultiplePartitionsTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });
});
