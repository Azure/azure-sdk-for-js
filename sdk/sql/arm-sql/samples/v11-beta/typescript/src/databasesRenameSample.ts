// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to renames a database.
 *
 * @summary renames a database.
 * x-ms-original-file: 2025-02-01-preview/RenameDatabase.json
 */
async function renamesADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.databases.rename("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    id: "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/testsvr/databases/newtestdb",
  });
}

async function main(): Promise<void> {
  await renamesADatabase();
}

main().catch(console.error);
