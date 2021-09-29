// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientSecretCredential } from "@azure/identity";
import { env, record, Recorder, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import * as assert from "assert";
import { Context } from "mocha";
import { createClientLogger } from "@azure/logger";
import { LogsTable, LogsQueryClient, MetricsQueryClient } from "../../../src";
import { ExponentialRetryPolicyOptions } from "@azure/core-rest-pipeline";
export const loggerForTest = createClientLogger("test");

const replaceableVariables: Record<string, string> = {
  MONITOR_WORKSPACE_ID: "workspace-id",
  METRICS_RESOURCE_ID: "metrics-arm-resource-id",
  MQ_APPLICATIONINSIGHTS_CONNECTION_STRING: "mq_applicationinsights_connection",
  AZURE_TENANT_ID: "98123456-7614-3456-5678-789980112547",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret"
};
export interface RecorderAndLogsClient {
  client: LogsQueryClient;
  recorder: Recorder;
}

export interface RecorderAndMetricsClient {
  client: MetricsQueryClient;
  recorder: Recorder;
}

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  }
});

export const environmentSetup: RecorderEnvironmentSetup = {
  // == Recorder Environment Setup == Add the replaceable variables from
  // above
  replaceableVariables,

  // We don't use this in the template, but if we had any query parameters
  // we wished to discard, we could add them here
  queryParametersToSkip: [],

  // Finally, we need to remove the AAD `access_token` from any requests.
  // This is very important, as it cannot be removed using environment
  // variable or query parameter replacement.  The
  // `customizationsOnRecordings` field allows us to make arbitrary
  // replacements within recordings.
  customizationsOnRecordings: [
    (recording: string): any =>
      recording.replace(/"access_token":"[^"]*"/g, `"access_token":"access_token"`)
  ]
};

export function createRecorderAndMetricsClient(context: Context): RecorderAndMetricsClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new MetricsQueryClient(createTestClientSecretCredential()),
    recorder
  };
}

export function createRecorderAndLogsClient(
  context: Context,
  retryOptions?: ExponentialRetryPolicyOptions
): RecorderAndLogsClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new LogsQueryClient(createTestClientSecretCredential(), {
      retryOptions
    }),
    recorder
  };
}

export function createTestClientSecretCredential(): ClientSecretCredential {
  if (!env.AZURE_TENANT_ID || !env.AZURE_CLIENT_ID || !env.AZURE_CLIENT_SECRET) {
    throw new Error(
      "AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET must be set to run live tests"
    );
  }

  return new ClientSecretCredential(
    env.AZURE_TENANT_ID,
    env.AZURE_CLIENT_ID,
    env.AZURE_CLIENT_SECRET
  );
}

export function getMonitorWorkspaceId(mochaContext: Pick<Context, "skip">): string {
  return getRequiredEnvVar(mochaContext, "MONITOR_WORKSPACE_ID");
}

export function getMetricsArmResourceId(
  mochaContext: Pick<Context, "skip">
): {
  resourceId: string;
} {
  return {
    resourceId: getRequiredEnvVar(mochaContext, "METRICS_RESOURCE_ID")
  };
}

export function getAppInsightsConnectionString(mochaContext: Pick<Context, "skip">): string {
  let appInsightsConnectionString = getRequiredEnvVar(
    mochaContext,
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

function getRequiredEnvVar(mochaContext: Pick<Context, "skip">, variableName: string): string {
  if (!env[variableName]) {
    console.log(
      `TODO: live tests skipped until test-resources + data population is set up (missing ${variableName} env var).`
    );
    mochaContext.skip();
  }

  return env[variableName];
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
      columns: table.columnDescriptors.map((c) => c.name)
    },
    expectedTable,
    `${message}: tables weren't equal`
  );
}
