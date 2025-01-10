// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to run a query against a Log Analytics workspace, using an Azure resource ID.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  Durations,
  LogsQueryClient,
  LogsTable,
  LogsQueryOptions,
  LogsQueryResultStatus,
} from "@azure/monitor-query";
import * as dotenv from "dotenv";
dotenv.config();

const logsResourceId = process.env.LOGS_RESOURCE_ID;

export async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const logsQueryClient = new LogsQueryClient(tokenCredential);

  if (!logsResourceId) {
    throw new Error("LOGS_RESOURCE_ID must be set in the environment for this sample");
  }

  const kustoQuery = `MyTable_CL | summarize count()`;

  console.log(`Running '${kustoQuery}' over the last One Hour`);
  const queryLogsOptions: LogsQueryOptions = {
    // explicitly control the amount of time the server can spend processing the query.
    serverTimeoutInSeconds: 600, // sets the timeout to 10 minutes
    // optionally enable returning additional statistics about the query's execution.
    // (by default, this is off)
    includeQueryStatistics: true,
  };

  const result = await logsQueryClient.queryResource(
    logsResourceId,
    kustoQuery,
    { duration: Durations.sevenDays },
    queryLogsOptions,
  );

  const executionTime =
    result.statistics && result.statistics.query && (result.statistics.query as any).executionTime;

  console.log(
    `Results for query '${kustoQuery}', execution time: ${
      executionTime == null ? "unknown" : executionTime
    }`,
  );

  if (result.status === LogsQueryResultStatus.Success) {
    const tablesFromResult: LogsTable[] = result.tables;

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
