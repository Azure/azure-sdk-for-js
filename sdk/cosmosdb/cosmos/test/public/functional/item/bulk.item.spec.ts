// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import {
  Constants,
  BulkOptions,
  Container,
  ContainerRequest,
  CosmosClient,
  OperationResponse,
  PatchOperationType,
  CosmosDbDiagnosticLevel,
  PluginConfig,
  PluginOn,
  StatusCodes,
  ErrorResponse,
} from "../../../../src";
import { addEntropy, getTestContainer, testForDiagnostics } from "../../common/TestHelpers";
import { BulkOperationType, OperationInput } from "../../../../src";
import { generateOperationOfSize } from "../../../internal/unit/utils/batch.spec";
import {
  PartitionKey,
  PartitionKeyDefinitionVersion,
  PartitionKeyKind,
} from "../../../../src/documents";
import { endpoint } from "../../common/_testConfig";
import { masterKey } from "../../common/_fakeTestSecrets";
import { getCurrentTimestampInMs } from "../../../../src/utils/time";
import { SubStatusCodes } from "../../../../src/common";

describe("test bulk operations", async function () {
  describe("Check size based splitting of batches", function () {
    let container: Container;
    before(async function () {
      container = await getTestContainer("bulk container", undefined, {
        partitionKey: {
          paths: ["/key"],
          version: undefined,
        },
        throughput: 5000,
      });
    });
    after(async () => {
      await container.database.delete();
    });
    it("Check case when cumulative size of all operations is less than threshold", async function () {
      const operations: OperationInput[] = [...Array(10).keys()].map(
        () =>
          ({
            ...generateOperationOfSize(100, { partitionKey: "key_value" }, { key: "key_value" }),
          }) as any,
      );
      const response = await container.items.bulk(operations);
      // Create
      response.forEach((res, index) =>
        assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`),
      );
    });
    it("Check case when cumulative size of all operations is greater than threshold - payload size is 5x threshold", async function () {
      const operations: OperationInput[] = [...Array(10).keys()].map(
        () =>
          ({
            ...generateOperationOfSize(
              Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2),
            ),
            partitionKey: {},
          }) as any,
      );
      const response = await container.items.bulk(operations);
      // Create
      response.forEach((res, index) =>
        assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`),
      );
    });
    it("Check case when cumulative size of all operations is greater than threshold - payload size is 25x threshold", async function () {
      const operations: OperationInput[] = [...Array(50).keys()].map(
        () =>
          ({
            ...generateOperationOfSize(
              Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2),
              {},
              { key: "key_value" },
            ),
          }) as any,
      );
      const response = await container.items.bulk(operations);
      // Create
      response.forEach((res, index) =>
        assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`),
      );
    });
  });
  describe("v1 container", async function () {
    describe("multi partition container", async function () {
      let container: Container;
      let readItemId: string;
      let replaceItemId: string;
      let deleteItemId: string;
      before(async function () {
        container = await getTestContainer("bulk container", undefined, {
          partitionKey: {
            paths: ["/key"],
            version: undefined,
          },
          throughput: 25100,
        });
        readItemId = addEntropy("item1");
        await container.items.create({
          id: readItemId,
          key: "A",
          class: "2010",
        });
        deleteItemId = addEntropy("item2");
        await container.items.create({
          id: deleteItemId,
          key: "A",
          class: "2010",
        });
        replaceItemId = addEntropy("item3");
        await container.items.create({
          id: replaceItemId,
          key: 5,
          class: "2010",
        });
      });
      after(async () => {
        await container.database.delete();
      });
      it("multi partition container handles create, upsert, replace, delete", async function () {
        const operations = [
          {
            operationType: BulkOperationType.Create,
            resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
          },
          {
            operationType: BulkOperationType.Upsert,
            partitionKey: "A",
            resourceBody: { id: addEntropy("doc2"), name: "other", key: "A" },
          },
          {
            operationType: BulkOperationType.Read,
            id: readItemId,
            partitionKey: "A",
          },
          {
            operationType: BulkOperationType.Delete,
            id: deleteItemId,
            partitionKey: "A",
          },
          {
            operationType: BulkOperationType.Replace,
            partitionKey: 5,
            id: replaceItemId,
            resourceBody: { id: replaceItemId, name: "nice", key: 5 },
          },
        ];
        const response = await container.items.bulk(operations);
        // Create
        assert.equal(response[0].resourceBody.name, "sample");
        assert.equal(response[0].statusCode, 201);
        // Upsert
        assert.equal(response[1].resourceBody.name, "other");
        assert.equal(response[1].statusCode, 201);
        // Read
        assert.equal(response[2].resourceBody.class, "2010");
        assert.equal(response[2].statusCode, 200);
        // Delete
        assert.equal(response[3].statusCode, 204);
        // Replace
        assert.equal(response[4].resourceBody.name, "nice");
        assert.equal(response[4].statusCode, 200);
      });
      it("Check case when cumulative size of all operations is less than threshold", async function () {
        const operations: OperationInput[] = [...Array(10).keys()].map(
          () =>
            ({
              ...generateOperationOfSize(100, { partitionKey: "key_value" }, { key: "key_value" }),
            }) as any,
        );
        const response = await container.items.bulk(operations);
        // Create
        response.forEach((res, index) =>
          assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`),
        );
      });
      it("Check case when cumulative size of all operations is greater than threshold", async function () {
        const operations: OperationInput[] = [...Array(10).keys()].map(
          () =>
            ({
              ...generateOperationOfSize(
                Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2),
              ),
              partitionKey: {},
            }) as any,
        );
        const response = await container.items.bulk(operations);
        // Create
        response.forEach((res, index) =>
          assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`),
        );
      });
      it("Check case when cumulative size of all operations is greater than threshold", async function () {
        const operations: OperationInput[] = [...Array(50).keys()].map(
          () =>
            ({
              ...generateOperationOfSize(
                Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2),
                {},
                { key: "key_value" },
              ),
            }) as any,
        );
        const response = await container.items.bulk(operations);
        // Create
        response.forEach((res, index) =>
          assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`),
        );
      });
    });
    describe("single partition container", async function () {
      let container: Container;
      let deleteItemId: string;
      let readItemId: string;
      let replaceItemId: string;
      before(async function () {
        container = await getTestContainer("bulk container");
        deleteItemId = addEntropy("item2");
        readItemId = addEntropy("item2");
        replaceItemId = addEntropy("item2");
        await container.items.create({
          id: deleteItemId,
          key: "A",
          class: "2010",
        });
        await container.items.create({
          id: readItemId,
          key: "B",
          class: "2010",
        });
      });
      it("deletes operation with default partition", async function () {
        const operation: OperationInput = {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
        };

        const deleteResponse = await container.items.bulk([operation]);
        assert.equal(deleteResponse[0].statusCode, 204);
      });
      it("read operation with default partition", async function () {
        const operation: OperationInput = {
          operationType: BulkOperationType.Read,
          id: readItemId,
        };

        const readResponse: OperationResponse[] = await container.items.bulk([operation]);
        assert.strictEqual(readResponse[0].statusCode, 200);
        assert.strictEqual(
          readResponse[0].resourceBody.id,
          readItemId,
          "Read Items id should match",
        );
      });
      it("create operation with default partition", async function () {
        const id = "testId";
        const createOp: OperationInput = {
          operationType: BulkOperationType.Create,
          resourceBody: {
            id: id,
            key: "B",
            class: "2010",
          },
        };
        const readOp: OperationInput = {
          operationType: BulkOperationType.Read,
          id: id,
        };

        const readResponse: OperationResponse[] = await container.items.bulk([createOp, readOp]);
        assert.strictEqual(readResponse[0].statusCode, 201);
        assert.strictEqual(readResponse[0].resourceBody.id, id, "Created item's id should match");
        assert.strictEqual(readResponse[1].statusCode, 200);
        assert.strictEqual(readResponse[1].resourceBody.id, id, "Read item's id should match");
      });
      it("read operation with partition split", async function () {
        // using plugins generate split response from backend
        const splitContainer = await getSplitContainer();
        await splitContainer.items.create({
          id: readItemId,
          key: "B",
          class: "2010",
        });
        const operation: OperationInput = {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: "B",
        };

        const readResponse: OperationResponse[] = await splitContainer.items.bulk([operation]);

        assert.strictEqual(readResponse[0].statusCode, 200);
        assert.strictEqual(
          readResponse[0].resourceBody.id,
          readItemId,
          "Read Items id should match",
        );
        // cleanup
        await splitContainer.database.delete();
      });

      it("container handles Create, Read, Upsert, Delete opertion with partition split", async function () {
        const operations = [
          {
            operationType: BulkOperationType.Create,
            resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
          },
          {
            operationType: BulkOperationType.Read,
            id: readItemId,
            partitionKey: "A",
          },
          {
            operationType: BulkOperationType.Delete,
            id: deleteItemId,
            partitionKey: "A",
          },
          {
            operationType: BulkOperationType.Replace,
            partitionKey: 5,
            id: replaceItemId,
            resourceBody: { id: replaceItemId, name: "nice", key: 5 },
          },
        ];
        const splitContainer = await getSplitContainer();
        await splitContainer.items.create({
          id: deleteItemId,
          key: "A",
          class: "2010",
        });
        await splitContainer.items.create({
          id: readItemId,
          key: "A",
          class: "2010",
        });
        await splitContainer.items.create({
          id: replaceItemId,
          key: 5,
          class: "2010",
        });

        const response = await splitContainer.items.bulk(operations);

        // Create
        assert.equal(response[0].resourceBody.name, "sample");
        assert.equal(response[0].statusCode, 201);
        // Read
        assert.equal(response[1].resourceBody.class, "2010");
        assert.equal(response[1].statusCode, 200);
        // Delete
        assert.equal(response[2].statusCode, 204);
        // Replace
        assert.equal(response[3].resourceBody.name, "nice");
        assert.equal(response[3].statusCode, 200);

        // cleanup
        await splitContainer.database.delete();
      });

      async function getSplitContainer(): Promise<Container> {
        let responseIndex = 0;
        const plugins: PluginConfig[] = [
          {
            on: PluginOn.request,
            plugin: async (context, _diagNode, next) => {
              if (context.operationType === "batch" && responseIndex < 1) {
                const error = new ErrorResponse();
                error.code = StatusCodes.Gone;
                error.substatus = SubStatusCodes.PartitionKeyRangeGone;
                responseIndex++;
                throw error;
              }
              const res = await next(context);
              return res;
            },
          },
        ];

        const client = new CosmosClient({
          key: masterKey,
          endpoint,
          diagnosticLevel: CosmosDbDiagnosticLevel.debug,
          plugins,
        });
        const splitContainer = await getTestContainer("split container", client, {
          partitionKey: { paths: ["/key"] },
        });
        return splitContainer;
      }
    });
  });
  describe("v2 container", function () {
    describe("multi partition container", async function () {
      let readItemId: string;
      let replaceItemId: string;
      let patchItemId: string;
      let deleteItemId: string;
      type BulkTestItem = {
        id: string;
        key: any;
        key2?: any;
        key3?: any;
        class?: string;
      };
      type BulkTestDataSet = {
        dbName: string;
        containerRequest: ContainerRequest;
        documentToCreate: BulkTestItem[];
        bulkOperationOptions: BulkOptions;
        operations: {
          description?: string;
          operation: OperationInput;
          expectedOutput?: {
            description?: string;
            statusCode: number;
            propertysToMatch: {
              name: string;
              value: any;
            }[];
          };
        }[];
      };
      const defaultBulkTestDataSet: BulkTestDataSet = {
        dbName: "bulkTestDB",
        bulkOperationOptions: {
          continueOnError: false,
        },
        containerRequest: {
          id: "patchContainer",
          partitionKey: {
            paths: ["/key"],
            version: 2,
          },
          throughput: 25100,
        },
        documentToCreate: [],
        operations: [],
      };
      async function runBulkTestDataSet(dataset: BulkTestDataSet) {
        const client = new CosmosClient({
          key: masterKey,
          endpoint,
          diagnosticLevel: CosmosDbDiagnosticLevel.debug,
        });
        const db = await client.databases.createIfNotExists({ id: dataset.dbName });
        const database = db.database;
        const { container } = await database.containers.createIfNotExists(dataset.containerRequest);
        try {
          for (const doc of dataset.documentToCreate) {
            await container.items.create(doc);
          }
          const response = await container.items.bulk(
            dataset.operations.map((value) => value.operation),
            dataset.bulkOperationOptions,
          );
          dataset.operations.forEach(({ description, expectedOutput }, index) => {
            if (expectedOutput) {
              assert.strictEqual(
                response[index].statusCode,
                expectedOutput.statusCode,
                `Failed during - ${description}`,
              );
              expectedOutput.propertysToMatch.forEach(({ name, value }) => {
                assert.strictEqual(
                  response[index].resourceBody[name],
                  value,
                  `Failed during - ${description}`,
                );
              });
            }
          });
        } finally {
          await database.delete();
        }
      }
      function createBulkOperation(
        operationType: any,
        partitionKeySpecifier?: { partitionKey?: PartitionKey },
        resourceBody?: any,
        id?: string,
      ): OperationInput {
        let op: OperationInput = {
          operationType,
          resourceBody,
          ...partitionKeySpecifier,
        };
        if (resourceBody !== undefined) op = { ...op, resourceBody };
        if (id !== undefined) op = { ...op, id } as any;
        return op;
      }
      function creatreBulkOperationExpectedOutput(
        statusCode: number,
        propertysToMatch: { name: string; value: any }[],
      ): {
        statusCode: number;
        propertysToMatch: {
          name: string;
          value: any;
        }[];
      } {
        return {
          statusCode,
          propertysToMatch,
        };
      }
      describe("handles create, upsert, patch, replace, delete", async function () {
        it("Hierarchical Partitions with two keys", async function () {
          readItemId = addEntropy("item1");
          const createItemWithBooleanPartitionKeyId = addEntropy(
            "createItemWithBooleanPartitionKeyId",
          );
          const createItemWithStringPartitionKeyId = addEntropy(
            "createItemWithStringPartitionKeyId",
          );
          const createItemWithUnknownPartitionKeyId = addEntropy(
            "createItemWithUnknownPartitionKeyId",
          );
          const createItemWithNumberPartitionKeyId = addEntropy(
            "createItemWithNumberPartitionKeyId",
          );
          replaceItemId = addEntropy("item3");
          patchItemId = addEntropy("item4");
          deleteItemId = addEntropy("item2");
          const dataset: BulkTestDataSet = {
            dbName: "hierarchical partition bulk 2 keys",
            containerRequest: {
              id: "patchContainer",
              partitionKey: {
                paths: ["/key", "/key2"],
                version: PartitionKeyDefinitionVersion.V2,
                kind: PartitionKeyKind.MultiHash,
              },
              throughput: 25100,
            },
            bulkOperationOptions: {
              continueOnError: true,
            },
            documentToCreate: [
              { id: readItemId, key: true, key2: true, class: "2010" },
              { id: createItemWithBooleanPartitionKeyId, key: true, key2: false, class: "2010" },
              {
                id: createItemWithUnknownPartitionKeyId,
                key: undefined,
                key2: {},
                class: "2010",
              },
              { id: createItemWithNumberPartitionKeyId, key: 0, key2: 3, class: "2010" },
              { id: createItemWithStringPartitionKeyId, key: 5, key2: {}, class: "2010" },
              { id: deleteItemId, key: {}, key2: {}, class: "2011" },
              { id: replaceItemId, key: 5, key2: 5, class: "2012" },
              { id: patchItemId, key: 5, key2: 5, class: "2019" },
            ],
            operations: [
              {
                description: "Read document with partitionKey containing booleans values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [true, false] },
                  undefined,
                  createItemWithBooleanPartitionKeyId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description: "Read document with partitionKey containing unknown values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [undefined, undefined] },
                  undefined,
                  createItemWithUnknownPartitionKeyId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description:
                  "Creating operation's partitionKey to undefined value should fail since internally it would map to [{},{}].",
                operation: createBulkOperation(
                  BulkOperationType.Create,
                  { partitionKey: undefined },
                  { id: addEntropy("doc10"), name: "sample", key: "A", key2: "B" },
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(400, []),
              },
              {
                description: "Read document with partitionKey containing Number values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [0, 3] },
                  undefined,
                  createItemWithNumberPartitionKeyId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description: "Creating document with partitionKey containing 2 strings.",
                operation: createBulkOperation(
                  BulkOperationType.Create,
                  { partitionKey: ["A", "B"] },
                  { id: addEntropy("doc1"), name: "sample", key: "A", key2: "B" },
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(201, [
                  { name: "name", value: "sample" },
                ]),
              },
              {
                description: "Creating document with mismatching partition key.",
                operation: createBulkOperation(
                  BulkOperationType.Create,
                  { partitionKey: ["A", "V"] },
                  { id: addEntropy("doc1"), name: "sample", key: "A", key2: "B" },
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(400, []),
              },
              {
                description: "Upsert document with partitionKey containing 2 strings.",
                operation: createBulkOperation(
                  BulkOperationType.Upsert,
                  { partitionKey: ["U", "V"] },
                  { name: "other", key: "U", key2: "V" },
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(201, [
                  { name: "name", value: "other" },
                ]),
              },
              {
                description: "Read document with partitionKey containing 2 booleans.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [true, true] },
                  undefined,
                  readItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description:
                  "Delete document with partitionKey containing 2 undefined partition keys.",
                operation: createBulkOperation(
                  BulkOperationType.Delete,
                  { partitionKey: [{}, {}] },
                  undefined,
                  deleteItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(204, []),
              },
              {
                description: "Replace document without specifying partition key.",
                operation: createBulkOperation(
                  BulkOperationType.Replace,
                  {},
                  { id: replaceItemId, name: "nice", key: 5, key2: 5 },
                  replaceItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "name", value: "nice" },
                ]),
              },
              {
                description: "Patch document with partitionKey containing 2 Numbers.",
                operation: createBulkOperation(
                  BulkOperationType.Patch,
                  { partitionKey: [5, 5] },
                  {
                    operations: [
                      { op: PatchOperationType.add, path: "/great", value: "goodValue" },
                    ],
                  },
                  patchItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "great", value: "goodValue" },
                ]),
              },
              {
                description: "Conditional Patch document with partitionKey containing 2 Numbers.",
                operation: createBulkOperation(
                  BulkOperationType.Patch,
                  { partitionKey: [5, 5] },
                  {
                    operations: [
                      { op: PatchOperationType.add, path: "/good", value: "greatValue" },
                    ],
                    condition: "from c where NOT IS_DEFINED(c.newImproved)",
                  },
                  patchItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, []),
              },
            ],
          };
          await runBulkTestDataSet(dataset);
        });
        it("Hierarchical Partitions with three keys", async function () {
          readItemId = addEntropy("item1");
          const createItemWithBooleanPartitionKeyId = addEntropy(
            "createItemWithBooleanPartitionKeyId",
          );
          const createItemWithStringPartitionKeyId = addEntropy(
            "createItemWithStringPartitionKeyId",
          );
          const createItemWithUnknownPartitionKeyId = addEntropy(
            "createItemWithUnknownPartitionKeyId",
          );
          const createItemWithNumberPartitionKeyId = addEntropy(
            "createItemWithNumberPartitionKeyId",
          );
          replaceItemId = addEntropy("item3");
          patchItemId = addEntropy("item4");
          deleteItemId = addEntropy("item2");
          const dataset: BulkTestDataSet = {
            dbName: "hierarchical partition bulk 3 keys",
            containerRequest: {
              id: "patchContainer",
              partitionKey: {
                paths: ["/key", "/key2", "/key3"],
                version: PartitionKeyDefinitionVersion.V2,
                kind: PartitionKeyKind.MultiHash,
              },
              throughput: 25100,
            },
            documentToCreate: [
              { id: readItemId, key: true, key2: true, key3: true, class: "2010" },
              {
                id: createItemWithBooleanPartitionKeyId,
                key: true,
                key2: false,
                key3: true,
                class: "2010",
              },
              {
                id: createItemWithUnknownPartitionKeyId,
                key: {},
                key2: {},
                key3: {},
                class: "2010",
              },
              { id: createItemWithNumberPartitionKeyId, key: 0, key2: 3, key3: 5, class: "2010" },
              {
                id: createItemWithStringPartitionKeyId,
                key: 5,
                key2: {},
                key3: "adsf",
                class: "2010",
              },
              { id: deleteItemId, key: {}, key2: {}, key3: {}, class: "2011" },
              { id: replaceItemId, key: 5, key2: 5, key3: "T", class: "2012" },
              { id: patchItemId, key: 5, key2: 5, key3: true, class: "2019" },
            ],
            bulkOperationOptions: {
              continueOnError: true,
            },
            operations: [
              {
                description: "Read document with partitionKey containing booleans values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [true, false, true] },
                  undefined,
                  createItemWithBooleanPartitionKeyId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description: "Read document with partitionKey containing unknown values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [{}, {}, {}] },
                  undefined,
                  createItemWithUnknownPartitionKeyId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description: "Read document with partitionKey containing Number values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [0, 3, 5] },
                  undefined,
                  createItemWithNumberPartitionKeyId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description: "Creating document with partitionKey containing 2 strings.",
                operation: createBulkOperation(
                  BulkOperationType.Create,
                  { partitionKey: ["A", "B", "C"] },
                  { id: addEntropy("doc1"), name: "sample", key: "A", key2: "B", key3: "C" },
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(201, [
                  { name: "name", value: "sample" },
                ]),
              },
              {
                description: "Creating document with mismatching partition key.",
                operation: createBulkOperation(
                  BulkOperationType.Create,
                  { partitionKey: ["A", "V", true] },
                  { id: addEntropy("doc1"), name: "sample", key: "A", key2: "B", key3: true },
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(400, []),
              },
              {
                description: "Upsert document with partitionKey containing 2 strings.",
                operation: createBulkOperation(
                  BulkOperationType.Upsert,
                  { partitionKey: ["U", "V", 5] },
                  { name: "other", key: "U", key2: "V", key3: 5 },
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(201, [
                  { name: "name", value: "other" },
                ]),
              },
              {
                description: "Read document with partitionKey containing 2 booleans.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [true, true, true] },
                  undefined,
                  readItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "class", value: "2010" },
                ]),
              },
              {
                description:
                  "Delete document with partitionKey containing 2 undefined partition keys.",
                operation: createBulkOperation(
                  BulkOperationType.Delete,
                  { partitionKey: [{}, {}, {}] },
                  undefined,
                  deleteItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(204, []),
              },
              {
                description: "Replace document without specifying partition key.",
                operation: createBulkOperation(
                  BulkOperationType.Replace,
                  {},
                  { id: replaceItemId, name: "nice", key: 5, key2: 5, key3: "T" },
                  replaceItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "name", value: "nice" },
                ]),
              },
              {
                description: "Patch document with partitionKey containing 2 Numbers.",
                operation: createBulkOperation(
                  BulkOperationType.Patch,
                  { partitionKey: [5, 5, true] },
                  {
                    operations: [
                      { op: PatchOperationType.add, path: "/great", value: "goodValue" },
                    ],
                  },
                  patchItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, [
                  { name: "great", value: "goodValue" },
                ]),
              },
              {
                description: "Conditional Patch document with partitionKey containing 2 Numbers.",
                operation: createBulkOperation(
                  BulkOperationType.Patch,
                  { partitionKey: [5, 5, true] },
                  {
                    operations: [
                      { op: PatchOperationType.add, path: "/good", value: "greatValue" },
                    ],
                    condition: "from c where NOT IS_DEFINED(c.newImproved)",
                  },
                  patchItemId,
                ),
                expectedOutput: creatreBulkOperationExpectedOutput(200, []),
              },
            ],
          };
          await runBulkTestDataSet(dataset);
        });
      });
      it("respects order", async function () {
        readItemId = addEntropy("item1");
        const dataset: BulkTestDataSet = {
          ...defaultBulkTestDataSet,
          dbName: addEntropy("respects order"),
          documentToCreate: [{ id: readItemId, key: "A", class: "2010" }],
          operations: [
            {
              description: "Delete for an existing item should suceed.",
              operation: createBulkOperation(
                BulkOperationType.Delete,
                { partitionKey: "A" },
                undefined,
                readItemId,
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(204, []),
            },
            {
              description: "Delete occurs first, so the read returns a 404.",
              operation: createBulkOperation(
                BulkOperationType.Read,
                { partitionKey: "A" },
                undefined,
                readItemId,
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(404, []),
            },
          ],
        };
        await runBulkTestDataSet(dataset);
      });
      it("424 errors for operations after an error", async function () {
        const dataset: BulkTestDataSet = {
          ...defaultBulkTestDataSet,
          dbName: addEntropy("424 errors"),
          documentToCreate: [],
          operations: [
            {
              description: "Operation should fail with invalid ttl.",
              operation: createBulkOperation(BulkOperationType.Create, {}, { ttl: -10, key: "A" }),
              expectedOutput: creatreBulkOperationExpectedOutput(400, []),
            },
            {
              description: "",
              operation: createBulkOperation(
                BulkOperationType.Create,
                { partitionKey: "A" },
                { key: "A", licenseType: "B", id: "o239uroihndsf" },
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(424, []),
            },
          ],
        };
        await runBulkTestDataSet(dataset);
      });
      it("Continues after errors with continueOnError true", async function () {
        const dataset: BulkTestDataSet = {
          ...defaultBulkTestDataSet,
          dbName: addEntropy("continueOnError"),
          documentToCreate: [],
          bulkOperationOptions: {
            continueOnError: true,
          },
          operations: [
            {
              description: "Operation should fail with invalid ttl.",
              operation: createBulkOperation(BulkOperationType.Create, {}, { ttl: -10, key: "A" }),
              expectedOutput: creatreBulkOperationExpectedOutput(400, []),
            },
            {
              description:
                "Operation should suceed and should not be abondoned because of previous failure, since continueOnError is true.",
              operation: createBulkOperation(
                BulkOperationType.Create,
                {},
                { key: "A", licenseType: "B", id: addEntropy("sifjsiof") },
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(201, []),
            },
          ],
        };
        await runBulkTestDataSet(dataset);
      });
      it("autogenerates IDs for Create operations", async function () {
        const dataset: BulkTestDataSet = {
          ...defaultBulkTestDataSet,
          dbName: addEntropy("autogenerateIDs"),
          operations: [
            {
              description: "Operation should fail with invalid ttl.",
              operation: createBulkOperation(
                BulkOperationType.Create,
                {},
                { key: "A", licenseType: "C" },
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(201, []),
            },
          ],
        };
        await runBulkTestDataSet(dataset);
      });
      it("handles operations with null, undefined, and 0 partition keys", async function () {
        const item1Id = addEntropy("item1");
        const item2Id = addEntropy("item2");
        const item3Id = addEntropy("item2");
        const dataset: BulkTestDataSet = {
          ...defaultBulkTestDataSet,
          dbName: addEntropy("handle special partition keys"),
          documentToCreate: [
            { id: item1Id, key: null, class: "2010" },
            { id: item2Id, key: 0 },
            { id: item3Id, key: undefined },
          ],
          operations: [
            {
              description: "Read document with null partition key should suceed.",
              operation: createBulkOperation(
                BulkOperationType.Read,
                { partitionKey: null },
                {},
                item1Id,
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(200, []),
            },
            {
              description: "Read document with 0 partition key should suceed.",
              operation: createBulkOperation(
                BulkOperationType.Read,
                { partitionKey: 0 },
                {},
                item2Id,
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(200, []),
            },
            {
              description: "Read document with undefined partition key should suceed.",
              operation: createBulkOperation(
                BulkOperationType.Read,
                { partitionKey: undefined },
                {},
                item3Id,
              ),
              expectedOutput: creatreBulkOperationExpectedOutput(200, []),
            },
          ],
        };
        await runBulkTestDataSet(dataset);
      });
    });
    describe("multi partition container - nested partition key", async function () {
      let container: Container;
      let createItemId: string;
      let upsertItemId: string;
      before(async function () {
        container = await getTestContainer("bulk container", undefined, {
          partitionKey: {
            paths: ["/nested/key"],
            version: 2,
          },
          throughput: 25100,
        });
        createItemId = addEntropy("createItem");
        upsertItemId = addEntropy("upsertItem");
      });
      it("creates an item with nested object partition key", async function () {
        const operations: OperationInput[] = [
          {
            operationType: BulkOperationType.Create,
            resourceBody: {
              id: createItemId,
              nested: {
                key: "A",
              },
            },
          },
          {
            operationType: BulkOperationType.Upsert,
            resourceBody: {
              id: upsertItemId,
              nested: {
                key: false,
              },
            },
          },
        ];

        const createResponse = await container.items.bulk(operations);
        assert.equal(createResponse[0].statusCode, 201);
      });
    });
    describe("multi partitioned container with many items handle partition split", async function () {
      let container: Container;
      before(async function () {
        let responseIndex = 0;
        // On every 50th request, return a 410 error
        const plugins: PluginConfig[] = [
          {
            on: PluginOn.request,
            plugin: async (context, _diagNode, next) => {
              if (context.operationType === "batch" && responseIndex % 50 === 0) {
                const error = new ErrorResponse();
                error.code = StatusCodes.Gone;
                error.substatus = SubStatusCodes.PartitionKeyRangeGone;
                responseIndex++;
                throw error;
              }
              const res = await next(context);
              responseIndex++;
              return res;
            },
          },
        ];
        const client = new CosmosClient({
          key: masterKey,
          endpoint,
          diagnosticLevel: CosmosDbDiagnosticLevel.debug,
          plugins,
        });
        container = await getTestContainer("bulk split container", client, {
          partitionKey: {
            paths: ["/key"],
            version: 2,
          },
          throughput: 25100,
        });
        for (let i = 0; i < 300; i++) {
          await container.items.create({
            id: "item" + i,
            key: i,
            class: "2010",
          });
        }
      });

      it("check multiple partition splits during bulk", async function () {
        const operations: OperationInput[] = [];
        for (let i = 0; i < 300; i++) {
          operations.push({
            operationType: BulkOperationType.Read,
            id: "item" + i,
            partitionKey: i,
          });
        }

        const response = await container.items.bulk(operations);

        response.forEach((res, index) => {
          assert.strictEqual(res.statusCode, 200, `Status should be 200 for operation ${index}`);
          assert.strictEqual(res.resourceBody.id, "item" + index, "Read Items id should match");
        });
        // Delete database after use
        await container.database.delete();
      });
    });
  });
  describe("test diagnostics for bulk", async function () {
    let container: Container;
    let readItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    before(async function () {
      container = await getTestContainer("bulk container for diagnostics", undefined, {
        partitionKey: {
          paths: ["/key"],
          version: undefined,
        },
        throughput: 12000,
      });
      readItemId = addEntropy("item1");
      await container.items.create({
        id: readItemId,
        key: "A",
        class: "2010",
      });
      deleteItemId = addEntropy("item2");
      await container.items.create({
        id: deleteItemId,
        key: "A",
        class: "2010",
      });
      replaceItemId = addEntropy("item3");
      await container.items.create({
        id: replaceItemId,
        key: 5,
        class: "2010",
      });
    });
    after(async () => {
      await container.database.delete();
    });
    it("test diagnostics for bulk", async function () {
      const operations = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
        },
        {
          operationType: BulkOperationType.Upsert,
          partitionKey: "A",
          resourceBody: { id: addEntropy("doc2"), name: "other", key: "A" },
        },
        {
          operationType: BulkOperationType.Read,
          id: readItemId,
          partitionKey: "A",
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
          partitionKey: "A",
        },
        {
          operationType: BulkOperationType.Replace,
          partitionKey: 5,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, name: "nice", key: 5 },
        },
      ];
      const startTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.items.bulk(operations);
        },
        {
          requestStartTimeUTCInMsLowerLimit: startTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 4, // One call for database account + data query call.
          locationEndpointsContacted: 1,
          gatewayStatisticsTestSpec: [{}, {}], // Corresponding to two physical partitions
        },
        true, // bulk operations happen in parallel.
      );
    });
  });
});
