// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the available bgp service communities.
 *
 * @summary gets all the available bgp service communities.
 * x-ms-original-file: 2025-05-01/ServiceCommunityList.json
 */
async function serviceCommunityList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
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
