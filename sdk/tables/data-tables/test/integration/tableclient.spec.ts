// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, TableEntity, Edm, odata } from "../../src";
import { assert } from "chai";
import { record, Recorder } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-http";

/**
 * NOTE: For running this tests with a TEST_MODE different to "playback", you will need to make
 * sure that the storage account these tests are run against meets the following requirements
 *
 * 1) Have a CORS rule to allow connections from browser tests
 * 2) Have 7000 entities in total of which
 *    2.1) 1000 are in this form {foo: "testEntity"} - PartitionKey and RowKey don't have any specific requirements
 *    2.1) 1 {RowKey: "binary1", foo: Buffer.from("Bar")} - PartitionKey doesn't have any specific requirements
 *
 * With Issue #10918 we'll have ARM templates that should make running live tests locally much easier
 */
describe("TableClient", () => {
  let client: TableClient;
  let recorder: Recorder;
  const suffix = isNode ? "_node" : "_browser";

  describe("createEntity and getEntity", () => {
    beforeEach(function() {
      // eslint-disable-next-line no-invalid-this
      recorder = record(this, recordedEnvironmentSetup);
      const tableName = "integration";
      client = createTableClient(tableName);
    });

    afterEach(async function() {
      await recorder.stop();
    });
    it("should createEntity with only primitives", async () => {
      type TestType = { testField: string };
      const testEntity: TableEntity<TestType> = {
        PartitionKey: `P2_${suffix}`,
        RowKey: "R1",
        testField: "testEntity"
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.PartitionKey, testEntity.RowKey);

      assert.equal(createResult._response.status, 204);
      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.equal(result.testField, testEntity.testField);
    });

    it("should createEntity with Date", async () => {
      type TestType = { testField: Date };
      const testDate = new Date(2020, 8, 17);
      const testEntity: TableEntity<TestType> = {
        PartitionKey: `P2_${suffix}`,
        RowKey: "R2",
        testField: testDate
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.PartitionKey, testEntity.RowKey);

      assert.equal(createResult._response.status, 204);
      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.deepEqual(result.testField, testDate);
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
        PartitionKey: `P3_${suffix}`,
        RowKey: "R3",
        testField: testGuid
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.PartitionKey, testEntity.RowKey);

      assert.equal(createResult._response.status, 204);
      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
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
        PartitionKey: `P4_${suffix}`,
        RowKey: "R4",
        testField: testInt64
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<TestType>(testEntity.PartitionKey, testEntity.RowKey);

      assert.equal(createResult._response.status, 204);
      assert.equal(result.RowKey, testEntity.RowKey);
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
        PartitionKey: `P5_${suffix}`,
        RowKey: "R5",
        testField: testInt32
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<ResponseType>(
        testEntity.PartitionKey,
        testEntity.RowKey
      );

      assert.equal(createResult._response.status, 204);

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
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
        PartitionKey: `P6_${suffix}`,
        RowKey: "R6",
        testField: testBoolean
      };
      const createResult = await client.createEntity(testEntity);
      const result = await client.getEntity<ResponseType>(
        testEntity.PartitionKey,
        testEntity.RowKey
      );

      assert.equal(createResult._response.status, 204);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.equal(result.testField, true);
    });

    it("should createEntity with DateTime", async () => {
      type TestType = {
        testField: Edm<"DateTime">;
      };

      type ResponseType = {
        testField: Date;
      };
      const testDate = new Date(2020, 8, 17);
      const testDateTime: Edm<"DateTime"> = {
        value: testDate,
        type: "DateTime"
      };
      // Check this API interaction!
      const testEntity: TableEntity<TestType> = {
        PartitionKey: `P7_${suffix}`,
        RowKey: "R7",
        testField: testDateTime
      };
      const createResult = await client.createEntity(testEntity, {});
      const result = await client.getEntity<ResponseType>(
        testEntity.PartitionKey,
        testEntity.RowKey
      );

      assert.equal(createResult._response.status, 204);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.deepEqual(result.testField, testDate);
    });

    it("should createEntity with primitive int and float", async () => {
      type TestType = { integerNumber: number; floatingPointNumber: number };
      const testEntity: TableEntity<TestType> = {
        PartitionKey: `P8_${suffix}`,
        RowKey: "R8",
        integerNumber: 3,
        floatingPointNumber: 3.14
      };
      const createResult = await client.createEntity(testEntity, {});
      const result = await client.getEntity<TestType>(testEntity.PartitionKey, testEntity.RowKey);

      assert.equal(createResult._response.status, 204);
      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.equal(result.integerNumber, 3);
      assert.equal(result.floatingPointNumber, 3.14);
    });
  });

  describe("listEntities", () => {
    beforeEach(function() {
      // eslint-disable-next-line no-invalid-this
      recorder = record(this, recordedEnvironmentSetup);
      const tableName = "list";
      client = createTableClient(tableName);
    });

    afterEach(async function() {
      await recorder.stop();
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
      const totalItems = 7000;
      const entities = client.listEntities<TestEntity>();
      const all: TestEntity[] = [];
      for await (const entity of entities) {
        all.push(entity);
      }

      assert.lengthOf(all, totalItems);
    }).timeout(60000);

    it("should list by page", async function() {
      const totalItems = 7000;
      const maxPageSize = 500;
      const entities = client.listEntities<TestEntity>();
      let all: TestEntity[] = [];
      let i = 0;
      for await (const entity of entities.byPage({
        maxPageSize
      })) {
        i++;
        all = [...all, ...entity];
      }

      assert.lengthOf(all, 7000);
      assert.equal(i, totalItems / maxPageSize);
    }).timeout(60000);

    it("should list with filter", async function() {
      const barItems = 1000;
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
});
