// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a MigrationEntity
 *
 * @summary delete a MigrationEntity
 * x-ms-original-file: 2026-06-01-preview/MigrationEntities_Delete_MaximumSet_Gen.json
 */
async function migrationEntitiesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  await client.migrationEntities.delete("rgwaves", "project1", "entity1");
}

async function main() {
  await migrationEntitiesDeleteMaximumSet();
}

main().catch(console.error);
