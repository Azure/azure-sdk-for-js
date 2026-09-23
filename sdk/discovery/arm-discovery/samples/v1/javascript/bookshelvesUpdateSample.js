// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Bookshelf
 *
 * @summary update a Bookshelf
 * x-ms-original-file: 2026-06-01/Bookshelves_Update_MaximumSet_Gen.json
 */
async function bookshelvesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelves.update("rgdiscovery", "14964dff7a049b02ad", {
    properties: {
      keyVaultProperties: { keyName: "rioczxrgqxcnesqxnxpuc", keyVersion: "lhpxvapkhljzkdt" },
      publicNetworkAccess: "Enabled",
    },
    tags: { key5254: "fozqmnqttenfggdjxalzycvqqzfe" },
  });
  console.log(result);
}

async function main() {
  await bookshelvesUpdateMaximumSet();
}

main().catch(console.error);
