// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, TableEntity, Edm } from "../../src";
import { assert } from "chai";
import { record, Recorder } from "@azure/test-utils-recorder";
import { env } from "@azure/test-utils-recorder";

const mockAccountName = "fakestorageaccount";
const mockAccountKey = "aaaaa";
const connectionString = env["STORAGE_CONNECTION_STRING"] || "";
const recorderEnvSetup = {
  replaceableVariables: {
    STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`
  },
  customizationsOnRecordings: [
    // Used in record mode
    // Array of callback functions can be provided to customize the generated recordings in record mode
    // `sig` param of SAS Token is being filtered here
    (recording: string): string => recording
  ],
  // SAS token may contain sensitive information
  queryParametersToSkip: [
    // Used in record and playback modes
    "se",
    "sig",
    "sp",
    "spr",
    "srt",
    "ss",
    "st",
    "sv"
  ]
};

describe("TableClient", () => {
  let client: TableClient;
  let recorder: Recorder;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = record(this, recorderEnvSetup);
    const tableName = "integration";
    client = TableClient.fromConnectionString(connectionString, tableName);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("createEntity", () => {
    it("should createEntity with only primitives", async () => {
      const testEntity: TableEntity<{ testField: string }> = {
        PartitionKey: "P99",
        RowKey: "R1",
        testField: "testEntity"
      };
      const result = await client.createEntity(testEntity, {});

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.equal(result.testField, testEntity.testField);
    });

    it("should createEntity with Date", async () => {
      const testDate = new Date(2020, 8, 17);
      const testEntity: TableEntity<{ testField: Date }> = {
        PartitionKey: "P2",
        RowKey: "R2",
        testField: testDate
      };
      const result = await client.createEntity(testEntity, {});

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.deepEqual(result.testField, testDate);
    });

    it("should createEntity with Guid", async () => {
      const testGuid: Edm<"Guid"> = {
        value: "cf8ef051-1b7d-4e93-a1e5-a3944d7e441c",
        type: "Guid"
      };
      const testEntity: TableEntity<{ testField: Edm<"Guid"> }> = {
        PartitionKey: "P3",
        RowKey: "R3",
        testField: testGuid
      };
      const result = await client.createEntity(testEntity, {});

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.deepEqual(result.testField, testGuid);
    });

    it("should createEntity with Int64", async () => {
      const testInt64: Edm<"Int64"> = {
        value: "12345543221",
        type: "Int64"
      };
      const testEntity: TableEntity<{ testField: Edm<"Int64"> }> = {
        PartitionKey: "P4",
        RowKey: "R4",
        testField: testInt64
      };
      const result = await client.createEntity(testEntity, {});

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.deepEqual(result.testField, testInt64);
    });

    it("should createEntity with Int32", async () => {
      const testInt32: Edm<"Int32"> = { value: 123, type: "Int32" };
      const testEntity: TableEntity<{ testField: Edm<"Int32"> | number }> = {
        PartitionKey: "P5",
        RowKey: "R5",
        testField: testInt32
      };
      const result = await client.createEntity(testEntity, {});

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.deepEqual(result.testField, 123);
    });

    it("should createEntity with Boolean", async () => {
      const testBoolean: Edm<"Boolean"> = { value: true, type: "Boolean" };
      // Check this API interaction!
      const testEntity: TableEntity<{
        testField: Edm<"Boolean"> | boolean;
      }> = {
        PartitionKey: "P6",
        RowKey: "R6",
        testField: testBoolean
      };
      const result = await client.createEntity(testEntity, {});

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.equal(result.testField, true);
    });

    it("should createEntity with DateTime", async () => {
      const testDate = new Date(2020, 8, 17);
      const testDateTime: Edm<"DateTime"> = {
        value: testDate,
        type: "DateTime"
      };
      // Check this API interaction!
      const testEntity: TableEntity<{
        testField: Edm<"DateTime"> | Date;
      }> = {
        PartitionKey: "P7",
        RowKey: "R7",
        testField: testDateTime
      };
      const result = await client.createEntity(testEntity, {});

      assert.equal(result.PartitionKey, testEntity.PartitionKey);
      assert.equal(result.RowKey, testEntity.RowKey);
      assert.deepEqual(result.testField, testDate);
    });
  });
});
