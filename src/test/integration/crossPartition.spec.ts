import * as assert from "assert";
import * as stream from "stream";
import * as _ from "underscore";
import * as util from "util";
import {
    AzureDocuments,
    Base,
    Constants,
    CosmosClient,
    DocumentBase,
    HashPartitionResolver,
    Range,
    RangePartitionResolver,
    RetryOptions,
} from "../../";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { ErrorResponse } from "../../request";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("Cross Partition", function () {
    this.timeout("30000");
    const generateDocuments = function (docSize: number) {
        const docs = [];
        for (let i = 0; i < docSize; i++) {
            const d = {
                id: i.toString(),
                name: "sample document",
                spam: "eggs" + i.toString(),
                cnt: i,
                key: "value",
                spam2: (i === 3) ? "eggs" + i.toString() : i,
                boolVar: (i % 2 === 0),
                number: 1.1 * i,

            };
            docs.push(d);
        }
        return docs;
    };

    describe("Validate Query", function () {
        const client = new CosmosClient(host, { masterKey });
        const documentDefinitions = generateDocuments(20);

        const databaseConfig = { id: "sample 中文 database" };
        const collectionDefinition = {
            id: "sample collection",
            indexingPolicy: {
                includedPaths: [
                    {
                        path: "/",
                        indexes: [
                            {
                                kind: "Range",
                                dataType: "Number",
                            },
                            {
                                kind: "Range",
                                dataType: "String",
                            },
                        ],
                    },
                ],
            },
            partitionKey: {
                paths: [
                    "/id",
                ],
                kind: "Hash",
            },
        };
        const collectionOptions = { offerThroughput: 10100 };

        let db: any; // TODO: any types
        let collection: any; // TODO: any types
        const isNameBased: boolean = false;

        // - removes all the databases,
        // - creates a new database,
        // - creates a new collecton,
        // - bulk inserts documents to the collection
        before(async function () {
            await TestHelpers.removeAllDatabases(host, masterKey);
            ({ result: db } = await client.createDatabase(databaseConfig));
            ({ result: collection } = await client.createCollection(db._self, collectionDefinition, collectionOptions));
            await TestHelpers.bulkInsertDocuments(client, isNameBased, db, collection, documentDefinitions);
        });

        const validateResults = function (actualResults: any[], expectedOrderIds: string[]) {
            assert.equal(actualResults.length, expectedOrderIds.length,
                "actual results length doesn't match with expected results length.");

            for (let i = 0; i < actualResults.length; i++) {
                assert.equal(actualResults[i].id, expectedOrderIds[i],
                    "actual result content doesn't match with expected result content. "
                    + actualResults[i].id + " != " + expectedOrderIds[i],
                );
            }
        };

        const validateToArray = async function (
            queryIterator: QueryIterator, options: any, expectedOrderIds: string[]) {

            ////////////////////////////////
            // validate toArray()
            ////////////////////////////////
            options.continuation = undefined;
            try {
                const { result: results } = await queryIterator.toArray();
                assert.equal(results.length, expectedOrderIds.length, "invalid number of results");
                assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");

                return validateResults(results, expectedOrderIds);
            } catch (err) {
                throw err;
            }
        };

        const validateNextItem = async function (
            queryIterator: QueryIterator, options: any, expectedOrderIds: string[]) {

            ////////////////////////////////
            // validate nextItem()
            ////////////////////////////////
            const results: any[] = [];
            try {
                while (results.length < expectedOrderIds.length) {
                    assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                    const { result: item } = await queryIterator.nextItem();
                    if (item === undefined) {
                        break;
                    }
                    results.push(item);
                }

                assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                validateResults(results, expectedOrderIds);
            } catch (err) {
                throw err;
            }
        };

        const validateNextItemAndCurrentAndHasMoreResults =
            async function (queryIterator: QueryIterator, options: any, expectedOrderIds: string[]) {
                // curent and nextItem recursively invoke each other till queryIterator is exhausted
                ////////////////////////////////
                // validate nextItem()
                ////////////////////////////////
                const results: any[] = [];
                try {
                    while (results.length <= expectedOrderIds.length) {
                        const { result: currentItem } = await queryIterator.current();
                        const { result: item } = await queryIterator.nextItem();
                        if (!item) {
                            break;
                        }
                        results.push(item);
                        if (results.length < expectedOrderIds.length) {
                            assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
                        }
                        assert.equal(item, currentItem, "current must give the previously item returned by nextItem");
                    }

                    assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
                    validateResults(results, expectedOrderIds);
                } catch (err) {
                    throw err;
                }
            };

        const validateExecuteNextAndHasMoreResults = async function (
            collectionLink: string, query: string | SqlQuerySpec, options: any,
            queryIterator: QueryIterator, expectedOrderIds: string[],
            validateExecuteNextWithContinuationToken?: boolean) {
            const pageSize = options["maxItemCount"];

            ////////////////////////////////
            // validate executeNext()
            ////////////////////////////////

            const listOfResultPages: any[] = [];
            const listOfHeaders: any[] = [];

            let totalFetchedResults: any[] = [];

            try {
                while (totalFetchedResults.length <= expectedOrderIds.length) {
                    const { result: results, headers } = await queryIterator.executeNext();
                    listOfResultPages.push(results);
                    listOfHeaders.push(headers);

                    if (results === undefined || (totalFetchedResults.length === expectedOrderIds.length)) {
                        break;
                    }

                    totalFetchedResults = totalFetchedResults.concat(results);

                    if (totalFetchedResults.length < expectedOrderIds.length) {
                        // there are more results
                        assert(results.length <= pageSize, "executeNext: invalid fetch block size");
                        if (validateExecuteNextWithContinuationToken) {
                            assert(results.length <= pageSize, "executeNext: invalid fetch block size");
                        } else {
                            assert.equal(results.length, pageSize, "executeNext: invalid fetch block size");
                        }
                        assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");

                    } else {
                        // no more results
                        assert.equal(expectedOrderIds.length, totalFetchedResults.length,
                            "executeNext: didn't fetch all the results");
                        assert(results.length <= pageSize,
                            "executeNext: actual fetch size is more than the requested page size");
                    }
                }

                // no more results
                validateResults(totalFetchedResults, expectedOrderIds);
                assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
                if (validateExecuteNextWithContinuationToken) {
                    // TODO: chrande
                    // I don't think this code is ever called, which means we're missing tests or should delete it.
                    throw new Error("Not yet implemented");
                    // return validateExecuteNextWithGivenContinuationToken(
                    //     collectionLink, query, options, listOfResultPages, listOfHeaders);
                }
            } catch (err) {
                throw err;
            }
        };

        const validateForEach = function (queryIterator: QueryIterator, options: any, expectedOrderIds: any[]) {
            ////////////////////////////////
            // validate forEach()
            ////////////////////////////////
            return new Promise((resolve, reject) => {
                const results: any[] = [];
                let callbackSingnalledEnd = false;
                // forEach uses callbacks still, so just wrap in a promise
                queryIterator.forEach((err: ErrorResponse, item: any) => {
                    try {
                        assert.equal(err, undefined,
                            "unexpected failure in fetching the results: " + err + JSON.stringify(err));
                        // if the previous invocation returned false, forEach must avoid invoking the callback again!
                        assert.equal(callbackSingnalledEnd, false,
                            "forEach called callback after the first false returned");
                        results.push(item);
                        if (results.length === expectedOrderIds.length) {
                            callbackSingnalledEnd = true;
                            validateResults(results, expectedOrderIds);
                            process.nextTick(resolve);
                            return false;
                        }
                        return true;
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        };

        const executeQueryAndValidateResults =
            async function (
                collectionLink: string, query: string | SqlQuerySpec, options: any,
                expectedOrderIds: any[], validateExecuteNextWithContinuationToken?: boolean) {

                validateExecuteNextWithContinuationToken = validateExecuteNextWithContinuationToken || false;
                const queryIterator = client.queryDocuments(collectionLink, query, options);

                await validateToArray(queryIterator, options, expectedOrderIds);
                queryIterator.reset();
                await validateExecuteNextAndHasMoreResults(
                    collectionLink, query, options,
                    queryIterator, expectedOrderIds, validateExecuteNextWithContinuationToken);
                queryIterator.reset();
                await validateNextItemAndCurrentAndHasMoreResults(queryIterator, options, expectedOrderIds);
                await validateForEach(queryIterator, options, expectedOrderIds);
            };

        const requestChargeValidator = async function (queryIterator: QueryIterator) {
            let counter = 0;
            let totalRequestCharge = 0;

            while (queryIterator.hasMoreResults()) {
                const { result: results, headers } = await queryIterator.executeNext();
                const rc: number = (headers || {})[Constants.HttpHeaders.RequestCharge] as number;

                if (counter === 0) {
                    assert(rc > 0);
                    counter += 1;
                }

                if (results === undefined) {
                    assert(totalRequestCharge > 0);
                    return;
                } else {
                    totalRequestCharge += rc;
                    assert(rc >= 0);
                }
            }
        };

        it("Validate Parallel Query As String With maxDegreeOfParallelism = 0", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 0 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds, false);
        });

        it("Validate Parallel Query As String With maxDegreeOfParallelism: -1", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: -1 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds, false);
        });

        it("Validate Parallel Query As String With maxDegreeOfParallelism: 1", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds, false);
        });

        it("Validate Parallel Query As String With maxDegreeOfParallelism: 3", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds, false);
        });

        it("Validate Parallel Query Request Charge With maxDegreeOfParallelism: 3", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
            await requestChargeValidator(queryIterator);
        });

        it("Validate Parallel Query Request Charge With maxDegreeOfParallelism: 1", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
            await requestChargeValidator(queryIterator);
        });

        it("Validate Simple OrderBy Query Request Charge With maxDegreeOfParallelism = 1", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
            await requestChargeValidator(queryIterator);
        });

        it("Validate Simple OrderBy Query Request Charge With maxDegreeOfParallelism = 0", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 0 };

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
            await requestChargeValidator(queryIterator);
        });

        it("Validate Top Query Request Charge with maxDegreeOfParallelism = 3", async function () {
            // a top query
            const topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            const query = util.format("SELECT top %d * FROM root r", topCount);
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
            await requestChargeValidator(queryIterator);
        });

        it("Validate Top Query Request Charge with maxDegreeOfParallelism = 0", async function () {
            // a top query
            const topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            const query = util.format("SELECT top %d * FROM root r", topCount);
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 0 };

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
            await requestChargeValidator(queryIterator);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 0", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 0 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 1", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 1 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 3", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds);
        });

        it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = -1", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: -1 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds);
        });

        it("Validate Simple OrderBy Query As String", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds);
        });

        it("Validate Simple OrderBy Query", async function () {
            // simple order by query
            const querySpec = {
                query: "SELECT * FROM root r order by r.spam",
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                querySpec, options, expectedOrderedIds);
        });

        it("Validate OrderBy Query With ASC", async function () {
            // an order by query with explicit ascending ordering
            const querySpec = {
                query: "SELECT * FROM root r order by r.spam ASC",
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                querySpec, options, expectedOrderedIds);
        });

        it("Validate OrderBy Query With DESC", async function () {
            // an order by query with explicit descending ordering
            const querySpec = {
                query: "SELECT * FROM root r order by r.spam DESC",
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            })).reverse();

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                querySpec, options, expectedOrderedIds);
        });

        it("Validate OrderBy with top", async function () {
            // an order by query with top, total existing docs more than requested top count
            const topCount = 9;
            const querySpec = {
                query: util.format("SELECT top %d * FROM root r order by r.spam", topCount),
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            })).slice(0, topCount);

            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                querySpec, options, expectedOrderedIds);

        });

        it("Validate OrderBy with Top Query (less results than top counts)", async function () {
            // an order by query with top, total existing docs less than requested top count
            const topCount = 30;
            // sanity check
            assert(topCount > documentDefinitions.length, "test setup is wrong");
            const querySpec = {
                query: util.format("SELECT top %d * FROM root r order by r.spam", topCount),
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                querySpec, options, expectedOrderedIds);
        });

        it("Validate Top Query with maxDegreeOfParallelism = 3", async function () {
            // a top query
            const topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            const query = util.format("SELECT top %d * FROM root r", topCount);
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

            // prepare expected behaviour verifier
            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);

            const { result: results } = await queryIterator.toArray();
            assert.equal(results.length, topCount);

            // select unique ids
            const uniqueIds: any = {};
            results.forEach(function (item) {
                uniqueIds[item.id] = true;
            });
            // assert no duplicate results
            assert.equal(results.length, Object.keys(uniqueIds).length);
        });

        it("Validate Top Query", async function () {
            // a top query
            const topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            const query = util.format("SELECT top %d * FROM root r", topCount);
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);

            const { result: results } = await queryIterator.toArray();
            assert.equal(results.length, topCount);

            // select unique ids
            const uniqueIds: any = {};
            results.forEach((item) => {
                uniqueIds[item.id] = true;
            });
            // assert no duplicate results
            assert.equal(results.length, Object.keys(uniqueIds).length);
        });

        it("Validate Top Query (with 0 topCount)", async function () {
            // a top query
            const topCount = 0;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            const query = util.format("SELECT top %d * FROM root r", topCount);
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);

            const { result: results } = await queryIterator.toArray();
            assert.equal(results.length, topCount);

            // select unique ids
            const uniqueIds: any = {};
            results.forEach((item) => {
                uniqueIds[item.id] = true;
            });
            // assert no duplicate results
            assert.equal(results.length, Object.keys(uniqueIds).length);
        });

        it("Validate Parametrized Top Query", async function () {
            // a top query
            const topCount = 6;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");

            const querySpec: SqlQuerySpec = {
                query: "SELECT top @n * FROM root r",

                parameters: [
                    { name: "@n", value: topCount },
                ],
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), querySpec, options);

            const { result: results } = await queryIterator.toArray();
            assert.equal(results.length, topCount);

            // select unique ids
            const uniqueIds: any = {};
            results.forEach((item) => {
                uniqueIds[item.id] = true;
            });
            // assert no duplicate results
            assert.equal(results.length, Object.keys(uniqueIds).length);
        });

        it("Validate OrderBy with Parametrized Top Query", async function () {
            // a parametrized top order by query
            const topCount = 9;
            // sanity check
            assert(topCount < documentDefinitions.length, "test setup is wrong");
            // a parametrized top order by query
            const querySpec = {
                query: "SELECT top @n * FROM root r order by r.spam",

                parameters: [
                    { name: "@n", value: topCount },
                ],
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            })).slice(0, topCount);

            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                querySpec, options, expectedOrderedIds);
        });

        it("Validate OrderBy with Parametrized Predicate", async function () {
            // an order by query combined with parametrized predicate
            const querySpec = {
                query: "SELECT * FROM root r where r.cnt > @cnt order by r.spam",
                parameters: [
                    { name: "@cnt", value: 5 },
                ],
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey)
                .filter(
                    function (r) {
                        return r["cnt"] > 5;
                    })
                .map(
                    function (r) {
                        return r["id"];
                    }));

            executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                querySpec, options, expectedOrderedIds);
        });

        it("Validate Error Handling - Orderby where types are noncomparable", async function () {
            // test orderby with different order by item type
            // an order by query
            const query = {
                query: "SELECT * FROM root r order by r.spam2",
            };
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected behaviour verifier
            try {
                const queryIterator = client.queryDocuments(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
                await queryIterator.toArray();
            } catch (err) {
                assert.notEqual(err, undefined);
            }
        });

        it("Validate OrderBy Integer Query", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.cnt";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["cnt"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds);
        });

        it("Validate OrderBy Floating Point Number Query", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.number";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["number"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            // validates the results size and order
            await executeQueryAndValidateResults(
                TestHelpers.getCollectionLink(isNameBased, db, collection),
                query, options, expectedOrderedIds);
        });

        it("Validate OrderBy Boolean Query", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.boolVar";
            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);
            const { result: results } = await queryIterator.toArray();
            assert.equal(results.length, documentDefinitions.length);

            let index = 0;
            while (index < results.length) {
                if (results[index].boolVar) {
                    break;
                }
                assert(results[index].id % 2 === 1);
                index++;
            }

            while (index < results.length) {
                assert(results[index].boolVar);
                assert(results[index].id % 2 === 0);
                index++;
            }
        });

        it("Validate forEach quick termination", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";

            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            })).slice(0, 1);

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);

            await validateForEach(queryIterator, options, expectedOrderedIds);
        });

        it("Validate Failure", async function () {
            // simple order by query in string format
            const query = "SELECT * FROM root r order by r.spam";

            const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

            // prepare expected results
            const getOrderByKey = function (r: any) {
                return r["spam"];
            };
            const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
                return r["id"];
            }));

            const queryIterator = client.queryDocuments(
                TestHelpers.getCollectionLink(isNameBased, db, collection), query, options);

            let firstTime = true;

            const { result } = await queryIterator.current();

            if (firstTime) {
                firstTime = false;
            }
        });
    });
});
