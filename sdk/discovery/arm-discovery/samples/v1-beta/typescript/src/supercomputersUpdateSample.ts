// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Supercomputer
 *
 * @summary update a Supercomputer
 * x-ms-original-file: 2026-02-01-preview/Supercomputers_Update_MaximumSet_Gen.json
 */
async function supercomputersUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.supercomputers.update("rgdiscovery", "a60016ec51d9d8e35d", {
    properties: { identities: { workloadIdentities: { key3032: {} } } },
    tags: { key9318: "xawwf" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await supercomputersUpdateMaximumSet();
}

main().catch(console.error);
