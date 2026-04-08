// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates customer managed key.
 *
 * @summary validates customer managed key.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstancValidateAzureKeyVaultEncryptionKey.json
 */
async function validateTheCustomerManagedKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.managedInstances.validateAzureKeyVaultEncryptionKey("testrg", "testinstance", {
    tdeKeyUri: "https://someVault.vault.azure.net/keys/someKey/01234567890123456789012345678901",
  });
}

async function main(): Promise<void> {
  await validateTheCustomerManagedKey();
}

main().catch(console.error);
