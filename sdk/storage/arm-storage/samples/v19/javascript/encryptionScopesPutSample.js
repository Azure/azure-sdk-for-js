// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Synchronously creates or updates an encryption scope under the specified storage account. If an encryption scope is already created and a subsequent request is issued with different properties, the encryption scope properties will be updated per the specified request.
 *
 * @summary Synchronously creates or updates an encryption scope under the specified storage account. If an encryption scope is already created and a subsequent request is issued with different properties, the encryption scope properties will be updated per the specified request.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountPutEncryptionScope.json
 */
async function storageAccountPutEncryptionScope() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "resource-group-name";
  const accountName = "accountname";
  const encryptionScopeName = "{encryption-scope-name}";
  const encryptionScope = {};
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.put(
    resourceGroupName,
    accountName,
    encryptionScopeName,
    encryptionScope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Synchronously creates or updates an encryption scope under the specified storage account. If an encryption scope is already created and a subsequent request is issued with different properties, the encryption scope properties will be updated per the specified request.
 *
 * @summary Synchronously creates or updates an encryption scope under the specified storage account. If an encryption scope is already created and a subsequent request is issued with different properties, the encryption scope properties will be updated per the specified request.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountPutEncryptionScopeWithInfrastructureEncryption.json
 */
async function storageAccountPutEncryptionScopeWithInfrastructureEncryption() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "resource-group-name";
  const accountName = "accountname";
  const encryptionScopeName = "{encryption-scope-name}";
  const encryptionScope = {
    requireInfrastructureEncryption: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.put(
    resourceGroupName,
    accountName,
    encryptionScopeName,
    encryptionScope,
  );
  console.log(result);
}

async function main() {
  await storageAccountPutEncryptionScope();
  await storageAccountPutEncryptionScopeWithInfrastructureEncryption();
}

main().catch(console.error);
