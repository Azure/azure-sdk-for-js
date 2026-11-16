// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists trace containers for an Azure Monitor Workspace.
 *
 * @summary lists trace containers for an Azure Monitor Workspace.
 * x-ms-original-file: 2026-09-03-preview/TraceContainers_ListByAzureMonitorWorkspace_MaximumSet_Gen.json
 */
async function traceContainersListByAzureMonitorWorkspaceMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.traceContainers.listByAzureMonitorWorkspace(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await traceContainersListByAzureMonitorWorkspaceMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
