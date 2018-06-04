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

    describe("Validate Database CRUD", async function () {
        const databaseCRUDTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                // read databases
                const { result: databases } = await client.readDatabases().toArray();
                assert.equal(databases.constructor, Array, "Value should be an array");
                // create a database
                const beforeCreateDatabasesCount = databases.length;
                const databaseDefinition = { id: "sample database" };
                const { result: db } = await client.createDatabase(databaseDefinition);
                assert.equal(db.id, databaseDefinition.id);
                // read databases after creation
                const { result: databases2 } = await client.readDatabases().toArray();
                assert.equal(databases2.length, beforeCreateDatabasesCount + 1,
                    "create should increase the number of databases");
                // query databases
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: databaseDefinition.id,
                        },
                    ],
                };
                const { result: results } = await client.queryDatabases(querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");

                // delete database
                const { result: res } = await client.deleteDatabase(TestHelpers.getDatabaseLink(isNameBased, db));
                try {
                    // read database after deletion
                    const { result: database3 } =
                        await client.readDatabase(TestHelpers.getDatabaseLink(isNameBased, db));
                    assert.fail("Read database on non-existent database should fail");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do database CRUD operations successfully name based", async function () {
            try {
                await databaseCRUDTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do database CRUD operations successfully rid based", async function () {
            try {
                await databaseCRUDTest(false);
            } catch (err) {
                throw err;
            }
        });
    });

    describe("Validate Id validation", function () {
        const client = new CosmosClient(host, { masterKey });

        it("nativeApi Should fail on ends with a space", async function () {
            // Id shoudn't end with a space.
            try {
                const { result: db } = await client.createDatabase({ id: "id_ends_with_space " });
                assert.fail("Must throw if id ends with a space");
            } catch (err) {
                assert.equal("Id ends with a space.", err.message);
            }
        });

        it("nativeAPI Should fail on contains '/'", async function() {
            // Id shoudn't contain "/".
            try {
                const { result: db } = await client.createDatabase({ id: "id_with_illegal/_char" });
                assert.fail("Must throw if id has illegal characters");
            } catch (err) {
                assert.equal("Id contains illegal chars.", err.message);
            }
        });

        it("nativeAPI Should fail on contains '\\'", async function() {
            // Id shoudn't contain "\\".
            try {
                const { result: db } = await client.createDatabase({ id: "id_with_illegal\\_char" });
                assert.fail("Must throw if id contains illegal characters");
            } catch (err) {
                assert.equal("Id contains illegal chars.", err.message);
            }
        });

        it("nativeAPI Should fail on contains '?'", async function() {
            // Id shoudn't contain "?".
            try {
                const { result: db } = await client.createDatabase({ id: "id_with_illegal?_?char" });
                assert.fail("Must throw if id contains illegal characters");
            } catch (err) {
                assert.equal("Id contains illegal chars.", err.message);
            }
        });

        it("nativeAPI should fail on contains '#'", async function() {

            // Id shoudn't contain "#".
            try {
                const { result: db } = await client.createDatabase({ id: "id_with_illegal#_char" });
                assert.fail("Must throw if id contains illegal characters");
            } catch (err) {
                assert.equal("Id contains illegal chars.", err.message);
            }
        });
    });
});
