// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the specified Azure Monitor Workspace
 *
 * @summary returns the specified Azure Monitor Workspace
 * x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Get_MaximumSet_Gen.json
 */
async function azureMonitorWorkspacesGetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.azureMonitorWorkspaces.get(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
  );
  console.log(result);
}

async function main() {
  await azureMonitorWorkspacesGetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
