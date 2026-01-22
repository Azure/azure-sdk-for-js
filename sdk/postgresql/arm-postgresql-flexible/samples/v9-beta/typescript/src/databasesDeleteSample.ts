// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing database.
 *
 * @summary deletes an existing database.
 * x-ms-original-file: 2026-01-01-preview/DatabasesDelete.json
 */
async function deleteAnExistingDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.databases.delete("exampleresourcegroup", "exampleserver", "exampledatabase");
}

async function main(): Promise<void> {
  await deleteAnExistingDatabase();
}

main().catch(console.error);
