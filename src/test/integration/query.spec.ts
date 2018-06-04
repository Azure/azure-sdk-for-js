import * as assert from "assert";
import { CosmosClient, UriFactory } from "../../";
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
