// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createTestCredential } from "@azure-tools/test-credential";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
  env,
} from "@azure-tools/test-recorder";
import * as assert from "assert";
import { createClientLogger } from "@azure/logger";
import { LogsQueryClient, LogsTable, MetricsQueryClient, MetricsClient } from "../../../src";
import { ExponentialRetryPolicyOptions } from "@azure/core-rest-pipeline";
export const loggerForTest = createClientLogger("test");
const replacementForLogsResourceId = env["LOGS_RESOURCE_ID"]?.startsWith("/")
  ? "/logs-arm-resource-id"
  : "logs-arm-resource-id";

const envSetupForPlayback: Record<string, string> = {
  MONITOR_WORKSPACE_ID: "workspace-id",
  METRICS_RESOURCE_ID: "metrics-arm-resource-id",
  LOGS_RESOURCE_ID: replacementForLogsResourceId,
  MQ_APPLICATIONINSIGHTS_CONNECTION_STRING: "mq_applicationinsights_connection",
  AZURE_TENANT_ID: "98123456-7614-3456-5678-789980112547",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
  ],

};
export interface RecorderAndLogsClient {
  client: LogsQueryClient;
  recorder: Recorder;
}

export interface RecorderAndMetricsClient {
  client: MetricsQueryClient;
  recorder: Recorder;
}

export interface RecorderAndMetricsBatchQueryClient {
  client: MetricsClient;
  // recorder: Recorder;
}

export async function createRecorderAndMetricsBatchQueryClient(): Promise<RecorderAndMetricsBatchQueryClient> {
  // await recorder.start(recorderOptions);
  const testCredential = createTestCredential();
  const batchEndPoint =
    env["AZURE_MONITOR_BATCH_ENDPOINT"] ?? "https://eastus.metrics.monitor.azure.com/";
  const client = new MetricsClient(batchEndPoint, testCredential);

  return {
    client: client,
    // recorder: recorder,
  };
}

export function getMetricsBatchResourceIds(): string[] {
  const resourceId: string = assertEnvironmentVariable("LOGS_RESOURCE_ID");
  return [resourceId, `${resourceId}2`];
}

export function getMetricsBatchNamespace(): string {
  return env["AZURE_MONITOR_BATCH_NAMESPACE"] ?? "requests/count";
}

export function getMetricsBatchNames(): string[] {
  const metricNamesString = env["AZURE_MONITOR_BATCH_METRICNAMES"];
  if (!metricNamesString) {
    return ["requests", "count"];
  }
  return metricNamesString.split(" ");
}

export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

export async function createRecorderAndMetricsClient(
  recorder: Recorder,
): Promise<RecorderAndMetricsClient> {
  await recorder.start(recorderOptions);
  const client = new MetricsQueryClient(
    createTestCredential(),
    recorder.configureClientOptions({}),
  );

  return {
    client: client,
    recorder: recorder,
  };
}

export async function createRecorderAndLogsClient(
  recorder: Recorder,
  retryOptions?: ExponentialRetryPolicyOptions,
): Promise<RecorderAndLogsClient> {
  await recorder.start(recorderOptions);
  await recorder.addSanitizers(
    {
      bodySanitizers: [
        {
          regex: true,
          target: "(.*)range x from 1 to (?<step_limit>[0-9]+) step 1(.*)",
          value: "10000000000000",
          groupForReplace: "step_limit",
        },
      ],
    },
    ["playback", "record"],
  );

  const client = new LogsQueryClient(
    createTestCredential(),
    recorder.configureClientOptions({ retryOptions }),
  );

  return {
    client,
    recorder,
  };
}

export function getMonitorWorkspaceId(): string {
  return assertEnvironmentVariable("MONITOR_WORKSPACE_ID");
}

export function getMetricsArmResourceId(): string {
  return assertEnvironmentVariable("METRICS_RESOURCE_ID");
}

export function getLogsArmResourceId(): string {
  return assertEnvironmentVariable("LOGS_RESOURCE_ID");
}
export function getAppInsightsConnectionString(): string {
  let appInsightsConnectionString = assertEnvironmentVariable(
    "MQ_APPLICATIONINSIGHTS_CONNECTION_STRING",
  );

  // TODO: this is a workaround for now - adding in an endpoint causes the Monitor endpoint to return a 308 (ie: permanent redirect)
  // Removing for now until we get fix the exporter.
  appInsightsConnectionString = appInsightsConnectionString.replace(
    /IngestionEndpoint=.+?(;|$)/,
    "",
  );

  return appInsightsConnectionString;
}

export function printLogQueryTables(tables: LogsTable[]): void {
  for (const table of tables) {
    const columnHeaderString = table.columnDescriptors
      .map((c) => `${c.name}(${c.type}) `)
      .join("| ");
    console.log(columnHeaderString);

    for (const row of table.rows) {
      const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
      console.log(columnValuesString);
    }
  }
}

export function assertQueryTable(
  table: LogsTable | undefined,
  expectedTable: {
    name: string;
    columns: string[];
    rows: LogsTable["rows"];
  },
  message: string,
): void {
  if (table == null) {
    throw new Error(`${message}: Table was null/undefined`);
  }

  assert.deepEqual(
    {
      name: table.name,
      rows: table.rows,
      columns: table.columnDescriptors.map((c) => c.name),
    },
    expectedTable,
    `${message}: tables weren't equal`,
  );
}
