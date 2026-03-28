// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates tags for a peering service with the specified name under the given subscription and resource group.
 *
 * @summary updates tags for a peering service with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/UpdatePeeringServiceTags.json
 */
async function updatePeeringServiceTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peeringServices.update("rgName", "peeringServiceName", {
    tags: { tag0: "value0", tag1: "value1" },
  });
  console.log(result);
}

async function main() {
  await updatePeeringServiceTags();
}

main().catch(console.error);
