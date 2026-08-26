// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Task
 *
 * @summary create a Task
 * x-ms-original-file: 2026-06-01-preview/Tasks_Create_MaximumSet_Gen.json
 */
async function tasksCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.tasks.create("rgwaves", "project1", "task1", {
    properties: {
      scopeId:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/MyResourceGroup/providers/Microsoft.Migrate/migrateProjects/MyMigrateProject/waves/wave1",
      stage: "suwwllyupuonhzwrsl",
      displayName: "rbxtqbeapvifcdgmlqmgsibudjd",
      status: "txxrst",
      scope: "Wave",
      description: "tomulgdavwoaev",
    },
  });
  console.log(result);
}

async function main() {
  await tasksCreateMaximumSet();
}

main().catch(console.error);
