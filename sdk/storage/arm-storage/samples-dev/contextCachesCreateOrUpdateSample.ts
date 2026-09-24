// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Context Cache.
 *
 * @summary create or update a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_CreateOrUpdate.json
 */
async function createAContextCache(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCaches.createOrUpdate("testrg", "testaccount", {
    location: "eastus",
    tags: { environment: "test" },
    properties: { accountKind: "Regional", description: "Test Azure Context Cache account" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Context Cache.
 *
 * @summary create or update a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_CreateOrUpdate_SystemIdentity.json
 */
async function createAAzureContextCacheAccountWithSystemAssignedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCaches.createOrUpdate("testrg", "testaccount", {
    location: "eastus",
    tags: { environment: "test" },
    identity: { type: "SystemAssigned" },
    properties: {
      accountKind: "Regional",
      description: "Test Azure Context Cache account",
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyIdentity: { identityType: "systemAssignedIdentity" },
          keyEncryptionKeyUrl: "https://mykeyvault.vault.azure.net/keys/myEncryptionKey",
        },
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createAContextCache();
  await createAAzureContextCacheAccountWithSystemAssignedIdentity();
}

main().catch(console.error);
