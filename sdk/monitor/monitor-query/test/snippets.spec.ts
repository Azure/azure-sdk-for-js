// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Durations,
  LogsQueryClient,
  LogsQueryResultStatus,
  MetricsClient,
  MetricsQueryClient,
} from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { config } from "dotenv";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a LogsQueryClient
    const logsQueryClient = new LogsQueryClient(credential);
    // @ts-preserve-whitespace
    // Create a MetricsQueryClient
    const metricsQueryClient = new MetricsQueryClient(credential);
    // @ts-preserve-whitespace
    // Create a MetricsClient
    const endpoint = " https://<endpoint>.monitor.azure.com/";
    const metricsClient = new MetricsClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClientSovereign", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Create a LogsQueryClient
    const logsQueryClient: LogsQueryClient = new LogsQueryClient(credential, {
      endpoint: "https://api.loganalytics.azure.cn/v1",
      audience: "https://api.loganalytics.azure.cn/.default",
    });
    // @ts-preserve-whitespace
    // Create a MetricsQueryClient
    const metricsQueryClient: MetricsQueryClient = new MetricsQueryClient(credential, {
      endpoint: "https://management.chinacloudapi.cn",
      audience: "https://monitor.azure.cn/.default",
    });
    // @ts-preserve-whitespace
    // Create a MetricsClient
    const endpoint = " https://<endpoint>.monitor.azure.cn/";
    const metricsClient = new MetricsClient(endpoint, credential, {
      audience: "https://monitor.azure.cn/.default",
    });
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
    // @ts-preserve-whitespace
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
    const executionTime = (result as any)?.statistics?.query?.executionTime;
    // @ts-preserve-whitespace
    console.log(
      `Results for query '${kustoQuery}', execution time: ${
        executionTime == null ? "unknown" : executionTime
      }`,
    );
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
    // @ts-preserve-whitespace
    function processTables(tablesFromResult) {
      for (const table of tablesFromResult) {
        const columnHeaderString = table.columnDescriptors
          .map((column) => `${column.name}(${column.type}) `)
          .join("| ");
        console.log("| " + columnHeaderString);
        // @ts-preserve-whitespace
        for (const row of table.rows) {
          const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
          console.log("| " + columnValuesString);
        }
      }
    }
  });

  it("ReadmeSampleProcessTables", async () => {
    function processTables(tablesFromResult) {
      for (const table of tablesFromResult) {
        const columnHeaderString = table.columnDescriptors
          .map((column) => `${column.name}(${column.type}) `)
          .join("| ");
        console.log("| " + columnHeaderString);
        // @ts-preserve-whitespace
        for (const row of table.rows) {
          const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
          console.log("| " + columnValuesString);
        }
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
    // @ts-preserve-whitespace
    function processTables(tablesFromResult) {
      for (const table of tablesFromResult) {
        const columnHeaderString = table.columnDescriptors
          .map((column) => `${column.name}(${column.type}) `)
          .join("| ");
        console.log("| " + columnHeaderString);
        // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    function processTables(tablesFromResult) {
      for (const table of tablesFromResult) {
        const columnHeaderString = table.columnDescriptors
          .map((column) => `${column.name}(${column.type}) `)
          .join("| ");
        console.log("| " + columnHeaderString);
        // @ts-preserve-whitespace
        for (const row of table.rows) {
          const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
          console.log("| " + columnValuesString);
        }
      }
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
    const executionTime = (result as any)?.statistics?.query?.executionTime;
    // @ts-preserve-whitespace
    console.log(
      `Results for query '${kustoQuery}', execution time: ${
        executionTime == null ? "unknown" : executionTime
      }`,
    );
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

  it("MetricQueryClientListMetricDefinitions", async () => {
    const metricsResourceId = "<the Resource Id for your metrics resource>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const metricsQueryClient = new MetricsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    const metricDefinitions = metricsQueryClient.listMetricDefinitions(metricsResourceId);
    for await (const { id, name } of metricDefinitions) {
      console.log(` metricDefinitions - ${id}, ${name}`);
    }
  });

  it("MetricQueryClientListMetricNamespaces", async () => {
    const metricsResourceId = "<the Resource Id for your metrics resource>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const metricsQueryClient = new MetricsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    const metricNamespaces = metricsQueryClient.listMetricNamespaces(metricsResourceId);
    for await (const { id, name } of metricNamespaces) {
      console.log(` metricNamespaces - ${id}, ${name}`);
    }
  });

  it("ReadmeSampleMetricsQuery", async () => {
    const metricsResourceId = "<the Resource Id for your metrics resource>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const metricsQueryClient = new MetricsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    const metricNames = [];
    const metricDefinitions = metricsQueryClient.listMetricDefinitions(metricsResourceId);
    for await (const { id, name } of metricDefinitions) {
      console.log(` metricDefinitions - ${id}, ${name}`);
      if (name) {
        metricNames.push(name);
      }
    }
    // @ts-preserve-whitespace
    const [firstMetricName, secondMetricName] = metricNames;
    if (firstMetricName && secondMetricName) {
      console.log(`Picking an example metric to query: ${firstMetricName} and ${secondMetricName}`);
      const metricsResponse = await metricsQueryClient.queryResource(
        metricsResourceId,
        [firstMetricName, secondMetricName],
        {
          granularity: "PT1M",
          timespan: { duration: Durations.fiveMinutes },
        },
      );
      // @ts-preserve-whitespace
      console.log(
        `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`,
      );
      // @ts-preserve-whitespace
      const metrics = metricsResponse.metrics;
      console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
      const metric = metricsResponse.getMetricByName(firstMetricName);
      console.log(`Selected Metric: ${firstMetricName}`, JSON.stringify(metric, undefined, 2));
    } else {
      console.error(`Metric names are not defined - ${firstMetricName} and ${secondMetricName}`);
    }
  });

  it("ReadmeSampleProcessMetricsResponse", async () => {
    const metricsResourceId = "<the Resource Id for your metrics resource>";
    // @ts-preserve-whitespace
    const tokenCredential = new DefaultAzureCredential();
    const metricsQueryClient = new MetricsQueryClient(tokenCredential);
    // @ts-preserve-whitespace
    console.log(`Picking an example metric to query: MatchedEventCount`);
    // @ts-preserve-whitespace
    const metricsResponse = await metricsQueryClient.queryResource(
      metricsResourceId,
      ["MatchedEventCount"],
      {
        timespan: {
          duration: Durations.fiveMinutes,
        },
        granularity: "PT1M",
        aggregations: ["Count"],
      },
    );
    // @ts-preserve-whitespace
    console.log(
      `Query cost: ${metricsResponse.cost}, granularity: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`,
    );
    // @ts-preserve-whitespace
    const metrics = metricsResponse.metrics;
    for (const metric of metrics) {
      console.log(metric.name);
      for (const timeseriesElement of metric.timeseries) {
        for (const metricValue of timeseriesElement.data!) {
          if (metricValue.count !== 0) {
            console.log(
              `There are ${metricValue.count} matched events at ${metricValue.timeStamp}`,
            );
          }
        }
      }
    }
  });

  it("ReadmeSampleMetricsQueryMultipleResources", async () => {
    const resourceIds = [
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs",
      "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs2",
    ];
    const metricsNamespace = "<YOUR_METRICS_NAMESPACE>";
    const metricNames = ["requests", "count"];
    const endpoint = " https://<endpoint>.monitor.azure.com/";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const metricsClient = new MetricsClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace);
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
    // @ts-preserve-whitespace
    function processTables(tablesFromResult) {
      for (const table of tablesFromResult) {
        const columnHeaderString = table.columnDescriptors
          .map((column) => `${column.name}(${column.type}) `)
          .join("| ");
        console.log("| " + columnHeaderString);
        // @ts-preserve-whitespace
        for (const row of table.rows) {
          const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
          console.log("| " + columnValuesString);
        }
      }
    }
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
    // @ts-preserve-whitespace
    function processTables(tablesFromResult) {
      for (const table of tablesFromResult) {
        const columnHeaderString = table.columnDescriptors
          .map((column) => `${column.name}(${column.type}) `)
          .join("| ");
        console.log("| " + columnHeaderString);
        // @ts-preserve-whitespace
        for (const row of table.rows) {
          const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
          console.log("| " + columnValuesString);
        }
      }
    }
  });

  it("DotEnvSample", async () => {
    config({ path: ".env" });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
