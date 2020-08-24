// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: Add tests for the TableServiceClient operations #9910
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient } from "../../src";
import { record, Recorder } from "@azure/test-utils-recorder";
import { recordedEnvironmentSetup, createTableServiceClient } from "./utils/recordedClient";
import { isNode } from "@azure/core-http";
import { assert } from "chai";

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
      const result = await client.listTables();
      const hasTable = result.some((r) => r.tableName === tableName);

      assert.equal(createResult._response.status, 201);
      assert.isTrue(hasTable);
    });
  });
});
