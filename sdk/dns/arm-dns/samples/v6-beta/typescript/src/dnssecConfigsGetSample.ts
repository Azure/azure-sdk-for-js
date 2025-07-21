// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the DNSSEC configuration.
 *
 * @summary gets the DNSSEC configuration.
 * x-ms-original-file: 2023-07-01-preview/GetDnssecConfig.json
 */
async function getDnssecConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.dnssecConfigs.get("rg1", "zone1");
  console.log(result);
}

async function main(): Promise<void> {
  await getDnssecConfig();
}

main().catch(console.error);
