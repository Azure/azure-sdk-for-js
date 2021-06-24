// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { env } from "process";

import { QueryLogsBatch, Durations, LogsQueryClient } from "../../src";
import { runWithTelemetry } from "../setupOpenTelemetry";

import {
  assertQueryTable,
  createTestClientSecretCredential,
  getMonitorWorkspaceId,
  loggerForTest
} from "./shared/testShared";
import { ErrorInfo } from "../../src/generated/logquery/src";
import { RestError, RetryOptions } from "@azure/core-http";

describe("LogsQueryClient live tests", function() {
  let monitorWorkspaceId: string;
  let createClient: (retryOptions?: RetryOptions) => LogsQueryClient;
  let testRunId: string;

  before(function(this: Context) {
    monitorWorkspaceId = getMonitorWorkspaceId(this);

    createClient = (retryOptions?: RetryOptions) =>
      new LogsQueryClient(createTestClientSecretCredential(), {
        retryOptions
      });
  });

  it("queryLogs (bad query)", async () => {
    // Kind (coming from Properties) is of type `dynamic`, so you can't sort on it (so we should get back an error from the service)
    const kustoQuery = `completely invalid syntax`;

    try {
      // TODO: there is an error details in the query, but when I run an invalid query it
      // throws (and ErrorDetails are just present in the exception.)
      await createClient().queryLogs(monitorWorkspaceId, kustoQuery, Durations.lastDay);
      assert.fail("Should have thrown an exception");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- eslint doesn't recognize that the extracted variables are prefixed with '_' and are purposefully unused.
      const { request: _request, response: _response, ...stringizableError } = err;
      const innermostError = getInnermostErrorDetails(err);

      if (innermostError == null) {
        throw new Error("No innermost error - error reporting would break.");
      }

      loggerForTest.verbose(`(Diagnostics) Actual error thrown when we use a bad query: `, err);

      assert.deepNestedInclude(
        err as RestError,
        {
          name: "RestError",
          statusCode: 400
        },
        `Query should throw a RestError. Message: ${JSON.stringify(stringizableError)}`
      );

      assert.deepNestedInclude(
        innermostError,
        {
          code: "SYN0002"
          // other fields that are not stable, but are interesting:
          //  message: "Query could not be parsed at 'invalid' on line [1,11]",
        },
        `Query should indicate a syntax error in innermost error. Innermost error: ${JSON.stringify(
          innermostError
        )}`
      );
    }
  });

  // disabling http retries otherwise we'll waste retries to realize that the
  // query has timed out on purpose.
  it("serverTimeoutInSeconds", async () => {
    try {
      await createClient({ maxRetries: 0, retryDelayInMs: 0, maxRetryDelayInMs: 0 }).queryLogs(
        monitorWorkspaceId,
        // slow query suggested by Pavel.
        "range x from 1 to 10000000000 step 1 | count",
        Durations.last24Hours,
        {
          // the query above easily takes longer than 1 second.
          serverTimeoutInSeconds: 1
        }
      );

      assert.fail("Should have thrown a RestError for a GatewayTimeout");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- eslint doesn't recognize that the extracted variables are prefixed with '_' and are purposefully unused.
      const { request: _request, response: _response, ...stringizableError } = err;
      const innermostError = getInnermostErrorDetails(err);

      assert.deepNestedInclude(
        err as RestError,
        {
          name: "RestError",
          statusCode: 504
        },
        `Query should throw a RestError. Message: ${JSON.stringify(stringizableError)}`
      );

      assert.deepNestedInclude(
        innermostError,
        {
          code: "GatewayTimeout"
          // other fields that are not stable, but are interesting:
          // "message":"Kusto query timed out"
        },
        `Should get a code indicating the query timed out. Innermost error: ${JSON.stringify(
          innermostError
        )}`
      );
    }
  });

  it("includeQueryStatistics", async () => {
    const query = await createClient().queryLogs(
      monitorWorkspaceId,
      "AppEvents | limit 1",
      Durations.last24Hours,
      {
        includeQueryStatistics: true
      }
    );

    // TODO: statistics are not currently modeled in the generated code but
    // the executionTime field is pretty useful.
    assert.isOk(query.statistics);
    assert.isNumber(query.statistics?.query?.executionTime);
  });

  it("query with types", async () => {
    const constantsQuery = `print "hello", true, make_datetime("2000-01-02 03:04:05Z"), toint(100), long(101), 102.1, dynamic({ "hello": "world" })
      | project 
          stringcolumn=print_0, 
          boolcolumn=print_1,
          datecolumn=print_2,
          intcolumn=print_3,
          longcolumn=print_4,
          realcolumn=print_5,
          dynamiccolumn=print_6
      `;

    const results = await createClient().queryLogs(
      monitorWorkspaceId,
      constantsQuery,
      Durations.last5Minutes
    );

    const table = results.tables[0];

    // check the column types all match what we expect.
    assert.deepEqual(
      [
        {
          name: "stringcolumn",
          type: "string"
        },
        {
          name: "boolcolumn",
          type: "bool"
        },
        {
          name: "datecolumn",
          type: "datetime"
        },
        {
          name: "intcolumn",
          type: "int"
        },
        {
          name: "longcolumn",
          type: "long"
        },
        {
          name: "realcolumn",
          type: "real"
        },
        {
          name: "dynamiccolumn",
          type: "dynamic"
        }
      ],
      table.columns
    );

    table.rows.map((rowValues) => {
      const [
        stringColumn,
        boolColumn,
        dateColumn,
        intColumn,
        longColumn,
        realColumn,
        dynamicColumn,
        ...rest
      ] = rowValues;

      assert.strictEqual(stringColumn, "hello");
      assert.equal((dateColumn as Date).valueOf(), new Date("2000-01-02 03:04:05Z").valueOf());
      assert.strictEqual(boolColumn, true);

      // all the number types (real, int, long) are all represented using `number`
      assert.strictEqual(intColumn, 100);
      assert.strictEqual(longColumn, 101);
      assert.strictEqual(realColumn, 102.1);

      assert.deepEqual(dynamicColumn, {
        hello: "world"
      });

      assert.isEmpty(rest);
    });
  });

  it("queryLogsBatch with types", async () => {
    const constantsQuery = `print "hello", true, make_datetime("2000-01-02 03:04:05Z"), toint(100), long(101), 102.1, dynamic({ "hello": "world" })
      | project 
          stringcolumn=print_0, 
          boolcolumn=print_1,
          datecolumn=print_2,
          intcolumn=print_3,
          longcolumn=print_4,
          realcolumn=print_5,
          dynamiccolumn=print_6
      `;

    const result = await createClient().queryLogsBatch({
      queries: [
        {
          workspace: monitorWorkspaceId,
          query: constantsQuery,
          timespan: Durations.last5Minutes
        }
      ]
    });

    if ((result as any)["__fixApplied"]) {
      console.log(`TODO: Fix was required to pass`);
    }

    const table = result.results?.[0].tables?.[0];

    if (table == null) {
      throw new Error("No table returned for query");
    }

    // check the column types all match what we expect.
    assert.deepEqual(
      [
        {
          name: "stringcolumn",
          type: "string"
        },
        {
          name: "boolcolumn",
          type: "bool"
        },
        {
          name: "datecolumn",
          type: "datetime"
        },
        {
          name: "intcolumn",
          type: "int"
        },
        {
          name: "longcolumn",
          type: "long"
        },
        {
          name: "realcolumn",
          type: "real"
        },
        {
          name: "dynamiccolumn",
          type: "dynamic"
        }
      ],
      table.columns
    );

    table.rows.map((rowValues) => {
      const [
        stringColumn,
        boolColumn,
        dateColumn,
        intColumn,
        longColumn,
        realColumn,
        dynamicColumn,
        ...rest
      ] = rowValues;

      assert.strictEqual(stringColumn, "hello");
      assert.equal((dateColumn as Date).valueOf(), new Date("2000-01-02 03:04:05Z").valueOf());
      assert.strictEqual(boolColumn, true);

      // all the number types (real, int, long) are all represented using `number`
      assert.strictEqual(intColumn, 100);
      assert.strictEqual(longColumn, 101);
      assert.strictEqual(realColumn, 102.1);

      assert.deepEqual(dynamicColumn, {
        hello: "world"
      });

      assert.isEmpty(rest);
    });
  });

  describe("Ingested data tests (can be slow due to loading times)", () => {
    before(async function(this: Context) {
      if (env.TEST_RUN_ID) {
        loggerForTest.warning(`Using cached test run ID ${env.TEST_RUN_ID}`);
        testRunId = env.TEST_RUN_ID;
      } else {
        testRunId = `ingestedDataTest-${Date.now()}`;

        // send some events
        await runWithTelemetry(this, (provider) => {
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
      await checkLogsHaveBeenIngested({
        maxTries: 240,
        secondsBetweenQueries: 1
      });
    });

    it("queryLogs (last day)", async () => {
      const kustoQuery = `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`;

      const singleQueryLogsResult = await createClient().queryLogs(
        monitorWorkspaceId,
        kustoQuery,
        Durations.lastDay
      );

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
            query: `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`,
            timespan: Durations.last24Hours
          },
          {
            workspace: monitorWorkspaceId,
            query: `AppDependencies | where Properties['testRunId'] == '${testRunId}' | count`,
            timespan: Durations.last24Hours,
            includeQueryStatistics: true,
            serverTimeoutInSeconds: 60 * 10
          }
        ]
      };

      const result = await createClient().queryLogsBatch(batchRequest);

      if ((result as any)["__fixApplied"]) {
        console.log(`TODO: Fix was required to pass`);
      }

      assertQueryTable(
        result.results?.[0].tables?.[0],
        {
          name: "PrimaryResult",
          columns: ["Kind", "Name", "Target", "TestRunId"],
          rows: [["now", "testSpan", "testSpan", testRunId.toString()]]
        },
        "Standard results"
      );

      assertQueryTable(
        result.results?.[1].tables?.[0],
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

      const client = createClient();

      for (let i = 0; i < args.maxTries; ++i) {
        const result = await client.queryLogs(monitorWorkspaceId, query, Durations.last24Hours);

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

function getInnermostErrorDetails(thrownError: any): undefined | ErrorInfo {
  if (
    thrownError.details == null ||
    typeof thrownError.details !== "object" ||
    typeof thrownError.details.error !== "object"
  ) {
    loggerForTest.error(`Thrown error was incorrect: `, thrownError);
    throw new Error("Error does not contain expected `details` property");
  }

  let errorInfo: ErrorInfo = thrownError.details.error;

  while (errorInfo.innererror) {
    errorInfo = errorInfo.innererror;
  }

  return errorInfo;
}
