// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates/Updates the Pool resource.
 *
 * @summary creates/Updates the Pool resource.
 * x-ms-original-file: 2025-05-01/IpamPools_Create.json
 */
async function ipamPoolsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipamPools.create("rg1", "TestNetworkManager", "TestPool", {
    location: "eastus",
    properties: {
      description: "Test description.",
      addressPrefixes: ["10.0.0.0/24"],
      parentPoolName: "",
    },
  });
  console.log(result);
}

async function main() {
  await ipamPoolsCreate();
}

main().catch(console.error);
