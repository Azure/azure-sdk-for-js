// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a VirtualWAN.
 *
 * @summary deletes a VirtualWAN.
 * x-ms-original-file: 2025-05-01/VirtualWANDelete.json
 */
async function virtualWANDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualWans.delete("rg1", "virtualWan1");
}

async function main(): Promise<void> {
  await virtualWANDelete();
}

main().catch(console.error);
