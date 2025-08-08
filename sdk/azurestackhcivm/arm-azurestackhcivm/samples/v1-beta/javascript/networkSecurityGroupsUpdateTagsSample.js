// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a network security group tags.
 *
 * @summary updates a network security group tags.
 * x-ms-original-file: 2025-06-01-preview/NetworkSecurityGroups_UpdateTags.json
 */
async function updateNetworkSecurityGroupTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.networkSecurityGroups.updateTags("testrg", "testnsg", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateNetworkSecurityGroupTags();
}

main().catch(console.error);
