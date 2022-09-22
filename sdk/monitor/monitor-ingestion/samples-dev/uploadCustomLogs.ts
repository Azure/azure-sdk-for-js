// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to upload logs to a Monitor Resource (Log Analytics workspace)
 */
import { DefaultAzureCredential } from "@azure/identity";
import { LogsIngestionClient } from "@azure/monitor-ingestion";

import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
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
  const result = await client.upload(ruleId, streamName, logs);
  if (result.status !== "Success") {
    console.log("Some logs have failed to complete ingestion. Upload status=", result.status);
    for (const errors of result.errors) {
      console.log(`Error - ${JSON.stringify(errors.cause)}`);
      console.log(`Log - ${JSON.stringify(errors.failedLogs)}`);
    }
  }
}
main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
