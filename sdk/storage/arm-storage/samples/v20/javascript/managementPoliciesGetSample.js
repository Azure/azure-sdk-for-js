// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the managementpolicy associated with the specified storage account.
 *
 * @summary gets the managementpolicy associated with the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountGetManagementPolicy.json
 */
async function storageAccountGetManagementPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.get("res6977", "sto2527", "default");
  console.log(result);
}

async function main() {
  await storageAccountGetManagementPolicies();
}

main().catch(console.error);
