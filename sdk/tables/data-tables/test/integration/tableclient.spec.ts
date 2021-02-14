// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, TableEntity, Edm, odata } from "../../src";
import { assert } from "chai";
import { record, Recorder, isPlaybackMode, isLiveMode } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-http";

describe("TableClient", () => {
  let client: TableClient;
  let recorder: Recorder;
  const suffix = isNode ? "node" : "browser";
  const tableName = `tableClientTest${suffix}`;
  const listPartitionKey = "listEntitiesTest";
  // Cannot use SharedKey auth when using recordings since the signature uses the current date
  // which wouldn't match the recorded one. Fallingback to SAS for recorded tests.
  const authMode = !isNode || !isLiveMode() ? "SASConnectionString" : "AccountConnectionString";

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = record(this, recordedEnvironmentSetup);

    client = createTableClient(tableName, authMode);
  });

  before(async () => {
    if (!isPlaybackMode()) {
      client = createTableClient(tableName, authMode);
      await client.create();
    }
  });

  afterEach(async function() {
    await recorder.stop();
  });

  after(async () => {
    if (!isPlaybackMode()) {
      await client.delete();
    }
  });

  describe("listEntities", () => {
    // Create required entities for testing list operations
    before(async () => {
      if (!isPlaybackMode()) {
        await client.createEntity({
          partitionKey: listPartitionKey,
          rowKey: "binary1",
          foo: new Uint8Array([66, 97, 114])
        });

        for (let i = 0; i < 20; i++) {
          await client.createEntity({
            partitionKey: listPartitionKey,
            rowKey: `${i}`,
            foo: "testEntity"
          });
        }
      }
    });
    type StringEntity = { foo: string };
    type NumberEntity = { foo: number };
    type DateEntity = { foo: Date };
    type BooleanEntity = { foo: boolean };
    type Int64Entity = { foo: Edm<"Int64"> };
    type Int32Entity = { foo: Edm<"Int32"> };
    type BinaryEntity = { foo: Uint8Array };
    type TestEntity =
      | TableEntity<StringEntity>
      | TableEntity<NumberEntity>
      | TableEntity<DateEntity>
      | TableEntity<BooleanEntity>
      | TableEntity<Int64Entity>
      | TableEntity<Int32Entity>
      | TableEntity<BinaryEntity>;

    it("should list all", async function() {
      const totalItems = 21;
      const entities = client.listEntities<TestEntity>({
        queryOptions: { filter: odata`PartitionKey eq ${listPartitionKey}` }
      });
      const all: TestEntity[] = [];
      for await (const entity of entities) {
        all.push(entity);
      }

      assert.lengthOf(all, totalItems);
    });

    it("should list by page", async function() {
      const totalItems = 21;
      const maxPageSize = 5;
      const entities = client.listEntities<TestEntity>({
        queryOptions: { filter: odata`PartitionKey eq ${listPartitionKey}` }
      });
      let all: TestEntity[] = [];
      let i = 0;
      for await (const entity of entities.byPage({
        maxPageSize
      })) {
        i++;
        all = [...all, ...entity];
      }

      assert.lengthOf(all, totalItems);
      assert.equal(i, Math.ceil(totalItems / maxPageSize));
    });

    it("should list with filter", async function() {
      const barItems = 20;
      const strValue = "testEntity";
      const entities = client.listEntities<TableEntity<StringEntity>>({
        queryOptions: { filter: odata`foo eq ${strValue}` }
      });
      let all: TableEntity<StringEntity>[] = [];
      for await (const entity of entities) {
        all = [...all, entity];
      }

      assert.lengthOf(all, barItems);
    });

    it("should list binary with filter", async function() {
      const strValue = "binary1";
      const entities = client.listEntities<TableEntity<BinaryEntity>>({
        queryOptions: { filter: odata`RowKey eq ${strValue}` }
      });
      let all: TableEntity<BinaryEntity>[] = [];
      for await (const entity of entities) {
        assert.isDefined(entity.timestamp, "Expected timestamp to be defined in the entity");
        assert.isDefined(entity.etag, "Expected etag");
        all = [...all, entity];
      }

      assert.lengthOf(all, 1);

      if (isNode) {
        assert.deepEqual(all[0].foo, Buffer.from("Bar"));
      }

      if (!isNode) {
        assert.deepEqual(String.fromCharCode(...all[0].foo), "Bar");
      }
    });
  });

  describe("createEntity, getEntity and delete", () => {
    it("should createEntity with only primitives", async () => {
      type TestType = { testField: string };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P2_${suffix}`,
        rowKey: "R1",
        testField: "testEntity"
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.equal(result.testField, testEntity.testField);
    });

    it("should createEntity with Date", async () => {
      type TestType = {
        testField: Edm<"DateTime">;
      };

      const testDate = "2020-09-17T00:00:00.111Z";
      const testEntity = {
        partitionKey: `P2_${suffix}`,
        rowKey: "R2",
        testField: new Date(testDate)
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField.value, testDate);
    });

    it("should createEntity with Guid", async () => {
      type TestType = {
        testField: Edm<"Guid">;
      };

      const testGuid: Edm<"Guid"> = {
        value: "cf8ef051-1b7d-4e93-a1e5-a3944d7e441c",
        type: "Guid"
      };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P3_${suffix}`,
        rowKey: "R3",
        testField: testGuid
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField, testGuid);
    });

    it("should createEntity with Int64", async () => {
      type TestType = {
        testField: Edm<"Int64">;
      };
      const testInt64: Edm<"Int64"> = {
        value: "12345543221",
        type: "Int64"
      };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P4_${suffix}`,
        rowKey: "R4",
        testField: testInt64
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField, testInt64);
    });

    it("should createEntity with Int32", async () => {
      type TestType = {
        testField: Edm<"Int32">;
      };

      type ResponseType = {
        testField: number;
      };

      const testInt32: Edm<"Int32"> = {
        value: 123,
        type: "Int32"
      };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P5_${suffix}`,
        rowKey: "R5",
        testField: testInt32
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<ResponseType>(
        testEntity.partitionKey,
        testEntity.rowKey
      );
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);

      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField, 123);
    });

    it("should createEntity with Boolean", async () => {
      type TestType = {
        testField: Edm<"Boolean">;
      };

      type ResponseType = {
        testField: boolean;
      };

      const testBoolean: Edm<"Boolean"> = {
        value: true,
        type: "Boolean"
      };
      // Check this API interaction!
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P6_${suffix}`,
        rowKey: "R6",
        testField: testBoolean
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<ResponseType>(
        testEntity.partitionKey,
        testEntity.rowKey
      );
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.equal(result.testField, true);
    });

    it("should createEntity with DateTime", async () => {
      type TestType = {
        testField: Edm<"DateTime">;
      };
      const testDate = "2020-09-17T00:00:00.99999Z";
      const testDateTime: Edm<"DateTime"> = {
        value: testDate,
        type: "DateTime"
      };
      // Check this API interaction!
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P7_${suffix}`,
        rowKey: "R7",
        testField: testDateTime
      };
      const createResult = await client.createEntity(testEntity, {});
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField.value, testDate);
    });

    it("should createEntity with primitive int and float", async () => {
      type TestType = { integerNumber: number; floatingPointNumber: number };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P8_${suffix}`,
        rowKey: "R8",
        integerNumber: 3,
        floatingPointNumber: 3.14
      };
      const createResult = await client.createEntity(testEntity, {});
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      const deleteResult = await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey);

      assert.equal(deleteResult._response.status, 204);
      assert.equal(createResult._response.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.equal(result.integerNumber, 3);
      assert.equal(result.floatingPointNumber, 3.14);
    });
  });
});
