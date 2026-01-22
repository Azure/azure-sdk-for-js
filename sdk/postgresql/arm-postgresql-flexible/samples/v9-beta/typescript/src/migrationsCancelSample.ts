// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels an active migration.
 *
 * @summary cancels an active migration.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCancel.json
 */
async function cancelAnActiveMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.cancel(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cancelAnActiveMigration();
}

main().catch(console.error);
