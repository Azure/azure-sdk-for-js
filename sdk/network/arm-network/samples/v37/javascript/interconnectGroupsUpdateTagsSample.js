// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates interconnect group tags.
 *
 * @summary updates interconnect group tags.
 * x-ms-original-file: 2025-07-01/InterconnectGroupUpdateTags.json
 */
async function updateInterconnectGroupTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.interconnectGroups.updateTags("rg1", "test-ig", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateInterconnectGroupTags();
}

main().catch(console.error);
