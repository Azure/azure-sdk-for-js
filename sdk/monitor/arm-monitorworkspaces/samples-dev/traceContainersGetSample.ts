// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the trace container for an Azure Monitor Workspace.
 *
 * @summary gets the trace container for an Azure Monitor Workspace.
 * x-ms-original-file: 2026-09-03-preview/TraceContainers_Get_MaximumSet_Gen.json
 */
async function traceContainersGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.traceContainers.get(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await traceContainersGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
