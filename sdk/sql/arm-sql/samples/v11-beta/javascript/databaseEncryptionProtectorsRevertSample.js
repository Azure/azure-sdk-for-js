// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reverts an existing encryption protector for a particular database.
 *
 * @summary reverts an existing encryption protector for a particular database.
 * x-ms-original-file: 2025-02-01-preview/DatabaseEncryptionProtectorRevert.json
 */
async function revertsTheEncryptionProtectorForAParticularDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.databaseEncryptionProtectors.revert(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "sqlcrudtestdb-2342",
    "current",
  );
}

async function main() {
  await revertsTheEncryptionProtectorForAParticularDatabase();
}

main().catch(console.error);
