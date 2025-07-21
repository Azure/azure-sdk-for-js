// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-dns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all record sets in a DNS zone.
 *
 * @summary lists all record sets in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListAllRecordSetsByZone.json
 */
async function listAllRecordsetsByZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recordSets.listAllByDnsZone("rg1", "zone1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllRecordsetsByZone();
}

main().catch(console.error);
