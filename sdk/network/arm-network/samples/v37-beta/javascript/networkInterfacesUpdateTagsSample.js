// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a network interface tags.
 *
 * @summary updates a network interface tags.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceUpdateTags.json
 */
async function updateNetworkInterfaceTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.updateTags("rg1", "test-nic", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateNetworkInterfaceTags();
}

main().catch(console.error);
