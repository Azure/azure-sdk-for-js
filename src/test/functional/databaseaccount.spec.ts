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

    describe("validate database account functionality", function () {
        const databaseAccountTest = async function (isNameBased: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                const { result: databaseAccount, headers } = await client.getDatabaseAccount();
                assert.equal(databaseAccount.DatabasesLink, "/dbs/");
                assert.equal(databaseAccount.MediaLink, "/media/");
                assert.equal(databaseAccount.MaxMediaStorageUsageInMB, headers["x-ms-max-media-storage-usage-mb"]); // TODO: should use constants here
                assert.equal(databaseAccount.CurrentMediaStorageUsageInMB, headers["x-ms-media-storage-usage-mb"]);
                assert(databaseAccount.ConsistencyPolicy !== undefined);
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should get database account successfully name based", async function () {
            try {
                await databaseAccountTest(true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should get database account successfully rid based", async function () {
            try {
                await databaseAccountTest(false);
            } catch (err) {
                throw err;
            }
        });
    });
});
