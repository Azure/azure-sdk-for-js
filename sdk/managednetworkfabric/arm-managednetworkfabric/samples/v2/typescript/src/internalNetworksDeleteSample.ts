// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements InternalNetworks DELETE method.
 *
 * @summary implements InternalNetworks DELETE method.
 * x-ms-original-file: 2025-07-15/InternalNetworks_Delete.json
 */
async function internalNetworksDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.internalNetworks.delete("example-rg", "example-l3isd", "example-internalnetwork");
}

async function main(): Promise<void> {
  await internalNetworksDeleteMaximumSetGen();
}

main().catch(console.error);
