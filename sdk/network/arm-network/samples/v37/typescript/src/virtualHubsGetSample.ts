// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the details of a VirtualHub.
 *
 * @summary retrieves the details of a VirtualHub.
 * x-ms-original-file: 2025-05-01/VirtualHubGet.json
 */
async function virtualHubGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.get("rg1", "virtualHub1");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualHubGet();
}

main().catch(console.error);
