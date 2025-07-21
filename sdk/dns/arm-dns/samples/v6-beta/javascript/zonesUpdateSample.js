// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a DNS zone. Does not modify DNS records within the zone.
 *
 * @summary updates a DNS zone. Does not modify DNS records within the zone.
 * x-ms-original-file: 2023-07-01-preview/PatchZone.json
 */
async function patchZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.zones.update("rg1", "zone1", {
    tags: { key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await patchZone();
}

main().catch(console.error);
