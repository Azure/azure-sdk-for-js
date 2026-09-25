// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list MigrationEntity resources by MigrateProject
 *
 * @summary list MigrationEntity resources by MigrateProject
 * x-ms-original-file: 2026-06-01-preview/MigrationEntities_ListByParent_MaximumSet_Gen.json
 */
async function migrationEntitiesListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrationEntities.listByParent("rgwaves", "project1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await migrationEntitiesListByParentMaximumSet();
}

main().catch(console.error);
