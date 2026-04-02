// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified network security group.
 *
 * @summary gets the specified network security group.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupGet.json
 */
async function getNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.get("rg1", "testnsg");
  console.log(result);
}

async function main() {
  await getNetworkSecurityGroup();
}

main().catch(console.error);
