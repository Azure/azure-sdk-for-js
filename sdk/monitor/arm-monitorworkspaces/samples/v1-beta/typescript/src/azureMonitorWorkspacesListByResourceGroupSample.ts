// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Azure Monitor Workspaces in the specified resource group
 *
 * @summary lists all Azure Monitor Workspaces in the specified resource group
 * x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_ListByResourceGroup_MaximumSet_Gen.json
 */
async function azureMonitorWorkspacesListByResourceGroupGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureMonitorWorkspaces.listByResourceGroup(
    "rgazuremonitorworkspace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await azureMonitorWorkspacesListByResourceGroupGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
