// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the pending scope connection created by this network manager.
 *
 * @summary delete the pending scope connection created by this network manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerScopeConnectionDelete.json
 */
async function deleteNetworkManagerScopeConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.scopeConnections.delete("rg1", "testNetworkManager", "TestScopeConnection");
}

async function main(): Promise<void> {
  await deleteNetworkManagerScopeConnection();
}

main().catch(console.error);
