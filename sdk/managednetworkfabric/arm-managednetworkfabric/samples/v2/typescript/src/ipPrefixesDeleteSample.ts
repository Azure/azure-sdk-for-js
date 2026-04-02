// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements IP Prefix DELETE method.
 *
 * @summary implements IP Prefix DELETE method.
 * x-ms-original-file: 2025-07-15/IpPrefixes_Delete.json
 */
async function ipPrefixesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.ipPrefixes.delete("example-rg", "example-ipPrefix");
}

async function main(): Promise<void> {
  await ipPrefixesDeleteMaximumSetGen();
}

main().catch(console.error);
