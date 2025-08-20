// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Recorder } from "@azure-tools/test-recorder";
import type { TableClient, TransactionAction } from "@azure/data-tables";
import { TableTransaction, odata } from "@azure/data-tables";
import { Uuid } from "$internal/utils/uuid.js";
import { createTableClient } from "./utils/recordedClient.js";
import { isNodeLike } from "@azure/core-util";
import { describe, it, assert, vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { isLiveMode, isPlaybackMode } from "../utils/injectables.js";

const partitionKey = "batchTest";
const testEntities = [
  { partitionKey, rowKey: "1", name: "first" },
  { partitionKey, rowKey: "2", name: "second" },
  { partitionKey, rowKey: "3", name: "third" },
];

const suffix = isNodeLike ? "node" : "browser";

describe("concurrent batch operations", () => {
  const concurrentTableName = `concurrentBatchTableTest${suffix}`;
  let unRecordedClient: TableClient;

  beforeAll(async () => {
    if (!isPlaybackMode()) {
      unRecordedClient = await createTableClient(concurrentTableName, "TokenCredential");
      await unRecordedClient.createTable();
    }
  });

  afterAll(async () => {
    if (!isPlaybackMode()) {
      await unRecordedClient.deleteTable();
    }
  });

  beforeEach(async () => {
    vi.spyOn(Uuid, "generateUuid").mockReturnValue("fakeId");
    unRecordedClient = await createTableClient(concurrentTableName, "TokenCredential");
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should send concurrent transactions", async () => {
    await Promise.all([
      unRecordedClient.submitTransaction([
        ["create", { partitionKey: "pk22", rowKey: "rk1", field: 1 }],
      ]),
      unRecordedClient.submitTransaction([
        ["create", { partitionKey: "pk22", rowKey: "rk2", field: 2 }],
      ]),
    ]);

    const entity1 = await unRecordedClient.getEntity("pk22", "rk1");
    const entity2 = await unRecordedClient.getEntity("pk22", "rk2");

    assert.equal(entity1.rowKey, "rk1");
    assert.equal(entity2.rowKey, "rk2");
  });
});

describe(`batch operations`, () => {
  let client: TableClient;
  let unRecordedClient: TableClient;
  let recorder: Recorder;
  const tableName = `batchTableTest${suffix}`;

  beforeEach(async (ctx) => {
    vi.spyOn(Uuid, "generateUuid").mockReturnValue("fakeId");
    recorder = new Recorder(ctx);
    client = await createTableClient(tableName, "TokenCredential", recorder);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await recorder.stop();
  });

  beforeAll(async () => {
    if (!isPlaybackMode()) {
      unRecordedClient = await createTableClient(tableName, "TokenCredential");
      await unRecordedClient.createTable();
    }
  });

  afterAll(async () => {
    if (!isPlaybackMode()) {
      await unRecordedClient.deleteTable();
    }
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())(
    "should send a set of create actions when using TableTransaction Helper",
    async () => {
      const transaction = new TableTransaction();
      transaction.createEntity({ partitionKey: "helper", rowKey: "1", value: "t1" });
      transaction.createEntity({ partitionKey: "helper", rowKey: "2", value: "t2" });

      const result = await client.submitTransaction(transaction.actions);

      assert.equal(result.status, 202);
      assert.lengthOf(result.subResponses, 2);
      assert.equal(result.getResponseForEntity("1")?.status, 204);
      assert.equal(result.getResponseForEntity("2")?.status, 204);
    },
  );

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should send a set of create batch operations", async () => {
    const actions: TransactionAction[] = [];

    for (const entity of testEntities) {
      actions.push(["create", entity]);
    }

    const result = await client.submitTransaction(actions);
    assert.equal(result.status, 202);
    assert.lengthOf(result.subResponses, 3);
    testEntities.forEach((entity) => {
      const subResponse = result.getResponseForEntity(entity.rowKey);
      assert.equal(subResponse?.status, 204);
      // Etags should be in the following format W/"datetime'2020-10-01T18%3A07%3A48.4010495Z'"
      assert.isTrue(subResponse?.etag?.indexOf(`W/"datetime'`) !== -1);
    });
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should send a set of update batch operations", async () => {
    const actions: TransactionAction[] = [];

    for (const entity of testEntities) {
      actions.push(["update", { ...entity, name: "updated" }, "Replace"]);
    }

    const batchResult = await client.submitTransaction(actions);

    const updatedEntities = client.listEntities<{ name: string }>({
      queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` },
    });

    assert.equal(batchResult.status, 202);
    assert.lengthOf(batchResult.subResponses, 3);
    batchResult.subResponses.forEach((subResponse) => {
      assert.equal(subResponse?.status, 204);
    });

    for await (const entity of updatedEntities) {
      assert.equal(entity.name, "updated");
    }
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should send a set of update batch operations with options", async () => {
    const actions: TransactionAction[] = [];

    for (const entity of testEntities) {
      // Get the entity from the server to get the etag
      const currentEntity = await client.getEntity(entity.partitionKey, entity.rowKey);

      // Update the entity using the etag
      actions.push([
        "update",
        { ...entity, name: "updated" },
        "Replace",
        { etag: currentEntity.etag },
      ]);
    }

    const batchResult = await client.submitTransaction(actions);

    const updatedEntities = client.listEntities<{ name: string }>({
      queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` },
    });

    assert.equal(batchResult.status, 202);
    assert.lengthOf(batchResult.subResponses, 3);
    batchResult.subResponses.forEach((subResponse) => {
      assert.equal(subResponse?.status, 204);
    });

    for await (const entity of updatedEntities) {
      assert.equal(entity.name, "updated");
    }
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should send a set of upsert batch operations", async () => {
    const actions: TransactionAction[] = [];

    for (const entity of testEntities) {
      // This actions will be on existing entities so they should be updated
      actions.push(["upsert", { ...entity, name: "upserted" }, "Replace"]);
    }

    // This is a new entity so upsert should create it
    actions.push(["upsert", { partitionKey, rowKey: "4", name: "upserted" }, "Replace"]);

    const batchResult = await client.submitTransaction(actions);
    const updatedEntities = client.listEntities<{ name: string }>({
      queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` },
    });

    assert.equal(batchResult.status, 202);
    assert.lengthOf(batchResult.subResponses, 4);
    batchResult.subResponses.forEach((subResponse) => {
      assert.equal(subResponse?.status, 204);
    });

    let inserted;
    for await (const entity of updatedEntities) {
      if (entity.rowKey === "4") {
        inserted = entity;
      }
      assert.equal(entity.name, "upserted");
    }

    assert.equal(inserted?.rowKey, "4");
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should send a set of delete batch operations", async () => {
    const actions: TransactionAction[] = [];

    for (const entity of testEntities) {
      actions.push(["delete", entity]);
    }

    const result = await client.submitTransaction(actions);
    assert.equal(result.status, 202);
    assert.lengthOf(result.subResponses, 3);
    result.subResponses.forEach((subResponse) => {
      assert.equal(subResponse?.status, 204);
    });
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())(
    "should send multiple transactions with the same partition key",
    async () => {
      const multiBatchPartitionKey = "multiBatch1";
      const actions1: TransactionAction[] = [
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r1", value: "1" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r2", value: "2" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r3", value: "3" }],
      ];

      await client.submitTransaction(actions1);

      const actions2: TransactionAction[] = [
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r4", value: "4" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r5", value: "5" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r6", value: "6" }],
      ];

      await client.submitTransaction(actions2);

      const entities = client.listEntities<{ name: string }>({
        queryOptions: { filter: odata`PartitionKey eq ${multiBatchPartitionKey}` },
      });

      let entityCount = 0;
      for await (const entity of entities) {
        if (entity.partitionKey !== multiBatchPartitionKey) {
          throw new Error(
            `Expected all entities to have the same partition key: ${multiBatchPartitionKey} but found ${entity.partitionKey}`,
          );
        }

        entityCount++;
      }

      assert.equal(entityCount, 6);
    },
  );

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should support empty partition and row keys", async () => {
    const actions1: TransactionAction[] = [["create", { partitionKey: "", rowKey: "", value: "" }]];

    await client.submitTransaction(actions1);
    await client.submitTransaction([
      ["update", { partitionKey: "", rowKey: "", value: "updated" }],
    ]);

    let entity = await client.getEntity("", "");
    assert.equal(entity.value, "updated");

    await client.submitTransaction([
      ["upsert", { partitionKey: "", rowKey: "", value: "upserted" }],
    ]);

    entity = await client.getEntity("", "");
    assert.equal(entity.value, "upserted");
  });
});

describe("Handle suberror", () => {
  let client: TableClient;
  let recorder: Recorder;
  const tableName = "noExistingTableError";

  beforeEach(async (ctx) => {
    vi.spyOn(Uuid, "generateUuid").mockReturnValue("fakeId");
    recorder = new Recorder(ctx);
    client = await createTableClient(tableName, "TokenCredential", recorder);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await recorder.stop();
  });

  // https://github.com/Azure/azure-sdk-tools/issues/10197
  it.runIf(isLiveMode())("should handle sub request error", async () => {
    const actions: TransactionAction[] = [];

    for (const entity of testEntities) {
      actions.push(["create", entity]);
    }

    try {
      await client.submitTransaction(actions);
      assert.fail("Expected submitBatch to throw");
    } catch (error: any) {
      assert.equal(error.code, "TableNotFound");
      assert.equal(error.statusCode, 404);
      assert.isString(error.message);
    }
  });
});
