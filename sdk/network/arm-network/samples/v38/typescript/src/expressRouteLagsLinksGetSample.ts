// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the specified ExpressRouteLagLink resource.
 *
 * @summary retrieves the specified ExpressRouteLagLink resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagLinkGet.json
 */
async function getExpressRouteLagLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLags.linksGet("rg1", "lagName", "linkName");
  console.log(result);
}

async function main(): Promise<void> {
  await getExpressRouteLagLink();
}

main().catch(console.error);
