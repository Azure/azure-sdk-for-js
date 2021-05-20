// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { BatchRequest, CommonDurations, LogsClient, QueryLogsResult, Table } from "../../src";
import { runWithTelemetry } from "../setupOpenTelemetry";

import { createTestClientSecretCredential, getMonitorWorkspaceId } from "./shared/testShared";

describe("LogsClient live tests", function() {
  // TODO: temporarily disabling the recorder for metrics, which appears to be failing in identity.
  // addTestRecorderHooks();

  let monitorWorkspaceId: string;
  let client: LogsClient;
  let testRunId: number;
  let standardQuery: string;

  before(async function(this: Context) {
    testRunId = Date.now();
    console.log(`testRunId = ${testRunId}`);

    monitorWorkspaceId = getMonitorWorkspaceId(this);
    client = new LogsClient(createTestClientSecretCredential());

    // send some events
    runWithTelemetry((provider) => {
      const tracer = provider.getTracer("logsClientTests");

      const span = tracer.startSpan("testSpan", {
        attributes: {
          testRunId: testRunId
        }
      });

      span.end();
    });

    standardQuery = `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Name, Target, TestRunId=Properties['testRunId']`;

    // (we'll wait until the data is there before running all the tests)
    // by coincidence one of the tests tries this same query.
    await queryLogsWithTestRetries({
      query: standardQuery,
      maxTries: 20,
      secondsBetweenQueries: 10
    });
  });

  it("queryLogs", async () => {
    const singleQueryLogsResult = await client.queryLogs(monitorWorkspaceId, standardQuery);

    const tables: Table[] | undefined = singleQueryLogsResult.tables;

    if (tables == null || tables.length === 0) {
      throw new Error("No tables in result");
    }

    // TODO: the actual types aren't being deserialized (everything is coming back as 'string')
    // this is incorrect, it'll be updated.

    assert.equal(tables[0].name, "PrimaryResult");
    assert.deepEqual(
      tables[0].columns.map((c) => c.name),
      ["Name", "Target", "TestRunId"]
    );
    assert.deepEqual(tables[0].rows?.[0], ["testSpan", "testSpan", testRunId.toString()]);
  });

  it("queryLogsBatch", async () => {
    const batchRequest: BatchRequest = {
      requests: [
        // QueryBody
        {
          id: "arbitraryOperationName",
          // RestError: The request had some invalid properties
          workspace: monitorWorkspaceId,
          body: {
            workspaceIds: [monitorWorkspaceId],
            query: standardQuery
          }
        }
      ]
    };

    const batchQueryLogsResult = await client.queryLogsBatch(batchRequest);
    const tables = batchQueryLogsResult.responses?.[0].body?.tables;

    assert.deepEqual(
      tables?.[0].columns.map((c) => c.name),
      ["Name", "Target", "TestRunId"]
    );
    assert.deepEqual(tables?.[0].rows?.[0], ["testSpan", "testSpan", testRunId.toString()]);
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

  async function queryLogsWithTestRetries(args: {
    query: string;
    secondsBetweenQueries: number;
    maxTries: number;
  }): Promise<QueryLogsResult> {
    for (let i = 0; i < args.maxTries; ++i) {
      const result = await client.queryLogs(monitorWorkspaceId, args.query, {
        timespan: CommonDurations.last30Minutes
      });

      const numRows = result.tables?.[0].rows?.length;

      if (numRows != null && numRows > 0) {
        return result;
      }

      await new Promise((resolve) => setTimeout(resolve, args.secondsBetweenQueries * 1000));
    }

    throw new Error(`All retries exhausted - no data returned for query '${args.query}'`);
  }
});
