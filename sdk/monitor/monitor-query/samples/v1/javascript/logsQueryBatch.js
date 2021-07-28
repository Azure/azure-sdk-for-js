// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run a batch query against a Log Analytics workspace
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { LogsQueryClient } = require("@azure/monitor-query");
const dotenv = require("dotenv");
dotenv.config();

const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID;

async function main() {
  if (!monitorWorkspaceId) {
    throw new Error("MONITOR_WORKSPACE_ID must be set in the environment for this sample");
  }

  const tokenCredential = new DefaultAzureCredential();
  const logsQueryClient = new LogsQueryClient(tokenCredential);

  const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";
  const queriesBatch = [
    {
      workspace: monitorWorkspaceId,
      query: kqlQuery,
      timespan: "P1D"
    },
    {
      workspace: monitorWorkspaceId,
      query: "AzureActivity | summarize count()",
      timespan: "PT1H"
    },
    {
      workspace: monitorWorkspaceId,
      query:
        "AppRequests | take 10  | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId",
      timespan: "PT1H"
    },
    {
      workspace: monitorWorkspaceId,
      query: "AppRequests | take 2",
      timespan: "PT1H",
      includeQueryStatistics: true
    }
  ];

  const result = await logsQueryClient.queryLogsBatch({
    queries: queriesBatch
  });

  if (result.results == null) {
    throw new Error("No response for query");
  }
  var i = 0;
  for (const response of result.results) {
    console.log(`Results for query with id: ${response.id}`);

    if (response.error) {
      console.log(` Query had errors:`, response.error);
    } else {
      if (response.tables == null) {
        console.log(`No results for query`);
      } else {
        console.log(
          `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
        );

        for (const table of response.tables) {
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
    //next query
    i++;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
