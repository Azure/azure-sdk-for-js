// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of all action groups in a resource group.
 *
 * @summary get a list of all action groups in a resource group.
 * x-ms-original-file: 2024-10-01-preview/listActionGroupsByResourceGroup.json
 */
async function listActionGroupsAtResourceGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.actionGroups.listByResourceGroup("Default-NotificationRules")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listActionGroupsAtResourceGroupLevel();
}

main().catch(console.error);
