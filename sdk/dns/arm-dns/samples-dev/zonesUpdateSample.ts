// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a DNS zone. Does not modify DNS records within the zone.
 *
 * @summary Updates a DNS zone. Does not modify DNS records within the zone.
 * x-ms-original-file: specification/dns/resource-manager/Microsoft.Network/preview/2023-07-01-preview/examples/PatchZone.json
 */

import type { ZoneUpdate } from "@azure/arm-dns";
import { DnsManagementClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchZone(): Promise<void> {
  const subscriptionId = process.env["DNS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DNS_RESOURCE_GROUP"] || "rg1";
  const zoneName = "zone1";
  const parameters: ZoneUpdate = { tags: { key2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new DnsManagementClient(credential, subscriptionId);
  const result = await client.zones.update(resourceGroupName, zoneName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await patchZone();
}

main().catch(console.error);
