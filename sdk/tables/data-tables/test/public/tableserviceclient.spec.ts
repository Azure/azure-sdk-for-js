// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { TableItem, TableItemResultPage, TableServiceClient, odata } from "../../src";

import { Context } from "mocha";
import { FullOperationResponse } from "@azure/core-client";
import { assert } from "@azure/test-utils";
import { createTableServiceClient } from "./utils/recordedClient";
import { isNode } from "@azure/test-utils";

describe(`TableServiceClient`, () => {
  let client: TableServiceClient;
  let recorder: Recorder;
  const suffix = isNode ? `node` : `browser`;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createTableServiceClient("SASConnectionString", recorder);
  });

  afterEach(async function () {
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
    let unRecordedClient: TableServiceClient;
    before(async function (this: Context) {
      // Create tables to be listed
      if (!isPlaybackMode()) {
        unRecordedClient = await createTableServiceClient("SASConnectionString");
        this.timeout(10000);
        for (let i = 0; i < 20; i++) {
          const tableName = `ListTableTest${suffix}${i}`;
          await unRecordedClient.createTable(tableName);
          tableNames.push(tableName);
        }
      }
    });

    after(async function (this: Context) {
      // Cleanup tables
      if (!isPlaybackMode()) {
        this.timeout(10000);
        try {
          for (const table of tableNames) {
            await unRecordedClient.deleteTable(table);
          }
        } catch (error: any) {
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

    it("should list with filter", async () => {
      const tableName = `ListTableTest${suffix}1`;
      const tables = client.listTables({
        queryOptions: { filter: odata`TableName eq ${tableName}` },
      });
      const all: TableItem[] = [];
      for await (const table of tables) {
        all.push(table);
      }

      assert.lengthOf(all, 1);
    });

    it("should list by page", async function () {
      let all: TableItem[] = [];
      const maxPageSize = 5;
      const tables = client.listTables();
      for await (const page of tables.byPage({
        maxPageSize,
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

    it("should list by page with filter", async function () {
      let all: TableItem[] = [];
      const tableName = `ListTableTest${suffix}1`;
      const tables = client.listTables({
        queryOptions: { filter: odata`TableName eq ${tableName}` },
      });

      for await (const page of tables.byPage()) {
        all = [...all, ...page];
      }

      assert.lengthOf(all, 1);
    });

    it("should list a specific page with continuationToken", async function () {
      const entities = client.listTables();

      let lastPage: TableItemResultPage | undefined;
      let lastContinuationToken: string | undefined;
      for await (const page of entities.byPage({
        maxPageSize: 2,
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
        continuationToken: lastContinuationToken,
      })) {
        result = page;
        break;
      }

      assert.deepEqual(result, lastPage);
    });
  });
  describe("Statistics", () => {
    it("should getStatistics", async () => {
      const result = await client.getStatistics();
      assert.deepEqual(result.geoReplication?.status, "live");
    });
  });

  describe("tracing", () => {
    it("should trace through the various operations", async () => {
      const tableName = `testTracing${suffix}`;
      await recorder.setMatcher("HeaderlessMatcher");
      await assert.supportsTracing(
        async (options) => {
          await client.createTable(tableName, options);
          await client.getProperties(options);
          try {
            await client.setProperties({}, options);
          } catch {
            // ignore exceptions
          }
          try {
            await client.getStatistics(options);
          } catch {
            // ignore exceptions
          }
          await client.deleteTable(tableName, options);
        },
        [
          "TableServiceClient.createTable",
          "TableServiceClient.getProperties",
          "TableServiceClient.setProperties",
          "TableServiceClient.getStatistics",
          "TableServiceClient.deleteTable",
        ]
      );
    });
  });
});
