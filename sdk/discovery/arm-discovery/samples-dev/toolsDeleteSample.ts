// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Tool
 *
 * @summary delete a Tool
 * x-ms-original-file: 2026-06-01/Tools_Delete_MaximumSet_Gen.json
 */
async function toolsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.tools.delete("rgdiscovery", "f127c90bef940264e3");
}

async function main(): Promise<void> {
  await toolsDeleteMaximumSet();
}

main().catch(console.error);
