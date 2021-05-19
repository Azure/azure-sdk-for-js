// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run a batch query against a Log Analytics workspace
 */

const { DefaultAzureCredential } = require("@azure/identity");
// TODO: can't use this until we've published at least one rev of this package.
// const { BatchRequest, LogsClient } = require("@azure/monitor-query");
const { LogsClient } = require("../../../..");
const dotenv = require("dotenv");
dotenv.config();

const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID;

async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const logsClient = new LogsClient(tokenCredential);

  if (!monitorWorkspaceId) {
    throw new Error("MONITOR_WORKSPACE_ID must be set in the environment for this sample");
  }

  const kqlQuery = "AppEvents | project TimeGenerated, OperationName, AppRoleInstance | limit 1";

  // Use our query, and get results for the last day.
  const batchRequest = {};
  const userProvidedQueryId = "a user provided id";

  const result = await logsClient.queryLogsBatch({
    requests: [
      {
        // this id can be used to find the results for
        // this query in the response.
        id: userProvidedQueryId,
        workspace: monitorWorkspaceId,
        body: {
          query: kqlQuery,
          timespan: "P1D"
        }
      }
    ]
  });

  if (result.responses == null) {
    throw new Error("No response for query");
  }

  for (const response of result.responses) {
    console.log(`Results for query with id: ${response.id}`);

    if (response.body?.errors) {
      console.log(` Query had errors:`, response.body?.errors);
    } else {
      if (response.body?.tables == null) {
        console.log(`No results for query`);
      } else {
        console.log(`Printing results from query '${kqlQuery}' for 1 day.`);

        for (const table of response.body?.tables) {
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
