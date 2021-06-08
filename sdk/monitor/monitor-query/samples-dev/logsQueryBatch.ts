// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run a batch query against a Log Analytics workspace
 */

import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient } from "@azure/monitor-query";
import * as dotenv from "dotenv";
dotenv.config();

const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID;

export async function main() {
  if (!monitorWorkspaceId) {
    throw new Error("MONITOR_WORKSPACE_ID must be set in the environment for this sample");
  }

  const tokenCredential = new DefaultAzureCredential();
  const logsQueryClient = new LogsQueryClient(tokenCredential);

  const kqlQuery = "AppEvents | project TimeGenerated, OperationName, AppRoleInstance | limit 1";

  const result = await logsQueryClient.queryLogsBatch({
    queries: [
      {
        workspace: monitorWorkspaceId,
        query: kqlQuery,
        timespan: "P1D"
      }
    ]
  });

  if (result.results == null) {
    throw new Error("No response for query");
  }

  for (const response of result.results) {
    console.log(`Results for query with id: ${response.id}`);

    if (response?.error) {
      console.log(` Query had errors:`, response?.error);
    } else {
      if (response?.tables == null) {
        console.log(`No results for query`);
      } else {
        console.log(`Printing results from query '${kqlQuery}' for 1 day.`);

        for (const table of response?.tables) {
          const columnHeaderString = table.columns
            .map((column) => `${column.name}(${column.type}) `)
            .join("| ");
          console.log(columnHeaderString);

          for (const row of table.rows) {
            const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
            console.log(columnValuesString);
          }
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
