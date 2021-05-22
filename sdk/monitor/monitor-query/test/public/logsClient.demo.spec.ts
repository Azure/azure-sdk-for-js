// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { CommonDurations, LogsClient } from "../../src";

describe("LogsClient live tests against the public demo server", function() {
  let demoLogsClient: LogsClient;

  before(() => {
    demoLogsClient = new LogsClient("DEMO_KEY");
  });

  it("using the demo api key", async () => {
    const result = await demoLogsClient.queryLogs(
      "DEMO_WORKSPACE",
      "AzureActivity | summarize count() by Category",
      {
        timespan: CommonDurations.last5Minutes
      }
    );
    assert.ok(result);
  });

  it("using the demo api key but with the wrong workspace (queryLogs)", async () => {
    try {
      await demoLogsClient.queryLogs(
        "some other workspace",
        "AzureActivity | summarize count() by Category"
      );
    } catch (err) {
      assert.equal(
        err.message,
        "This client was initialized with the DEMO_KEY and can only be used with a workspace ID of DEMO_WORKSPACE"
      );
    }
  });

  it("using the demo api key will always fail with queryLogsBatch (unsupported)", async () => {
    try {
      await demoLogsClient.queryLogsBatch({
        queries: [
          {
            query: "AzureActivity | summarize count() by Category",
            workspace: "some other workspace"
          }
        ]
      });
    } catch (err) {
      assert.equal(
        err.message,
        "This client was initialized with the DEMO_KEY, which does not support batch querying"
      );
    }
  });
});
