// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
 *
 * @summary updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
 * x-ms-original-file: 2024-06-01/PrivateZonePatch.json
 */
async function patchPrivateDNSZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.privateZones.update("resourceGroup1", "privatezone1.com", {
    tags: { key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await patchPrivateDNSZone();
}

main().catch(console.error);
