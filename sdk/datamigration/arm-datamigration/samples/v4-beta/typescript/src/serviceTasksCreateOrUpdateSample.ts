// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PUT method creates a new service task or updates an existing one, although since service tasks have no mutable custom properties, there is little reason to update an existing one.
 *
 * @summary the service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PUT method creates a new service task or updates an existing one, although since service tasks have no mutable custom properties, there is little reason to update an existing one.
 * x-ms-original-file: 2025-09-01-preview/ServiceTasks_CreateOrUpdate.json
 */
async function tasksCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.serviceTasks.createOrUpdate(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkTask",
    {
      properties: {
        input: {
          sourceConnectionInfo: {
            type: "MySqlConnectionInfo",
            port: 3306,
            serverName: "localhost",
          },
        },
        taskType: "ConnectToSource.MySql",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksCreateOrUpdate();
}

main().catch(console.error);
