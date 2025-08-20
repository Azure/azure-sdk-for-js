// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Durations,
  LogsQueryClient,
  LogsQueryResultStatus,
  LogsTable,
} from "@azure/monitor-query-logs";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";
import { config } from "dotenv";
import { setLogLevel } from "@azure/logger";

function processTables(tablesFromResult: LogsTable[]) {
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

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a LogsQueryClient
    const logsQueryClient = new LogsQueryClient(credential);
  });

  it("ReadmeSampleCreateClientSovereign", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a LogsQueryClient
    const logsQueryClient: LogsQueryClient = new LogsQueryClient(credential, {
      endpoint: "https://api.loganalytics.azure.cn/v1",
      audience: "https://api.loganalytics.azure.cn/.default",
    });
  });

  it("ReadmeSampleProcessTables", async () => {
    function processTables(tablesFromResult) {
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
  });

  it("ReadmeSampleProcessBatchResult", async () => {
    async function processBatchResult(result, queriesBatch) {
      let i = 0;
      for (const response of result) {
        console.log(`Results for query with query: ${queriesBatch[i]}`);
        if (response.status === LogsQueryResultStatus.Success) {
          console.log(
            `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
          );
          processTables(response.tables);
        } else if (response.status === LogsQueryResultStatus.PartialFailure) {
          console.log(
            `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
          );
          processTables(response.partialTables);
          console.log(
            ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`,
          );
        } else {
          console.log(`Printing errors from query '${queriesBatch[i].query}'`);
          console.log(` Query had errors:${response.message} with code ${response.code}`);
        }
        // next query
        i++;
      }
    }

    function processTables(tablesFromResult) {
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
  });

  it("ReadmeSampleLogsQuery", async () => {
    const azureLogAnalyticsWorkspaceId = "<workspace_id>";
    const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const kustoQuery = "AppEvents | limit 1";
    const result = await logsQueryClient.queryWorkspace(azureLogAnalyticsWorkspaceId, kustoQuery, {
      duration: Durations.twentyFourHours,
    });
    // @ts-preserve-whitespace
    if (result.status === LogsQueryResultStatus.Success) {
      const tablesFromResult = result.tables;
      // @ts-preserve-whitespace
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
  });

  it("ReadmeSampleLogsQueryResource", async () => {
    const logsResourceId = "<the Resource Id for your logs resource>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const logsQueryClient = new LogsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    const kustoQuery = `MyTable_CL | summarize count()`;
    // @ts-preserve-whitespace
    console.log(`Running '${kustoQuery}' over the last One Hour`);
    const queryLogsOptions = {
      // explicitly control the amount of time the server can spend processing the query.
      serverTimeoutInSeconds: 600, // sets the timeout to 10 minutes
      // optionally enable returning additional statistics about the query's execution.
      // (by default, this is off)
      includeQueryStatistics: true,
    };
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryResource(
      logsResourceId,
      kustoQuery,
      { duration: Durations.sevenDays },
      queryLogsOptions,
    );
    // @ts-preserve-whitespace
    console.log(`Results for query '${kustoQuery}'`);
    // @ts-preserve-whitespace
    if (result.status === LogsQueryResultStatus.Success) {
      const tablesFromResult = result.tables;
      // @ts-preserve-whitespace
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
  });

  it("ReadmeSampleLogsQueryBatch", async () => {
    const monitorWorkspaceId = "<workspace_id>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const logsQueryClient = new LogsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";
    const queriesBatch = [
      {
        workspaceId: monitorWorkspaceId,
        query: kqlQuery,
        timespan: { duration: "P1D" },
      },
      {
        workspaceId: monitorWorkspaceId,
        query: "AzureActivity | summarize count()",
        timespan: { duration: "PT1H" },
      },
      {
        workspaceId: monitorWorkspaceId,
        query:
          "AppRequests | take 10 | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId",
        timespan: { duration: "PT1H" },
      },
      {
        workspaceId: monitorWorkspaceId,
        query: "AppRequests | take 2",
        timespan: { duration: "PT1H" },
        includeQueryStatistics: true,
      },
    ];
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryBatch(queriesBatch);
    // @ts-preserve-whitespace
    if (result == null) {
      throw new Error("No response for query");
    }
    // @ts-preserve-whitespace
    let i = 0;
    for (const response of result) {
      console.log(`Results for query with query: ${queriesBatch[i]}`);
      if (response.status === LogsQueryResultStatus.Success) {
        console.log(
          `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
        );
        processTables(response.tables);
      } else if (response.status === LogsQueryResultStatus.PartialFailure) {
        console.log(
          `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
        );
        processTables(response.partialTables);
        console.log(
          ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`,
        );
      } else {
        console.log(`Printing errors from query '${queriesBatch[i].query}'`);
        console.log(` Query had errors:${response.message} with code ${response.code}`);
      }
      // next query
      i++;
    }
  });

  it("ReadmeSampleLogsQueryTimeout", async () => {
    const azureLogAnalyticsWorkspaceId = "<workspace_id>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const logsQueryClient = new LogsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";
    // @ts-preserve-whitespace
    // setting optional parameters
    const queryLogsOptions = {
      // explicitly control the amount of time the server can spend processing the query.
      serverTimeoutInSeconds: 600, // 600 seconds = 10 minutes
    };
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryWorkspace(
      azureLogAnalyticsWorkspaceId,
      kqlQuery,
      { duration: Durations.twentyFourHours },
      queryLogsOptions,
    );
    // @ts-preserve-whitespace
    const status = result.status;
  });

  it("ReadmeSampleLogsQueryMultipleWorkspaces", async () => {
    const azureLogAnalyticsWorkspaceId = "<workspace_id>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const logsQueryClient = new LogsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";
    // @ts-preserve-whitespace
    // setting optional parameters
    const queryLogsOptions = {
      additionalWorkspaces: ["<workspace2>", "<workspace3>"],
    };
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryWorkspace(
      azureLogAnalyticsWorkspaceId,
      kqlQuery,
      { duration: Durations.twentyFourHours },
      queryLogsOptions,
    );
    // @ts-preserve-whitespace
    const status = result.status;
  });

  it("ReadmeSampleLogsQueryStatistics", async () => {
    const monitorWorkspaceId = "<workspace_id>";
    const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
    const kustoQuery = "AzureActivity | top 10 by TimeGenerated";
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryWorkspace(
      monitorWorkspaceId,
      kustoQuery,
      { duration: Durations.oneDay },
      {
        includeQueryStatistics: true,
      },
    );
    // @ts-preserve-whitespace
    console.log(`Results for query '${kustoQuery}'`);
  });

  it("ReadmeSampleLogsQueryVisualization", async () => {
    const monitorWorkspaceId = "<workspace_id>";
    const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryWorkspace(
      monitorWorkspaceId,
      `StormEvents
        | summarize event_count = count() by State
        | where event_count > 10
        | project State, event_count
        | render columnchart`,
      { duration: Durations.oneDay },
      {
        includeVisualization: true,
      },
    );
    // @ts-preserve-whitespace
    console.log("visualization result:", result.visualization);
  });

  it("TroubleShootingProcessServerTimeout", async () => {
    const monitorWorkspaceId = "<workspace_id>";
    const kustoQuery = "AzureActivity | top 10 by TimeGenerated";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const logsQueryClient = new LogsQueryClient(credential);
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryWorkspace(
      monitorWorkspaceId,
      kustoQuery,
      { duration: Durations.oneHour },
      { serverTimeoutInSeconds: 600 },
    );
  });

  it("TroubleShootingProcessPartialResult", async () => {
    const azureLogAnalyticsWorkspaceId = "<workspace_id>";
    const kustoQuery = "AzureActivity | top 10 by TimeGenerated";
    // @ts-preserve-whitespace
    const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
    const result = await logsQueryClient.queryWorkspace(azureLogAnalyticsWorkspaceId, kustoQuery, {
      duration: Durations.twentyFourHours,
    });
    // @ts-preserve-whitespace
    if (result.status === LogsQueryResultStatus.Success) {
      const tablesFromResult = result.tables;
      // @ts-preserve-whitespace
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
  });

  it("TroubleShootingProcessPartialResult", async () => {
    const azureLogAnalyticsWorkspaceId = "<workspace_id>";
    const kustoQuery = "AzureActivity | top 10 by TimeGenerated";
    // @ts-preserve-whitespace
    const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
    const result = await logsQueryClient.queryWorkspace(azureLogAnalyticsWorkspaceId, kustoQuery, {
      duration: Durations.twentyFourHours,
    });
    // @ts-preserve-whitespace
    if (result.status === LogsQueryResultStatus.Success) {
      const tablesFromResult = result.tables;
      // @ts-preserve-whitespace
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
  });

  it("DotEnvSample", async () => {
    config({ path: ".env" });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });

  it("TroubleShootingProcessBatchResult", async () => {
    async function processBatchResult(result, queriesBatch) {
      let i = 0;
      for (const response of result) {
        console.log(`Results for query with query: ${queriesBatch[i]}`);
        if (response.status === LogsQueryResultStatus.Success) {
          console.log(
            `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
          );
          processTables(response.tables);
        } else if (response.status === LogsQueryResultStatus.PartialFailure) {
          console.log(
            `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
          );
          processTables(response.partialTables);
          console.log(
            ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`,
          );
        } else {
          console.log(`Printing errors from query '${queriesBatch[i].query}'`);
          console.log(` Query had errors:${response.message} with code ${response.code}`);
        }
        // next query
        i++;
      }
    }

    function processTables(tablesFromResult) {
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
  });
});
