// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing task, but since tasks have no mutable custom properties, there is little reason to do so.
 *
 * @summary The tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing task, but since tasks have no mutable custom properties, there is little reason to do so.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Tasks_Update.json
 */
async function tasksUpdate() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const taskName = "DmsSdkTask";
  const parameters = {
    properties: {
      input: {
        targetConnectionInfo: {
          type: "SqlConnectionInfo",
          authentication: "SqlAuthentication",
          dataSource: "ssma-test-server.database.windows.net",
          encryptConnection: true,
          password: "testpassword",
          trustServerCertificate: true,
          userName: "testuser",
        },
      },
      taskType: "ConnectToTarget.SqlDb",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.update(
    groupName,
    serviceName,
    projectName,
    taskName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await tasksUpdate();
}

main().catch(console.error);
