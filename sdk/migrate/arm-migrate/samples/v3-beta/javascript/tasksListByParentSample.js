// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migrate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Task resources by MigrateProject
 *
 * @summary list Task resources by MigrateProject
 * x-ms-original-file: 2026-06-01-preview/Tasks_ListByParent_MaximumSet_Gen.json
 */
async function tasksListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tasks.listByParent("rgwaves", "project1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await tasksListByParentMaximumSet();
}

main().catch(console.error);
