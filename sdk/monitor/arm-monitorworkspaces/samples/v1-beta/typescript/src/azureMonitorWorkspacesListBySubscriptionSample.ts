// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Azure Monitor Workspaces in the specified subscription
 *
 * @summary lists all Azure Monitor Workspaces in the specified subscription
 * x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_ListBySubscription_MaximumSet_Gen.json
 */
async function azureMonitorWorkspacesListBySubscriptionGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureMonitorWorkspaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await azureMonitorWorkspacesListBySubscriptionGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
