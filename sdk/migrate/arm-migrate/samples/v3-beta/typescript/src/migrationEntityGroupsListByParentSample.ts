// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list MigrationEntityGroup resources by MigrateProject
 *
 * @summary list MigrationEntityGroup resources by MigrateProject
 * x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_ListByParent_MaximumSet_Gen.json
 */
async function migrationEntityGroupsListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrationEntityGroups.listByParent("rgwaves", "project1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await migrationEntityGroupsListByParentMaximumSet();
}

main().catch(console.error);
