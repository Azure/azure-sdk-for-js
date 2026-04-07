// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the server key with the given name.
 *
 * @summary deletes the server key with the given name.
 * x-ms-original-file: 2025-02-01-preview/ServerKeyDelete.json
 */
async function deleteTheServerKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.serverKeys.delete(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "someVault_someKey_01234567890123456789012345678901",
  );
}

async function main() {
  await deleteTheServerKey();
}

main().catch(console.error);
