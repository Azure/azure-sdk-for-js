// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a network security group tags.
 *
 * @summary updates a network security group tags.
 * x-ms-original-file: 2025-05-01/NetworkSecurityGroupUpdateTags.json
 */
async function updateNetworkSecurityGroupTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.updateTags("rg1", "testnsg", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateNetworkSecurityGroupTags();
}

main().catch(console.error);
