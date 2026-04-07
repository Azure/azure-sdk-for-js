// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get database schema
 *
 * @summary get database schema
 * x-ms-original-file: 2025-02-01-preview/DatabaseSchemaGet.json
 */
async function getDatabaseSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseSchemas.get("myRG", "serverName", "myDatabase", "dbo");
  console.log(result);
}

async function main(): Promise<void> {
  await getDatabaseSchema();
}

main().catch(console.error);
