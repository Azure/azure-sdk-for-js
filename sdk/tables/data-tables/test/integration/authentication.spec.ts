// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";
import { record, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { TableClient, TableServiceClient } from "../../src";
import {
  createTableClient,
  createTableServiceClient,
  recordedEnvironmentSetup
} from "./utils/recordedClient";

describe("Authentication", () => {
  let recorder: Recorder;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = record(this, recordedEnvironmentSetup);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("TableServiceClient", () => {
    it("should be able to make an authenticated call  using SASConnectionStringAuth", async () => {
      const client = createTableServiceClient("SASConnectionString");
      await testAuthenticatedServiceClient(client);
    });
    it("should be able to make an authenticated call  using SASToken", async () => {
      const client = createTableServiceClient("SASToken");
      await testAuthenticatedServiceClient(client);
    });
    it("should be able to make an authenticated call  using AccountKey", async function() {
      if (!isNode) {
        // eslint-disable-next-line no-invalid-this
        this.skip();
      }
      const client = createTableServiceClient("AccountKey");
      await testAuthenticatedServiceClient(client);
    });
    it("should be able to make an authenticated call  using AccountConnectionString", async function() {
      if (!isNode) {
        // eslint-disable-next-line no-invalid-this
        this.skip();
      }
      const client = createTableServiceClient("AccountConnectionString");
      await testAuthenticatedServiceClient(client);
    });
  });

  describe("TableClient", () => {
    const tableName = "integration";
    it("should be able to make an authenticated call  using SASConnectionStringAuth", async () => {
      const client = createTableClient(tableName, "SASConnectionString");
      await testAuthenticatedClient(client);
    });
    it("should be able to make an authenticated call  using SASToken", async () => {
      const client = createTableClient(tableName, "SASToken");
      await testAuthenticatedClient(client);
    });
    it("should be able to make an authenticated call  using AccountKey", async function() {
      if (!isNode) {
        // eslint-disable-next-line no-invalid-this
        this.skip();
      }
      const client = createTableClient(tableName, "AccountKey");
      await testAuthenticatedClient(client);
    });
    it("should be able to make an authenticated call  using AccountConnectionString", async function() {
      if (!isNode) {
        // eslint-disable-next-line no-invalid-this
        this.skip();
      }
      const client = createTableClient(tableName, "AccountConnectionString");
      await testAuthenticatedClient(client);
    });
  });
});

async function testAuthenticatedClient(client: TableClient): Promise<void> {
  let catchedException = undefined;
  let isSuccess = false;
  try {
    await client.createEntity({
      PartitionKey: "AuthTest",
      RowKey: `${Date.now()}`,
      foo: Date.now()
    });
    isSuccess = true;
  } catch (error) {
    catchedException = error;
    isSuccess = false;
  } finally {
    assert.isTrue(isSuccess, JSON.stringify(catchedException));
  }
}

async function testAuthenticatedServiceClient(client: TableServiceClient): Promise<void> {
  let catchedException = undefined;
  let isSuccess = false;
  try {
    await client.createTable(`Table${Date.now()}`);
    isSuccess = true;
  } catch (error) {
    catchedException = error;
    isSuccess = false;
  } finally {
    assert.isTrue(isSuccess, JSON.stringify(catchedException));
  }
}
