// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeAll, describe, afterAll, assert, it } from "vitest";
import type { CreateOperationInput, OperationInput } from "../../../../src/utils/batch.js";
import { BulkOperationType, calculateObjectSizeInBytes } from "../../../../src/utils/batch.js";
import type { PartitionKey, Container, PluginConfig } from "../../../../src/index.js";
import {
  PluginOn,
  ResourceType,
  CosmosClient,
  CosmosDbDiagnosticLevel,
  PatchOperationType,
  Constants,
  StatusCodes,
  ErrorResponse,
} from "../../../../src/index.js";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { endpoint } from "../../common/_testConfig.js";
import type { CosmosDiagnosticsTestSpec } from "../../common/TestHelpers.js";
import {
  addEntropy,
  getTestContainer,
  removeAllDatabases,
  validateDiagnostics,
} from "../../common/TestHelpers.js";
import type { Response } from "../../../../src/index.js";
import { getCurrentTimestampInMs } from "../../../../src/utils/time.js";
import { randomUUID } from "@azure/core-util";

const operationSkeleton = {
  operationType: BulkOperationType.Create,
  resourceBody: {
    value: "",
    id: "",
    partitionKey: "",
  },
};

const constantSize = calculateObjectSizeInBytes(operationSkeleton);

function generateItemOperationOfSize(
  sizeInBytes: number,
  id: string,
  partitionKey: PartitionKey,
): OperationInput {
  if (sizeInBytes < constantSize) {
    throw new Error(`Not possible to generate operation of size less than ${constantSize}`);
  }
  let sizeToAdd = sizeInBytes - constantSize;
  if (partitionKey !== undefined) {
    sizeToAdd -= calculateObjectSizeInBytes({ partitionKey }) + calculateObjectSizeInBytes({});
    sizeToAdd -= calculateObjectSizeInBytes({ id });
  }
  return {
    operationType: BulkOperationType.Create,
    partitionKey: partitionKey,
    resourceBody: {
      id,
      value: new Array(sizeToAdd + 1).join("a"),
      key: partitionKey,
    },
  };
}

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

describe("test executeBulkOperations", () => {
  let container: Container;
  let readItemId: string;
  let replaceItemId: string;
  let deleteItemId: string;
  let patchItemId: string;

  beforeAll(async () => {
    await removeAllDatabases();
    container = await getTestContainer("executeBulkOperations", undefined, {
      partitionKey: {
        paths: ["/key"],
        version: 2,
      },
      throughput: 1000,
    });
  });

  afterAll(async () => {
    await container.delete();
    await removeAllDatabases();
  });

  it("should execute bulk CRUD operations", async () => {
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
    patchItemId = addEntropy("item4");
    await container.items.create({
      id: patchItemId,
      key: 5,
      class: "2010",
    });

    const operations: OperationInput[] = [
      {
        operationType: BulkOperationType.Create,
        partitionKey: "A",
        resourceBody: {
          id: addEntropy("doc1"),
          name: "sample",
          key: "A",
        },
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: "A",
        resourceBody: {
          id: addEntropy("doc2"),
          name: "other",
          key: "A",
        },
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
        id: replaceItemId,
        partitionKey: 5,
        resourceBody: {
          id: replaceItemId,
          key: 5,
          name: "nice",
        },
      },
      {
        operationType: BulkOperationType.Patch,
        id: patchItemId,
        partitionKey: 5,
        resourceBody: {
          operations: [{ op: PatchOperationType.add, path: "/great", value: "goodValue" }],
        },
      },
    ];
    const result = await container.items.executeBulkOperations(operations);
    assert.equal(result.length, 6);
    result.forEach((res, index) => {
      assert.ok(res.response);
      assert.ok(res.response.diagnostics, `Diagnostics should be present for operation ${index}`);
    });

    // Create
    assert.equal(result[0].response.resourceBody.name, "sample");
    assert.equal(result[0].response.statusCode, 201);
    // Upsert
    assert.equal(result[1].response.resourceBody.name, "other");
    assert.equal(result[1].response.statusCode, 201);
    // Read
    assert.equal(result[2].response.resourceBody.class, "2010");
    assert.equal(result[2].response.statusCode, 200);
    // Delete
    assert.equal(result[3].response.statusCode, 204);
    // Replace
    assert.equal(result[4].response.resourceBody.name, "nice");
    assert.equal(result[4].response.statusCode, 200);
    // Patch
    assert.equal(result[5].response.resourceBody.great, "goodValue");
    assert.equal(result[5].response.statusCode, 200);
  });

  it("test diagnostics", async () => {
    const operations: OperationInput[] = [
      {
        operationType: BulkOperationType.Create,
        partitionKey: "A",
        resourceBody: {
          id: addEntropy("doc1"),
          name: "sample",
          key: "A",
        },
      },
      {
        operationType: BulkOperationType.Upsert,
        partitionKey: "A",
        resourceBody: {
          id: addEntropy("doc2"),
          name: "other",
          key: "A",
        },
      },
      {
        operationType: BulkOperationType.Read,
        id: "A",
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Delete,
        id: "A",
        partitionKey: "A",
      },
      {
        operationType: BulkOperationType.Replace,
        id: "A",
        partitionKey: 5,
        resourceBody: {
          id: "A",
          key: 5,
          name: "nice",
        },
      },
    ];
    const startTimestamp = getCurrentTimestampInMs();
    const result = await container.items.executeBulkOperations(operations);
    const spec: CosmosDiagnosticsTestSpec = {
      requestStartTimeUTCInMsLowerLimit: startTimestamp,
      requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
      retryCount: 0,
      locationEndpointsContacted: 1,
      gatewayStatisticsTestSpec: [{}],
    };

    result.forEach((res, index) => {
      const diagnostics = res.response ? res.response.diagnostics : res.error.diagnostics;
      assert.ok(diagnostics, `Diagnostics should be present for operation ${index}`);
      validateDiagnostics(diagnostics, spec, true);
    });
  });

  it("content response should not be present when contentResponseOnWriteEnabled is set to false", async () => {
    const createOperation: CreateOperationInput = {
      operationType: BulkOperationType.Create,
      partitionKey: "A",
      resourceBody: {
        id: addEntropy("doc1"),
        name: "sample",
        key: "A",
      },
    };
    const result = await container.items.executeBulkOperations([createOperation], {
      contentResponseOnWriteEnabled: false,
    });
    assert.equal(result.length, 1);
    assert.ok(result[0].response);
    assert.ok(result[0].response.resourceBody === undefined);
    assert.equal(result[0].response.statusCode, 201);
  });

  it("handle different batch sizes", async function () {
    const cases = [
      // cumulative size of all operations is less than threshold
      { count: 10, size: 200 },
      // cumulative size is 5x greater than threshold
      { count: 10, size: Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2) },
      // cumulative size is 50x greater than  threshold
      { count: 100, size: Math.floor(Constants.DefaultMaxBulkRequestBodySizeInBytes / 2) },
    ];

    for (const testCase of cases) {
      const operations: OperationInput[] = Array.from({ length: testCase.count }, () =>
        generateItemOperationOfSize(testCase.size, randomUUID(), "key_value"),
      );

      let result = await container.items.executeBulkOperations(operations);
      assert.equal(result.length, testCase.count);
      result.forEach((res) => {
        assert.ok(res.response);
        assert.strictEqual(res.response.statusCode, 201);
      });

      // surfaces 413 error if individual operation is greater than threshold
      const operation: OperationInput = generateItemOperationOfSize(
        Constants.DefaultMaxBulkRequestBodySizeInBytes * 10,
        randomUUID(),
        "key_value",
      );

      result = await container.items.executeBulkOperations([operation]);
      assert.equal(result.length, 1);
      assert.ok(result[0].error);
      assert.strictEqual(result[0].error.code, StatusCodes.RequestEntityTooLarge);
    }
  });

  it("handles partition split error", async () => {
    deleteItemId = addEntropy("item2");
    readItemId = addEntropy("item2");
    replaceItemId = addEntropy("item2");
    const operations: OperationInput[] = [
      {
        operationType: BulkOperationType.Create,
        partitionKey: "A",
        resourceBody: {
          id: addEntropy("doc1"),
          name: "sample",
          key: "A",
        },
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
        id: replaceItemId,
        partitionKey: 5,
        resourceBody: {
          id: replaceItemId,
          key: 5,
          name: "nice",
        },
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

    const result = await splitContainer.items.executeBulkOperations(operations);
    assert.equal(result.length, 4);

    // Create
    assert.equal(result[0].response?.resourceBody.name, "sample");
    assert.equal(result[0].response.statusCode, 201);
    // Read
    assert.equal(result[1].response.resourceBody.class, "2010");
    assert.equal(result[1].response.statusCode, 200);
    // Delete
    assert.equal(result[2].response.statusCode, 204);
    // Replace
    assert.equal(result[3].response.resourceBody.name, "nice");
    assert.equal(result[3].response.statusCode, 200);

    await splitContainer.database.delete();
  });

  it("handles throttling error", async () => {
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
    const operations: OperationInput[] = Array.from({ length: 10 }, (_, i) => {
      return {
        operationType: BulkOperationType.Create,
        partitionKey: i,
        resourceBody: {
          id: addEntropy(`doc${i}`),
          name: "sample",
          key: i,
        },
      };
    });
    const result = await testcontainer.items.executeBulkOperations(operations);
    assert.equal(result.length, 10);
    result.forEach((res) => {
      assert.ok(res.response);
      assert.strictEqual(res.response.statusCode, 201);
    });
    await testcontainer.database.delete();
  });

  it("should populate error in response list corresponding to operation", async () => {
    const operations: OperationInput[] = [
      // leaving id should populate error in response
      {
        operationType: BulkOperationType.Create,
        partitionKey: "A",
        resourceBody: {
          name: "sample",
          key: "A",
        },
      },
      // should succeed
      {
        operationType: BulkOperationType.Create,
        partitionKey: "A",
        resourceBody: {
          id: addEntropy("doc1"),
          name: "sample",
          key: "A",
        },
      },
    ];
    const result = await container.items.executeBulkOperations(operations);
    assert.equal(result.length, 2);

    assert.ok(result[0].error);
    assert.equal(result[0].response, undefined);
    assert.equal(result[0].error.code, StatusCodes.InternalServerError);
    assert.ok(result[0].error.message.includes("Operation resource body must have an 'id'"));

    assert.ok(result[1].response);
    assert.equal(result[1].error, undefined);
    assert.equal(result[1].response.statusCode, StatusCodes.Created);
  });
});
