// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified ExpressRouteLag resource.
 *
 * @summary deletes the specified ExpressRouteLag resource.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagDelete.json
 */
async function deleteExpressRouteLag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteLags.delete("rg1", "lagName");
}

async function main(): Promise<void> {
  await deleteExpressRouteLag();
}

main().catch(console.error);
