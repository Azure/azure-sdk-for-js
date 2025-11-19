// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Access Control List DELETE method.
 *
 * @summary implements Access Control List DELETE method.
 * x-ms-original-file: 2024-06-15-preview/AccessControlLists_Delete.json
 */
async function accessControlListsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.accessControlLists.delete("example-rg", "example-acl");
}

async function main(): Promise<void> {
  await accessControlListsDeleteMaximumSetGen();
}

main().catch(console.error);
