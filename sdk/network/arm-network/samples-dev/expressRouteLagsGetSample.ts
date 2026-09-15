// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the requested ExpressRouteLag resource.
 *
 * @summary retrieves the requested ExpressRouteLag resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagGet.json
 */
async function getExpressRouteLag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLags.get("rg1", "lagName");
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteLag();
}

main().catch(console.error);
