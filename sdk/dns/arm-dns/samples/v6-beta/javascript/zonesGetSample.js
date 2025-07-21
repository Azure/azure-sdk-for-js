// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone.
 *
 * @summary gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone.
 * x-ms-original-file: 2023-07-01-preview/GetZone.json
 */
async function getZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.zones.get("rg1", "zone1");
  console.log(result);
}

async function main() {
  await getZone();
}

main().catch(console.error);
