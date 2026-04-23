// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Tool
 *
 * @summary delete a Tool
 * x-ms-original-file: 2026-02-01-preview/Tools_Delete_MaximumSet_Gen.json
 */
async function toolsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.tools.delete("rgdiscovery", "d0e8e07484db1bb9a9");
}

async function main(): Promise<void> {
  await toolsDeleteMaximumSet();
}

main().catch(console.error);
