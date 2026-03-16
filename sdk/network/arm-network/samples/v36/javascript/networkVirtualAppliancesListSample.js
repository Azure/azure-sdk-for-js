// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all Network Virtual Appliances in a subscription.
 *
 * @summary Gets all Network Virtual Appliances in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceListBySubscription.json
 */
async function listAllNetworkVirtualAppliancesForAGivenSubscription() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkVirtualAppliances.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllNetworkVirtualAppliancesForAGivenSubscription();
}

main().catch(console.error);
