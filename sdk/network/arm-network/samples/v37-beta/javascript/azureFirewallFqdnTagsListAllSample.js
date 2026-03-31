// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the Azure Firewall FQDN Tags in a subscription.
 *
 * @summary gets all the Azure Firewall FQDN Tags in a subscription.
 * x-ms-original-file: 2025-05-01/AzureFirewallFqdnTagsListBySubscription.json
 */
async function listAllAzureFirewallFqdnTagsForAGivenSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
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
