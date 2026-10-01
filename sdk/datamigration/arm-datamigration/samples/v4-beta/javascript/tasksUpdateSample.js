// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing task, but since tasks have no mutable custom properties, there is little reason to do so.
 *
 * @summary the tasks resource is a nested, proxy-only resource representing work performed by a DMS (classic) instance. The PATCH method updates an existing task, but since tasks have no mutable custom properties, there is little reason to do so.
 * x-ms-original-file: 2025-09-01-preview/Tasks_Update.json
 */
async function tasksUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.tasks.update(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    "DmsSdkTask",
    {
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
    },
  );
  console.log(result);
}

async function main() {
  await tasksUpdate();
}

main().catch(console.error);
