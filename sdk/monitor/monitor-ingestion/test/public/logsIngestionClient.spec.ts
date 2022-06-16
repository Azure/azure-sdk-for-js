/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * 
 */


import { LogsIngestionClient } from "../../src/logsIngestionClient";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

describe("LogsIngestionClient live tests", function () {
  const credential = new DefaultAzureCredential();
  const client = new LogsIngestionClient(process.env.LOGS_INGESTION_ENDPOINT || "logs_ingestion_endpoint", credential)
  it("does it work", async () => {
    const result = await client.upload(process.env.IMMUTABLE_ID || "immutable-id", "Custom-MyTableRawData", [{ "x": "data1", "y": "value1" }, { "x": "data2", "y": "value2" }]);
    console.log(result);
  })
});
