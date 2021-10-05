// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run a batch query against a Log Analytics workspace
 */

import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, LogsQueryResultStatus, LogsTable } from "@azure/monitor-query";
import * as dotenv from "dotenv";
dotenv.config();

const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID;

export async function main() {
  if (!monitorWorkspaceId) {
    throw new Error("MONITOR_WORKSPACE_ID must be set in the environment for this sample");
  }

  const tokenCredential = new DefaultAzureCredential();
  const logsQueryClient = new LogsQueryClient(tokenCredential);

  const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";
  const queriesBatch = [
    {
      workspaceId: monitorWorkspaceId,
      query: kqlQuery,
      timespan: { duration: "P1D" }
    },
    {
      workspaceId: monitorWorkspaceId,
      query: "AzureActivity | summarize count()",
      timespan: { duration: "PT1H" }
    },
    {
      workspaceId: monitorWorkspaceId,
      query:
        "AppRequests | take 10 | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId",
      timespan: { duration: "PT1H" }
    },
    {
      workspaceId: monitorWorkspaceId,
      query: "AppRequests | take 2",
      timespan: { duration: "PT1H" },
      includeQueryStatistics: true
    }
  ];

  const result = await logsQueryClient.queryBatch(queriesBatch);
  if (result === null) {
    throw new Error("No response for query");
  }

  let i = 0;
  for (const response of result) {
    console.log(`Results for query with query: ${queriesBatch[i]}`);
    if (response.status === LogsQueryResultStatus.Success) {
      console.log(
        `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.tables);
    } else if (response.status === LogsQueryResultStatus.PartialFailure) {
      console.log(
        `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.partialTables);
      console.log(
        ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`
      );
    } else {
      console.log(`Printing errors from query '${queriesBatch[i].query}'`);
      console.log(` Query had errors:${response.message} with code ${response.code}`);
    }
    // next query
    i++;
  }
}

async function processTables(tablesFromResult: LogsTable[]) {
  for (const table of tablesFromResult) {
    const columnHeaderString = table.columnDescriptors
      .map((column) => `${column.name}(${column.type}) `)
      .join("| ");
    console.log("| " + columnHeaderString);

    for (const row of table.rows) {
      const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
      console.log("| " + columnValuesString);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
