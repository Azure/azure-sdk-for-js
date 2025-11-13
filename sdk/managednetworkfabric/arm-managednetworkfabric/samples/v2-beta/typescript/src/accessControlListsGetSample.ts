// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Access Control List GET method.
 *
 * @summary implements Access Control List GET method.
 * x-ms-original-file: 2024-06-15-preview/AccessControlLists_Get.json
 */
async function accessControlListsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.accessControlLists.get("example-rg", "example-acl");
  console.log(result);
}

async function main(): Promise<void> {
  await accessControlListsGetMaximumSetGen();
}

main().catch(console.error);
