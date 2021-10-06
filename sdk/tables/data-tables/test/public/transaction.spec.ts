// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, odata, TransactionAction, TableTransaction } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { record, Recorder, isPlaybackMode, isLiveMode } from "@azure-tools/test-recorder";
import {
  recordedEnvironmentSetup,
  createTableClient,
  CreateClientMode
} from "./utils/recordedClient";
import { isNode } from "@azure/test-utils";
import { Uuid } from "../../src/utils/uuid";
import * as sinon from "sinon";

// SASConnectionString and SASToken are supported in both node and browser
const authModes: CreateClientMode[] = ["TokenCredential", "SASConnectionString"];

// Validate all supported auth strategies when running in live mode
if (isLiveMode()) {
  if (isNode) {
    // This auth strategies are only supported in node
    authModes.push("AccountConnectionString", "AccountKey");
  }
  authModes.push("SASToken");
}

authModes.forEach((authMode) => {
  describe(`batch operations ${authMode}`, () => {
    let client: TableClient;
    let recorder: Recorder;
    const suffix = isNode ? "node" : "browser";
    const tableName = `batchTableTest${authMode}${suffix}`;

    const partitionKey = "batchTest";
    const testEntities = [
      { partitionKey, rowKey: "1", name: "first" },
      { partitionKey, rowKey: "2", name: "second" },
      { partitionKey, rowKey: "3", name: "third" }
    ];

    beforeEach(async function(this: Context) {
      sinon.stub(Uuid, "generateUuid").returns("fakeId");
      recorder = record(this, recordedEnvironmentSetup);
      client = createTableClient(tableName, authMode);

      try {
        if (!isPlaybackMode()) {
          await client.createTable();
        }
      } catch {
        console.warn("Table already exists");
      }
    });

    afterEach(async function() {
      sinon.restore();
      await recorder.stop();
    });

    after(async () => {
      try {
        if (!isPlaybackMode()) {
          await client.deleteTable();
        }
      } catch {
        console.warn("Table was not deleted");
      }
    });

    it("should send a set of create actions when using TableTransaction Helper", async () => {
      const transaction = new TableTransaction();
      transaction.createEntity({ partitionKey: "helper", rowKey: "1", value: "t1" });
      transaction.createEntity({ partitionKey: "helper", rowKey: "2", value: "t2" });

      const result = await client.submitTransaction(transaction.actions);

      assert.equal(result.status, 202);
      assert.lengthOf(result.subResponses, 2);
      assert.equal(result.getResponseForEntity("1")?.status, 204);
      assert.equal(result.getResponseForEntity("2")?.status, 204);
    });

    it("should send a set of create batch operations", async () => {
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

    it("should send a set of update batch operations", async () => {
      const actions: TransactionAction[] = [];

      for (const entity of testEntities) {
        actions.push(["update", { ...entity, name: "updated" }, "Replace"]);
      }

      const batchResult = await client.submitTransaction(actions);

      const updatedEntities = client.listEntities<{ name: string }>({
        queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
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

    it("should send a set of upsert batch operations", async () => {
      const actions: TransactionAction[] = [];

      for (const entity of testEntities) {
        // This actions will be on existing entities so they should be updated
        actions.push(["upsert", { ...entity, name: "upserted" }, "Replace"]);
      }

      // This is a new entity so upsert should create it
      actions.push(["upsert", { partitionKey, rowKey: "4", name: "upserted" }, "Replace"]);

      const batchResult = await client.submitTransaction(actions);
      const updatedEntities = client.listEntities<{ name: string }>({
        queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
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

    it("should send a set of delete batch operations", async () => {
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

    it("should handle sub request error", async () => {
      const testClient = createTableClient("noExistingTable", authMode);
      const actions: TransactionAction[] = [];

      for (const entity of testEntities) {
        actions.push(["create", entity]);
      }

      try {
        await testClient.submitTransaction(actions);
        assert.fail("Expected submitBatch to throw");
      } catch (error) {
        assert.equal(error.code, "TableNotFound");
        assert.equal(error.statusCode, 404);
        assert.isString(error.message);
      }
    });

    it("should send multiple transactions with the same partition key", async () => {
      const multiBatchPartitionKey = "multiBatch1";
      const actions1: TransactionAction[] = [
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r1", value: "1" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r2", value: "2" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r3", value: "3" }]
      ];

      await client.submitTransaction(actions1);

      const actions2: TransactionAction[] = [
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r4", value: "4" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r5", value: "5" }],
        ["create", { partitionKey: multiBatchPartitionKey, rowKey: "r6", value: "6" }]
      ];

      await client.submitTransaction(actions2);

      const entities = client.listEntities<{ name: string }>({
        queryOptions: { filter: odata`PartitionKey eq ${multiBatchPartitionKey}` }
      });

      let entityCount = 0;
      for await (const entity of entities) {
        if (entity.partitionKey !== multiBatchPartitionKey) {
          throw new Error(
            `Expected all entities to have the same partition key: ${multiBatchPartitionKey} but found ${entity.partitionKey}`
          );
        }

        entityCount++;
      }

      assert.equal(entityCount, 6);
    });
  });
});
