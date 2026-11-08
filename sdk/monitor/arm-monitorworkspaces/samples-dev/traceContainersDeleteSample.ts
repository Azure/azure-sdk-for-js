// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the trace container for an Azure Monitor Workspace.
 *
 * @summary deletes the trace container for an Azure Monitor Workspace.
 * x-ms-original-file: 2026-09-03-preview/TraceContainers_Delete_MaximumSet_Gen.json
 */
async function traceContainersDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.traceContainers.delete("rgazuremonitorworkspace", "myAzureMonitorWorkspace");
}

async function main(): Promise<void> {
  await traceContainersDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
