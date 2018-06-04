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
    describe("Validate UDF CRUD", function () {
        const udfCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });

                // read udfs
                const { result: udfs } = await client.readUserDefinedFunctions(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert.equal(udfs.constructor, Array, "Value should be an array");

                // create a udf
                const beforeCreateUdfsCount = udfs.length;
                const udfDefinition: any = {
                    id: "sample udf",
                    body() { const x = 10; },
                };
                const { result: udf } = await TestHelpers.createOrUpsertUserDefinedFunction(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    udfDefinition, undefined, client, isUpsertTest);
                for (const property in udfDefinition) {
                    if (property !== "serverScript") {
                        assert.equal(udf[property], udfDefinition[property], "property " + property + " should match");
                    } else {
                        assert.equal(udf.body, "function () { const x = 10; }");
                    }
                }

                // read udfs after creation
                const { result: udfsAfterCreate } = await client.readUserDefinedFunctions(
                    TestHelpers.getCollectionLink(isNameBased, db, collection)).toArray();
                assert.equal(udfsAfterCreate.length, beforeCreateUdfsCount + 1, "create should increase the number of udfs");

                // query udfs
                const querySpec = {
                    query: "SELECT * FROM root r WHERE r.id=@id",
                    parameters: [
                        {
                            name: "@id",
                            value: udfDefinition.id,
                        },
                    ],
                };
                const { result: results } = await client.queryUserDefinedFunctions(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), querySpec).toArray();
                assert(results.length > 0, "number of results for the query should be > 0");

                // replace udf
                udf.body = function () { const x = 20; };
                const { result: replacedUdf } = await TestHelpers.replaceOrUpsertUserDefinedFunction(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    TestHelpers.getUserDefinedFunctionLink(isNameBased, db, collection, udf),
                    udf, undefined, client, isUpsertTest);

                for (const property in udfDefinition) {
                    if (property !== "serverScript") {
                        assert.equal(replacedUdf[property], udf[property], "property " + property + " should match");
                    } else {
                        assert.equal(replacedUdf.body, "function () { const x = 20; }");
                    }
                }

                // read udf
                const { result: udfAfterReplace } = await client.readUserDefinedFunction(
                    TestHelpers.getUserDefinedFunctionLink(isNameBased, db, collection, replacedUdf));
                assert.equal(replacedUdf.id, udfAfterReplace.id);

                // delete udf
                const { result: res } = await client.deleteUserDefinedFunction(
                    TestHelpers.getUserDefinedFunctionLink(isNameBased, db, collection, replacedUdf));

                // read udfs after deletion
                try {
                    const { result: badudf } = await client.readUserDefinedFunction(
                        TestHelpers.getUserDefinedFunctionLink(isNameBased, db, collection, replacedUdf));
                    assert.fail("Must fail to read after delete");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should do UDF CRUD operations successfully name based", async function () {
            try {
                await udfCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do UDF CRUD operations successfully rid based", async function () {
            try {
                await udfCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do UDF CRUD operations successfully name based with upsert", async function () {
            try {
                await udfCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do UDF CRUD operations successfully rid based with upsert", async function () {
            try {
                await udfCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });
});
