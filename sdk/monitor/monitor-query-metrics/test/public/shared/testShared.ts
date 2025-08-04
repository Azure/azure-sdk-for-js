// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, env, Recorder } from "@azure-tools/test-recorder";
import { createClientLogger } from "@azure/logger";
import { MetricsClient } from "../../../src/index.js";
import type { TestContext } from "vitest";
export const loggerForTest = createClientLogger("test");

// Parse the METRICS_RESOURCE_ID to extract subscription ID and resource group
function parseResourceId(resourceId: string): {
  subscriptionId: string;
  resourceGroup: string;
  workspaceName: string;
} {
  const match = resourceId.match(
    /\/subscriptions\/([^/]+)\/resourceGroups\/([^/]+)\/providers\/[^/]+\/workspaces\/([^/]+)/,
  );
  if (!match) {
    throw new Error(`Invalid resource ID format: ${resourceId}`);
  }
  return {
    subscriptionId: match[1],
    resourceGroup: match[2],
    workspaceName: match[3],
  };
}

// Get the actual resource ID from environment or use a default for playback
const actualResourceId =
  env["METRICS_RESOURCE_ID"] ||
  "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group/providers/Microsoft.OperationalInsights/workspaces/group-logs";
const { subscriptionId, resourceGroup, workspaceName } = parseResourceId(actualResourceId);

const envSetupForPlayback: Record<string, string> = {
  MONITOR_WORKSPACE_ID: "workspace-id",
  METRICS_RESOURCE_ID:
    "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group/providers/Microsoft.OperationalInsights/workspaces/group-logs",
  AZURE_MONITOR_BATCH_ENDPOINT: "https://eastus.metrics.monitor.azure.com/",
  AZURE_MONITOR_BATCH_NAMESPACE: "Microsoft.OperationalInsights/workspaces",
  AZURE_MONITOR_BATCH_METRICNAMES: "Heartbeat",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
  ],
  sanitizerOptions: {
    generalSanitizers: [
      // Sanitize subscription ID
      {
        regex: true,
        target: subscriptionId,
        value: "00000000-0000-0000-0000-000000000000",
      },
      // Sanitize resource group name
      {
        regex: true,
        target: resourceGroup,
        value: "group",
      },
      // Sanitize workspace name
      {
        regex: true,
        target: workspaceName,
        value: "group-logs",
      },
    ],
    bodySanitizers: [
      // Sanitize full resource ID in request body
      {
        regex: true,
        target: actualResourceId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), // Escape regex special characters
        value:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/group/providers/Microsoft.OperationalInsights/workspaces/group-logs",
      },
    ],
  },
};

export interface RecorderAndMetricsClient {
  client: MetricsClient;
  recorder: Recorder;
}

export async function createRecorderAndMetricsClient(
  ctx: TestContext,
): Promise<RecorderAndMetricsClient> {
  const recorder = new Recorder(ctx);
  await recorder.start(recorderOptions);
  const testCredential = createTestCredential();
  const batchEndPoint =
    env["AZURE_MONITOR_BATCH_ENDPOINT"] ?? "https://eastus.metrics.monitor.azure.com/";
  const client = new MetricsClient(
    batchEndPoint,
    testCredential,
    recorder.configureClientOptions({}),
  );

  return {
    client: client,
    recorder: recorder,
  };
}

export function getMetricsBatchResourceIds(): string[] {
  const resourceId: string = assertEnvironmentVariable("METRICS_RESOURCE_ID");
  return [resourceId, `${resourceId}2`];
}

export function getMetricsBatchNamespace(): string {
  return env["AZURE_MONITOR_BATCH_NAMESPACE"] ?? "Microsoft.OperationalInsights/workspaces";
}

export function getMetricsBatchNames(): string[] {
  const metricNamesString = env["AZURE_MONITOR_BATCH_METRICNAMES"];
  if (!metricNamesString) {
    // Common Log Analytics workspace metrics
    return ["Heartbeat"];
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
