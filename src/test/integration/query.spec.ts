import * as assert from "assert";
import { Constants, CosmosClient, UriFactory } from "../../";
import { FeedOptions } from "../../documentclient";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

const doc = { id: "myId", pk: "pk" };

describe("ResourceLink Trimming of leading and trailing slashes", function () {
    this.timeout(10000);
    const client = new CosmosClient(host, { masterKey });
    const databaseId = "testDatabase";
    const collectionId = "testCollection";

    afterEach(async function () { await TestHelpers.removeAllDatabases(host, masterKey); });
    beforeEach(async function () { await TestHelpers.removeAllDatabases(host, masterKey); });

    it("validate correct execution of query using named collection link with leading and trailing slashes"
        , async function () {
            try {
                const databaseBody = { id: databaseId };

                const { result: database } = await client.createDatabase(databaseBody);
                const collectionDefinition = { id: collectionId, partitionKey: { paths: ["/pk"], kind: "Hash" } };
                const collectionOptions = { offerThroughput: 10100 };

                const { result: createdCollection } = await client
                    .createCollection(database._self, collectionDefinition, collectionOptions);

                const { result: docResult } = await client.createDocument(createdCollection._self, doc);
                const collectionLink = "/dbs/" + databaseId + "/colls/" + collectionId + "/";
                const query = "SELECT * from " + collectionId;
                const queryOptions = { partitionKey: "pk" };
                const queryIterator = client.queryDocuments(collectionLink, query, queryOptions);

                const { result } = await queryIterator.toArray();
                assert.equal(result[0]["id"], "myId");
            } catch (err) {
                throw err;
            }
        });
});

describe("Test Query Metrics On Single Partition Collection", function () {
    const client = new CosmosClient(host, { masterKey });
    const databaseId = "testDatabase";
    const collectionId = "testCollection2";

    const testQueryMetricsOnSinglePartition = async function (document: any) {
        try {
            const databaseBody = { id: databaseId };

            const { result: database } = await client.createDatabase(databaseBody);

            const collectionDefinition = { id: collectionId };
            const collectionOptions = { offerThroughput: 4000 };

            const { result: createdCollection } =
                await client.createCollection(database._self, collectionDefinition, collectionOptions);

            await client.createDocument(createdCollection._self, document);
            const collectionLink = "/dbs/" + databaseId + "/colls/" + collectionId + "/";
            const query = "SELECT * from " + collectionId;
            const queryOptions: FeedOptions = { populateQueryMetrics: true };
            const queryIterator = client.queryDocuments(collectionLink, query, queryOptions);

            while (queryIterator.hasMoreResults()) {
                const { result: results, headers } = await queryIterator.executeNext();

                if (results === undefined) {
                    // no more results
                    break;
                }

                assert.notEqual(headers[Constants.HttpHeaders.QueryMetrics]["0"], null);
            }
        } catch (err) {
            throw err;
        }
    };

    afterEach(async function () {
        try {
            await TestHelpers.removeAllDatabases(host, masterKey);
        } catch (err) {
            throw err;
        }
    });

    beforeEach(async function () {
        try {
            await TestHelpers.removeAllDatabases(host, masterKey);
        } catch (err) {
            throw err;
        }
    });

    it("validate that query metrics are correct for a single partition query", async function () {
        try {
            await testQueryMetricsOnSinglePartition(doc);
        } catch (err) {
            throw err;
        }
    });
});
