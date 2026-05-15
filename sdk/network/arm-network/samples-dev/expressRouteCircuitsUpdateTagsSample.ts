// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an express route circuit tags.
 *
 * @summary updates an express route circuit tags.
 * x-ms-original-file: 2025-05-01/ExpressRouteCircuitUpdateTags.json
 */
async function updateExpressRouteCircuitTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCircuits.updateTags("ertest", "er1", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateExpressRouteCircuitTags();
}

main().catch(console.error);
