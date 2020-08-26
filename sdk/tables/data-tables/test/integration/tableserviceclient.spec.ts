// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: Add tests for the TableServiceClient operations #9910
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableResponseProperties, TableServiceClient } from "../../src";
import { record, Recorder } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableServiceClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-http";
import { assert } from "chai";
import { TableProperties } from "../../src/generated";

describe("TableServiceClient", () => {
  let client: TableServiceClient;
  let recorder: Recorder;
  const suffix = isNode ? "node" : "browser";

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = record(this, recordedEnvironmentSetup);
    client = createTableServiceClient();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // describe.only("PopulateTestTables", () => {
  //   it("create tables", async function() {
  //     for (let i = 0; i < 3000; i++) {
  //       const tableName = `testTable${i}${suffix}`;
  //       client.createTable(tableName);
  //     }
  //   }).timeout("60000");
  // });

  describe("Create and get table", () => {
    it("should create new table", async () => {
      const tableName = `testTable${suffix}`;
      const createResult = await client.createTable(tableName);
      const result = await client.listTables();
      let hasTable = false;
      for await (let table of result) {
        if (table.tableName === tableName) {
          hasTable = true;
          break;
        }
      }

      assert.equal(createResult._response.status, 201);
      assert.isTrue(hasTable);
    });
  });

  describe.only("listTables", () => {
    it("should list all", async () => {
      const totalItems = 3000;
      const entities = await client.listTables();
      let all: TableResponseProperties[] = [];
      for await (let entity of entities) {
        all.push(entity);
      }

      assert.isTrue(all.length >= totalItems);
    });

    it("should list by page", async function() {
      const totalItems = 3000;
      const maxPageSize = 500;
      const entities = await client.listTables();
      let all: TableProperties[] = [];
      let i = 0;
      for await (let entity of entities.byPage({
        maxPageSize
      })) {
        i++;
        all = [...all, ...entity];
      }

      assert.isTrue(all.length >= totalItems);
      assert.isTrue(i >= all.length / maxPageSize);
    });
  });
});
