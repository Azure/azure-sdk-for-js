// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Edm, TableClient, TableEntity, TableEntityResult, odata } from "../../src";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { isNode, isNode8 } from "@azure/test-utils";

import { Context } from "mocha";
import { FullOperationResponse } from "@azure/core-client";
import { assert } from "@azure/test-utils";
import { createTableClient } from "./utils/recordedClient";

describe("special characters", () => {
  const tableName = `SpecialChars`;
  let recorder: Recorder;
  let client: TableClient;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createTableClient(tableName, "SASConnectionString", recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should handle partition and row keys with special chars", async function (this: Context) {
    await client.createTable();

    try {
      const partitionKey = "A'aaa_bbbb2\"";
      const rowKey = `"A'aaa_bbbb2`;
      const expectedValue = `"A'aaa_bbbb2`;
      await client.createEntity({
        partitionKey,
        rowKey,
        test: expectedValue,
      });

      const entity = await client.getEntity(partitionKey, rowKey);
      assert.equal(entity.partitionKey, partitionKey);
      assert.equal(entity.rowKey, rowKey);
      assert.equal(entity.test, expectedValue);
    } finally {
      await client.deleteTable();
    }
  });
});

// Run the test against each of the supported auth modes
describe(`TableClient`, () => {
  let client: TableClient;
  let unRecordedClient: TableClient;
  let recorder: Recorder;
  const suffix = isNode ? "node" : "browser";
  const tableName = `tableClientTest${suffix}`;
  const listPartitionKey = "listEntitiesTest";

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createTableClient(tableName, "SASConnectionString", recorder);
  });

  before(async () => {
    if (!isPlaybackMode()) {
      unRecordedClient = await createTableClient(tableName, "SASConnectionString");
      await unRecordedClient.createTable();
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  after(async () => {
    if (!isPlaybackMode()) {
      unRecordedClient = await createTableClient(tableName, "SASConnectionString");
      await unRecordedClient.deleteTable();
    }
  });

  describe("listEntities", () => {
    // Create required entities for testing list operations
    before(async function (this: Context) {
      unRecordedClient = await createTableClient(tableName, "SASConnectionString");
      if (!isPlaybackMode()) {
        this.timeout(10000);
        await unRecordedClient.createEntity({
          partitionKey: listPartitionKey,
          rowKey: "binary1",
          foo: new Uint8Array([66, 97, 114]),
        });

        for (let i = 0; i < 20; i++) {
          await unRecordedClient.createEntity({
            partitionKey: listPartitionKey,
            rowKey: `${i}`,
            foo: "testEntity",
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

    it("should list all", async function () {
      const totalItems = 21;
      const entities = client.listEntities<TestEntity>({
        queryOptions: { filter: odata`PartitionKey eq ${listPartitionKey}` },
      });
      const all: TestEntity[] = [];
      for await (const entity of entities) {
        all.push(entity);
      }

      assert.lengthOf(all, totalItems);
    }).timeout(10000);

    it("should list by page", async function () {
      const barItems = 20;
      const maxPageSize = 5;
      const entities = client.listEntities<TestEntity>({
        queryOptions: { filter: odata`PartitionKey eq ${listPartitionKey}` },
      });
      let all: TestEntity[] = [];
      for await (const entity of entities.byPage({
        maxPageSize,
      })) {
        all = [...all, ...entity];
      }
      for (let i = 0; i < barItems; i++) {
        assert.isTrue(
          all.some((e) => e.rowKey === `${i}`),
          `Couldn't find entity with row key ${i}`
        );
      }

      assert.isTrue(
        all.some((e) => e.rowKey === `binary1`),
        `Couldn't find entity with row key binary1`
      );
    });

    it("should list with filter", async function () {
      const barItems = 20;
      const strValue = "testEntity";
      const entities = client.listEntities<TableEntity<StringEntity>>({
        queryOptions: { filter: odata`foo eq ${strValue}` },
      });
      let all: TableEntity<StringEntity>[] = [];
      for await (const entity of entities) {
        all = [...all, entity];
      }

      for (let i = 0; i < barItems; i++) {
        assert.isTrue(
          all.some((e) => e.rowKey === `${i}`),
          `Couldn't find entity with row key ${i}`
        );
      }
    });

    it("should list binary with filter", async function () {
      const strValue = "binary1";
      const entities = client.listEntities<TableEntity<BinaryEntity>>({
        queryOptions: { filter: odata`RowKey eq ${strValue}` },
      });
      let all: TableEntity<BinaryEntity>[] = [];
      for await (const entity of entities) {
        assert.isDefined(entity.timestamp, "Expected timestamp to be defined in the entity");
        assert.isDefined(entity.etag, "Expected etag");
        all = [...all, entity];
      }

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
        testField: "testEntity",
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.equal(result.testField, testEntity.testField);
    });

    it("should createEntity empty partition and row keys", async () => {
      type TestType = { testField: string };
      const testEntity: TableEntity<TestType> = {
        partitionKey: "",
        rowKey: "",
        testField: "testEntity",
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.equal(result.testField, testEntity.testField);
    });

    it("should create binary entities as primitive and metadata", async () => {
      const primitive = new Uint8Array([66, 97, 114]);
      interface TestEntity extends TableEntity {
        binary: Uint8Array;
        binaryMetadata: Edm<"Binary">;
      }

      interface TestResult extends TableEntityResult<Record<string, unknown>> {
        binary: Uint8Array;
        binaryMetadata: Uint8Array;
      }

      const expected: TestEntity = {
        partitionKey: `CreateBinary_${suffix}`,
        rowKey: `first_${suffix}`,
        binary: primitive,
        binaryMetadata: {
          type: "Binary",
          value: "QmFy",
        },
      };

      await client.createEntity(expected);

      const result = await client.getEntity<TestResult>(expected.partitionKey, expected.rowKey);

      if (isNode) {
        assert.deepEqual(result.binary, Buffer.from("Bar"));
        assert.deepEqual(result.binaryMetadata, Buffer.from("Bar"));
      }

      if (!isNode) {
        assert.deepEqual(String.fromCharCode(...result.binary), "Bar");
        assert.deepEqual(String.fromCharCode(...result.binaryMetadata), "Bar");
      }
    });

    it("should create binary entities without automatic type conversion", async () => {
      const primitive = new Uint8Array([66, 97, 114]);
      const base64Value = "QmFy";
      interface TestEntity extends TableEntity {
        binary: Uint8Array;
        binaryMetadata: Edm<"Binary">;
      }

      interface TestResult extends TableEntityResult<Record<string, unknown>> {
        binary: Edm<"Binary">;
        binaryMetadata: Edm<"Binary">;
      }

      const expected: TestEntity = {
        partitionKey: `CreateBinary_${suffix}`,
        rowKey: `second_${suffix}`,
        binary: primitive,
        binaryMetadata: {
          type: "Binary",
          value: base64Value,
        },
      };

      await client.createEntity(expected);

      const result = await client.getEntity<TestResult>(expected.partitionKey, expected.rowKey, {
        disableTypeConversion: true,
      });

      assert.deepEqual(result.binary.value, base64Value);
      assert.deepEqual(result.binaryMetadata.value, base64Value);
    });

    it("should select specific properties", async () => {
      const testEntity = {
        partitionKey: `P2_${suffix}`,
        rowKey: "R1",
        foo: "testEntity",
        bar: 123,
        baz: true,
      };

      await client.createEntity(testEntity);

      const result = await client.getEntity(testEntity.partitionKey, testEntity.rowKey, {
        queryOptions: { select: ["baz", "partitionKey", "rowKey", "etag"] },
      });

      assert.isDefined(result.etag);
      assert.equal(result.baz, testEntity.baz);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);

      // properties not included in select should be undefined in the result
      assert.isUndefined(result.bar);
      assert.isUndefined(result.foo);
    });

    it("should createEntity with Date", async () => {
      const testDate = "2020-09-17T00:00:00.111Z";
      const testEntity = {
        partitionKey: `P2_${suffix}`,
        rowKey: "R2",
        testField: new Date(testDate),
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity(testEntity.partitionKey, testEntity.rowKey);
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField, new Date(testDate));
    });

    it("should createEntity with Guid", async () => {
      type TestType = {
        testField: Edm<"Guid">;
      };

      const testGuid: Edm<"Guid"> = {
        value: "cf8ef051-1b7d-4e93-a1e5-a3944d7e441c",
        type: "Guid",
      };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P3_${suffix}`,
        rowKey: "R3",
        testField: testGuid,
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField, testGuid);
    });

    it("should createEntity with Int64", async function (this: Mocha.Context) {
      if (isNode8) {
        this.skip();
      }
      type TestType = {
        testField: Edm<"Int64">;
      };
      const testInt64: Edm<"Int64"> = {
        value: "12345543221",
        type: "Int64",
      };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P4_${suffix}`,
        rowKey: "R4",
        testField: testInt64,
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity(testEntity.partitionKey, testEntity.rowKey);
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.equal(typeof result.testField, "bigint");
      assert.deepEqual(result.testField, BigInt(testInt64.value));
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
        type: "Int32",
      };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P5_${suffix}`,
        rowKey: "R5",
        testField: testInt32,
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity<ResponseType>(
        testEntity.partitionKey,
        testEntity.rowKey
      );
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);

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
        type: "Boolean",
      };
      // Check this API interaction!
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P6_${suffix}`,
        rowKey: "R6",
        testField: testBoolean,
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity<ResponseType>(
        testEntity.partitionKey,
        testEntity.rowKey
      );
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
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
        type: "DateTime",
      };
      // Check this API interaction!
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P7_${suffix}`,
        rowKey: "R7",
        testField: testDateTime,
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey, {
        disableTypeConversion: true,
      });
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.testField.value, testDate);
    });

    it("should createEntity with primitive int and float", async () => {
      type TestType = { integerNumber: number; floatingPointNumber: number };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P8_${suffix}`,
        rowKey: "R8",
        integerNumber: 3,
        floatingPointNumber: 3.14,
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, { onResponse: (res) => (createResult = res) });
      const result = await client.getEntity<TestType>(testEntity.partitionKey, testEntity.rowKey);
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.equal(result.integerNumber, 3);
      assert.equal(result.floatingPointNumber, 3.14);
    });

    it("should createEntity with double number in scientific notation", async () => {
      const inputEntity = {
        partitionKey: "doubleSci",
        rowKey: "0",
        Value: { value: "1.23456789012346e+24", type: "Double" },
      };

      await client.createEntity(inputEntity);

      const result = await client.getEntity(inputEntity.partitionKey, inputEntity.rowKey, {
        disableTypeConversion: true,
      });

      assert.deepEqual(result.Value, inputEntity.Value);
    });

    it("should createEntity with empty string", async () => {
      const inputEntity = {
        partitionKey: "emptyString",
        rowKey: "0",
        value: { value: "", type: "String" },
      };

      await client.createEntity(inputEntity);

      const result = await client.getEntity(inputEntity.partitionKey, inputEntity.rowKey, {
        disableTypeConversion: true,
      });

      assert.deepEqual(result.value, inputEntity.value);
    });

    it("should createEntity with primitive int and float without automatic type conversion", async () => {
      type TestType = {
        integerNumber: number;
        floatingPointNumber: number;
        booleanValue: boolean;
      };
      const testEntity: TableEntity<TestType> = {
        partitionKey: `P8_${suffix}`,
        rowKey: "R8",
        integerNumber: 3,
        floatingPointNumber: 3.14,
        booleanValue: true,
      };
      let createResult: FullOperationResponse | undefined;
      let deleteResult: FullOperationResponse | undefined;
      await client.createEntity(testEntity, {
        onResponse: (res) => (createResult = res),
      });
      const result = await client.getEntity(testEntity.partitionKey, testEntity.rowKey, {
        disableTypeConversion: true,
      });
      await client.deleteEntity(testEntity.partitionKey, testEntity.rowKey, {
        onResponse: (res) => (deleteResult = res),
      });

      assert.equal(deleteResult?.status, 204);
      assert.equal(createResult?.status, 204);
      assert.equal(result.partitionKey, testEntity.partitionKey);
      assert.equal(result.rowKey, testEntity.rowKey);
      assert.deepEqual(result.integerNumber, {
        value: "3",
        type: "Int32",
      });
      assert.deepEqual(result.floatingPointNumber, {
        value: "3.14",
        type: "Double",
      });
      assert.deepEqual(result.booleanValue, {
        value: "true",
        type: "Boolean",
      });
    });
  });

  describe("tracing", () => {
    it("should trace through the various operations", async () => {
      await assert.supportsTracing(
        async (options) => {
          await client.createTable(options);
          const entity = {
            partitionKey: "A'aaa_bbbb2\"",
            rowKey: `"A'aaa_bbbb2`,
          };
          await client.createEntity(entity, options);
          await client.upsertEntity(entity, "Replace", options);
          await client.getEntity(entity.partitionKey, entity.rowKey, options);
          await client.updateEntity(entity, "Replace", options);
          await client.listEntities(options).byPage().next();
          await client.deleteEntity(entity.partitionKey, entity.rowKey, options);
          await client.deleteTable(options);
        },
        [
          "TableClient.createTable",
          "TableClient.createEntity",
          "TableClient.upsertEntity",
          "TableClient.getEntity",
          "TableClient.updateEntity",
          "TableClient.listEntitiesPage",
          "TableClient.deleteEntity",
          "TableClient.deleteTable",
        ]
      );
    });
  });
});
