// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified network profile.
 *
 * @summary deletes the specified network profile.
 * x-ms-original-file: 2025-05-01/NetworkProfileDelete.json
 */
async function deleteNetworkProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkProfiles.delete("rg1", "networkProfile1");
}

async function main(): Promise<void> {
  await deleteNetworkProfile();
}

main().catch(console.error);
