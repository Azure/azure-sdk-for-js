// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing peering with the specified name under the given subscription and resource group.
 *
 * @summary gets an existing peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/GetPeering.json
 */
async function getAPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerings.get("rgName", "peeringName");
  console.log(result);
}

async function main(): Promise<void> {
  await getAPeering();
}

main().catch(console.error);
