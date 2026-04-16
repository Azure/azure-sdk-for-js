// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the Azure Firewall FQDN Tags in a subscription.
 *
 * @summary Gets all the Azure Firewall FQDN Tags in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AzureFirewallFqdnTagsListBySubscription.json
 */
async function listAllAzureFirewallFqdnTagsForAGivenSubscription() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureFirewallFqdnTags.listAll()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllAzureFirewallFqdnTagsForAGivenSubscription();
}

main().catch(console.error);
