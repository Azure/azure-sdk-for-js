// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed database.
 *
 * @summary gets a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseGet.json
 */
async function getsAManagedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.get("Test1", "managedInstance", "managedDatabase");
  console.log(result);
}

async function main() {
  await getsAManagedDatabase();
}

main().catch(console.error);
