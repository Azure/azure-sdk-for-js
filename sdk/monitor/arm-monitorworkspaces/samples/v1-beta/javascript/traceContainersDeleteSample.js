// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the trace container for an Azure Monitor Workspace.
 *
 * @summary deletes the trace container for an Azure Monitor Workspace.
 * x-ms-original-file: 2026-09-03-preview/TraceContainers_Delete_MaximumSet_Gen.json
 */
async function traceContainersDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.traceContainers.delete("rgazuremonitorworkspace", "myAzureMonitorWorkspace");
}

async function main() {
  await traceContainersDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
