// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements an IP Community GET method.
 *
 * @summary implements an IP Community GET method.
 * x-ms-original-file: 2025-07-15/IpCommunities_Get.json
 */
async function ipCommunitiesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.ipCommunities.get("example-rg", "example-ipcommunity");
  console.log(result);
}

async function main(): Promise<void> {
  await ipCommunitiesGetMaximumSetGen();
}

main().catch(console.error);
