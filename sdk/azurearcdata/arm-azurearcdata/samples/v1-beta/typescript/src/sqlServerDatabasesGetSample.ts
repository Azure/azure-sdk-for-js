// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves an Arc Sql Server database.
 *
 * @summary retrieves an Arc Sql Server database.
 * x-ms-original-file: 2026-03-01-preview/GetArcSqlServerDatabase.json
 */
async function retrievesAnArcSqlServerDatabaseResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerDatabases.get("testrg", "testSqlServerInstance", "testdb");
  console.log(result);
}

async function main(): Promise<void> {
  await retrievesAnArcSqlServerDatabaseResource();
}

main().catch(console.error);
