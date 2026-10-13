// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh execution status for migration entities and groups within a migrate project. This operation triggers status updates from partner migration services.
 *
 * @summary refresh execution status for migration entities and groups within a migrate project. This operation triggers status updates from partner migration services.
 * x-ms-original-file: 2026-06-01-preview/MigrateProjects_RefreshEntities_MaximumSet_Gen.json
 */
async function migrateProjectsRefreshEntitiesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrateProjects.refreshEntities("rgwaves", "project1", {
    migrationEntityIds: [
      "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/migrateProjects/MyMigrateProject/migrationEntities/entity1",
    ],
    migrationEntityGroupIds: [
      "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/migrateProjects/MyMigrateProject/migrationEntityGroups/group1",
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await migrateProjectsRefreshEntitiesMaximumSet();
}

main().catch(console.error);
