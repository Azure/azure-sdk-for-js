// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitoraccounts";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates part of an Azure Monitor Workspace
 *
 * @summary updates part of an Azure Monitor Workspace
 * x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Update_MaximumSet_Gen.json
 */
async function azureMonitorWorkspacesUpdateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.azureMonitorWorkspaces.update(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    {
      tags: {},
      properties: {
        publicNetworkAccess: "Enabled",
        metrics: { enableAccessUsingResourcePermissions: true },
      },
      identity: { type: "SystemAssigned" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureMonitorWorkspacesUpdateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
