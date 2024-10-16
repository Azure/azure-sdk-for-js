// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import {
  Container,
  CosmosClient,
  OperationResponse,
  OperationType,
  PatchOperationType,
  ResourceType,
} from "../../../../src";
import { addEntropy, testForDiagnostics } from "../../common/TestHelpers";
import { BulkOperationType, OperationInput } from "../../../../src";
import { PartitionKeyKind } from "../../../../src/documents";
import { endpoint } from "../../common/_testConfig";
import { masterKey } from "../../common/_fakeTestSecrets";
import { getCurrentTimestampInMs } from "../../../../src/utils/time";

describe("test batch operations", function () {
  describe("v2 multi partition container", async function () {
    let container: Container;
    let createItemId: string;
    let otherItemId: string;
    let upsertItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    let patchItemId: string;
    before(async function () {
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
    it("can batch all operation types", async function () {
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
    it("rolls back prior operations when one fails", async function () {
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
    it("test diagnostics for batch api", async function () {
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
  describe("v2 multi partition container - hierarchical partitions", async function () {
    let container: Container;
    let createItemId: string;
    let otherItemId: string;
    let upsertItemId: string;
    let replaceItemId: string;
    let deleteItemId: string;
    let patchItemId: string;
    before(async function () {
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
    it("can batch all operation types", async function () {
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
    it("rolls back prior operations when one fails", async function () {
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
