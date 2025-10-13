// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a database.
 *
 * @summary gets information about a database.
 * x-ms-original-file: 2024-12-30/DatabaseGet.json
 */
async function getADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.databases.get("TestGroup", "testserver", "db1");
  console.log(result);
}

async function main(): Promise<void> {
  await getADatabase();
}

main().catch(console.error);
