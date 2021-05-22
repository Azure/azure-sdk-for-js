// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { env } from "process";

import { QueryLogsBatch, CommonDurations, LogsClient } from "../../src";
import { runWithTelemetry } from "../setupOpenTelemetry";

import {
  assertQueryTable,
  createTestClientSecretCredential,
  getMonitorWorkspaceId,
  loggerForTest
} from "./shared/testShared";
import { ErrorInfo } from "../../src/generated/logquery/src";
import { RestError } from "@azure/core-http";

describe("LogsClient live tests", function() {
  let monitorWorkspaceId: string;
  let client: LogsClient;
  let testRunId: string;

  before(function(this: Context) {
    monitorWorkspaceId = getMonitorWorkspaceId(this);
    client = new LogsClient(createTestClientSecretCredential());
  });

  it("queryLogs (bad query)", async () => {
    function getInnermostDetail(errorInfo: ErrorInfo): undefined | ErrorInfo {
      if (errorInfo.innererror == null) {
        // this is the innermost one
        return errorInfo;
      }

      return getInnermostDetail(errorInfo.innererror);
    }

    // Kind (coming from Properties) is of type `dynamic`, so you can't sort on it (so we should get back an error from the service)
    const kustoQuery = `completely invalid syntax`;

    try {
      // TODO: there is an error details in the query, but when I run an invalid query it
      // throws (and ErrorDetails are just present in the exception.)
      await client.queryLogs(monitorWorkspaceId, kustoQuery, {
        timespan: CommonDurations.lastDay
      });
      assert.fail("Should have thrown an exception");
    } catch (err) {
      // TODO: if this is the only way for a user to know what happened we should probably
      // extract or represent the detail in a more obvious way in the thrown error (ie, as part of the
      // message, perhaps)
      const errorInfo = err.details?.error as ErrorInfo | undefined;

      if (errorInfo == null) {
        assert.fail(`ErrorInfo not found in ${JSON.stringify(err, undefined, 2)}`);
      }

      const innermostError = getInnermostDetail(errorInfo);

      if (innermostError == null) {
        throw new Error("No innermost error - error reporting would break.");
      }

      loggerForTest.verbose(`(Expected) error thrown when we use a bad query: `, err);

      assert.deepEqual(
        {
          name: (err as RestError).name,
          restCode: (err as RestError).code,
          restStatusCode: (err as RestError).statusCode,
          errorDetailCode: innermostError.code
          // (commented out as error messages are not generally stable)
          // restMessage: (err as RestError).message,
          // errorDetailMessage: innermostError.message }
        },
        {
          name: "RestError",
          restCode: "BadArgumentError",
          restStatusCode: 400,
          errorDetailCode: "SYN0002"
          // (commented out as error messages are not generally stable)
          // restMessage: "The request had some invalid properties"
          //  errorDetailMessage: "Query could not be parsed at 'invalid' on line [1,11]"
        },
        `Query should cause an exception thrown. Message: (${innermostError.message})`
      );
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

  describe("Ingested data tests (can be slow due to loading times)", () => {
    before(async function(this: Context) {
      if (env.TEST_RUN_ID) {
        console.log(`Using cached test run ID ${env.TEST_RUN_ID}`);
        testRunId = env.TEST_RUN_ID;
      } else {
        testRunId = `ingestedDataTest-${Date.now()}`;

        // send some events
        runWithTelemetry((provider) => {
          const tracer = provider.getTracer("logsClientTests");

          tracer
            .startSpan("testSpan", {
              attributes: {
                testRunId,
                kind: "now"
              }
            })
            .end();
        });
      }

      loggerForTest.info(`testRunId = ${testRunId}`);

      // (we'll wait until the data is there before running all the tests)
      // by coincidence one of the tests tries this same query.
      await checkLogsHaveBeenIngested({
        maxTries: 120,
        secondsBetweenQueries: 1
      });
    });

    it("queryLogs (last day)", async () => {
      const kustoQuery = `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`;

      const singleQueryLogsResult = await client.queryLogs(monitorWorkspaceId, kustoQuery, {
        timespan: CommonDurations.lastDay
      });

      // TODO: the actual types aren't being deserialized (everything is coming back as 'string')
      // this is incorrect, it'll be updated.

      assertQueryTable(
        singleQueryLogsResult.tables?.[0],
        {
          name: "PrimaryResult",
          columns: ["Kind", "Name", "Target", "TestRunId"],
          rows: [["now", "testSpan", "testSpan", testRunId.toString()]]
        },
        "Query for the last day"
      );
    });

    it("queryLogsBatch", async () => {
      const batchRequest: QueryLogsBatch = {
        queries: [
          {
            workspace: monitorWorkspaceId,
            query: `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`
          },
          {
            workspace: monitorWorkspaceId,
            query: `AppDependencies | where Properties['testRunId'] == '${testRunId}' | count`,
            timespan: CommonDurations.last24Hours,
            includeQueryStatistics: true,
            serverTimeoutInSeconds: 60 * 10
          }
        ]
      };

      const response = await client.queryLogsBatch(batchRequest);

      assertQueryTable(
        response.results?.[0].tables?.[0],
        {
          name: "PrimaryResult",
          columns: ["Kind", "Name", "Target", "TestRunId"],
          rows: [["now", "testSpan", "testSpan", testRunId.toString()]]
        },
        "Standard results"
      );

      assertQueryTable(
        response.results?.[1].tables?.[0],
        {
          name: "PrimaryResult",
          columns: ["Count"],
          rows: [["1"]]
        },
        "count table"
      );
    });

    async function checkLogsHaveBeenIngested(args: {
      secondsBetweenQueries: number;
      maxTries: number;
    }): Promise<void> {
      const query = `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`;

      const startTime = Date.now();

      loggerForTest.verbose(
        `Polling for results to make sure our telemetry has been ingested....\n${query}`
      );

      for (let i = 0; i < args.maxTries; ++i) {
        const result = await client.queryLogs(monitorWorkspaceId, query, {
          timespan: CommonDurations.last24Hours
        });

        const numRows = result.tables?.[0].rows?.length;

        if (numRows != null && numRows > 0) {
          loggerForTest.verbose(
            `[Attempt: ${i}/${args.maxTries}] Results came back, done waiting.`
          );
          return;
        }

        loggerForTest.verbose(
          `[Attempt: ${i}/${args.maxTries}, elapsed: ${Date.now() -
            startTime} ms] No rows, will poll again.`
        );

        await new Promise((resolve) => setTimeout(resolve, args.secondsBetweenQueries * 1000));
      }

      throw new Error(`All retries exhausted - no data returned for query '${query}'`);
    }
  });
});
