// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a task.
 *
 * @summary The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a task.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2025-03-15-preview/examples/Tasks_Get.json
 */

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function tasksGet(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const taskName = "DmsSdkTask";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.get(
    groupName,
    serviceName,
    projectName,
    taskName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksGet();
}

main().catch(console.error);
