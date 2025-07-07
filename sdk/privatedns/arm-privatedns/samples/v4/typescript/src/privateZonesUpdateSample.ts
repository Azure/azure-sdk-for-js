// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
 *
 * @summary updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
 * x-ms-original-file: 2024-06-01/PrivateZonePatch.json
 */
async function patchPrivateDNSZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.privateZones.update("resourceGroup1", "privatezone1.com", {
    tags: { key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchPrivateDNSZone();
}

main().catch(console.error);
