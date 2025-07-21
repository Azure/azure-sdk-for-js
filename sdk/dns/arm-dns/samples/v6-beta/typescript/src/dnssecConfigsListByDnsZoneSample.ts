// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the DNSSEC configurations in a DNS zone.
 *
 * @summary lists the DNSSEC configurations in a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/ListDnssecConfigsByZone.json
 */
async function listDnssecConfigs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dnssecConfigs.listByDnsZone("rg1", "zone1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDnssecConfigs();
}

main().catch(console.error);
