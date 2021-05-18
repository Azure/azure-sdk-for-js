// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { BatchRequest, LogsClient, Table } from "../../src";

import { createTestClientSecretCredential, getMonitorWorkspaceId } from "./shared/testShared";

describe("LogsClient live tests", function() {
  // TODO: temporarily disabling the recorder for metrics, which appears to be failing in identity.
  // addTestRecorderHooks();

  let monitorWorkspaceId: string;
  let client: LogsClient;

  before(function(this: Context) {
    monitorWorkspaceId = getMonitorWorkspaceId(this);
    client = new LogsClient(createTestClientSecretCredential());
  });

  it("queryLogs", async () => {
    const singleQueryLogsResult = await client.queryLogs(
      monitorWorkspaceId,
      "AppEvents | summarize count() by bin(TimeGenerated, 1h) | order by TimeGenerated desc | limit 10"
    );

    const tables: Table[] | undefined = singleQueryLogsResult.tables;

    if (tables == null) {
      throw new Error("No tables in result");
    }

    // TODO: the actual types aren't being deserialized (everything is coming back as 'string')
    // this is incorrect, it'll be updated.

    // example output:
    // TimeGenerated(datetime) | count_(long);
    // "2021-05-03T18:00:00Z" | "266";
    // "2021-05-03T17:00:00Z" | "2811";
    // "2021-05-03T16:00:00Z" | "2811";
    // "2021-05-03T15:00:00Z" | "2823";
    // "2021-05-03T14:00:00Z" | "2846";
    // "2021-05-03T13:00:00Z" | "2775";
    // "2021-05-03T12:00:00Z" | "2743";
    // "2021-05-03T11:00:00Z" | "2822";
    // "2021-05-03T10:00:00Z" | "2830";
    // "2021-05-03T09:00:00Z" | "2813";
    // printLogQueryTables(tables);

    assert.ok(singleQueryLogsResult, "Single query logs result");
  });

  it("queryLogsBatch", async () => {
    const batchRequest: BatchRequest = {
      requests: [
        // QueryBody
        {
          // TODO: despite this being marked as optional it appears to actually be _required_
          id: "operationMaor",
          // RestError: The request had some invalid properties
          workspace: monitorWorkspaceId,
          body: {
            // TODO: workspace can be specified at _several_ levels. I'm not sure which field is used for which.
            workspaceIds: [monitorWorkspaceId],
            // workspaces: [monitorWorkspaceId],
            query:
              "AppEvents | summarize count() by bin(TimeGenerated, 1h) | order by TimeGenerated desc | limit 10"
          }
        }
      ]
    };

    try {
      const batchQueryLogsResult = await client.queryLogsBatch(batchRequest);
      assert.ok(batchQueryLogsResult, "Batch query logs result");

      // TODO: what would show up in here and when?
      // batchQueryLogsResult.error

      if (batchQueryLogsResult.responses == null) {
        throw new Error("batchQueryLogsResult.responses is null");
      }

      for (const logQueryResponse of batchQueryLogsResult.responses) {
        if (logQueryResponse.body?.tables == null) {
          throw new Error("logQueryResponse.body?.tables is null");
        }

        // example output:
        // TimeGenerated(datetime) | count_(long);
        // "2021-05-03T18:00:00Z" | "2066";
        // "2021-05-03T17:00:00Z" | "2811";
        // "2021-05-03T16:00:00Z" | "2811";
        // "2021-05-03T15:00:00Z" | "2823";
        // "2021-05-03T14:00:00Z" | "2846";
        // "2021-05-03T13:00:00Z" | "2775";
        // "2021-05-03T12:00:00Z" | "2743";
        // "2021-05-03T11:00:00Z" | "2822";
        // "2021-05-03T10:00:00Z" | "2830";
        // "2021-05-03T09:00:00Z" | "2813";
        // printLogQueryTables(logQueryResponse.body?.tables);
      }
    } catch (err) {
      console.log(`Error thrown: `, err);
      throw err;
    }
  });

  it("serverTimeoutInSeconds", async () => {
    // TODO: serverTimeoutInSeconds is passed. We need to have a deterministic way to test this, however.
    const query = await client.queryLogs(monitorWorkspaceId, "AppEvents | limit 1", {
      serverTimeoutInSeconds: 10
    });

    assert.ok(query);
  });

  it("includeQueryStatistics", async () => {
    const query = await client.queryLogs(monitorWorkspaceId, "AppEvents | limit 1", {
      includeQueryStatistics: true
    });

    // TODO: statistics are not currently modeled in the generated code.

    // do a very basic check that the statistics were returnedassert.
    assert.ok(query.statistics?.query?.executionTime);
  });
});
