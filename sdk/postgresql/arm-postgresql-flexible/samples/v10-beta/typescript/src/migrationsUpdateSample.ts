// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing migration. The request body can contain one to many of the mutable properties present in the migration definition. Certain property updates initiate migration state transitions.
 *
 * @summary updates an existing migration. The request body can contain one to many of the mutable properties present in the migration definition. Certain property updates initiate migration state transitions.
 * x-ms-original-file: 2026-01-01-preview/MigrationsUpdate.json
 */
async function updateAnExistingMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.update(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
    { setupLogicalReplicationOnSourceDbIfNeeded: "True" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnExistingMigration();
}

main().catch(console.error);
