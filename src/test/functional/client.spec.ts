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

    // TODO: disabled tests need to get fixed or deleted
    describe.skip("Validate client request timeout", function () {
        it("nativeApi Client Should throw exception", async function () {
            const connectionPolicy = new DocumentBase.ConnectionPolicy();
            // making timeout 5 ms to make sure it will throw(create database request takes 10ms-15ms to finish on emulator)
            connectionPolicy.RequestTimeout = 5;
            const client = new CosmosClient(host, { masterKey }, connectionPolicy);
            // create database
            try {
                const { result: db } = await client.createDatabase({ id: "sample database" });
                assert.fail("Must throw when trying to connect to database");
            } catch (err) {
                assert.equal(err.code, "ECONNRESET", "client should throw exception");
            }
        });
    });
});
