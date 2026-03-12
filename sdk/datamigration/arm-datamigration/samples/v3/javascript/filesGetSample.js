// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file.
 *
 * @summary The files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Files_Get.json
 */
async function filesList() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const fileName = "x114d023d8";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.get(groupName, serviceName, projectName, fileName);
  console.log(result);
}

async function main() {
  await filesList();
}

main().catch(console.error);
