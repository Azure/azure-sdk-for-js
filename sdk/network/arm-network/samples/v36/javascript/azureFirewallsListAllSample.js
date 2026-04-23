// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the Azure Firewalls in a subscription.
 *
 * @summary Gets all the Azure Firewalls in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AzureFirewallListBySubscription.json
 */
async function listAllAzureFirewallsForAGivenSubscription() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureFirewalls.listAll()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllAzureFirewallsForAGivenSubscription();
}

main().catch(console.error);
