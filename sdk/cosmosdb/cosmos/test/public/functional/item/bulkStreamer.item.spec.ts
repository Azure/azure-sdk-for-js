// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import type {
  Container,
  ContainerRequest,
  CreateOperationInput,
  PluginConfig,
} from "../../../../src";
import {
  Constants,
  CosmosClient,
  PatchOperationType,
  CosmosDbDiagnosticLevel,
  PluginOn,
  StatusCodes,
  ErrorResponse,
  ResourceType,
} from "../../../../src";
import {
  addEntropy,
  getTestContainer,
  removeAllDatabases,
  testForDiagnostics,
} from "../../common/TestHelpers";
import type { OperationInput } from "../../../../src";
import { BulkOperationType } from "../../../../src";
import { generateOperationOfSize } from "../../../internal/unit/utils/batch.spec";
import type { PartitionKey } from "../../../../src/documents";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../../src/documents";
import { endpoint } from "../../common/_testConfig";
import { masterKey } from "../../common/_fakeTestSecrets";
import { getCurrentTimestampInMs } from "../../../../src/utils/time";
import type { Response } from "../../../../src/request/Response";

async function getSplitContainer(): Promise<Container> {
  let numpkRangeRequests = 0;
  const plugins: PluginConfig[] = [
    {
      on: PluginOn.request,
      plugin: async (context, _diagNode, next) => {
        if (context.resourceType === ResourceType.pkranges) {
          let response: Response<any>;
          if (numpkRangeRequests === 0) {
            response = {
              headers: {},
              result: {
                PartitionKeyRanges: [
                  {
                    _rid: "RRsbAKHytdECAAAAAAAAUA==",
                    id: "1",
                    _etag: '"00000000-0000-0000-683c-819a242201db"',
                    minInclusive: "",
                    maxExclusive: "FF",
                  },
                ],
              },
            };
            response.code = 200;
            numpkRangeRequests++;
            return response;
          }
          numpkRangeRequests++;
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

describe("new streamer bulk operations", async function () {
  describe("v1 container", async function () {
    describe("multi partition container", async function () {
      let container: Container;
      let readItemId: string;
      let replaceItemId: string;
      let deleteItemId: string;
      before(async function () {
        await removeAllDatabases();
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
        if (container) {
          await container.database.delete();
        }
      });
      it("multi partition container handles create, upsert, replace, delete with bulk", async function () {
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
        const bulkStreamer = container.items.getBulkStreamer();
        operations.forEach((operation) => bulkStreamer.addOperations(operation));
        const response = await bulkStreamer.endStream();
        assert.equal(response.length, 5);
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
      it("handles each batch size", async function () {
        container = await getTestContainer("bulk container", undefined, {
          partitionKey: { paths: ["/key"], version: 2 },
          throughput: 25100,
        });
        const cases = [
          // cumulative size of all operations is less than threshold
          { count: 10, size: 100 },
          // cumulative size is 5x greater than threshold
          { count: 10, size: Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2) },
          // cumulative size is 50x greater than  threshold
          { count: 100, size: Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2) },
        ];

        for (const testCase of cases) {
          const operations: OperationInput[] = Array.from(
            { length: testCase.count },
            () =>
              ({
                ...generateOperationOfSize(
                  testCase.size,
                  { partitionKey: "key_value" },
                  { key: "key_value" },
                ),
              }) as any,
          );
          let bulkStreamer = container.items.getBulkStreamer();
          bulkStreamer.addOperations(operations);
          let response = await bulkStreamer.endStream();
          assert.equal(response.length, testCase.count);
          response.forEach((res) => assert.strictEqual(res.statusCode, 201));

          // surfaces 413 error if individual operation is greater than threshold
          const operation: OperationInput = generateOperationOfSize(
            Constants.DefaultMaxBulkRequestBodySizeInBytes * 10,
          ) as any;
          bulkStreamer = container.items.getBulkStreamer();
          bulkStreamer.addOperations(operation);
          response = await bulkStreamer.endStream();
          assert.equal(response.length, 1);
          assert.strictEqual(response[0].statusCode, StatusCodes.RequestEntityTooLarge);
        }
      });
    });
    describe("single partition container", async function () {
      let container: Container;
      let deleteItemId: string;
      let readItemId: string;
      let replaceItemId: string;
      before(async function () {
        await removeAllDatabases();
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

      after(async () => {
        if (container) {
          await container.database.delete();
        }
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

        const bulkStreamer = splitContainer.items.getBulkStreamer();
        operations.forEach((operation) => bulkStreamer.addOperations(operation));
        const response = await bulkStreamer.endStream();
        assert.equal(response.length, 4);

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
        if (splitContainer) {
          await splitContainer.database.delete();
        }
      });
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
        containerRequest: {
          id: "bulkContainer",
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
          const bulkStreamer = container.items.getBulkStreamer({});
          dataset.operations.forEach((operation) =>
            bulkStreamer.addOperations(operation.operation),
          );
          const response = await bulkStreamer.endStream();
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
      function createBulkOperationExpectedOutput(
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(400, []),
              },
              {
                description: "Read document with partitionKey containing Number values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [0, 3] },
                  undefined,
                  createItemWithNumberPartitionKeyId,
                ),
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(201, [
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
                expectedOutput: createBulkOperationExpectedOutput(400, []),
              },
              {
                description: "Upsert document with partitionKey containing 2 strings.",
                operation: createBulkOperation(
                  BulkOperationType.Upsert,
                  { partitionKey: ["U", "V"] },
                  { name: "other", key: "U", key2: "V" },
                ),
                expectedOutput: createBulkOperationExpectedOutput(201, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(204, []),
              },
              {
                description: "Replace document without specifying partition key.",
                operation: createBulkOperation(
                  BulkOperationType.Replace,
                  {},
                  { id: replaceItemId, name: "nice", key: 5, key2: 5 },
                  replaceItemId,
                ),
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, []),
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
            operations: [
              {
                description: "Read document with partitionKey containing booleans values.",
                operation: createBulkOperation(
                  BulkOperationType.Read,
                  { partitionKey: [true, false, true] },
                  undefined,
                  createItemWithBooleanPartitionKeyId,
                ),
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(201, [
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
                expectedOutput: createBulkOperationExpectedOutput(400, []),
              },
              {
                description: "Upsert document with partitionKey containing 2 strings.",
                operation: createBulkOperation(
                  BulkOperationType.Upsert,
                  { partitionKey: ["U", "V", 5] },
                  { name: "other", key: "U", key2: "V", key3: 5 },
                ),
                expectedOutput: createBulkOperationExpectedOutput(201, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(204, []),
              },
              {
                description: "Replace document without specifying partition key.",
                operation: createBulkOperation(
                  BulkOperationType.Replace,
                  {},
                  { id: replaceItemId, name: "nice", key: 5, key2: 5, key3: "T" },
                  replaceItemId,
                ),
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, [
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
                expectedOutput: createBulkOperationExpectedOutput(200, []),
              },
            ],
          };
          await runBulkTestDataSet(dataset);
        });
      });
      it("Continues after errors with default value of continueOnError true", async function () {
        const dataset: BulkTestDataSet = {
          ...defaultBulkTestDataSet,
          dbName: addEntropy("continueOnError"),
          documentToCreate: [],
          operations: [
            {
              description: "Operation should fail with invalid ttl.",
              operation: createBulkOperation(BulkOperationType.Create, {}, { ttl: -10, key: "A" }),
              expectedOutput: createBulkOperationExpectedOutput(400, []),
            },
            {
              description:
                "Operation should suceed and should not be abondoned because of previous failure, since continueOnError is true.",
              operation: createBulkOperation(
                BulkOperationType.Create,
                {},
                { key: "A", licenseType: "B", id: addEntropy("sifjsiof") },
              ),
              expectedOutput: createBulkOperationExpectedOutput(201, []),
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
              expectedOutput: createBulkOperationExpectedOutput(201, []),
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
              expectedOutput: createBulkOperationExpectedOutput(200, []),
            },
            {
              description: "Read document with 0 partition key should suceed.",
              operation: createBulkOperation(
                BulkOperationType.Read,
                { partitionKey: 0 },
                {},
                item2Id,
              ),
              expectedOutput: createBulkOperationExpectedOutput(200, []),
            },
            {
              description: "Read document with undefined partition key should suceed.",
              operation: createBulkOperation(
                BulkOperationType.Read,
                { partitionKey: undefined },
                {},
                item3Id,
              ),
              expectedOutput: createBulkOperationExpectedOutput(200, []),
            },
          ],
        };
        await runBulkTestDataSet(dataset);
      });
      it("handles throttling", async function () {
        let responseIndex = 0;
        const plugins: PluginConfig[] = [
          {
            on: PluginOn.request,
            plugin: async (context, _diagNode, next) => {
              if (context.operationType === "batch" && responseIndex < 1) {
                const error = new ErrorResponse();
                error.code = StatusCodes.TooManyRequests;
                error.headers = {
                  "x-ms-retry-after-ms": 100,
                };
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
          plugins,
        });
        const testcontainer = await getTestContainer("throttling container", client, {
          partitionKey: {
            paths: ["/key"],
            version: 2,
          },
          throughput: 400,
        });
        const operations: CreateOperationInput[] = Array.from({ length: 10 }, (_, i) => {
          return {
            operationType: BulkOperationType.Create,
            resourceBody: {
              id: addEntropy("doc" + i),
              key: i,
              class: "2010",
            },
          };
        });
        const bulkStreamer = testcontainer.items.getBulkStreamer();
        bulkStreamer.addOperations(operations);
        const response = await bulkStreamer.endStream();
        assert.strictEqual(response.length, 10);
        response.forEach((res, index) => {
          assert.strictEqual(res.statusCode, 201, `Status should be 201 for operation ${index}`);
        });
        await testcontainer.database.delete();
      });
      it("returns final response in order", async function () {
        const testcontainer = await getTestContainer("final response order container", undefined, {
          partitionKey: {
            paths: ["/key"],
            version: 2,
          },
          throughput: 25100,
        });
        const operations: CreateOperationInput[] = Array.from({ length: 10 }, (_, i) => {
          return {
            operationType: BulkOperationType.Create,
            resourceBody: {
              id: addEntropy("doc" + i),
              key: i,
              class: "2010",
            },
          };
        });
        const bulkStreamer = testcontainer.items.getBulkStreamer();
        operations.forEach((operation) => bulkStreamer.addOperations(operation));
        const response = await bulkStreamer.endStream();
        const expectedOrder = operations.map((op) => op.resourceBody.id);
        const actualOrder = response.map((res) => res.resourceBody.id);
        assert.deepStrictEqual(actualOrder, expectedOrder);
        await testcontainer.database.delete();
      });
    });
    describe("multi partition container - nested partition key", async function () {
      let container: Container;
      let createItemId: string;
      let upsertItemId: string;
      before(async function () {
        await removeAllDatabases();
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
      after(async () => {
        if (container) {
          await container.database.delete();
        }
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
        const bulkStreamer = container.items.getBulkStreamer();
        operations.forEach((operation) => bulkStreamer.addOperations(operation));
        const createResponse = await bulkStreamer.endStream();
        assert.equal(createResponse[0].statusCode, 201);
      });
    });
    describe("multi partitioned container with many items handle partition split", async function () {
      let container: Container;
      before(async function () {
        let numpkRangeRequests = 0;
        const plugins: PluginConfig[] = [
          {
            on: PluginOn.request,
            plugin: async (context, _diagNode, next) => {
              if (context.resourceType === ResourceType.pkranges) {
                let response: Response<any>;
                if (numpkRangeRequests === 0) {
                  response = {
                    headers: {},
                    result: {
                      PartitionKeyRanges: [
                        {
                          _rid: "RRsbAKHytdECAAAAAAAAUA==",
                          id: "7",
                          _etag: '"00000000-0000-0000-683c-819a242201db"',
                          minInclusive: "",
                          maxExclusive: "FF",
                        },
                      ],
                    },
                  };
                  response.code = 200;
                  numpkRangeRequests++;
                  return response;
                }
                numpkRangeRequests++;
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
        await removeAllDatabases();
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
      it("check partition splits during bulk", async function () {
        const operations: OperationInput[] = [];
        for (let i = 0; i < 300; i++) {
          operations.push({
            operationType: BulkOperationType.Read,
            id: "item" + i,
            partitionKey: i,
          });
        }

        const bulkStreamer = container.items.getBulkStreamer();
        operations.forEach((operation) => bulkStreamer.addOperations(operation));
        const response = await bulkStreamer.endStream();

        response.forEach((res, index) => {
          assert.strictEqual(res.statusCode, 200, `Status should be 200 for operation ${index}`);
          assert.strictEqual(res.resourceBody.id, "item" + index, "Read Items id should match");
        });
        // Delete database after use
        if (container) {
          await container.database.delete();
        }
      });
    });
  });
  describe("test diagnostics for bulk", async function () {
    let container: Container;
    let readItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    before(async function () {
      await removeAllDatabases();
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
      if (container) {
        await container.database.delete();
      }
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
          const bulkStreamer = container.items.getBulkStreamer();
          operations.forEach((operation) => bulkStreamer.addOperations(operation));
          return bulkStreamer.endStream();
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
  describe("test streamer", async function () {
    it("cannot add operation or end stream after stream has already ended", async function () {
      const container = await getTestContainer("bulk container", undefined, {
        partitionKey: {
          paths: ["/key"],
          version: undefined,
        },
        throughput: 12000,
      });
      const bulkStreamer = container.items.getBulkStreamer();
      bulkStreamer.addOperations({
        operationType: BulkOperationType.Create,
        resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
      });
      await bulkStreamer.endStream();
      try {
        bulkStreamer.addOperations({
          operationType: BulkOperationType.Create,
          resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
        });
        assert.fail("addOperations should fail after endStream");
      } catch (err) {
        assert.strictEqual(err.message, "Cannot add operations after the stream has ended.");
      }
      try {
        await bulkStreamer.endStream();
        assert.fail("endStream should throw error after stream has already ended");
      } catch (err) {
        assert.strictEqual(err.message, "Bulk streamer has already ended.");
      }
    });
  });
});
