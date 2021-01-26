// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableResponseProperties, TableServiceClient } from "../../src";
import { record, Recorder, isPlaybackMode, isLiveMode } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableServiceClient } from "./utils/recordedClient";
import { isNode } from "../testUtils";
import { assert } from "chai";
import { FullOperationResponse } from "@azure/core-client";

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
      let createResult: FullOperationResponse | undefined;
      let deleteTableResult: FullOperationResponse | undefined;
      await client.createTable(tableName, { onResponse: (res) => (createResult = res) });
      const result = client.listTables();
      let hasTable = false;
      for await (const table of result) {
        if (table.tableName === tableName) {
          hasTable = true;
          break;
        }
      }

      await client.deleteTable(tableName, { onResponse: (res) => (deleteTableResult = res) });

      assert.equal(deleteTableResult?.status, 204);
      assert.equal(createResult?.status, 201);
      assert.isTrue(hasTable);
    });
  });

  describe("listTables", () => {
    const tableNames: string[] = [];
    const expectedTotalItems = 20;
    before(async function() {
      // Create tables to be listed
      if (!isPlaybackMode()) {
        this.timeout(10000);
        for (let i = 0; i < 20; i++) {
          const tableName = `ListTableTest${suffix}${i}`;
          await client.createTable(tableName);
          tableNames.push(tableName);
        }
      }
    });

    after(async function() {
      // Cleanup tables
      if (!isPlaybackMode()) {
        this.timeout(10000);
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
