// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to upload logs to a Monitor Resource (Log Analytics workspace).
 * The user can track failed log entries and the associated error message via the AggregateUploadLogsError Object
 */

import { isAggregateUploadLogsError, LogsIngestionClient } from "@azure/monitor-ingestion";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const ruleId = process.env.DATA_COLLECTION_RULE_ID || "immutable_dcr_id";
  const streamName = process.env.STREAM_NAME || "stream_name";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
  try {
    await client.upload(ruleId, streamName, getObjects(10000), {
      maxConcurrency: 5,
    });
    console.log("All the logs provided are successfully ingested");
  } catch (e) {
    let aggregateErrors = isAggregateUploadLogsError(e) ? e.errors : [];
    if (aggregateErrors.length > 0) {
      console.log("Some logs have failed to complete ingestion");
      for (const error of aggregateErrors) {
        console.log(`Error - ${JSON.stringify(error.cause)}`);
        console.log(`Log - ${JSON.stringify(error.failedLogs)}`);
      }
    } else {
      console.log(e);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

export function getObjects(logsCount: number): LogData[] {
  const logs: LogData[] = [];

  for (let i = 0; i < logsCount; i++) {
    const logData: LogData = {
      Time: new Date(1655957386799), // Wed Jun 22 2022 21:09:46 GMT-0700 (Pacific Daylight Time)
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
