// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableResponseProperties, TableServiceClient } from "../../src";
import { record, Recorder } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableServiceClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-http";
import { assert } from "chai";

/**
 * NOTE: For running this tests with a TEST_MODE different to "playback", you will need to make
 * sure that the storage account these tests are run against meets the following requirements
 *
 * 1) Have a CORS rule to allow connections from browser tests
 * 2) Create 3553 tables so that list tests can be run. Alternatively you can create as many tables
 *    as you need but will need to update the expected values in the test below.
 *
 * With Issue #10918 we'll have ARM templates that should make running live tests locally much easier
 */
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

  describe("Create and get table", () => {
    it("should create new table", async () => {
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

      assert.equal(createResult._response.status, 201);
      assert.isTrue(hasTable);
    });
  });

  describe("listTables", () => {
    it("should list all", async () => {
      const totalItems = 3553;
      const entities = client.listTables();
      const all: TableResponseProperties[] = [];
      for await (const entity of entities) {
        all.push(entity);
      }

      assert.equal(all.length, totalItems);
    }).timeout(60000);

    it("should list by page", async function() {
      const maxPageSize = 500;
      const entities = client.listTables();
      let totalItems = 0;
      for await (const page of entities.byPage({
        maxPageSize
      })) {
        totalItems += page.length;
        assert.isTrue(page.length <= 500);
      }

      assert.equal(totalItems, 3553);
    });
  });
});
