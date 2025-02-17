// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isAggregateLogsUploadError, LogsIngestionClient } from "../src/index.js";
import { LogsQueryClient } from "@azure/monitor-query";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { config } from "dotenv";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const logsIngestionEndpoint = "https://<my-endpoint>.azure.com";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const logsIngestionClient = new LogsIngestionClient(logsIngestionEndpoint, credential);
  });

  it("ReadmeSampleCreateClient_TokenCredential_SovereignCloud", async () => {
    const logsIngestionEndpoint = "https://<my-endpoint>.azure.cn";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const logsIngestionClient = new LogsIngestionClient(logsIngestionEndpoint, credential, {
      audience: "https://api.loganalytics.azure.cn/.default",
    });
  });

  it("ReadmeSampleUploadLogs", async () => {
    const logsIngestionEndpoint = "https://<my-endpoint>.azure.com";
    const ruleId = "data_collection_rule_id";
    const streamName = "data_stream_name";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const logsIngestionClient = new LogsIngestionClient(logsIngestionEndpoint, credential);
    // @ts-preserve-whitespace
    const logs = [
      {
        Time: "2021-12-08T23:51:14.1104269Z",
        Computer: "Computer1",
        AdditionalContext: "context-2",
      },
      {
        Time: "2021-12-08T23:51:14.1104269Z",
        Computer: "Computer2",
        AdditionalContext: "context",
      },
    ];
    // @ts-preserve-whitespace
    try {
      await logsIngestionClient.upload(ruleId, streamName, logs);
    } catch (e) {
      const aggregateErrors = isAggregateLogsUploadError(e) ? e.errors : [];
      if (aggregateErrors.length > 0) {
        console.log("Some logs have failed to complete ingestion");
        for (const error of aggregateErrors) {
          console.log(`Error - ${JSON.stringify(error.cause)}`);
          console.log(`Log - ${JSON.stringify(error.failedLogs)}`);
        }
      } else {
        console.log(`An error occurred: ${e}`);
      }
    }
  });

  it("ReadmeSampleVerifyLogs", async () => {
    const monitorWorkspaceId = "workspace_id";
    const tableName = "table_name";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const logsQueryClient = new LogsQueryClient(credential);
    // @ts-preserve-whitespace
    const queriesBatch = [
      {
        workspaceId: monitorWorkspaceId,
        query: tableName + " | count;",
        timespan: { duration: "P1D" },
      },
    ];
    // @ts-preserve-whitespace
    const result = await logsQueryClient.queryBatch(queriesBatch);
    if (result[0].status === "Success") {
      console.log("Table entry count: ", JSON.stringify(result[0].tables));
    } else {
      console.log(
        `Some error encountered while retrieving the count. Status = ${result[0].status}`,
        JSON.stringify(result[0]),
      );
    }
  });

  it("ReadmeSampleUploadLargeBatches", async () => {
    const logsIngestionEndpoint = "https://<my-endpoint>.azure.com";
    const ruleId = "data_collection_rule_id";
    const streamName = "data_stream_name";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new LogsIngestionClient(logsIngestionEndpoint, credential);
    // @ts-preserve-whitespace
    // Constructing a large number of logs to ensure batching takes place
    const logs = [];
    for (let i = 0; i < 100000; ++i) {
      logs.push({
        Time: "2021-12-08T23:51:14.1104269Z",
        Computer: "Computer1",
        AdditionalContext: `context-${i}`,
      });
    }
    // @ts-preserve-whitespace
    try {
      // Set the maximum concurrency to 1 to prevent concurrent requests entirely
      await client.upload(ruleId, streamName, logs, { maxConcurrency: 1 });
    } catch (e) {
      let aggregateErrors = isAggregateLogsUploadError(e) ? e.errors : [];
      if (aggregateErrors.length > 0) {
        console.log("Some logs have failed to complete ingestion");
        for (const error of aggregateErrors) {
          console.log(`Error - ${JSON.stringify(error.cause)}`);
          console.log(`Log - ${JSON.stringify(error.failedLogs)}`);
        }
      } else {
        console.log(e);
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
