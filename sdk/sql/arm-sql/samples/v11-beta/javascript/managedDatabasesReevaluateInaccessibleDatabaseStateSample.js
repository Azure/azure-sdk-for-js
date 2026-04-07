// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reevaluates the inaccessibility state of a managed database.
 *
 * @summary reevaluates the inaccessibility state of a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseReevaluateInaccessibleDatabaseState.json
 */
async function reevaluateTheInaccessibilityStateOfAManagedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.reevaluateInaccessibleDatabaseState(
    "Test1",
    "managedInstance",
    "managedDatabase",
  );
  console.log(result);
}

async function main() {
  await reevaluateTheInaccessibilityStateOfAManagedDatabase();
}

main().catch(console.error);
