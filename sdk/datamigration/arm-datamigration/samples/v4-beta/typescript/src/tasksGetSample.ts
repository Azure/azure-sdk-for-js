// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a task.
 *
 * @summary the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The GET method retrieves information about a task.
 * x-ms-original-file: 2025-09-01-preview/Tasks_Get.json
 */
async function tasksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.get("DmsSdkRg", "DmsSdkService", "DmsSdkProject", "DmsSdkTask");
  console.log(result);
}

async function main(): Promise<void> {
  await tasksGet();
}

main().catch(console.error);
