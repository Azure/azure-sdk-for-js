// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List Associated Resource in the Pool.
 *
 * @summary List Associated Resource in the Pool.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/IpamPools_ListAssociatedResources.json
 */
async function ipamPoolsListAssociatedResources() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "TestNetworkManager";
  const poolName = "TestPool";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ipamPools.listAssociatedResources(
    resourceGroupName,
    networkManagerName,
    poolName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await ipamPoolsListAssociatedResources();
}

main().catch(console.error);
