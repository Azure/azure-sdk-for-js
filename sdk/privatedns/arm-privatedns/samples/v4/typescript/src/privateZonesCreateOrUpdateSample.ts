// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone.
 *
 * @summary creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records within the zone.
 * x-ms-original-file: 2024-06-01/PrivateZonePut.json
 */
async function putPrivateDNSZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.privateZones.createOrUpdate("resourceGroup1", "privatezone1.com", {
    location: "Global",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putPrivateDNSZone();
}

main().catch(console.error);
