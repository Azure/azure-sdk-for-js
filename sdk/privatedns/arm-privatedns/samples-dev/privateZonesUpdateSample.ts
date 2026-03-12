// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
 *
 * @summary Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
 * x-ms-original-file: specification/privatedns/resource-manager/Microsoft.Network/stable/2024-06-01/examples/PrivateZonePatch.json
 */

import type { PrivateZone } from "@azure/arm-privatedns";
import { PrivateDnsManagementClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchPrivateDnsZone(): Promise<void> {
  const subscriptionId = process.env["PRIVATEDNS_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["PRIVATEDNS_RESOURCE_GROUP"] || "resourceGroup1";
  const privateZoneName = "privatezone1.com";
  const parameters: PrivateZone = { tags: { key2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new PrivateDnsManagementClient(credential, subscriptionId);
  const result = await client.privateZones.beginUpdateAndWait(
    resourceGroupName,
    privateZoneName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchPrivateDnsZone();
}

main().catch(console.error);
