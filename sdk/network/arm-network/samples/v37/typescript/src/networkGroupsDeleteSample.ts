// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a network group.
 *
 * @summary deletes a network group.
 * x-ms-original-file: 2025-05-01/NetworkManagerGroupDelete.json
 */
async function networkGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkGroups.delete("rg1", "testNetworkManager", "testNetworkGroup", {
    force: false,
  });
}

async function main(): Promise<void> {
  await networkGroupsDelete();
}

main().catch(console.error);
