// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone.
 *
 * @summary gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone.
 * x-ms-original-file: 2023-07-01-preview/GetZone.json
 */
async function getZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.zones.get("rg1", "zone1");
  console.log(result);
}

async function main(): Promise<void> {
  await getZone();
}

main().catch(console.error);
