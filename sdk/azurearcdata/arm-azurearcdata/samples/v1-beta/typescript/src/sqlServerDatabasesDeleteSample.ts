// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Arc Sql Server database resource.
 *
 * @summary deletes an Arc Sql Server database resource.
 * x-ms-original-file: 2026-03-01-preview/DeleteArcSqlServerDatabase.json
 */
async function deletesADatabaseResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.sqlServerDatabases.delete("testrg", "testsqlManagedInstance", "testdb");
}

async function main(): Promise<void> {
  await deletesADatabaseResource();
}

main().catch(console.error);
