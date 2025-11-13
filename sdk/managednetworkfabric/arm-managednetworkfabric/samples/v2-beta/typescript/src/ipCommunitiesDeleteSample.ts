// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements IP Community DELETE method.
 *
 * @summary implements IP Community DELETE method.
 * x-ms-original-file: 2024-06-15-preview/IpCommunities_Delete.json
 */
async function ipCommunitiesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.ipCommunities.delete("example-rg", "example-ipcommunity");
}

async function main(): Promise<void> {
  await ipCommunitiesDeleteMaximumSetGen();
}

main().catch(console.error);
