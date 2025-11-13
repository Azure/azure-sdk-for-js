// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements the operation to the underlying resources.
 *
 * @summary implements the operation to the underlying resources.
 * x-ms-original-file: 2024-06-15-preview/AccessControlLists_ValidateConfiguration.json
 */
async function accessControlListsValidateConfigurationMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.accessControlLists.validateConfiguration("example-rg", "example-acl");
  console.log(result);
}

async function main(): Promise<void> {
  await accessControlListsValidateConfigurationMaximumSetGen();
}

main().catch(console.error);
