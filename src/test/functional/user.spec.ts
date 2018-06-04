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
    describe("Validate User CRUD", function () {
        const userCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });

                // list users
                const { result: users } = await client.readUsers(
                    TestHelpers.getDatabaseLink(isNameBased, db)).toArray();
                assert.equal(users.constructor, Array, "Value should be an array");
                const beforeCreateCount = users.length;

                // create user
                const { result: user } = await TestHelpers.createOrUpsertUser(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "new user" },
                    undefined, client, isUpsertTest);
                assert.equal(user.id, "new user", "user name error");

                // list users after creation
                const { result: usersAfterCreation } = await client.readUsers(
                    TestHelpers.getDatabaseLink(isNameBased, db)).toArray();
                assert.equal(usersAfterCreation.length, beforeCreateCount + 1);

                // query users
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: "new user",
                        },
                    ],
                };
                const { result: results } = await client.queryUsers(
                    TestHelpers.getDatabaseLink(isNameBased, db), querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");

                // replace user
                user.id = "replaced user";
                const { result: replacedUser } = await TestHelpers.replaceOrUpsertUser(
                    TestHelpers.getDatabaseLink(isNameBased, db), user._self, user, undefined, client, isUpsertTest);
                assert.equal(replacedUser.id, "replaced user", "user name should change");
                assert.equal(user.id, replacedUser.id, "user id should stay the same");

                // read user
                const { result: userAfterReplace } = await client.readUser(
                    TestHelpers.getUserLink(isNameBased, db, replacedUser));
                assert.equal(replacedUser.id, userAfterReplace.id);

                // delete user
                const { result: res } = await client.deleteUser(
                    TestHelpers.getUserLink(isNameBased, db, user));

                // read user after deletion
                try {
                    const { result: badUser } = await client.readUser(
                        TestHelpers.getUserLink(isNameBased, db, user));
                    assert.fail("Must fail to read user after deletion");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do User CRUD operations successfully name based", async function () {
            try {
                await userCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do User CRUD operations successfully rid based", async function () {
            try {
                await userCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do User CRUD operations successfully name based with upsert", async function () {
            try {
                await userCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do User CRUD operations successfully rid based with upsert", async function () {
            try {
                await userCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });
});
