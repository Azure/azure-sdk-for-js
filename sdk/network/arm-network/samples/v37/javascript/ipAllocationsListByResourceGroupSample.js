// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all IpAllocations in a resource group.
 *
 * @summary gets all IpAllocations in a resource group.
 * x-ms-original-file: 2025-05-01/IpAllocationListByResourceGroup.json
 */
async function listIpAllocationsInResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ipAllocations.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listIpAllocationsInResourceGroup();
}

main().catch(console.error);
