// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates an IpAllocation in the specified resource group.
 *
 * @summary Creates or updates an IpAllocation in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/IpAllocationCreate.json
 */
async function createIPAllocation() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const ipAllocationName = "test-ipallocation";
  const parameters = {
    typePropertiesType: "Hypernet",
    allocationTags: {
      vNetID:
        "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/HypernetVnet1",
    },
    location: "centraluseuap",
    prefix: "3.2.5.0/24",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ipAllocations.beginCreateOrUpdateAndWait(
    resourceGroupName,
    ipAllocationName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createIPAllocation();
}

main().catch(console.error);
