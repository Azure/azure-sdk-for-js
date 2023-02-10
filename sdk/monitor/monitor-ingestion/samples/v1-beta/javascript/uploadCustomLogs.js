// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to upload logs to a Monitor Resource (Log Analytics workspace).
 * The user can track failed log entries and the associated error message via the AggregateUploadLogsError Object.
 */
const { DefaultAzureCredential } = require("@azure/identity");
const { isAggregateUploadLogsError, LogsIngestionClient } = require("@azure/monitor-ingestion");

require("dotenv").config();

async function main() {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const ruleId = process.env.DATA_COLLECTION_RULE_ID || "data_collection_rule_id";
  const streamName = process.env.STREAM_NAME || "data_stream_name";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
  const logs = [
    {
      Time: "2021-12-08T23:51:14.1104269Z",
      Computer: "Computer1",
      AdditionalContext: "context-2",
    },
    {
      Time: "2021-12-08T23:51:14.1104269Z",
      Computer: "Computer2",
      AdditionalContext: "context",
    },
  ];
  try {
    await client.upload(ruleId, streamName, logs);
  } catch (e) {
    let aggregateErrors = isAggregateUploadLogsError(e) ? e.errors : [];
    console.log(
      "Some logs have failed to complete ingestion. Length of errors =",
      aggregateErrors.length
    );
    for (const errors of aggregateErrors) {
      console.log(`Error - ${JSON.stringify(errors.cause)}`);
      console.log(`Log - ${JSON.stringify(errors.failedLogs)}`);
    }
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
