// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all of the available subnet delegations for this subscription in this region.
 *
 * @summary Gets all of the available subnet delegations for this subscription in this region.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/AvailableDelegationsSubscriptionGet.json
 */
async function getAvailableDelegations() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const location = "westcentralus";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableDelegations.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAvailableDelegations();
}

main().catch(console.error);
