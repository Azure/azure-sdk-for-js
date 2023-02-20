// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isAggregateUploadLogsError, LogsIngestionClient, UploadLogsFailure } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { AdditionalPolicyConfig } from "@azure/core-client";
import {
  RecorderAndLogsClient,
  createClientAndStartRecorder,
  getDcrId,
  getLogsIngestionEndpoint,
  loggerForTest,
} from "./shared/testShared";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { AbortController } from "@azure/abort-controller";
import { isNode } from "@azure/core-util";

function createFailedPolicies(failedInterval: { isFailed: boolean }): AdditionalPolicyConfig[] {
  return [
    {
      policy: {
        name: "FakeDcrForTest",
        sendRequest: (req, next) => {
          if (failedInterval.isFailed) {
            req.url = req.url.replace(getDcrId(), "fake-id");
          }
          failedInterval.isFailed = !failedInterval.isFailed;
          return next(req);
        },
      },
      position: "perCall",
    },
  ];
}

describe("LogsIngestionClient live tests", function () {
  let recorder: Recorder;
  let recordedClient: RecorderAndLogsClient;
  let client: LogsIngestionClient;
  beforeEach(async function (this: Context) {
    loggerForTest.verbose(`Recorder: starting...`);
    recorder = new Recorder(this.currentTest);
    recordedClient = await createClientAndStartRecorder(recorder);
    client = recordedClient.client;
  });
  afterEach(async function () {
    if (recorder) {
      loggerForTest.verbose("Recorder: stopping");
      await recorder.stop();
    }
  });

  it("sends empty data", async function () {
    await client.upload(getDcrId(), "Custom-MyTableRawData", []);
  });

  it("sends basic data", async function () {
    await client.upload(getDcrId(), "Custom-MyTableRawData", [
      {
        Time: "2021-12-08T23:51:14.1104269Z",
        Computer: "Computer1",
        AdditionalContext: "kaghiya-1",
      },
      {
        Time: "2021-12-08T23:51:14.1104269Z",
        Computer: "Computer2",
        AdditionalContext: {
          InstanceName: "kaghiya-2",
          TimeZone: "Central Time",
          Level: 3,
          CounterName: "test",
          CounterValue: 23.5,
        },
      },
    ]);
  });

  it("Success Test - divides huge data into chunks", async function () {
    await client.upload(getDcrId(), "Custom-MyTableRawData", getObjects(10000), {
      maxConcurrency: 3,
    });
  });

  it("Partial Fail Test - when dcr id is incorrect for alternate requests", async function () {
    const noOfElements = 25000;
    const logData = getObjects(noOfElements);
    const additionalPolicies = createFailedPolicies({ isFailed: false });
    client = new LogsIngestionClient(
      getLogsIngestionEndpoint(),
      createTestCredential(),
      recorder.configureClientOptions({
        additionalPolicies,
      })
    );
    recordedClient.client = client;
    try {
      await client.upload(getDcrId(), "Custom-MyTableRawData", logData, {
        maxConcurrency: 3,
      });
    } catch (e: any) {
      const result = isAggregateUploadLogsError(e) ? e.errors : [];
      if (result.length > 0) {
        result.forEach((err) => {
          assert.equal(
            err.cause.message,
            `Data collection rule with immutable Id 'fake-id' not found.`
          );
        });

        const chunkArraySize = getChunkArraylength(noOfElements);
        assert.isAbove(chunkArraySize, 1);
        if (chunkArraySize % 2 === 0) {
          assert.equal(result.length, chunkArraySize / 2);
        }
        if (chunkArraySize % 2 === 1) {
          assert.equal(result.length, (chunkArraySize - 1) / 2);
        }
      }
    }
  });

  it("Throws error when all logs fail", async function () {
    const noOfElements = 25000;
    const logData = getObjects(noOfElements);
    try {
      await client.upload("immutable-id-123", "Custom-MyTableRawData", logData, {
        maxConcurrency: 3,
      });
    } catch (e: any) {
      const result = isAggregateUploadLogsError(e) ? e.errors : [];
      if (result.length > 0) {
        result.forEach((err) => {
          assert.equal(
            err.cause.message,
            `Data collection rule with immutable Id 'immutable-id-123' not found.`
          );
        });
        const chunkArraySize = getChunkArraylength(noOfElements);
        assert.isAbove(chunkArraySize, 1);
        assert.equal(chunkArraySize, result.length);
      }
    }
  });
  it("Calls the error callback function when all logs fail", async function () {
    const noOfElements = 25000;
    const logData = getObjects(noOfElements);
    const concurrency = 3;

    let errorCallbackCount = 0;
    const failedLogs: Record<string, unknown>[] = [];

    function errorCallback(uploadLogsError: UploadLogsFailure): void {
      if (
        (uploadLogsError.cause as Error).message ===
        "Data collection rule with immutable Id 'immutable-id-123' not found."
      ) {
        ++errorCallbackCount;
        failedLogs.concat(uploadLogsError.failedLogs);
      }
    }

    try {
      await client.upload("immutable-id-123", "Custom-MyTableRawData", logData, {
        maxConcurrency: concurrency,
        onError: errorCallback,
      });
    } catch (e: any) {
      const result = isAggregateUploadLogsError(e) ? e.errors : [];
      if (result.length > 0) {
        result.forEach((err) => {
          assert.equal(
            err.cause.message,
            `Data collection rule with immutable Id 'immutable-id-123' not found.`
          );
        });
      }
    }
    assert.equal(errorCallbackCount, concurrency);
    if (failedLogs.length > 0) {
      try {
        await client.upload(getDcrId(), "Custom-MyTableRawData", failedLogs, {
          maxConcurrency: 1,
        });
      } finally {
        // do nothing
      }
    }
  });

  it("User abort additional processing early if they handle the error", async function () {
    const abortController = new AbortController();
    let errorCallbackCount = 0;
    function errorCallback(): void {
      abortController.abort();
      ++errorCallbackCount;
    }
    if (isNode) {
      const noOfElements = 250000;
      const logData = getObjects(noOfElements);
      const concurrency = 4;
      try {
        await client.upload("immutable-id-123", "Custom-MyTableRawData", logData, {
          maxConcurrency: concurrency,
          onError: errorCallback,
          abortSignal: abortController.signal,
        });
      } catch (e: any) {
        const result = isAggregateUploadLogsError(e) ? e.errors : [];
        if (result.length > 0) {
          assert.equal(
            result[0].cause.message,
            `Data collection rule with immutable Id 'immutable-id-123' not found.`
          );
          assert.equal(result[1].cause.message, `The operation was aborted.`);
          assert.equal(result[result.length - 1].cause.message, `The operation was aborted.`);
        }
      }
      assert.equal(errorCallbackCount, concurrency);
    }
  });
});

export function getObjects(logsCount: number): LogData[] {
  const logs: LogData[] = [];

  for (let i = 0; i < logsCount; i++) {
    const logData: LogData = {
      Time: new Date(1655957386799),
      AdditionalContext: `additional logs context`,
    };
    logs.push(logData);
  }
  return logs;
}
/**
 * The data fields should match the column names exactly even with the
 * captilization in order for the data to show up in the logs
 */
export type LogData = {
  Time: Date;
  Computer?: string;
  AdditionalContext: string;
};

/** This is the size of 1 element generated by getObjects() function */
export const ELEMENT_SIZE = 81;

/** Calculating the chunk array size when each element is generated by getobjects function */
function getChunkArraylength(noOfElements: number): number {
  const logDataSize = ELEMENT_SIZE * noOfElements;
  // each chunk size in chunk array is not more than 1MB (1000000 bytes)
  const chunkArraySize: number = Math.ceil(logDataSize / 1000000);
  return chunkArraySize;
}
