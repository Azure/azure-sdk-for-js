// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableItem, TableItemResultPage, TableServiceClient } from "../../src";
import { Context } from "mocha";
import { Recorder, isLiveMode, isPlaybackMode, record } from "@azure-tools/test-recorder";
import {
  CreateClientMode,
  createTableServiceClient,
  recordedEnvironmentSetup
} from "./utils/recordedClient";
import { isNode } from "@azure/test-utils";
import { assert } from "chai";
import { FullOperationResponse } from "@azure/core-client";

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
  describe(`TableServiceClient ${authMode}`, () => {
    let client: TableServiceClient;
    let recorder: Recorder;
    const suffix = isNode ? `${authMode}node` : `${authMode}browser`;

    beforeEach(function(this: Context) {
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
          if (table.name === tableName) {
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
      before(async function(this: Context) {
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

      after(async function(this: Context) {
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
        const all: TableItem[] = [];
        for await (const table of tables) {
          all.push(table);
        }
        for (let i = 0; i < expectedTotalItems; i++) {
          assert.isTrue(
            all.some((t) => t.name === `ListTableTest${suffix}${i}`),
            `Couldn't find table ListTableTest${suffix}${i}`
          );
        }
      });

      it("should list by page", async function() {
        let all: TableItem[] = [];
        const maxPageSize = 5;
        const tables = client.listTables();
        for await (const page of tables.byPage({
          maxPageSize
        })) {
          all = [...all, ...page];
          assert.isTrue(page.length <= 5);
        }

        for (let i = 0; i < expectedTotalItems; i++) {
          assert.isTrue(
            all.some((t) => t.name === `ListTableTest${suffix}${i}`),
            `Couldn't find table ListTableTest${suffix}${i}`
          );
        }
      });

      it("should list a specific page with continuationToken", async function() {
        const entities = client.listTables();

        let lastPage: TableItemResultPage | undefined;
        let lastContinuationToken: string | undefined;
        for await (const page of entities.byPage({
          maxPageSize: 2
        })) {
          if (page.continuationToken) {
            lastContinuationToken = page.continuationToken;
          }
          lastPage = page;
        }

        assert.isDefined(lastPage);
        assert.isDefined(lastContinuationToken);

        let result: TableItemResultPage | undefined;
        for await (const page of client.listTables().byPage({
          maxPageSize: 2,
          continuationToken: lastContinuationToken
        })) {
          result = page;
          break;
        }

        assert.deepEqual(result, lastPage);
      });
    });
  });
});
