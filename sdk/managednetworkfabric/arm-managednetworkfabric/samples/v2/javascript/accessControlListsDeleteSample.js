// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements Access Control List DELETE method.
 *
 * @summary implements Access Control List DELETE method.
 * x-ms-original-file: 2025-07-15/AccessControlLists_Delete.json
 */
async function accessControlListsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.accessControlLists.delete("example-rg", "example-acl");
}

async function main() {
  await accessControlListsDeleteMaximumSetGen();
}

main().catch(console.error);
