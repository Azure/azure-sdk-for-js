// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a DNS zone. Does not modify DNS records within the zone.
 *
 * @summary creates or updates a DNS zone. Does not modify DNS records within the zone.
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateZone.json
 */
async function createZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.zones.createOrUpdate("rg1", "zone1", {
    location: "Global",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createZone();
}

main().catch(console.error);
