// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing peering service with the specified name under the given subscription and resource group.
 *
 * @summary gets an existing peering service with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/GetPeeringService.json
 */
async function getAPeeringService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peeringServices.get("rgName", "peeringServiceName");
  console.log(result);
}

async function main(): Promise<void> {
  await getAPeeringService();
}

main().catch(console.error);
