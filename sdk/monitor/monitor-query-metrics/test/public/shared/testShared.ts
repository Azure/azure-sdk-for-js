// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable, env } from "@azure-tools/test-recorder";
import { createClientLogger } from "@azure/logger";
import { MetricsClient } from "../../../src/index.js";
export const loggerForTest = createClientLogger("test");

const replacementForLogsResourceId = env["LOGS_RESOURCE_ID"]?.startsWith("/")
  ? "/logs-arm-resource-id"
  : "logs-arm-resource-id";

const envSetupForPlayback: Record<string, string> = {
  MONITOR_WORKSPACE_ID: "workspace-id",
  METRICS_RESOURCE_ID: "metrics-arm-resource-id",
  LOGS_RESOURCE_ID: replacementForLogsResourceId,
  MQ_APPLICATIONINSIGHTS_CONNECTION_STRING: "mq_applicationinsights_connection",
};

// const recorderOptions: RecorderStartOptions = {
//   envSetupForPlayback,
//   removeCentralSanitizers: [
//     "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
//   ],
// };

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

export function getMonitorWorkspaceId(): string {
  return assertEnvironmentVariable("MONITOR_WORKSPACE_ID");
}
