// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run query against a Log Analytics workspace to verify if the logs were uploaded
 */

import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient } from "@azure/monitor-query";


const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID|| "workspace_id";
const tableName = process.env.TABLE_NAME || "table_name";
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
const credential = new DefaultAzureCredential();
const logsQueryClient = new LogsQueryClient(credential);
const queriesBatch = [
  {
    workspaceId: monitorWorkspaceId,
    query: tableName + " | count;",
    timespan: { duration: "P1D" }
  }
]

const result = await logsQueryClient.queryBatch(queriesBatch);
if(result[0].status === "Success"){
    console.log("Table entry count: ", JSON.stringify(result[0].tables));
}
else{
    console.log(`Some error encountered while retrieving the count. Status = ${result[0].status}`, JSON.stringify(result[0]));
}

}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
    process.exit(1);
  });