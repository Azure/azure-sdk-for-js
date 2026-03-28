// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags for a peering service with the specified name under the given subscription and resource group.
 *
 * @summary updates tags for a peering service with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/UpdatePeeringServiceTags.json
 */
async function updatePeeringServiceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peeringServices.update("rgName", "peeringServiceName", {
    tags: { tag0: "value0", tag1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatePeeringServiceTags();
}

main().catch(console.error);
