// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Azure Monitor Workspace
 *
 * @summary deletes an Azure Monitor Workspace
 * x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Delete_MaximumSet_Gen.json
 */
async function azureMonitorWorkspacesDeleteGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.azureMonitorWorkspaces.delete("rgazuremonitorworkspace", "myAzureMonitorWorkspace");
}

async function main() {
  await azureMonitorWorkspacesDeleteGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
