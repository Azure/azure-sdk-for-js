// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates error handling via a user defined error handler.
 * User can track failed log entries with each error handler.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  isAggregateLogsUploadError,
  LogsIngestionClient,
  type LogsUploadFailure,
} from "@azure/monitor-ingestion";
import "dotenv/config";

async function main(): Promise<void> {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const ruleId = process.env.DATA_COLLECTION_RULE_ID || "data_collection_rule_id";
  const streamName = process.env.STREAM_NAME || "data_stream_name";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
  // Constructing a large number of logs to ensure batching takes place
  const logs = [];
  for (let i = 0; i < 100000; ++i) {
    logs.push({
      Time: "2021-12-08T23:51:14.1104269Z",
      Computer: "Computer1",
      AdditionalContext: `context-${i}`,
    });
  }

  const failedLogs: Record<string, unknown>[] = [];
  function errorCallback(uploadLogsError: LogsUploadFailure): void {
    if (
      uploadLogsError.cause.message ===
      "Data collection rule with immutable Id 'immutable-id-123' not found."
    ) {
      // track failed logs here
      failedLogs.concat(uploadLogsError.failedLogs);
    }
  }
  // The logs will be split into multiple batches and uploaded concurrently. By default,
  // the maximum number of concurrent uploads is 5.

  try {
    await client.upload("immutable-id-123", streamName, logs, {
      onError: errorCallback,
    });
  } catch (e) {
    const aggregateErrors = isAggregateLogsUploadError(e) ? e.errors : [];
    if (aggregateErrors.length > 0) {
      console.log(
        "Some logs have failed to complete ingestion. Number of error batches=",
        aggregateErrors.length,
      );
      for (const errors of aggregateErrors) {
        console.log(`Error - ${JSON.stringify(errors.cause)}`);
        console.log(`Log - ${JSON.stringify(errors.failedLogs)}`);
      }
    } else {
      console.log(e);
    }
  }

  if (failedLogs.length > 0) {
    try {
      await client.upload(ruleId, "Custom-MyTableRawData", failedLogs, {
        maxConcurrency: 1,
      });
    } catch {
      // Do nothing
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
