// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Supercomputer
 *
 * @summary get a Supercomputer
 * x-ms-original-file: 2026-02-01-preview/Supercomputers_Get_MaximumSet_Gen.json
 */
async function supercomputersGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.supercomputers.get("rgdiscovery", "b6807d2513b2fdb240");
  console.log(result);
}

async function main(): Promise<void> {
  await supercomputersGetMaximumSet();
}

main().catch(console.error);
