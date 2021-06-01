// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run a query against a Log Analytics workspace
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { CommonDurations, LogsClient } = require("@azure/monitor-query");
const dotenv = require("dotenv");
dotenv.config();

const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID;

async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const logsClient = new LogsClient(tokenCredential);

  if (!monitorWorkspaceId) {
    throw new Error("MONITOR_WORKSPACE_ID must be set in the environment for this sample");
  }

  const kqlQuery =
    "AppEvents | project TimeGenerated, Name, AppRoleInstance | order by TimeGenerated asc | limit 10";

  console.log(`Running '${kqlQuery}' for the last 5 minutes`);
  const result = await logsClient.queryLogs(monitorWorkspaceId, kqlQuery, {
    // The timespan is an ISO8601 formatted time (or interval). Some common aliases
    // are available (like lastDay, lastHour, last48Hours, etc..) but any properly formatted ISO8601
    // value is valid.
    timespan: CommonDurations.last5Minutes,

    // optionally enable returning additional statistics about the query's execution.
    // (by default this is off)
    includeQueryStatistics: true,

    // explicitly control the amount of time the server can spend processing the query.
    serverTimeoutInSeconds: 60
  });

  const tablesFromResult = result.tables;

  if (tablesFromResult == null) {
    console.log(`No results for query '${kqlQuery}'`);
    return;
  }

  console.log(
    `Results for query '${kqlQuery}', execution time: ${result.statistics?.query?.executionTime}`
  );

  for (const table of tablesFromResult) {
    const columnHeaderString = table.columns
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
