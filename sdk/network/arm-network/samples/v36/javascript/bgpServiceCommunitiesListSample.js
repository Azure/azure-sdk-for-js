// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the available bgp service communities.
 *
 * @summary Gets all the available bgp service communities.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceCommunityList.json
 */
async function serviceCommunityList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bgpServiceCommunities.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await serviceCommunityList();
}

main().catch(console.error);
