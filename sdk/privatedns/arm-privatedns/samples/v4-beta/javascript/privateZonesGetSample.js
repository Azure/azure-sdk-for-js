// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone.
 *
 * @summary gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the record sets within the zone.
 * x-ms-original-file: 2024-06-01/PrivateZoneGet.json
 */
async function getPrivateDNSZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.privateZones.get("resourceGroup1", "privatezone1.com");
  console.log(result);
}

async function main() {
  await getPrivateDNSZone();
}

main().catch(console.error);
