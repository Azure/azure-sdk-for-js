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

    describe("Validate spatial index", function () {
        const spatialIndexTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });

                // create collection using an indexing policy with spatial index.
                const indexingPolicy = {
                    includedPaths: [
                        {
                            path: "/\"Location\"/?",
                            indexes: [
                                {
                                    kind: DocumentBase.IndexKind.Spatial,
                                    dataType: DocumentBase.DataType.Point,
                                },
                            ],
                        },
                        {
                            path: "/",
                        },
                    ],
                };
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection", indexingPolicy });
                const location1 = {
                    id: "location1",
                    Location: {
                        type: "Point",
                        coordinates: [20.0, 20.0],
                    },
                };
                await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    location1, undefined, client, isUpsertTest);
                const location2 = {
                    id: "location2",
                    Location: {
                        type: "Point",
                        coordinates: [100.0, 100.0],
                    },
                };
                await TestHelpers.createOrUpsertDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    location2, undefined, client, isUpsertTest);
                const query = "SELECT * FROM root WHERE (ST_DISTANCE(root.Location, {type: 'Point', coordinates: [20.1, 20]}) < 20000) ";
                const { result: results } = await client.queryDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), query).toArray();
                assert.equal(1, results.length);
                assert.equal("location1", results[0].id);
            } catch (err) {
                throw err;
            }
        };

        it("nativeApi Should support spatial index name based", async function () {
            try {
                await spatialIndexTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should support spatial index rid based", async function () {
            try {
                await spatialIndexTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should support spatial index name based with upsert", async function () {
            try {
                await spatialIndexTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should support spatial index rid based with upsert", async function () {
            try {
                await spatialIndexTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });
});
