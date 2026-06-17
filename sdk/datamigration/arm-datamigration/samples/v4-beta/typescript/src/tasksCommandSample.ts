// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method executes a command on a running task.
 *
 * @summary the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method executes a command on a running task.
 * x-ms-original-file: 2025-09-01-preview/Tasks_Command.json
 */
async function tasksCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.command(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    "DmsSdkTask",
    { commandType: "Migrate.Sync.Complete.Database", input: { databaseName: "TestDatabase" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksCommand();
}

main().catch(console.error);
