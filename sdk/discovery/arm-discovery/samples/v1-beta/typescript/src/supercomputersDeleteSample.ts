// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Supercomputer
 *
 * @summary delete a Supercomputer
 * x-ms-original-file: 2026-02-01-preview/Supercomputers_Delete_MaximumSet_Gen.json
 */
async function supercomputersDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.supercomputers.delete("rgdiscovery", "44f7621cf75873fb53");
}

async function main(): Promise<void> {
  await supercomputersDeleteMaximumSet();
}

main().catch(console.error);
