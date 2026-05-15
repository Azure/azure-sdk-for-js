// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specified connection created by this subscription.
 *
 * @summary get a specified connection created by this subscription.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionSubscriptionGet.json
 */
async function getSubscriptionNetworkManagerConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subscriptionNetworkManagerConnections.get("TestNMConnection");
  console.log(result);
}

async function main(): Promise<void> {
  await getSubscriptionNetworkManagerConnection();
}

main().catch(console.error);
