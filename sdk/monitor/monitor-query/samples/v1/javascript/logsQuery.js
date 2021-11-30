// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates how to run a query against a Log Analytics workspace
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { Durations, LogsQueryClient, LogsQueryResultStatus } = require("@azure/monitor-query");
const dotenv = require("dotenv");
dotenv.config();

const monitorWorkspaceId = process.env.MONITOR_WORKSPACE_ID;

async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const logsQueryClient = new LogsQueryClient(tokenCredential);

  if (!monitorWorkspaceId) {
    throw new Error("MONITOR_WORKSPACE_ID must be set in the environment for this sample");
  }

  const kustoQuery =
    "AppEvents | project TimeGenerated, Name, AppRoleInstance | order by TimeGenerated asc | limit 10";

  console.log(`Running '${kustoQuery}' over the last One Hour`);
  const queryLogsOptions = {
    // explicitly control the amount of time the server can spend processing the query.
    serverTimeoutInSeconds: 60,
    // optionally enable returning additional statistics about the query's execution.
    // (by default this is off)
    includeQueryStatistics: true
  };

  const result = await logsQueryClient.queryWorkspace(
    monitorWorkspaceId,
    kustoQuery,
    // The timespan is an ISO8601 formatted time (or interval). Some common aliases
    // are available (like OneDay, OneHour, FoutyEightHours, etc..) but any properly formatted ISO8601
    // value is valid.
    { duration: Durations.oneHour },
    queryLogsOptions
  );
  const executionTime =
    result.statistics && result.statistics.query && result.statistics.query.executionTime;

  console.log(
    `Results for query '${kustoQuery}', execution time: ${
      executionTime == null ? "unknown" : executionTime
    }`
  );

  if (result.status === LogsQueryResultStatus.Success) {
    const tablesFromResult = result.tables;

    if (tablesFromResult.length === 0) {
      console.log(`No results for query '${kustoQuery}'`);
      return;
    }
    console.log(`This query has returned table(s) - `);
    processTables(tablesFromResult);
  } else {
    console.log(`Error processing the query '${kustoQuery}' - ${result.partialError}`);
    if (result.partialTables.length > 0) {
      console.log(`This query has also returned partial data in the following table(s) - `);
      processTables(result.partialTables);
    }
  }
}

async function processTables(tablesFromResult) {
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
