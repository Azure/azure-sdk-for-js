// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of service association links for a subnet.
 *
 * @summary gets a list of service association links for a subnet.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGetServiceAssociationLinks.json
 */
async function getServiceAssociationLinks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceAssociationLinks.list("rg1", "vnet", "subnet");
  console.log(result);
}

async function main(): Promise<void> {
  await getServiceAssociationLinks();
}

main().catch(console.error);
