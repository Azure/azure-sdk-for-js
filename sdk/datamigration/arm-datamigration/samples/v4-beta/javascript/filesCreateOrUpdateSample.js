// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the PUT method creates a new file or updates an existing one.
 *
 * @summary the PUT method creates a new file or updates an existing one.
 * x-ms-original-file: 2025-09-01-preview/Files_CreateOrUpdate.json
 */
async function filesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.createOrUpdate(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    "x114d023d8",
    { properties: { filePath: "DmsSdkFilePath/DmsSdkFile.sql" } },
  );
  console.log(result);
}

async function main() {
  await filesCreateOrUpdate();
}

main().catch(console.error);
