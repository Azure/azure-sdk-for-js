// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a managed instance key.
 *
 * @summary creates or updates a managed instance key.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceKeyCreateOrUpdate.json
 */
async function createsOrUpdatesAManagedInstanceKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstanceKeys.createOrUpdate(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "someVault_someKey_01234567890123456789012345678901",
    {
      serverKeyType: "AzureKeyVault",
      uri: "https://someVault.vault.azure.net/keys/someKey/01234567890123456789012345678901",
    },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesAManagedInstanceKey();
}

main().catch(console.error);
