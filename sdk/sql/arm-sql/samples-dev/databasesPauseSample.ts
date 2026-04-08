// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to pauses a database.
 *
 * @summary pauses a database.
 * x-ms-original-file: 2025-02-01-preview/PauseDatabase.json
 */
async function pausesADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.pause("Default-SQL-SouthEastAsia", "testsvr", "testdwdb");
  console.log(result);
}

async function main(): Promise<void> {
  await pausesADatabase();
}

main().catch(console.error);
