// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a database.
 *
 * @summary deletes a database.
 * x-ms-original-file: 2024-12-30/DatabaseDelete.json
 */
async function deleteADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.databases.delete("TestGroup", "testserver", "db1");
}

async function main(): Promise<void> {
  await deleteADatabase();
}

main().catch(console.error);
