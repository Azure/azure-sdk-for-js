// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a service task, canceling it first if it's running.
 *
 * @summary the service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The DELETE method deletes a service task, canceling it first if it's running.
 * x-ms-original-file: 2025-09-01-preview/ServiceTasks_Delete.json
 */
async function tasksDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.serviceTasks.delete("DmsSdkRg", "DmsSdkService", "DmsSdkTask");
}

async function main(): Promise<void> {
  await tasksDelete();
}

main().catch(console.error);
