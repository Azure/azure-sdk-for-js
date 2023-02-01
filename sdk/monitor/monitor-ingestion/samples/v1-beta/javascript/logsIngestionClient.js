// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to upload logs to a Monitor Resource (Log Analytics workspace)
 */

const { LogsIngestionClient } = require("@azure/monitor-ingestion");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv").config();

async function main() {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const ruleId = process.env.DATA_COLLECTION_RULE_ID || "immutable_dcr_id";
  const streamName = process.env.STREAM_NAME || "stream_name";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
  const result = await client.upload(ruleId, streamName, getObjects(10000), {
    maxConcurrency: 5,
  });
  console.log(result.status);
  if (result.status === "Success") {
    console.log("All the logs provided are successfully ingested");
  } else {
    console.log("Some logs have failed to complete ingestion");
    for (const error of result.errors) {
      console.log(`Error - ${JSON.stringify(error.cause)}`);
      console.log(`Log - ${JSON.stringify(error.failedLogs)}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

function getObjects(logsCount) {
  const logs = [];

  for (let i = 0; i < logsCount; i++) {
    const logData = {
      Time: new Date(1655957386799),
      AdditionalContext: `additional logs context`,
    };
    logs.push(logData);
  }
  return logs;
}

module.exports = { main, getObjects, LogData };
