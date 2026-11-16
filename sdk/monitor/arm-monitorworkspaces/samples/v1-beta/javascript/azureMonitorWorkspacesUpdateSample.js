// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates part of an Azure Monitor Workspace
 *
 * @summary updates part of an Azure Monitor Workspace
 * x-ms-original-file: 2026-09-03-preview/AzureMonitorWorkspaces_Update_MaximumSet_Gen.json
 */
async function azureMonitorWorkspacesUpdateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.azureMonitorWorkspaces.update(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    { tags: {}, identity: { type: "SystemAssigned" } },
  );
  console.log(result);
}

async function main() {
  await azureMonitorWorkspacesUpdateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
