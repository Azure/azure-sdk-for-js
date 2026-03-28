// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specific Pool resource.
 *
 * @summary updates the specific Pool resource.
 * x-ms-original-file: 2025-05-01/IpamPools_Update.json
 */
async function ipamPoolsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.update("rg1", "TestNetworkManager", "TestPool");
  console.log(result);
}

async function main() {
  await ipamPoolsUpdate();
}

main().catch(console.error);
