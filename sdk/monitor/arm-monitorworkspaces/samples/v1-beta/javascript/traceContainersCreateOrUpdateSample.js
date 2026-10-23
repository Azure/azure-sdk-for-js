// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces the trace container for an Azure Monitor Workspace. Modeled as a long-running operation (200 + 201); the service may complete synchronously by returning a terminal provisioningState, or track progress via Azure-AsyncOperation.
 *
 * @summary creates or replaces the trace container for an Azure Monitor Workspace. Modeled as a long-running operation (200 + 201); the service may complete synchronously by returning a terminal provisioningState, or track progress via Azure-AsyncOperation.
 * x-ms-original-file: 2026-09-03-preview/TraceContainers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function traceContainersCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.traceContainers.createOrUpdate(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    {
      properties: {
        traceDurationWindowInSeconds: 300,
        traceRetentionInDays: 730,
        traceMetricsState: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main() {
  await traceContainersCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
