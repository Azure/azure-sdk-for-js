// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Context Cache.
 *
 * @summary update a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_Update.json
 */
async function updateAContextCacheTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCaches.update("testrg", "testaccount", {
    tags: { environment: "production", team: "context-cache" },
    identity: { type: "SystemAssigned" },
    properties: { description: "Updated Prompt Service account description" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a Context Cache.
 *
 * @summary update a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_Update_CustomerManagedKey.json
 */
async function updateAAzureContextCacheAccountCustomerManagedKeyEncryptionSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCaches.update("testrg", "testaccount", {
    tags: { environment: "production", team: "context-cache" },
    identity: { type: "SystemAssigned" },
    properties: {
      description: "Updated Prompt Service account description",
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyIdentity: { identityType: "systemAssignedIdentity" },
          keyEncryptionKeyUrl: "https://mykeyvault.vault.azure.net/keys/newEncryptionKey",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateAContextCacheTags();
  await updateAAzureContextCacheAccountCustomerManagedKeyEncryptionSettings();
}

main().catch(console.error);
