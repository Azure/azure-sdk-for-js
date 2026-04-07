// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to completes the restore operation on a managed database.
 *
 * @summary completes the restore operation on a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCompleteExternalRestore.json
 */
async function completesAManagedDatabaseExternalBackupRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.managedDatabases.completeRestore("myRG", "myManagedInstanceName", "myDatabase", {
    lastBackupName: "testdb1_log4",
  });
}

async function main() {
  await completesAManagedDatabaseExternalBackupRestore();
}

main().catch(console.error);
