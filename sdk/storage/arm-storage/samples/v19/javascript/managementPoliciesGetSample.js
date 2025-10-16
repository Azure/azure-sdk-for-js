// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the managementpolicy associated with the specified storage account.
 *
 * @summary Gets the managementpolicy associated with the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetManagementPolicy.json
 */
async function storageAccountGetManagementPolicies() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const managementPolicyName = "default";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.get(
    resourceGroupName,
    accountName,
    managementPolicyName,
  );
  console.log(result);
}

async function main() {
  await storageAccountGetManagementPolicies();
}

main().catch(console.error);
