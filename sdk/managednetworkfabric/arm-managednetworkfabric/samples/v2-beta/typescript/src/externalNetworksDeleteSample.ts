// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements ExternalNetworks DELETE method.
 *
 * @summary implements ExternalNetworks DELETE method.
 * x-ms-original-file: 2024-06-15-preview/ExternalNetworks_Delete.json
 */
async function externalNetworksDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.externalNetworks.delete("example-rg", "example-externalnetwork", "example-ext");
}

async function main(): Promise<void> {
  await externalNetworksDeleteMaximumSetGen();
}

main().catch(console.error);
