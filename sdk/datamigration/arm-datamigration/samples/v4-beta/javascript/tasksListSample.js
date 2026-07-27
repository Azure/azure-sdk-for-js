// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task.
 *
 * @summary the services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of tasks owned by a service resource. Some tasks may have a status of Unknown, which indicates that an error occurred while querying the status of that task.
 * x-ms-original-file: 2025-09-01-preview/Tasks_List.json
 */
async function tasksList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tasks.list("DmsSdkRg", "DmsSdkService", "DmsSdkProject")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await tasksList();
}

main().catch(console.error);
