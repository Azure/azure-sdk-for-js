// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The PUT method creates a new file or updates an existing one.
 *
 * @summary The PUT method creates a new file or updates an existing one.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Files_CreateOrUpdate.json
 */
async function filesCreateOrUpdate() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const fileName = "x114d023d8";
  const parameters = {
    properties: { filePath: "DmsSdkFilePath/DmsSdkFile.sql" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.createOrUpdate(
    groupName,
    serviceName,
    projectName,
    fileName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await filesCreateOrUpdate();
}

main().catch(console.error);
