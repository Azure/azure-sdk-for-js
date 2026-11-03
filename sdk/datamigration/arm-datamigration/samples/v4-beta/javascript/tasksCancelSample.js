// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a task if it's currently queued or running.
 *
 * @summary the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a task if it's currently queued or running.
 * x-ms-original-file: 2025-09-01-preview/Tasks_Cancel.json
 */
async function tasksCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.cancel(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    "DmsSdkTask",
  );
  console.log(result);
}

async function main() {
  await tasksCancel();
}

main().catch(console.error);
