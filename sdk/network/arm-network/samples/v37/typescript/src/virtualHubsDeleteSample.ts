// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a VirtualHub.
 *
 * @summary deletes a VirtualHub.
 * x-ms-original-file: 2025-05-01/VirtualHubDelete.json
 */
async function virtualHubDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualHubs.delete("rg1", "virtualHub1");
}

async function main(): Promise<void> {
  await virtualHubDelete();
}

main().catch(console.error);
