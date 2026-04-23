// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete the Pool resource.
 *
 * @summary Delete the Pool resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/IpamPools_Delete.json
 */
async function ipamPoolsDelete() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "TestNetworkManager";
  const poolName = "TestPool";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.beginDeleteAndWait(
    resourceGroupName,
    networkManagerName,
    poolName,
  );
  console.log(result);
}

async function main() {
  await ipamPoolsDelete();
}

main().catch(console.error);
