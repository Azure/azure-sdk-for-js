// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LogsIngestionClient } from "../src/logsIngestionClient";
import * as dotenv from "dotenv";
import { DefaultAzureCredential } from "@azure/identity";

dotenv.config();

export async function main() {
  const logsIngestionEndpoint = process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint";
  const dcrId = process.env.DATA_COLLECTION_RULE_ID || "immutable_dcr_id";
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
  const result = await client.upload(dcrId, "Custom-MyTableRawData", getObjects(10000), {
    maxConcurrency: 5,
  });
  console.log(result.uploadStatus);
  if (result.uploadStatus === "Success") {
    console.log("All the logs provided are successfully ingested");
  } else {
    console.log("Some logs have failed to complete ingestion");
    for (const errors of result.errors) {
      console.log(`Error - ${JSON.stringify(errors.responseError)}`);
      console.log(`Log - ${JSON.stringify(errors.failedLogs)}`);
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
export interface LogData {
  Time: Date;
  Computer?: string;
  AdditionalContext: string;
}
