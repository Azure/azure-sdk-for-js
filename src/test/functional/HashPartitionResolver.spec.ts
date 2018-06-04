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

    describe("HashPartitionResolver", function () {

        const test = async function (useUpsert: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });
                const getPartitionResolver = function (collectionLink1: any, collectionLink2: any) {
                    return new HashPartitionResolver("id", [collectionLink1, collectionLink2]);
                };
                const querySpec = {
                    query: "SELECT * FROM root",
                };

                const { result: db } = await client.createDatabase({ id: "database" });
                const { result: collection1 } = await client.createCollection(db._self, { id: "sample coll 1" });
                const { result: collection2 } = await client.createCollection(db._self, { id: "sample coll 2" });
                const resolver = getPartitionResolver(collection1._self, collection2._self);
                client.partitionResolvers["foo"] = resolver;

                const { result: doc1 } = await client.createDocument("foo", { id: "sample doc 1" });
                const { result: doc2 } = await client.createDocument("foo", { id: "sample doc 2" });
                const { result: doc3 } = await client.createDocument("foo", { id: "sample doc 11" });
                const { result: docs1 } = await client.queryDocuments(
                    "foo", querySpec/*, { resolverPartitionKey: resolver.getPartitionKey(doc1) }*/).toArray();
                const d1 = docs1.filter(function (d) { return (d.id === doc1.id); });
                assert(d1, "doc1 not found");
                assert.strictEqual(d1.length, 1);
                const { result: docs2 } = await client.queryDocuments(
                    "foo", querySpec/*, { resolverPartitionKey: resolver.getPartitionKey(doc2) }*/).toArray(); // TODO: I don't think this setting actually does anything
                const d2 = docs2.filter(function (d) { return (d.id === doc2.id); });
                assert(d2, "doc2 not found");
                assert.strictEqual(d2.length, 1);
                const { result: docs3 } = await client.queryDocuments(
                    "foo", querySpec/*, { resolverPartitionKey: resolver.getPartitionKey(doc3) }*/).toArray();
                const d3 = docs3.filter(function (d) { return (d.id === doc3.id); });
                assert(d3, "doc3 not found");
                assert.strictEqual(d3.length, 1);
            } catch (err) {
                throw err;
            }
        };

        it("CRUD operations", async function () {
            try {
                await test(false);
            } catch (err) {
                throw err;
            }
        });
        it("CRUD operations with upsert", async function () {
            try {
                await test(true);
            } catch (err) {
                throw err;
            }
        });
    });
});
