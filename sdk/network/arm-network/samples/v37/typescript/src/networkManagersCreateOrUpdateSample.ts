// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Network Manager.
 *
 * @summary creates or updates a Network Manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerPut.json
 */
async function putNetworkManager(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagers.createOrUpdate("rg1", "TestNetworkManager", {
    description: "My Test Network Manager",
    networkManagerScopeAccesses: ["Connectivity"],
    networkManagerScopes: {
      managementGroups: ["/Microsoft.Management/testmg"],
      subscriptions: ["/subscriptions/00000000-0000-0000-0000-000000000000"],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putNetworkManager();
}

main().catch(console.error);
