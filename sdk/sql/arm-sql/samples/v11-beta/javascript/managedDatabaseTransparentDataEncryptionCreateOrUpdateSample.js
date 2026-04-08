// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a database's transparent data encryption configuration.
 *
 * @summary updates a database's transparent data encryption configuration.
 * x-ms-original-file: 2025-02-01-preview/ManagedTransparentDataEncryptionUpdate.json
 */
async function updateADatabaseTransparentDataEncryptionStateWithMinimalParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseTransparentDataEncryption.createOrUpdate(
    "securitytde-42-rg",
    "securitytde-42",
    "testdb",
    "current",
    { state: "Enabled" },
  );
  console.log(result);
}

async function main() {
  await updateADatabaseTransparentDataEncryptionStateWithMinimalParameters();
}

main().catch(console.error);
