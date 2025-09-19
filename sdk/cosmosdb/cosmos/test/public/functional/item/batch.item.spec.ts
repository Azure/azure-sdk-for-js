// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container, OperationResponse } from "../../../../src/index.js";
import {
  CosmosClient,
  OperationType,
  PatchOperationType,
  ResourceType,
} from "../../../../src/index.js";
import { addEntropy, testForDiagnostics } from "../../common/TestHelpers.js";
import type { OperationInput } from "../../../../src/index.js";
import { BulkOperationType } from "../../../../src/index.js";
import { PartitionKeyKind } from "../../../../src/documents/index.js";
import { endpoint } from "../../common/_testConfig.js";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { getCurrentTimestampInMs } from "../../../../src/utils/time.js";
import { describe, it, assert, beforeAll } from "vitest";
describe("test batch operations", () => {
  describe("v2 multi partition container", async () => {
    let container: Container;
    let createItemId: string;
    let otherItemId: string;
    let upsertItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    let patchItemId: string;

    beforeAll(async () => {
      const client = new CosmosClient({ key: masterKey, endpoint });
      const db = await client.databases.createIfNotExists({ id: "patchDb" });
      const contResponse = await db.database.containers.createIfNotExists({
        id: "patchContainer",
        partitionKey: {
          paths: ["/key"],
          version: 2,
        },
        throughput: 25100,
      });
      container = contResponse.container;
      deleteItemId = addEntropy("item1");
      createItemId = addEntropy("item2");
      otherItemId = addEntropy("item2");
      upsertItemId = addEntropy("item4");
      replaceItemId = addEntropy("item3");
      patchItemId = addEntropy("item5");
      await container.items.create({
        id: deleteItemId,
        key: "A",
        class: "2010",
      });
      await container.items.create({
        id: replaceItemId,
        key: "A",
        class: "2010",
      });
      await container.items.create({
        id: patchItemId,
        key: "A",
        class: "2010",
      });
    });

    it("can batch all operation types", async () => {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: createItemId, key: "A", school: "high" },
        },
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: upsertItemId, key: "A", school: "elementary" },
        },
        {
          operationType: BulkOperationType.Replace,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, key: "A", school: "junior high" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
        },
        {
          operationType: BulkOperationType.Patch,
          id: patchItemId,
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
            condition: "from c where NOT IS_DEFINED(c.newImproved)",
          },
        },
      ];

      const response = await container.items.batch(operations, "A");
      assert(isOperationResponse(response.result[0]));
      assert.strictEqual(response.result[0].statusCode, 201);
      assert.strictEqual(response.result[1].statusCode, 201);
      assert.strictEqual(response.result[2].statusCode, 200);
      assert.strictEqual(response.result[3].statusCode, 204);
      assert.strictEqual(response.result[4].statusCode, 200);
    });

    it("executes batch with optional partition key value in input", async () => {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: "i1", key: "B", school: "high" },
          partitionKey: "B",
        },
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: "i2", key: "B", school: "elementary" },
          partitionKey: "B",
        },
        {
          operationType: BulkOperationType.Replace,
          id: "i1",
          resourceBody: { id: "i1", key: "B", school: "junior high" },
          partitionKey: "B",
        },
        {
          operationType: BulkOperationType.Delete,
          id: "i1",
          partitionKey: "B",
        },
        {
          operationType: BulkOperationType.Patch,
          id: "i2",
          partitionKey: "B",
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
            condition: "from c where NOT IS_DEFINED(c.newImproved)",
          },
        },
      ];

      const response = await container.items.batch(operations, "B");
      assert(isOperationResponse(response.result[0]));
      assert.strictEqual(response.result[0].statusCode, 201);
      assert.strictEqual(response.result[1].statusCode, 201);
      assert.strictEqual(response.result[2].statusCode, 200);
      assert.strictEqual(response.result[3].statusCode, 204);
      assert.strictEqual(response.result[4].statusCode, 200);
    });

    it("should fail if some of operation input partitionKey does not match with batch partitionKey", async () => {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: "id1", key: "B", school: "high" },
          partitionKey: "B",
        },
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: "id2", key: "B", school: "elementary" },
          partitionKey: "A",
        },
        {
          operationType: BulkOperationType.Replace,
          id: "id1",
          resourceBody: { id: "id1", key: "B", school: "junior high" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: "id1",
          partitionKey: "B",
        },
        {
          operationType: BulkOperationType.Patch,
          id: "id2",
          partitionKey: "B",
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
            condition: "from c where NOT IS_DEFINED(c.newImproved)",
          },
        },
      ];

      try {
        await container.items.batch(operations, "B");
      } catch (e: any) {
        assert.ok(
          e.message.includes(
            "One or more operations within the batch request have a different partition key value than the request.",
          ),
        );
      }
    });

    it("rolls back prior operations when one fails", async () => {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: otherItemId, key: "A", school: "elementary" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId + addEntropy("make this 404"),
        },
      ];

      const deleteResponse = await container.items.batch(operations, "A");
      assert.strictEqual(deleteResponse.result[0].statusCode, 424);
      assert.strictEqual(deleteResponse.result[1].statusCode, 404);
      const { resource: readItem } = await container.item(otherItemId).read();
      assert.strictEqual(readItem, undefined);
      assert(isOperationResponse(deleteResponse.result[0]));
    });

    it("test diagnostics for batch api", async () => {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: createItemId, key: "A", school: "high" },
        },
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: upsertItemId, key: "A", school: "elementary" },
        },
        {
          operationType: BulkOperationType.Replace,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, key: "A", school: "junior high" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
        },
        {
          operationType: BulkOperationType.Patch,
          id: patchItemId,
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
            condition: "from c where NOT IS_DEFINED(c.newImproved)",
          },
        },
      ];

      const startTimestamp = getCurrentTimestampInMs();
      await testForDiagnostics(
        async () => {
          return container.items.batch(operations, "A");
        },
        {
          requestStartTimeUTCInMsLowerLimit: startTimestamp,
          requestDurationInMsUpperLimit: getCurrentTimestampInMs(),
          retryCount: 0,
          // metadataCallCount: 2, // One call for database account + data query call.
          locationEndpointsContacted: 1,
          gatewayStatisticsTestSpec: [
            {
              operationType: OperationType.Batch,
              resourceType: ResourceType.item,
            },
          ],
        },
        true,
      );
    });

    function isOperationResponse(object: unknown): object is OperationResponse {
      return (
        typeof object === "object" &&
        object !== null &&
        Object.prototype.hasOwnProperty.call(object, "statusCode") &&
        Object.prototype.hasOwnProperty.call(object, "requestCharge")
      );
    }
  });
  describe("v2 multi partition container - hierarchical partitions", async () => {
    let container: Container;
    let createItemId: string;
    let otherItemId: string;
    let upsertItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    let patchItemId: string;

    beforeAll(async () => {
      const client = new CosmosClient({ key: masterKey, endpoint });
      const db = await client.databases.createIfNotExists({ id: "patchDb" });
      const contResponse = await db.database.containers.createIfNotExists({
        id: "batch container hierarchical partitions",
        partitionKey: {
          paths: ["/key1", "/key2"],
          version: 2,
          kind: PartitionKeyKind.MultiHash,
        },
        throughput: 25100,
      });
      container = contResponse.container;
      deleteItemId = addEntropy("item1");
      createItemId = addEntropy("item2");
      otherItemId = addEntropy("item2");
      upsertItemId = addEntropy("item4");
      replaceItemId = addEntropy("item3");
      patchItemId = addEntropy("item5");
      await container.items.create({
        id: deleteItemId,
        key1: "A",
        key2: "B",
        class: "2010",
      });
      await container.items.create({
        id: replaceItemId,
        key1: "A",
        key2: "B",
        class: "2010",
      });
      await container.items.create({
        id: patchItemId,
        key1: "A",
        key2: "B",
        class: "2010",
      });
    });

    it("can batch all operation types", async () => {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Create,
          resourceBody: { id: createItemId, key1: "A", key2: "B", school: "high" },
        },
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: upsertItemId, key1: "A", key2: "B", school: "elementary" },
        },
        {
          operationType: BulkOperationType.Replace,
          id: replaceItemId,
          resourceBody: { id: replaceItemId, key1: "A", key2: "B", school: "junior high" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId,
        },
        {
          operationType: BulkOperationType.Patch,
          id: patchItemId,
          resourceBody: {
            operations: [{ op: PatchOperationType.add, path: "/good", value: "greatValue" }],
            condition: "from c where NOT IS_DEFINED(c.newImproved)",
          },
        },
      ];

      const response = await container.items.batch(operations, ["A", "B"]);
      assert(isOperationResponse(response.result[0]));
      assert.strictEqual(response.result[0].statusCode, 201);
      assert.strictEqual(response.result[1].statusCode, 201);
      assert.strictEqual(response.result[2].statusCode, 200);
      assert.strictEqual(response.result[3].statusCode, 204);
      assert.strictEqual(response.result[4].statusCode, 200);
    });
    it("rolls back prior operations when one fails", async () => {
      const operations: OperationInput[] = [
        {
          operationType: BulkOperationType.Upsert,
          resourceBody: { id: otherItemId, key1: "A", key2: "B", school: "elementary" },
        },
        {
          operationType: BulkOperationType.Delete,
          id: deleteItemId + addEntropy("make this 404"),
        },
      ];

      const deleteResponse = await container.items.batch(operations, ["A", "B"]);
      assert.strictEqual(deleteResponse.result[0].statusCode, 424);
      assert.strictEqual(deleteResponse.result[1].statusCode, 404);
      const { resource: readItem } = await container.item(otherItemId).read();
      assert.strictEqual(readItem, undefined);
      assert(isOperationResponse(deleteResponse.result[0]));
    });

    function isOperationResponse(object: unknown): object is OperationResponse {
      return (
        typeof object === "object" &&
        object !== null &&
        Object.prototype.hasOwnProperty.call(object, "statusCode") &&
        Object.prototype.hasOwnProperty.call(object, "requestCharge")
      );
    }
  });
});
