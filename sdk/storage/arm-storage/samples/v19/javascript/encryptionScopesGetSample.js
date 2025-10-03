// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns the properties for the specified encryption scope.
 *
 * @summary Returns the properties for the specified encryption scope.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetEncryptionScope.json
 */
async function storageAccountGetEncryptionScope() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "resource-group-name";
  const accountName = "accountname";
  const encryptionScopeName = "{encryption-scope-name}";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.get(
    resourceGroupName,
    accountName,
    encryptionScopeName,
  );
  console.log(result);
}

async function main() {
  await storageAccountGetEncryptionScope();
}

main().catch(console.error);
