// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified network security group.
 *
 * @summary deletes the specified network security group.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupDelete.json
 */
async function deleteNetworkSecurityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkSecurityGroups.delete("rg1", "testnsg");
}

async function main() {
  await deleteNetworkSecurityGroup();
}

main().catch(console.error);
