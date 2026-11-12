// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Supercomputer
 *
 * @summary delete a Supercomputer
 * x-ms-original-file: 2026-06-01/Supercomputers_Delete_MaximumSet_Gen.json
 */
async function supercomputersDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.supercomputers.delete("rgdiscovery", "7d52dbbe848ddb02a1");
}

async function main(): Promise<void> {
  await supercomputersDeleteMaximumSet();
}

main().catch(console.error);
