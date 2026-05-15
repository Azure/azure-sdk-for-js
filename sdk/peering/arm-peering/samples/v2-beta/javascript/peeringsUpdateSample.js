// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates tags for a peering with the specified name under the given subscription and resource group.
 *
 * @summary updates tags for a peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/UpdatePeeringTags.json
 */
async function updatePeeringTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerings.update("rgName", "peeringName", {
    tags: { tag0: "value0", tag1: "value1" },
  });
  console.log(result);
}

async function main() {
  await updatePeeringTags();
}

main().catch(console.error);
