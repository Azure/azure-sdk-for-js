// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates aborting additional processing early if
 * user handles the error and decides that continuing further is hopeless.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { isAggregateUploadLogsError, LogsIngestionClient } = require("@azure/monitor-ingestion");

require("dotenv").config();

async function main() {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const streamName = process.env.STREAM_NAME || "data_stream_name";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
  let abortController = new AbortController();

  function errorCallback(uploadLogsError) {
    if (
      uploadLogsError.cause.message ===
      "Data collection rule with immutable Id 'immutable-id-123' not found."
    ) {
      abortController.abort();
    }
  }
  // Constructing a large number of logs to ensure batching takes place
  const logs = [];
  for (let i = 0; i < 100000; ++i) {
    logs.push({
      Time: "2021-12-08T23:51:14.1104269Z",
      Computer: "Computer1",
      AdditionalContext: `context-${i}`,
    });
  }

  // The logs will be split into multiple batches and uploaded concurrently. By default,
  // the maximum number of concurrent uploads is 5.
  try {
    await client.upload("immutable-id-123", streamName, logs, {
      onError: errorCallback,
      abortSignal: abortController.signal,
    });
  } catch (e) {
    if (isAggregateUploadLogsError(e)) {
      let aggregateErrors = e.errors;
      if (aggregateErrors.length > 0) {
        console.log(
          "Some logs have failed to complete ingestion. Number of error batches=",
          aggregateErrors.length
        );
        for (const errors of aggregateErrors) {
          console.log(`Error - ${JSON.stringify(errors.cause)}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
