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
import { LogsQueryClient, LogsTable, MetricsQueryClient } from "../../../src";
import { ExponentialRetryPolicyOptions } from "@azure/core-rest-pipeline";
export const loggerForTest = createClientLogger("test");

const envSetupForPlayback: Record<string, string> = {
  MONITOR_WORKSPACE_ID: "workspace-id",
  METRICS_RESOURCE_ID: "metrics-arm-resource-id",
  MQ_APPLICATIONINSIGHTS_CONNECTION_STRING: "mq_applicationinsights_connection",
  AZURE_TENANT_ID: "98123456-7614-3456-5678-789980112547",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};
export interface RecorderAndLogsClient {
  client: LogsQueryClient;
  recorder: Recorder;
}

export interface RecorderAndMetricsClient {
  client: MetricsQueryClient;
  recorder: Recorder;
}

export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

export async function createRecorderAndMetricsClient(
  recorder: Recorder
): Promise<RecorderAndMetricsClient> {
  await recorder.start(recorderOptions);

  const client = new MetricsQueryClient(
    createTestCredential(),
    recorder.configureClientOptions({})
  );

  return {
    client: client,
    recorder: recorder,
  };
}

export async function createRecorderAndLogsClient(
  recorder: Recorder,
  retryOptions?: ExponentialRetryPolicyOptions
): Promise<RecorderAndLogsClient> {
  await recorder.start(recorderOptions);

  const client = new LogsQueryClient(
    createTestCredential(),
    recorder.configureClientOptions({ retryOptions })
  );

  return {
    client,
    recorder,
  };
}

export function getMonitorWorkspaceId(): string {
  return assertEnvironmentVariable("MONITOR_WORKSPACE_ID");
}

export function getMetricsArmResourceId(): {
  resourceId: string;
} {
  return {
    resourceId: assertEnvironmentVariable("METRICS_RESOURCE_ID"),
  };
}

export function getAppInsightsConnectionString(): string {
  let appInsightsConnectionString = assertEnvironmentVariable(
    "MQ_APPLICATIONINSIGHTS_CONNECTION_STRING"
  );

  // TODO: this is a workaround for now - adding in an endpoint causes the Monitor endpoint to return a 308 (ie: permanent redirect)
  // Removing for now until we get fix the exporter.
  appInsightsConnectionString = appInsightsConnectionString.replace(
    /IngestionEndpoint=.+?(;|$)/,
    ""
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
  message: string
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
    `${message}: tables weren't equal`
  );
}
