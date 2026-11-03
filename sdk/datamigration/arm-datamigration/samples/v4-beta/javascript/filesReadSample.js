// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this method is used for requesting storage information using which contents of the file can be downloaded.
 *
 * @summary this method is used for requesting storage information using which contents of the file can be downloaded.
 * x-ms-original-file: 2025-09-01-preview/Files_Read.json
 */
async function filesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.read(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    "x114d023d8",
  );
  console.log(result);
}

async function main() {
  await filesList();
}

main().catch(console.error);
