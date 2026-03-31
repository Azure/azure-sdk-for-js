// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specific Pool resource.
 *
 * @summary gets the specific Pool resource.
 * x-ms-original-file: 2025-05-01/IpamPools_Get.json
 */
async function ipamPoolsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.get("rg1", "TestNetworkManager", "TestPool");
  console.log(result);
}

async function main() {
  await ipamPoolsGet();
}

main().catch(console.error);
