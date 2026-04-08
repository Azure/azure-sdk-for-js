// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a restorable dropped managed database.
 *
 * @summary gets a restorable dropped managed database.
 * x-ms-original-file: 2025-02-01-preview/GetRestorableDroppedManagedDatabase.json
 */
async function getsARestorableDroppedManagedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.restorableDroppedManagedDatabases.get(
    "Test1",
    "managedInstance",
    "testdb,131403269876900000",
  );
  console.log(result);
}

async function main() {
  await getsARestorableDroppedManagedDatabase();
}

main().catch(console.error);
