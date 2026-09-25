// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a MigrationEntity
 *
 * @summary get a MigrationEntity
 * x-ms-original-file: 2026-06-01-preview/MigrationEntities_Get_MaximumSet_Gen.json
 */
async function migrationEntitiesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.migrationEntities.get("rgwaves", "project1", "entity1");
  console.log(result);
}

async function main() {
  await migrationEntitiesGetMaximumSet();
}

main().catch(console.error);
