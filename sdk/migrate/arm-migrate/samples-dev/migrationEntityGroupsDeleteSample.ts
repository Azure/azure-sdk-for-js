// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a MigrationEntityGroup
 *
 * @summary delete a MigrationEntityGroup
 * x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Delete_MaximumSet_Gen.json
 */
async function migrationEntityGroupsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  await client.migrationEntityGroups.delete("rgwaves", "project1", "group1");
}

async function main(): Promise<void> {
  await migrationEntityGroupsDeleteMaximumSet();
}

main().catch(console.error);
