// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing prefix with the specified name under the given subscription, resource group and peering service.
 *
 * @summary deletes an existing prefix with the specified name under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/DeletePeeringServicePrefix.json
 */
async function deleteAPrefixAssociatedWithThePeeringService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  await client.prefixes.delete("rgName", "peeringServiceName", "peeringServicePrefixName");
}

async function main(): Promise<void> {
  await deleteAPrefixAssociatedWithThePeeringService();
}

main().catch(console.error);
