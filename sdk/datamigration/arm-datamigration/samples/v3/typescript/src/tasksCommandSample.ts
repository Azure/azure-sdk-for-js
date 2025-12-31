// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MigrateSyncCompleteCommandProperties,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method executes a command on a running task.
 *
 * @summary The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. This method executes a command on a running task.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Tasks_Command.json
 */
async function tasksCommand(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const taskName = "DmsSdkTask";
  const parameters: MigrateSyncCompleteCommandProperties = {
    commandType: "Migrate.Sync.Complete.Database",
    input: { databaseName: "TestDatabase" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.command(
    groupName,
    serviceName,
    projectName,
    taskName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksCommand();
}

main().catch(console.error);
