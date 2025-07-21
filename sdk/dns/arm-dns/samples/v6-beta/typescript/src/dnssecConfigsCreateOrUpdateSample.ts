// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the DNSSEC configuration on a DNS zone.
 *
 * @summary creates or updates the DNSSEC configuration on a DNS zone.
 * x-ms-original-file: 2023-07-01-preview/CreateOrUpdateDnssecConfig.json
 */
async function createDnssecConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.dnssecConfigs.createOrUpdate("rg1", "zone1");
  console.log(result);
}

async function main(): Promise<void> {
  await createDnssecConfig();
}

main().catch(console.error);
