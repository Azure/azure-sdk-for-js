// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a network security group in the specified resource group.
 *
 * @summary creates or updates a network security group in the specified resource group.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupCreate.json
 */
async function createNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.createOrUpdate("rg1", "testnsg", {
    location: "eastus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a network security group in the specified resource group.
 *
 * @summary creates or updates a network security group in the specified resource group.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupCreateWithRule.json
 */
async function createNetworkSecurityGroupWithRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.createOrUpdate("rg1", "testnsg", {
    location: "eastus",
    securityRules: [
      {
        access: "Allow",
        destinationAddressPrefix: "*",
        destinationPortRange: "80",
        direction: "Inbound",
        priority: 130,
        sourceAddressPrefix: "*",
        sourcePortRange: "*",
        protocol: "*",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createNetworkSecurityGroup();
  await createNetworkSecurityGroupWithRule();
}

main().catch(console.error);
