// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Azure Firewalls in a resource group.
 *
 * @summary lists all Azure Firewalls in a resource group.
 * x-ms-original-file: 2025-05-01/AzureFirewallListByResourceGroup.json
 */
async function listAllAzureFirewallsForAGivenResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureFirewalls.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllAzureFirewallsForAGivenResourceGroup();
}

main().catch(console.error);
