// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, odata } from "../../src";
import { assert } from "chai";
import { record, Recorder, isPlaybackMode, isLiveMode } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableClient } from "./utils/recordedClient";
import { isNode } from "../testUtils";
import { Uuid } from "../../src/utils/uuid";
import * as sinon from "sinon";

describe("batch operations", () => {
  let client: TableClient;
  let recorder: Recorder;
  const suffix = isNode ? "node" : "browser";
  const tableName = `batchTableTest${suffix}`;

  const partitionKey = "batchTest";
  const testEntities = [
    { partitionKey, rowKey: "1", name: "first" },
    { partitionKey, rowKey: "2", name: "second" },
    { partitionKey, rowKey: "3", name: "third" }
  ];

  // Cannot use SharedKey auth when using recordings since the signature uses the current date
  // which wouldn't match the recorded one. Fallingback to SAS for recorded tests.
  const authMode = !isNode || !isLiveMode() ? "SASConnectionString" : "AccountConnectionString";

  beforeEach(/** @this */ async function() {
    sinon.stub(Uuid, "generateUuid").returns("fakeId");
    recorder = record(this, recordedEnvironmentSetup);
    client = createTableClient(tableName, authMode);

    try {
      if (!isPlaybackMode()) {
        await client.create();
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
        await client.delete();
      }
    } catch {
      console.warn("Table was not deleted");
    }
  });

  it("should send a set of create batch operations", async () => {
    const batch = client.createBatch(partitionKey);

    await batch.createEntities(testEntities);
    const result = await batch.submitBatch();
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
    const batch = client.createBatch(partitionKey);

    testEntities.forEach((entity) => batch.updateEntity({ ...entity, name: "updated" }, "Replace"));

    const batchResult = await batch.submitBatch();
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

  it("should send a set of delete batch operations", async () => {
    const batch = client.createBatch(partitionKey);

    testEntities.forEach((entity) => batch.deleteEntity(entity.partitionKey, entity.rowKey));
    const result = await batch.submitBatch();
    assert.equal(result.status, 202);
    assert.lengthOf(result.subResponses, 3);
    result.subResponses.forEach((subResponse) => {
      assert.equal(subResponse?.status, 204);
    });
  });

  it("should handle sub request error", async () => {
    const testClient = createTableClient("noExistingTable", authMode);
    const batch = testClient.createBatch(partitionKey);
    batch.createEntities(testEntities);

    try {
      await batch.submitBatch();
      assert.fail("Expected submitBatch to throw");
    } catch (error) {
      assert.equal(error.code, "TableNotFound");
      assert.equal(error.statusCode, 404);
      assert.isString(error.message);
    }
  });
});
