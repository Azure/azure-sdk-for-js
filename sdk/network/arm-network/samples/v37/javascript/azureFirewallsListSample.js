// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Azure Firewalls in a resource group.
 *
 * @summary lists all Azure Firewalls in a resource group.
 * x-ms-original-file: 2025-05-01/AzureFirewallListByResourceGroup.json
 */
async function listAllAzureFirewallsForAGivenResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureFirewalls.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllAzureFirewallsForAGivenResourceGroup();
}

main().catch(console.error);
