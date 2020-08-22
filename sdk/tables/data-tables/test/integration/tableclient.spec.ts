// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, TableEntity, Edm } from "../../src";
import { assert } from "chai";
import { record, Recorder } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-http";

describe("TableClient", () => {
  let client: TableClient;
  let recorder: Recorder;
  const suffix = isNode ? "_node" : "_browser";

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = record(this, recordedEnvironmentSetup);
    const tableName = "integration";
    client = createTableClient(tableName);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("createEntity and getEntity", () => {
    it("should createEntity with only primitives", async () => {
      type TestType = { testField: string };
      const testEntity: TableEntity<TestType> = {
        PartitionKey: `P2_${suffix}`,
        RowKey: "R1",
        testField: "testEntity"
      };
      const createResult = await client.createEntity(testEntity, {});
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
      const createResult = await client.createEntity(testEntity, {});
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
      const createResult = await client.createEntity(testEntity, {});
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
      const createResult = await client.createEntity(testEntity, {});
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
      const createResult = await client.createEntity(testEntity, {});
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
      const createResult = await client.createEntity(testEntity, {});
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
});
