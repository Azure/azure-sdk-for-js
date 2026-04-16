// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a task if it's currently queued or running.
 *
 * @summary The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method cancels a task if it's currently queued or running.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Tasks_Cancel.json
 */
async function tasksCancel(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const taskName = "DmsSdkTask";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.cancel(
    groupName,
    serviceName,
    projectName,
    taskName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksCancel();
}

main().catch(console.error);
