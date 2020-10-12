// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableResponseProperties, TableServiceClient } from "../../src";
import { record, Recorder, isPlaybackMode, isLiveMode } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableServiceClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-http";
import { assert } from "chai";

describe("TableServiceClient", () => {
  let client: TableServiceClient;
  let recorder: Recorder;
  const suffix = isNode ? "node" : "browser";
  const authMode = !isNode || !isLiveMode() ? "SASConnectionString" : "AccountConnectionString";

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = record(this, recordedEnvironmentSetup);
    client = createTableServiceClient(authMode);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("Create, get table and delete", () => {
    it("should create new table, then delete", async () => {
      const tableName = `testTable${suffix}`;
      const createResult = await client.createTable(tableName);
      const result = client.listTables();
      let hasTable = false;
      for await (const table of result) {
        if (table.tableName === tableName) {
          hasTable = true;
          break;
        }
      }

      const deleteTableResult = await client.deleteTable(tableName);

      assert.equal(deleteTableResult._response.status, 204);
      assert.equal(createResult._response.status, 201);
      assert.isTrue(hasTable);
    });
  });

  describe("listTables", () => {
    const tableNames: string[] = [];
    const expectedTotalItems = 20;
    before(async () => {
      // Create tables to be listed
      if (!isPlaybackMode()) {
        for (let i = 0; i < 20; i++) {
          const tableName = `ListTableTest${suffix}${i}`;
          await client.createTable(tableName);
          tableNames.push(tableName);
        }
      }
    });

    after(async () => {
      // Cleanup tables
      if (!isPlaybackMode()) {
        try {
          for (const table of tableNames) {
            await client.deleteTable(table);
          }
        } catch (error) {
          console.warn(`Failed to delete a table during cleanup`);
        }
      }
    });

    it("should list all", async () => {
      const tables = client.listTables();
      const all: TableResponseProperties[] = [];
      for await (const table of tables) {
        all.push(table);
      }
      assert.equal(all.length, expectedTotalItems);
    });

    it("should list by page", async function() {
      const maxPageSize = 5;
      const tables = client.listTables();
      let totalItems = 0;
      for await (const page of tables.byPage({
        maxPageSize
      })) {
        totalItems += page.length;
        assert.isTrue(page.length <= 5);
      }

      assert.equal(totalItems, expectedTotalItems);
    });
  });
});
