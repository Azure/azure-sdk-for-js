// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone.
 *
 * @summary deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation cannot be undone.
 * x-ms-original-file: 2023-07-01-preview/DeleteZone.json
 */
async function deleteZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  await client.zones.delete("rg1", "zone1");
}

async function main(): Promise<void> {
  await deleteZone();
}

main().catch(console.error);
