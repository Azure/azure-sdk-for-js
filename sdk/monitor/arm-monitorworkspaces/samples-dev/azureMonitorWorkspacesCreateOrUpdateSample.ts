// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Monitor Workspace
 *
 * @summary creates or updates an Azure Monitor Workspace
 * x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_CreateOrUpdate_MaximumSet_Gen.json
 */
async function azureMonitorWorkspacesCreateOrUpdateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.azureMonitorWorkspaces.createOrUpdate(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    {
      location: "eastus",
      properties: {
        metrics: { enableAccessUsingResourcePermissions: true },
        publicNetworkAccess: "Enabled",
      },
      tags: {},
      identity: { type: "SystemAssigned" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureMonitorWorkspacesCreateOrUpdateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
