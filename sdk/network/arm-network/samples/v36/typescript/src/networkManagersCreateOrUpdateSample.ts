// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManager} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a Network Manager.
 *
 * @summary Creates or updates a Network Manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerPut.json
 */
async function putNetworkManager(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "TestNetworkManager";
  const parameters: NetworkManager = {
    description: "My Test Network Manager",
    networkManagerScopeAccesses: ["Connectivity"],
    networkManagerScopes: {
      managementGroups: ["/Microsoft.Management/testmg"],
      subscriptions: ["/subscriptions/00000000-0000-0000-0000-000000000000"],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagers.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putNetworkManager();
}

main().catch(console.error);
