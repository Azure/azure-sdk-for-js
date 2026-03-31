// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a network manager connection on this subscription.
 *
 * @summary create a network manager connection on this subscription.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionSubscriptionPut.json
 */
async function createOrUpdateSubscriptionNetworkManagerConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subscriptionNetworkManagerConnections.createOrUpdate(
    "TestNMConnection",
    {
      networkManagerId:
        "/subscriptions/22222222-2222-2222-2222-222222222222/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSubscriptionNetworkManagerConnection();
}

main().catch(console.error);
