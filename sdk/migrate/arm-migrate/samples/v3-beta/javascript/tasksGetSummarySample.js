// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves task summary across all tasks in the project.
 *
 * @summary retrieves task summary across all tasks in the project.
 * x-ms-original-file: 2026-06-01-preview/Tasks_GetSummary_MaximumSet_Gen.json
 */
async function tasksGetSummaryMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.tasks.getSummary("rgwaves", "project1", {
    scopeId:
      "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/migrateProjects/MyMigrateProject/waves/wave1",
  });
  console.log(result);
}

async function main() {
  await tasksGetSummaryMaximumSet();
}

main().catch(console.error);
