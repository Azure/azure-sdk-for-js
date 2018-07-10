import * as assert from "assert";
import { Container, CosmosClient } from "../../";
import { UserDefinedFunctionDefinition } from "../../client";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const endpoint = testConfig.host;
const masterKey = testConfig.masterKey;
const dbId = "udf test database";
const containerId = "sample container";

describe("NodeJS CRUD Tests", function() {
    this.timeout(process.env.MOCHA_TIMEOUT || 10000);

    beforeEach(async function() {
        this.timeout(10000);
        // remove all databases from the endpoint before each test
        const client = new CosmosClient({
            endpoint,
            auth: { masterKey },
        });
        await TestHelpers.removeAllDatabases(client);
    });

    describe("User Defined Function", function() {
        let container: Container;

        beforeEach(async function() {
            const client = new CosmosClient({
                endpoint,
                auth: { masterKey },
            });

            // create database
            await client.databases.create({
                id: dbId,
            });

            // create container
            await client.database(dbId)
                .containers.create({ id: containerId });

            container = await client.database(dbId)
                .container(containerId);
        });
        it("nativeApi Should do UDF CRUD operations successfully", async function() {
            const {
                result: udfs,
            } = await container.userDefinedFunctions.readAll().toArray();

            // create a udf
            const beforeCreateUdfsCount = udfs.length;
            const udfDefinition: UserDefinedFunctionDefinition = {
                id: "sample udf",
                body: "function () { const x = 10; }",
            };

            // TODO also handle upsert case
            const { result: udf } = await container.userDefinedFunctions.create(
                udfDefinition,
            );

            assert.equal(udf.id, udfDefinition.id);
            assert.equal(udf.body, "function () { const x = 10; }");

            // read udfs after creation
            const {
                result: udfsAfterCreate,
            } = await container.userDefinedFunctions.readAll().toArray();
            assert.equal(
                udfsAfterCreate.length,
                beforeCreateUdfsCount + 1,
                "create should increase the number of udfs",
            );

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
            const {
                result: results,
            } = await container.userDefinedFunctions.query(querySpec).toArray();
            assert(
                results.length > 0,
                "number of results for the query should be > 0",
            );

            // replace udf
            udfDefinition.body = "function () { const x = 10; }";
            const {
                result: replacedUdf,
            } = await container.userDefinedFunction(udfDefinition.id)
                .replace(udfDefinition);

            assert.equal(replacedUdf.id, udfDefinition.id);
            assert.equal(replacedUdf.body, "function () { const x = 10; }");

            // read udf
            const {
                result: udfAfterReplace,
            } = await container.userDefinedFunction(replacedUdf.id)
                .read();

            assert.equal(replacedUdf.id, udfAfterReplace.id);

            // delete udf
            const {
                result: res,
            } = await container.userDefinedFunction(replacedUdf.id)
                .delete();

            // read udfs after deletion
            try {
                const {
                    result: badudf,
                } = await container.userDefinedFunction(replacedUdf.id)
                    .read();
                assert.fail("Must fail to read after delete");
            } catch (err) {
                const notFoundErrorCode = 404;
                assert.equal(
                    err.code,
                    notFoundErrorCode,
                    "response should return error code 404",
                );
            }
        });

        it("nativeApi Should do UDF CRUD operations successfully", async function() {
            const {
                result: udfs,
            } = await container.userDefinedFunctions.readAll().toArray();

            // create a udf
            const beforeCreateUdfsCount = udfs.length;
            const udfDefinition = {
                id: "sample udf",
                body: "function () { const x = 10; }",
            };

            const { result: udf } = await container.userDefinedFunctions.upsert(
                udfDefinition,
            );

            assert.equal(udf.id, udfDefinition.id);
            assert.equal(udf.body, "function () { const x = 10; }");

            // read udfs after creation
            const {
                result: udfsAfterCreate,
            } = await container.userDefinedFunctions.readAll().toArray();
            assert.equal(
                udfsAfterCreate.length,
                beforeCreateUdfsCount + 1,
                "create should increase the number of udfs",
            );

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
            const {
                result: results,
            } = await container.userDefinedFunctions.query(querySpec).toArray();
            assert(
                results.length > 0,
                "number of results for the query should be > 0",
            );

            // replace udf
            udfDefinition.body = "function () { const x = 10; }";
            const {
                result: replacedUdf,
            } = await container.userDefinedFunctions.upsert(udfDefinition);

            assert.equal(replacedUdf.id, udfDefinition.id);
            assert.equal(replacedUdf.body, "function () { const x = 10; }");

            // read udf
            const {
                result: udfAfterReplace,
            } = await container.userDefinedFunction(replacedUdf.id)
                .read();

            assert.equal(replacedUdf.id, udfAfterReplace.id);

            // delete udf
            const {
                result: res,
            } = await container.userDefinedFunction(replacedUdf.id)
                .delete();

            // read udfs after deletion
            try {
                const {
                    result: badudf,
                } = await container.userDefinedFunction(replacedUdf.id)
                    .read();
                assert.fail("Must fail to read after delete");
            } catch (err) {
                const notFoundErrorCode = 404;
                assert.equal(
                    err.code,
                    notFoundErrorCode,
                    "response should return error code 404",
                );
            }
        });
    });
});
