// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a task, canceling it first if it's running.
 *
 * @summary the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a task, canceling it first if it's running.
 * x-ms-original-file: 2025-09-01-preview/Tasks_Delete.json
 */
async function tasksDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.tasks.delete("DmsSdkRg", "DmsSdkService", "DmsSdkProject", "DmsSdkTask");
}

async function main() {
  await tasksDelete();
}

main().catch(console.error);
