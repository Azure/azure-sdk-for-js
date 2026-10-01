// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file.
 *
 * @summary the files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file.
 * x-ms-original-file: 2025-09-01-preview/Files_Get.json
 */
async function filesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.get("DmsSdkRg", "DmsSdkService", "DmsSdkProject", "x114d023d8");
  console.log(result);
}

async function main() {
  await filesList();
}

main().catch(console.error);
