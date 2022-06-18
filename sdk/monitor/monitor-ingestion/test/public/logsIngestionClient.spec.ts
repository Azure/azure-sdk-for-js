// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LogsIngestionClient } from "../../src/logsIngestionClient";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

describe("LogsIngestionClient live tests", function () {
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(
    process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint",
    credential
  );
  it("does it work", async () => {
    const result = await client.upload(
      process.env.IMMUTABLE_ID || "immutable-id",
      "Custom-MyTableRawData",
      getObjects(2)
    );
    console.log(result);
  });


  it("divides huge data into chunks", async()=> {
    const result = await client.upload(
      process.env.IMMUTABLE_ID || "immutable-id",
      "Custom-MyTableRawData",
      getObjects(100000)
    );
    console.log(result);
  })
});

export function getObjects(logsCount: Number): LogData[] {
  let logs: LogData[] = [];

  for (let i = 0; i < logsCount; i++) {
      const logData: LogData = {
        time: new Date("2022-01-01T00:00:00+07:00"),
        extendedColumn: `test-${i}`,
        additionalContext: "additional logs context"
      }
      logs.push(logData);
  }
  return logs;
}
export interface LogData {
   time: Date;
   extendedColumn: string;
   additionalContext: string;
}
