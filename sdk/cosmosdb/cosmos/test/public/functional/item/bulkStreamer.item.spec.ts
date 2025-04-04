// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import assert from "assert";
// import type {
//   BulkOperationResult,
//   Container,
//   ContainerRequest,
//   PluginConfig,
// } from "../../../../src";
// import {
//   Constants,
//   CosmosClient,
//   PatchOperationType,
//   CosmosDbDiagnosticLevel,
//   PluginOn,
//   StatusCodes,
//   ErrorResponse,
//   ResourceType,
//   BulkOperations,
// } from "../../../../src";
// import type { CosmosDiagnosticsTestSpec } from "../../common/TestHelpers";
// import {
//   addEntropy,
//   getTestContainer,
//   removeAllDatabases,
//   validateDiagnostics,
// } from "../../common/TestHelpers";
// import { BulkOperationType } from "../../../../src";
// import type { PartitionKey } from "../../../../src/documents";
// import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../../src/documents";
// import { endpoint } from "../../common/_testConfig";
// import { masterKey } from "../../common/_fakeTestSecrets";
// import type { Response } from "../../../../src/request/Response";
// import type { ItemOperation } from "../../../../src/bulk/ItemOperation";
// import { calculateObjectSizeInBytes } from "../../../../src/utils/batch";
// import { randomUUID } from "@azure/core-util";
// import { getCurrentTimestampInMs } from "../../../../src/utils/time";

// const operationSkeleton = {
//   operationType: BulkOperationType.Create,
//   resourceBody: {
//     value: "",
//     id: "",
//     partitionKey: "",
//   },
// };

// const constantSize = calculateObjectSizeInBytes(operationSkeleton);

// function generateItemOperationOfSize(
//   sizeInBytes: number,
//   id: string,
//   partitionKey: PartitionKey,
// ): ItemOperation {
//   if (sizeInBytes < constantSize) {
//     throw new Error(`Not possible to generate operation of size less than ${constantSize}`);
//   }
//   let sizeToAdd = sizeInBytes - constantSize;
//   if (partitionKey !== undefined) {
//     sizeToAdd -= calculateObjectSizeInBytes({ partitionKey }) + calculateObjectSizeInBytes({});
//     sizeToAdd -= calculateObjectSizeInBytes({ id });
//   }
//   return BulkOperations.getCreateItemOperation(partitionKey, {
//     id: id,
//     value: new Array(sizeToAdd + 1).join("a"),
//     key: partitionKey,
//   });
// }
// async function getSplitContainer(): Promise<Container> {
//   let numpkRangeRequests = 0;
//   const plugins: PluginConfig[] = [
//     {
//       on: PluginOn.request,
//       plugin: async (context, _diagNode, next) => {
//         if (context.resourceType === ResourceType.pkranges) {
//           let response: Response<any>;
//           if (numpkRangeRequests === 0) {
//             response = {
//               headers: {},
//               result: {
//                 PartitionKeyRanges: [
//                   {
//                     _rid: "RRsbAKHytdECAAAAAAAAUA==",
//                     id: "1",
//                     _etag: '"00000000-0000-0000-683c-819a242201db"',
//                     minInclusive: "",
//                     maxExclusive: "FF",
//                   },
//                 ],
//               },
//             };
//             response.code = 200;
//             numpkRangeRequests++;
//             return response;
//           }
//           numpkRangeRequests++;
//         }
//         const res = await next(context);
//         return res;
//       },
//     },
//   ];

//   const client = new CosmosClient({
//     key: masterKey,
//     endpoint,
//     diagnosticLevel: CosmosDbDiagnosticLevel.debug,
//     plugins,
//   });
//   const splitContainer = await getTestContainer("split container", client, {
//     partitionKey: { paths: ["/key"] },
//   });
//   return splitContainer;
// }

// describe("BulkHelper", async function () {
//   describe("v1 container", async function () {
//     describe("multi partition container", async function () {
//       let container: Container;
//       let readItemId: string;
//       let replaceItemId: string;
//       let deleteItemId: string;
//       let patchItemId: string;
//       before(async function () {
//         await removeAllDatabases();
//         container = await getTestContainer("bulk container", undefined, {
//           partitionKey: {
//             paths: ["/key"],
//             version: undefined,
//           },
//           throughput: 25100,
//         });
//       });
//       after(async () => {
//         if (container) {
//           await container.database.delete();
//         }
//       });

//       it("handles bulk CRUD operations with BulkOperations utility class", async function () {
//         readItemId = addEntropy("item1");
//         await container.items.create({
//           id: readItemId,
//           key: "A",
//           class: "2010",
//         });
//         deleteItemId = addEntropy("item2");
//         await container.items.create({
//           id: deleteItemId,
//           key: "A",
//           class: "2010",
//         });
//         replaceItemId = addEntropy("item3");
//         await container.items.create({
//           id: replaceItemId,
//           key: 5,
//           class: "2010",
//         });
//         patchItemId = addEntropy("item4");
//         await container.items.create({
//           id: patchItemId,
//           key: 5,
//           class: "2010",
//         });
//         const createOperation = BulkOperations.getCreateItemOperation("A", {
//           id: addEntropy("doc1"),
//           name: "sample",
//           key: "A",
//         });
//         const upsertOperation = BulkOperations.getUpsertItemOperation("A", {
//           id: addEntropy("doc2"),
//           name: "other",
//           key: "A",
//         });
//         const readOperation = BulkOperations.getReadItemOperation(readItemId, "A");
//         const deleteOperation = BulkOperations.getDeleteItemOperation(deleteItemId, "A");
//         const replaceOperation = BulkOperations.getReplaceItemOperation(replaceItemId, 5, {
//           id: replaceItemId,
//           name: "nice",
//           key: 5,
//         });
//         const patchOperation = BulkOperations.getPatchItemOperation(patchItemId, 5, {
//           operations: [{ op: PatchOperationType.add, path: "/great", value: "goodValue" }],
//         });

//         const operations: ItemOperation[] = [
//           createOperation,
//           upsertOperation,
//           readOperation,
//           deleteOperation,
//           replaceOperation,
//           patchOperation,
//         ];
//         const bulkHelper = container.items.getBulkHelper();
//         const promises = bulkHelper.execute(operations);
//         const response = await Promise.all(promises);
//         bulkHelper.dispose();
//         assert.equal(response.length, 6);
//         // verify diagnostics
//         response.forEach((res, index) => {
//           assert.ok(res.diagnostics, `Diagnostics should be present for operation ${index}`);
//         });
//         // Create
//         assert.equal(response[0].resourceBody.name, "sample");
//         assert.equal(response[0].statusCode, 201);
//         // Upsert
//         assert.equal(response[1].resourceBody.name, "other");
//         assert.equal(response[1].statusCode, 201);
//         // Read
//         assert.equal(response[2].resourceBody.class, "2010");
//         assert.equal(response[2].statusCode, 200);
//         // Delete
//         assert.equal(response[3].statusCode, 204);
//         // Replace
//         assert.equal(response[4].resourceBody.name, "nice");
//         assert.equal(response[4].statusCode, 200);
//         // Patch
//         assert.equal(response[5].resourceBody.great, "goodValue");
//         assert.equal(response[5].statusCode, 200);
//       });
//       it("test diagnostics for bulk streamer", async function () {
//         const newContainer = await getTestContainer("bulk container for diagnostics", undefined, {
//           partitionKey: {
//             paths: ["/key"],
//             version: undefined,
//           },
//           throughput: 12000,
//         });
//         const operations = [
//           BulkOperations.getCreateItemOperation("A", {
//             id: addEntropy("doc1"),
//             name: "sample",
//             key: "A",
//           }),
//           BulkOperations.getUpsertItemOperation("A", {
//             id: addEntropy("doc2"),
//             name: "other",
//             key: "A",
//           }),
//           BulkOperations.getReadItemOperation("A", "A"),
//           BulkOperations.getDeleteItemOperation("A", "A"),
//           BulkOperations.getReplaceItemOperation("A", 5, {
//             id: "A",
//             name: "nice",
//             key: 5,
//           }),
//         ];
//         const startTimestamp = getCurrentTimestampInMs();
//         const bulkHelper = newContainer.items.getBulkHelper();
//         const promises = bulkHelper.execute(operations);
//         const response = await Promise.all(promises);
//         bulkHelper.dispose();
//         const spec: CosmosDiagnosticsTestSpec = {
//           requestStartTimeUTCInMsLowerLimit: startTimestamp,
//           requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
//           retryCount: 0,
//           locationEndpointsContacted: 1,
//           gatewayStatisticsTestSpec: [{}],
//         };
//         response.forEach((res, index) => {
//           assert.ok(res.diagnostics, `Diagnostics should be present for operation ${index}`);
//           validateDiagnostics(res.diagnostics, spec, true);
//         });
//         await newContainer.database.delete();
//       });

//       it("handle different batch sizes", async function () {
//         container = await getTestContainer("bulk container", undefined, {
//           partitionKey: { paths: ["/key"], version: 2 },
//           throughput: 25100,
//         });
//         const cases = [
//           // cumulative size of all operations is less than threshold
//           { count: 10, size: 200 },
//           // cumulative size is 5x greater than threshold
//           { count: 10, size: Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2) },
//           // cumulative size is 50x greater than  threshold
//           { count: 100, size: Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2) },
//         ];

//         for (const testCase of cases) {
//           const operations: ItemOperation[] = Array.from({ length: testCase.count }, () =>
//             generateItemOperationOfSize(testCase.size, randomUUID(), "key_value"),
//           );
//           let bulkHelper = container.items.getBulkHelper();
//           let executionPromises = bulkHelper.execute(operations);
//           let response = await Promise.all(executionPromises);
//           bulkHelper.dispose();

//           assert.equal(response.length, testCase.count);
//           response.forEach((res) => assert.strictEqual(res.statusCode, 201));

//           // surfaces 413 error if individual operation is greater than threshold
//           const operation: ItemOperation = generateItemOperationOfSize(
//             Constants.DefaultMaxBulkRequestBodySizeInBytes * 10,
//             randomUUID(),
//             "key_value",
//           );
//           bulkHelper = container.items.getBulkHelper();
//           executionPromises = bulkHelper.execute([operation]);
//           response = await Promise.all(executionPromises);
//           bulkHelper.dispose();
//           assert.equal(response.length, 1);
//           assert.strictEqual(response[0].statusCode, StatusCodes.RequestEntityTooLarge);
//         }
//       });
//     });
//     describe("single partition container", async function () {
//       let container: Container;
//       let deleteItemId: string;
//       let readItemId: string;
//       let replaceItemId: string;
//       before(async function () {
//         await removeAllDatabases();
//         container = await getTestContainer("bulk container");
//         deleteItemId = addEntropy("item2");
//         readItemId = addEntropy("item2");
//         replaceItemId = addEntropy("item2");
//         await container.items.create({
//           id: deleteItemId,
//           key: "A",
//           class: "2010",
//         });
//         await container.items.create({
//           id: readItemId,
//           key: "B",
//           class: "2010",
//         });
//       });

//       after(async () => {
//         if (container) {
//           await container.database.delete();
//         }
//       });

//       it("container handles Create, Read, Upsert, Delete opertion with partition split", async function () {
//         const operations = [
//           BulkOperations.getCreateItemOperation("A", {
//             id: addEntropy("doc1"),
//             name: "sample",
//             key: "A",
//           }),
//           BulkOperations.getReadItemOperation(readItemId, "A"),
//           BulkOperations.getDeleteItemOperation(deleteItemId, "A"),
//           BulkOperations.getReplaceItemOperation(replaceItemId, 5, {
//             id: replaceItemId,
//             name: "nice",
//             key: 5,
//           }),
//         ];
//         const splitContainer = await getSplitContainer();
//         await splitContainer.items.create({
//           id: deleteItemId,
//           key: "A",
//           class: "2010",
//         });
//         await splitContainer.items.create({
//           id: readItemId,
//           key: "A",
//           class: "2010",
//         });
//         await splitContainer.items.create({
//           id: replaceItemId,
//           key: 5,
//           class: "2010",
//         });

//         const bulkHelper = splitContainer.items.getBulkHelper();
//         const executionPromises = bulkHelper.execute(operations);
//         const response = await Promise.all(executionPromises);
//         bulkHelper.dispose();
//         assert.equal(response.length, 4);

//         // Create
//         assert.equal(response[0].resourceBody.name, "sample");
//         assert.equal(response[0].statusCode, 201);
//         // Read
//         assert.equal(response[1].resourceBody.class, "2010");
//         assert.equal(response[1].statusCode, 200);
//         // Delete
//         assert.equal(response[2].statusCode, 204);
//         // Replace
//         assert.equal(response[3].resourceBody.name, "nice");
//         assert.equal(response[3].statusCode, 200);

//         // cleanup
//         if (splitContainer) {
//           await splitContainer.database.delete();
//         }
//       });
//     });
//   });
//   describe("v2 container", function () {
//     describe("multi partition container", async function () {
//       let readItemId: string;
//       let replaceItemId: string;
//       let patchItemId: string;
//       let deleteItemId: string;
//       type BulkTestItem = {
//         id: string;
//         key: any;
//         key2?: any;
//         key3?: any;
//         class?: string;
//       };
//       type BulkTestDataSet = {
//         dbName: string;
//         containerRequest: ContainerRequest;
//         documentToCreate: BulkTestItem[];
//         operations: {
//           description?: string;
//           operation: ItemOperation;
//           expectedOutput?: {
//             description?: string;
//             statusCode: number;
//             propertysToMatch: {
//               name: string;
//               value: any;
//             }[];
//           };
//         }[];
//       };
//       const defaultBulkTestDataSet: BulkTestDataSet = {
//         dbName: "bulkTestDB",
//         containerRequest: {
//           id: "bulkContainer",
//           partitionKey: {
//             paths: ["/key"],
//             version: 2,
//           },
//           throughput: 25100,
//         },
//         documentToCreate: [],
//         operations: [],
//       };
//       async function runBulkTestDataSet(dataset: BulkTestDataSet) {
//         const client = new CosmosClient({
//           key: masterKey,
//           endpoint,
//           diagnosticLevel: CosmosDbDiagnosticLevel.debug,
//         });
//         const db = await client.databases.createIfNotExists({ id: dataset.dbName });
//         const database = db.database;
//         const { container } = await database.containers.createIfNotExists(dataset.containerRequest);
//         try {
//           for (const doc of dataset.documentToCreate) {
//             await container.items.create(doc);
//           }
//           const bulkHelper = container.items.getBulkHelper({});
//           const promises: Promise<BulkOperationResult>[] = [];
//           dataset.operations.forEach((operation) =>
//             promises.push(...bulkHelper.execute([operation.operation])),
//           );
//           const response = await Promise.all(promises);
//           bulkHelper.dispose();
//           dataset.operations.forEach(({ description, expectedOutput }, index) => {
//             if (expectedOutput) {
//               assert.strictEqual(
//                 response[index].statusCode,
//                 expectedOutput.statusCode,
//                 `Failed during - ${description}`,
//               );
//               expectedOutput.propertysToMatch.forEach(({ name, value }) => {
//                 assert.strictEqual(
//                   response[index].resourceBody[name],
//                   value,
//                   `Failed during - ${description}`,
//                 );
//               });
//             }
//           });
//         } finally {
//           await database.delete();
//         }
//       }
//       function createBulkOperationExpectedOutput(
//         statusCode: number,
//         propertysToMatch: { name: string; value: any }[],
//       ): {
//         statusCode: number;
//         propertysToMatch: {
//           name: string;
//           value: any;
//         }[];
//       } {
//         return {
//           statusCode,
//           propertysToMatch,
//         };
//       }
//       describe("handles create, upsert, patch, replace, delete", async function () {
//         it("Hierarchical Partitions with two keys", async function () {
//           readItemId = addEntropy("item1");
//           const createItemWithBooleanPartitionKeyId = addEntropy(
//             "createItemWithBooleanPartitionKeyId",
//           );
//           const createItemWithStringPartitionKeyId = addEntropy(
//             "createItemWithStringPartitionKeyId",
//           );
//           const createItemWithNumberPartitionKeyId = addEntropy(
//             "createItemWithNumberPartitionKeyId",
//           );
//           replaceItemId = addEntropy("item3");
//           patchItemId = addEntropy("item4");
//           deleteItemId = addEntropy("item2");
//           const dataset: BulkTestDataSet = {
//             dbName: "hierarchical partition bulk 2 keys",
//             containerRequest: {
//               id: "patchContainer",
//               partitionKey: {
//                 paths: ["/key", "/key2"],
//                 version: PartitionKeyDefinitionVersion.V2,
//                 kind: PartitionKeyKind.MultiHash,
//               },
//               throughput: 25100,
//             },
//             documentToCreate: [
//               { id: readItemId, key: true, key2: true, class: "2010" },
//               { id: createItemWithBooleanPartitionKeyId, key: true, key2: false, class: "2010" },
//               { id: createItemWithNumberPartitionKeyId, key: 0, key2: 3, class: "2010" },
//               { id: createItemWithStringPartitionKeyId, key: 5, key2: {}, class: "2010" },
//               { id: deleteItemId, key: {}, key2: {}, class: "2011" },
//               { id: replaceItemId, key: 5, key2: 5, class: "2012" },
//               { id: patchItemId, key: 5, key2: 5, class: "2019" },
//             ],
//             operations: [
//               {
//                 description: "Read document with partitionKey containing booleans values.",
//                 operation: BulkOperations.getReadItemOperation(
//                   createItemWithBooleanPartitionKeyId,
//                   [true, false],
//                 ),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "class", value: "2010" },
//                 ]),
//               },
//               {
//                 description: "Read document with partitionKey containing Number values.",
//                 operation: BulkOperations.getReadItemOperation(
//                   createItemWithNumberPartitionKeyId,
//                   [0, 3],
//                 ),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "class", value: "2010" },
//                 ]),
//               },
//               {
//                 description: "Creating document with partitionKey containing 2 strings.",
//                 operation: BulkOperations.getCreateItemOperation(["A", "B"], {
//                   id: addEntropy("doc1"),
//                   name: "sample",
//                   key: "A",
//                   key2: "B",
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(201, [
//                   { name: "name", value: "sample" },
//                 ]),
//               },
//               {
//                 description: "Creating document with mismatching partition key.",
//                 operation: BulkOperations.getCreateItemOperation(["A", "V"], {
//                   id: addEntropy("doc1"),
//                   name: "sample",
//                   key: "A",
//                   key2: "B",
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(400, []),
//               },
//               {
//                 description: "Upsert document with partitionKey containing 2 strings.",
//                 operation: BulkOperations.getUpsertItemOperation(["U", "V"], {
//                   id: addEntropy("doc1"),
//                   name: "other",
//                   key: "U",
//                   key2: "V",
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(201, [
//                   { name: "name", value: "other" },
//                 ]),
//               },
//               {
//                 description: "Read document with partitionKey containing 2 booleans.",
//                 operation: BulkOperations.getReadItemOperation(readItemId, [true, true]),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "class", value: "2010" },
//                 ]),
//               },
//               {
//                 description: "Replace document with partition key.",
//                 operation: BulkOperations.getReplaceItemOperation(replaceItemId, [5, 5], {
//                   id: replaceItemId,
//                   name: "nice",
//                   key: 5,
//                   key2: 5,
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "name", value: "nice" },
//                 ]),
//               },
//               {
//                 description: "Patch document with partitionKey containing 2 Numbers.",
//                 operation: BulkOperations.getPatchItemOperation(patchItemId, [5, 5], {
//                   operations: [{ op: PatchOperationType.add, path: "/great", value: "goodValue" }],
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "great", value: "goodValue" },
//                 ]),
//               },
//               {
//                 description: "Conditional Patch document with partitionKey containing 2 Numbers.",
//                 operation: BulkOperations.getPatchItemOperation(patchItemId, [5, 5], {
//                   operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
//                   condition: "from c where NOT IS_DEFINED(c.newImproved)",
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(200, []),
//               },
//             ],
//           };
//           await runBulkTestDataSet(dataset);
//         });
//         it("Hierarchical Partitions with three keys", async function () {
//           readItemId = addEntropy("item1");
//           const createItemWithBooleanPartitionKeyId = addEntropy(
//             "createItemWithBooleanPartitionKeyId",
//           );
//           const createItemWithStringPartitionKeyId = addEntropy(
//             "createItemWithStringPartitionKeyId",
//           );
//           const createItemWithUnknownPartitionKeyId = addEntropy(
//             "createItemWithUnknownPartitionKeyId",
//           );
//           const createItemWithNumberPartitionKeyId = addEntropy(
//             "createItemWithNumberPartitionKeyId",
//           );
//           replaceItemId = addEntropy("item3");
//           patchItemId = addEntropy("item4");
//           deleteItemId = addEntropy("item2");
//           const dataset: BulkTestDataSet = {
//             dbName: "hierarchical partition bulk 3 keys",
//             containerRequest: {
//               id: "patchContainer",
//               partitionKey: {
//                 paths: ["/key", "/key2", "/key3"],
//                 version: PartitionKeyDefinitionVersion.V2,
//                 kind: PartitionKeyKind.MultiHash,
//               },
//               throughput: 25100,
//             },
//             documentToCreate: [
//               { id: readItemId, key: true, key2: true, key3: true, class: "2010" },
//               {
//                 id: createItemWithBooleanPartitionKeyId,
//                 key: true,
//                 key2: false,
//                 key3: true,
//                 class: "2010",
//               },
//               {
//                 id: createItemWithUnknownPartitionKeyId,
//                 key: {},
//                 key2: {},
//                 key3: {},
//                 class: "2010",
//               },
//               { id: createItemWithNumberPartitionKeyId, key: 0, key2: 3, key3: 5, class: "2010" },
//               {
//                 id: createItemWithStringPartitionKeyId,
//                 key: 5,
//                 key2: {},
//                 key3: "adsf",
//                 class: "2010",
//               },
//               { id: deleteItemId, key: {}, key2: {}, key3: {}, class: "2011" },
//               { id: replaceItemId, key: 5, key2: 5, key3: "T", class: "2012" },
//               { id: patchItemId, key: 5, key2: 5, key3: true, class: "2019" },
//             ],
//             operations: [
//               {
//                 description: "Read document with partitionKey containing booleans values.",
//                 operation: BulkOperations.getReadItemOperation(
//                   createItemWithBooleanPartitionKeyId,
//                   [true, false, true],
//                 ),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "class", value: "2010" },
//                 ]),
//               },
//               {
//                 description: "Read document with partitionKey containing Number values.",
//                 operation: BulkOperations.getReadItemOperation(
//                   createItemWithNumberPartitionKeyId,
//                   [0, 3, 5],
//                 ),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "class", value: "2010" },
//                 ]),
//               },
//               {
//                 description: "Creating document with partitionKey containing 2 strings.",
//                 operation: BulkOperations.getCreateItemOperation(["A", "B", "C"], {
//                   id: addEntropy("doc1"),
//                   name: "sample",
//                   key: "A",
//                   key2: "B",
//                   key3: "C",
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(201, [
//                   { name: "name", value: "sample" },
//                 ]),
//               },
//               {
//                 description: "Creating document with mismatching partition key.",
//                 operation: BulkOperations.getCreateItemOperation(["A", "V", true], {
//                   id: addEntropy("doc1"),
//                   name: "sample",
//                   key: "A",
//                   key2: "B",
//                   key3: true,
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(400, []),
//               },
//               {
//                 description: "Upsert document with partitionKey containing 3 strings.",
//                 operation: BulkOperations.getUpsertItemOperation(["U", "V", 5], {
//                   id: addEntropy("doc1"),
//                   name: "other",
//                   key: "U",
//                   key2: "V",
//                   key3: 5,
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(201, [
//                   { name: "name", value: "other" },
//                 ]),
//               },
//               {
//                 description: "Read document with partitionKey containing 3 booleans.",
//                 operation: BulkOperations.getReadItemOperation(readItemId, [true, true, true]),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "class", value: "2010" },
//                 ]),
//               },
//               {
//                 description: "Replace document with partition key.",
//                 operation: BulkOperations.getReplaceItemOperation(replaceItemId, [5, 5, "T"], {
//                   id: replaceItemId,
//                   name: "nice",
//                   key: 5,
//                   key2: 5,
//                   key3: "T",
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "name", value: "nice" },
//                 ]),
//               },
//               {
//                 description: "Patch document with partitionKey containing 2 Numbers.",
//                 operation: BulkOperations.getPatchItemOperation(patchItemId, [5, 5, true], {
//                   operations: [{ op: PatchOperationType.add, path: "/great", value: "goodValue" }],
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(200, [
//                   { name: "great", value: "goodValue" },
//                 ]),
//               },
//               {
//                 description: "Conditional Patch document with partitionKey containing 2 Numbers.",
//                 operation: BulkOperations.getPatchItemOperation(patchItemId, [5, 5, true], {
//                   operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
//                   condition: "from c where NOT IS_DEFINED(c.newImproved)",
//                 }),
//                 expectedOutput: createBulkOperationExpectedOutput(200, []),
//               },
//             ],
//           };
//           await runBulkTestDataSet(dataset);
//         });
//       });
//       it("Continues after errors with default value of continueOnError true", async function () {
//         const dataset: BulkTestDataSet = {
//           ...defaultBulkTestDataSet,
//           dbName: addEntropy("continueOnError"),
//           documentToCreate: [],
//           operations: [
//             {
//               description: "Operation should fail with invalid ttl.",
//               operation: BulkOperations.getCreateItemOperation("A", {
//                 id: addEntropy("doc1"),
//                 key: "A",
//                 ttl: -10,
//               }),
//               expectedOutput: createBulkOperationExpectedOutput(400, []),
//             },
//             {
//               description:
//                 "Operation should suceed and should not be abondoned because of previous failure, since continueOnError is true.",
//               operation: BulkOperations.getCreateItemOperation("A", {
//                 id: addEntropy("doc2"),
//                 key: "A",
//               }),
//               expectedOutput: createBulkOperationExpectedOutput(201, []),
//             },
//           ],
//         };
//         await runBulkTestDataSet(dataset);
//       });
//       it("handles throttling", async function () {
//         let responseIndex = 0;
//         const plugins: PluginConfig[] = [
//           {
//             on: PluginOn.request,
//             plugin: async (context, _diagNode, next) => {
//               if (context.operationType === "batch" && responseIndex < 1) {
//                 const error = new ErrorResponse();
//                 error.code = StatusCodes.TooManyRequests;
//                 error.headers = {
//                   "x-ms-retry-after-ms": 100,
//                 };
//                 responseIndex++;
//                 throw error;
//               }
//               const res = await next(context);
//               return res;
//             },
//           },
//         ];
//         const client = new CosmosClient({
//           key: masterKey,
//           endpoint,
//           plugins,
//         });
//         const testcontainer = await getTestContainer("throttling container", client, {
//           partitionKey: {
//             paths: ["/key"],
//             version: 2,
//           },
//           throughput: 400,
//         });
//         const operations: ItemOperation[] = Array.from({ length: 10 }, (_, i) => {
//           return BulkOperations.getCreateItemOperation(i, {
//             id: addEntropy("doc" + i),
//             key: i,
//             class: "2010",
//           });
//         });
//         const bulkHelper = testcontainer.items.getBulkHelper();
//         const executionPromises = bulkHelper.execute(operations);
//         const response = await Promise.all(executionPromises);
//         bulkHelper.dispose();
//         assert.strictEqual(response.length, 10);
//         response.forEach((res, index) => {
//           assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`);
//         });
//         await testcontainer.database.delete();
//       });
//       it("returns final response in order", async function () {
//         const testcontainer = await getTestContainer("final response order container", undefined, {
//           partitionKey: {
//             paths: ["/key"],
//             version: 2,
//           },
//           throughput: 25100,
//         });
//         const operations: ItemOperation[] = Array.from({ length: 10 }, (_, i) => {
//           return BulkOperations.getCreateItemOperation(i, {
//             id: addEntropy("doc" + i),
//             key: i,
//             class: "2010",
//           });
//         });

//         const bulkHelper = testcontainer.items.getBulkHelper();
//         const executionPromises = bulkHelper.execute(operations);
//         const response = await Promise.all(executionPromises);
//         bulkHelper.dispose();
//         const expectedOrder = operations
//           .filter((op) => "id" in op.resourceBody)
//           .map((op) => (op.resourceBody as any).id);
//         const actualOrder = response.map((res) => res.resourceBody.id);
//         assert.deepStrictEqual(actualOrder, expectedOrder);
//         await testcontainer.database.delete();
//       });
//     });
//     describe("multi partition container - nested partition key", async function () {
//       let container: Container;
//       let createItemId: string;
//       let upsertItemId: string;
//       before(async function () {
//         await removeAllDatabases();
//         container = await getTestContainer("bulk container", undefined, {
//           partitionKey: {
//             paths: ["/nested/key"],
//             version: 2,
//           },
//           throughput: 25100,
//         });
//         createItemId = addEntropy("createItem");
//         upsertItemId = addEntropy("upsertItem");
//       });
//       after(async () => {
//         if (container) {
//           await container.database.delete();
//         }
//       });
//       it("creates an item with nested object partition key", async function () {
//         const operations = [
//           BulkOperations.getCreateItemOperation("A", { id: createItemId, nested: { key: "A" } }),
//           BulkOperations.getUpsertItemOperation("A", { id: upsertItemId, nested: { key: false } }),
//         ];
//         const bulkHelper = container.items.getBulkHelper();
//         const executionPromises = bulkHelper.execute(operations);
//         const createResponse = await Promise.all(executionPromises);
//         bulkHelper.dispose();
//         assert.equal(createResponse[0].statusCode, 201);
//       });
//     });
//     describe("multi partitioned container with many items handle partition split", async function () {
//       let container: Container;
//       before(async function () {
//         let numpkRangeRequests = 0;
//         const plugins: PluginConfig[] = [
//           {
//             on: PluginOn.request,
//             plugin: async (context, _diagNode, next) => {
//               if (context.resourceType === ResourceType.pkranges) {
//                 let response: Response<any>;
//                 if (numpkRangeRequests === 0) {
//                   response = {
//                     headers: {},
//                     result: {
//                       PartitionKeyRanges: [
//                         {
//                           _rid: "RRsbAKHytdECAAAAAAAAUA==",
//                           id: "7",
//                           _etag: '"00000000-0000-0000-683c-819a242201db"',
//                           minInclusive: "",
//                           maxExclusive: "FF",
//                         },
//                       ],
//                     },
//                   };
//                   response.code = 200;
//                   numpkRangeRequests++;
//                   return response;
//                 }
//                 numpkRangeRequests++;
//               }
//               const res = await next(context);
//               return res;
//             },
//           },
//         ];
//         const client = new CosmosClient({
//           key: masterKey,
//           endpoint,
//           diagnosticLevel: CosmosDbDiagnosticLevel.debug,
//           plugins,
//         });
//         await removeAllDatabases();
//         container = await getTestContainer("bulk split container", client, {
//           partitionKey: {
//             paths: ["/key"],
//             version: 2,
//           },
//           throughput: 25100,
//         });
//         for (let i = 0; i < 300; i++) {
//           await container.items.create({
//             id: "item" + i,
//             key: i,
//             class: "2010",
//           });
//         }
//       });
//       it("check partition splits during bulk", async function () {
//         const operations: ItemOperation[] = [];
//         for (let i = 0; i < 300; i++) {
//           operations.push(BulkOperations.getReadItemOperation("item" + i, i));
//         }

//         const bulkHelper = container.items.getBulkHelper();
//         const executionResults = bulkHelper.execute(operations);
//         const executionPromises = Array.isArray(executionResults)
//           ? executionResults
//           : [executionResults];
//         const response = await Promise.all(executionPromises);
//         bulkHelper.dispose();
//         response.forEach((res, index) => {
//           assert.strictEqual(res.statusCode, 200, `Status should be 200 for operation ${index}`);
//           assert.strictEqual(res.resourceBody.id, "item" + index, "Read Items id should match");
//         });
//         // Delete database after use
//         if (container) {
//           await container.database.delete();
//         }
//       });
//     });
//   });
// });
