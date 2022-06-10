// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { createTestCredential } from "@azure-tools/test-credential";
import {
  env,
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import * as assert from "assert";
import { createClientLogger } from "@azure/logger";
import { LogsIngestionClient } from "../../../src";
import { ExponentialRetryPolicyOptions } from "@azure/core-rest-pipeline";
export const loggerForTest = createClientLogger("test");

const envSetupForPlayback: Record<string, string> = {

  AZURE_TENANT_ID: "98123456-7614-3456-5678-789980112547",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  LOGS_INGESTION_ENDPOINT: "logs_ingestion_endpoint",

};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};
export interface RecorderAndLogsClient {
  client: LogsIngestionClient;
  recorder: Recorder;
}

export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

export async function createRecorderAndLogsClient(
  recorder: Recorder,
  retryOptions?: ExponentialRetryPolicyOptions
): Promise<RecorderAndLogsClient> {
  await recorder.start(recorderOptions);

  const client = new LogsIngestionClient(
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

  