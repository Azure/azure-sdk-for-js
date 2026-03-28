// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates VirtualHub tags.
 *
 * @summary updates VirtualHub tags.
 * x-ms-original-file: 2025-05-01/VirtualHubUpdateTags.json
 */
async function virtualHubUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.updateTags("rg1", "virtualHub2", {
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await virtualHubUpdate();
}

main().catch(console.error);
