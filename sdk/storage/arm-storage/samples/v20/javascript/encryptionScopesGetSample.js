// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the properties for the specified encryption scope.
 *
 * @summary returns the properties for the specified encryption scope.
 * x-ms-original-file: 2025-08-01/StorageAccountGetEncryptionScope.json
 */
async function storageAccountGetEncryptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.get(
    "resource-group-name",
    "accountname",
    "{encryption-scope-name}",
  );
  console.log(result);
}

async function main() {
  await storageAccountGetEncryptionScope();
}

main().catch(console.error);
