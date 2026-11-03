// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service level tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task.
 *
 * @summary the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service level tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task.
 * x-ms-original-file: 2025-09-01-preview/ServiceTasks_List.json
 */
async function serviceTasksList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceTasks.list("DmsSdkRg", "DmsSdkService")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await serviceTasksList();
}

main().catch(console.error);
