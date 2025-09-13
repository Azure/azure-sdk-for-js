// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing service task, but since service tasks have no mutable custom properties, there is little reason to do so.
 *
 * @summary The service tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing service task, but since service tasks have no mutable custom properties, there is little reason to do so.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2025-03-15-preview/examples/ServiceTasks_Update.json
 */

import {
  ProjectTask,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function tasksUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const taskName = "DmsSdkTask";
  const parameters: ProjectTask = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.serviceTasks.update(
    groupName,
    serviceName,
    taskName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksUpdate();
}

main().catch(console.error);
