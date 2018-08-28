// import assert from "assert";
// import { execFileSync, spawnSync } from "child_process";
// import * as Stream from "stream";
// import * as _ from "underscore";
// import * as util from "util";
// import {
//     AzureDocuments, Base, Constants, CosmosClient,
//     DocumentBase, HashPartitionResolver, Range,
//     RangePartitionResolver, RetryOptions,
// } from "../../";
// import { HeaderUtils } from "../../queryExecutionContext";
// import testConfig from "./../common/_testConfig";
// import { TestHelpers } from "./../common/TestHelpers";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// const host = testConfig.host;
// const masterKey = testConfig.masterKey;
// const adminUtilitiesPath = testConfig.adminUtilitiesPath;
// const splitRangeCommand = "SplitRange";
// const partitionKey = "key";
// const stopWorkload = false;

// const SplitMethod = {
//     EqualRange: 0,
//     EqualCount: 1,
//     Explicit: 2,
// };

// // TODO: These tests are currently disabled. Should remove them or re-enable them.

// describe.skip("NodeJS Split Tests", function () {
//     const generateDocuments = function (docSize) {
//         const docs = [];
//         for (let i: number = 0; i < docSize; i++) {
//             const d = {
//                 id: i.toString(),
//                 name: "sample document",
//                 spam: "eggs" + i.toString(),
//                 cnt: i,
//                 key: "value",
//                 spam2: (i === 3) ? "eggs" + i.toString() : i,
//                 boolconst: (i % 2 === 0),
//                 number: 1.1 * i,

//             };
//             docs.push(d);
//         }
//         return docs;
//     };

//     describe("Validate Split", function () {
//         const client = new CosmosClient(host, { masterKey });
//         const documentDefinitions = generateDocuments(20);
//         // Global constiable to determine if we should split after a round trip.
//         let shouldSplit = true;
//         let db: any;
//         let collection: any;
//         const isNameBased = false;
//         // - removes all the databases,
//         //  - creates a new database,
//         //      - creates a new collecton,
//         //          - bulk inserts documents to the collection
//         beforeEach(async function () {
//             try {
//                 shouldSplit = true;
//                 TestHelpers.removeAllDatabases(host, masterKey);

//                 const { result: createdDB } = await client.createDatabase({ id: "sample 中文 database" });
//                 db = createdDB;

//                 const collectionDefinition = {
//                     id: "sample collection",
//                     indexingPolicy: {
//                         includedPaths: [
//                             {
//                                 path: "/",
//                                 indexes: [
//                                     {
//                                         kind: "Range",
//                                         dataType: "Number",
//                                     },
//                                     {
//                                         kind: "Range",
//                                         dataType: "String",
//                                     },
//                                 ],
//                             },
//                         ],
//                     },
//                     partitionKey: {
//                         paths: [
//                             "/id",
//                         ],
//                         kind: "Hash",
//                     },
//                 };

//                 const collectionOptions = { offerThroughput: 10100 };
//                 const { result: createdCollection } =
//                     await client.createCollection("dbs/sample 中文 database", collectionDefinition, collectionOptions);
//                 collection = createdCollection;
//                 await TestHelpers.bulkInsertDocuments(client, isNameBased, db, collection, documentDefinitions);
//             } catch (err) {
//                 throw err;
//             }
//         });

//         const executeSplitRange = function (collectionRid, partitionKeyRangeId, minimumAllowedFraction, splitMethod) {
//             console.log("Launching Command: ");
//             const args = [splitRangeCommand, collectionRid, partitionKeyRangeId, minimumAllowedFraction, splitMethod];
//             const childProcess = spawnSync(adminUtilitiesPath, args, { stdio: "inherit" });
//             assert.equal(childProcess.status, 0);
//         };

//         const validateResults = function (actualResults, expectedOrderIds) {
//             assert.equal(actualResults.length, expectedOrderIds.length,
//                 "actual results length doesn't match with expected results length.");

//             for (let i = 0; i < actualResults.length; i++) {
//                 assert.equal(actualResults[i].id, expectedOrderIds[i],
//                     "actual result content doesn't match with expected result content.");
//             }
//         };

//         const validateToArray = function (queryIterator, options, expectedOrderIds, done) {

//             ////////////////////////////////
//             // validate toArray()
//             ////////////////////////////////
//             options.continuation = undefined;
//             const toArrayVerifier = function (err, results) {
//                 assert.equal(err, undefined, "unexpected failure in fetching the results: " + JSON.stringify(err));
//                 assert.equal(results.length, expectedOrderIds.length, "invalid number of results");
//                 assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");

//                 validateResults(results, expectedOrderIds);
//                 return done();
//             };

//             queryIterator.toArray(toArrayVerifier);
//         };

//         const validateNextItem = function (queryIterator, options, expectedOrderIds, done) {

//             ////////////////////////////////
//             // validate nextItem()
//             ////////////////////////////////
//             const results = [];
//             const nextItemVerifier = function (err, item) {
//                 assert.equal(err, undefined, "unexpected failure in fetching the results: " + err);
//                 if (item === undefined) {
//                     assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
//                     validateResults(results, expectedOrderIds);

//                     return done();
//                 }
//                 results = results.concat(item);

//                 if (results.length < expectedOrderIds.length) {
//                     assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
//                 }
//                 return queryIterator.nextItem(nextItemVerifier);
//             };

//             queryIterator.nextItem(nextItemVerifier);
//         };

//         const validateNextItemAndCurrentAndHasMoreResults = function (queryIterator, options, expectedOrderIds, done) {
//             // curent and nextItem recursively invoke each other till queryIterator is exhausted
//             ////////////////////////////////
//             // validate nextItem()
//             ////////////////////////////////
//             const results = [];
//             const nextItemVerifier = function (err, item) {

//                 ////////////////////////////////
//                 // validate current()
//                 ////////////////////////////////
//                 const currentVerifier = function (err, currentItem) {
//                     assert.equal(err, undefined, "unexpected failure in fetching the results: " + err);
//                     assert.equal(item, currentItem, "current must give the previously item returned by nextItem");

//                     if (currentItem === undefined) {
//                         assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
//                         validateResults(results, expectedOrderIds);

//                         return done();
//                     }

//                     if (results.length < expectedOrderIds.length) {
//                         assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
//                     }

//                     return queryIterator.nextItem(nextItemVerifier);
//                 };

//                 assert.equal(err, undefined, "unexpected failure in fetching the results: " + err);

//                 if (item === undefined) {
//                     assert(!queryIterator.hasMoreResults(), "hasMoreResults must signal results exhausted");
//                     validateResults(results, expectedOrderIds);

//                     return queryIterator.current(currentVerifier);
//                 }
//                 results = results.concat(item);

//                 if (results.length < expectedOrderIds.length) {
//                     assert(queryIterator.hasMoreResults(), "hasMoreResults must indicate more results");
//                 }

//                 const currentVerifier = function (err, currentItem) {
//                     queryIterator.nextItem(nextItemVerifier);
//                 }

//                 return queryIterator.current(currentVerifier);
//             };
//             queryIterator.nextItem(nextItemVerifier);
//         };

//         const validateExecuteNextWithGivenContinuationToken = function (collectionLink, query, origOptions, listOfResultPages, listOfHeaders, done) {
//             const options = JSON.parse(JSON.stringify(origOptions));
//             const expectedResults = listOfResultPages.shift();
//             const headers = listOfHeaders.shift();
//             if (headers === undefined) {
//                 assert(listOfHeaders.length === 0, "only last header is empty");
//                 assert(listOfResultPages.length === 0);
//                 return done();
//             }

//             assert.notEqual(expectedResults, undefined);

//             const continuationToken = headers[Constants.HttpHeaders.Continuation];

//             const fromTokenValidator = function (token, expectedResultsFromToken, expectedHeadersFromToken) {
//                 options.continuation = token;
//                 const queryIterator = client.queryDocuments(collectionLink, query, options);

//                 const fromTokenToLastPageValidator = function (queryIterator, token, expectedResultsFromToken, expectedHeadersFromToken) {

//                     // validates single page result and
//                     const resultPageValidator = function (err, resources, headers) {
//                         assert.equal(err, undefined, "unexpected failure in fetching the results: " + err + JSON.stringify(err));

//                         const exptectedResultPage = expectedResultsFromToken.shift();
//                         const expectedHeaders = expectedHeadersFromToken.shift();
//                         if (exptectedResultPage === undefined) {
//                             assert.equal(resources, undefined);
//                             assert.equal(headers, undefined);
//                         } else {

//                             validateResults(resources, exptectedResultPage.map(
//                                 function (r) {
//                                     return r["id"];
//                                 }));

//                             if (expectedHeaders) {
//                                 assert.equal(
//                                     headers[Constants.HttpHeaders.Continuation],
//                                     expectedHeaders[Constants.HttpHeaders.Continuation]);
//                             } else {
//                                 assert.equal(headers, undefined);
//                             }
//                         }

//                         if (expectedHeadersFromToken.length > 0) {
//                             return fromTokenToLastPageValidator(queryIterator, token, expectedResultsFromToken, expectedHeadersFromToken);
//                         } else {
//                             // start testing from next continuation token ...
//                             return validateExecuteNextWithGivenContinuationToken(collectionLink, query, options, listOfResultPages, listOfHeaders, done);
//                         }
//                     }
//                     queryIterator.executeNext(resultPageValidator);
//                 }
//                 return fromTokenToLastPageValidator(queryIterator, continuationToken, listOfResultPages, listOfHeaders);
//             }
//             return fromTokenValidator(continuationToken, listOfResultPages, listOfHeaders);
//         }

//         const validateExecuteNextAndHasMoreResults = function (collectionLink, query, options, queryIterator, expectedOrderIds, done,
//             validateExecuteNextWithContinuationToken) {
//             const pageSize = options["maxItemCount"];

//             ////////////////////////////////
//             // validate executeNext()
//             ////////////////////////////////

//             const listOfResultPages = [];
//             const listOfHeaders = [];

//             const totalFetchedResults = [];
//             const executeNextValidator = function (err, results, headers) {
//                 // CollectionRid is case sensitive.
//                 const collectionRid = collectionLink.split("/")[3];

//                 // Spliting to test split proof after retrieving the page
//                 if (shouldSplit) {
//                     executeSplitRange(collectionRid, "0", "0.1", "EqualRange");
//                     shouldSplit = false;
//                 }

//                 listOfResultPages.push(results);
//                 listOfHeaders.push(headers);

//                 assert.equal(err, undefined, "unexpected failure in fetching the results: " + err + JSON.stringify(err));
//                 if (results === undefined || (totalFetchedResults.length === expectedOrderIds.length)) {
//                     // no more results
//                     validateResults(totalFetchedResults, expectedOrderIds);
//                     assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
//                     assert.equal(results, undefined, "unexpected more results" + JSON.stringify(results));
//                     if (validateExecuteNextWithContinuationToken) {
//                         return validateExecuteNextWithGivenContinuationToken(
//                             collectionLink, query, options, listOfResultPages, listOfHeaders, done,
//                         );
//                     } else {
//                         return done();
//                     }
//                 }

//                 totalFetchedResults = totalFetchedResults.concat(results);

//                 if (totalFetchedResults.length < expectedOrderIds.length) {
//                     // there are more results
//                     assert(results.length <= pageSize, "executeNext: invalid fetch block size");
//                     //if (validateExecuteNextWithContinuationToken) {
//                     //    assert(results.length <= pageSize, "executeNext: invalid fetch block size");
//                     // } else {
//                     //    assert.equal(results.length, pageSize, "executeNext: invalid fetch block size");

//                     // }
//                     assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
//                     return queryIterator.executeNext(executeNextValidator);

//                 } else {
//                     // no more results
//                     assert.equal(expectedOrderIds.length, totalFetchedResults.length, "executeNext: didn't fetch all the results");
//                     assert(results.length <= pageSize, "executeNext: actual fetch size is more than the requested page size");

//                     // validate that next execute returns undefined resources
//                     return queryIterator.executeNext(executeNextValidator);
//                 }
//             };

//             queryIterator.executeNext(executeNextValidator);
//         }

//         const validateForEach = function (queryIterator, options, expectedOrderIds, done) {

//             ////////////////////////////////
//             // validate forEach()
//             ////////////////////////////////
//             const results = [];
//             const callbackSingnalledEnd = false;
//             const forEachCallback = function (err, item) {
//                 assert.equal(err, undefined, "unexpected failure in fetching the results: " + err + JSON.stringify(err));
//                 // if the previous invocation returned false, forEach must avoid invoking the callback again!
//                 assert.equal(callbackSingnalledEnd, false, "forEach called callback after the first false returned");
//                 results = results.concat(item);
//                 if (results.length === expectedOrderIds.length) {
//                     callbackSingnalledEnd = true;
//                     validateResults(results, expectedOrderIds);
//                     process.nextTick(done);
//                     return false
//                 }
//                 return true;
//             };

//             queryIterator.forEach(forEachCallback);
//         }

//         const executeQueryAndValidateResults = function (collectionLink, query, options, expectedOrderIds, done, validateExecuteNextWithContinuationToken) {

//             validateExecuteNextWithContinuationToken = validateExecuteNextWithContinuationToken || false;
//             const queryIterator = client.queryDocuments(collectionLink, query, options);

//             validateToArray(queryIterator, options, expectedOrderIds,
//                 function () {
//                     queryIterator.reset();
//                     validateExecuteNextAndHasMoreResults(collectionLink, query, options, queryIterator, expectedOrderIds,
//                         function () {
//                             queryIterator.reset();
//                             validateNextItemAndCurrentAndHasMoreResults(queryIterator, options, expectedOrderIds,
//                                 function () {
//                                     validateForEach(queryIterator, options, expectedOrderIds, done);
//                                 },
//                             );
//                         },
//                         validateExecuteNextWithContinuationToken,
//                     );
//                 },
//             );
//         };
//         // We can only have 5 split test cases, since the VM will only let us split 10 times

//         // Parallel Query Tests
//         it("Validate Parallel Query As String With maxDegreeOfParallelism: 3", function (done) {
//             // simple order by query in string format
//             const query = "SELECT * FROM root r";
//             const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

//             const expectedOrderedIds = [1, 10, 18, 2, 3, 13, 14, 16, 17, 0, 11, 12, 5, 9, 19, 4, 6, 7, 8, 15];

//             // validates the results size and order
//             executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
//         });

//         // OrderBy Tests
//         it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 3", function (done) {
//             // simple order by query in string format
//             const query = "SELECT * FROM root r order by r.spam";
//             const options = { enableCrossPartitionQuery: true, maxItemCount: 2, maxDegreeOfParallelism: 3 };

//             // prepare expected results
//             const getOrderByKey = function (r) {
//                 return r["spam"];
//             }
//             const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
//                 return r["id"];
//             }));

//             // validates the results size and order
//             executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), query, options, expectedOrderedIds, done);
//         });

//         it("Validate OrderBy with top", function (done) {
//             // an order by query with top, total existing docs more than requested top count
//             const topCount = 9;
//             const querySpec = {
//                 query: util.format("SELECT top %d * FROM root r order by r.spam", topCount),
//             }
//             const options = { enableCrossPartitionQuery: true, maxItemCount: 2 };

//             // prepare expected results
//             const getOrderByKey = function (r) {
//                 return r["spam"];
//             }
//             const expectedOrderedIds = (_.sortBy(documentDefinitions, getOrderByKey).map(function (r) {
//                 return r["id"];
//             })).slice(0, topCount);

//             executeQueryAndValidateResults(getCollectionLink(isNameBased, db, collection), querySpec, options, expectedOrderedIds, done);

//         });
//     });
// });
