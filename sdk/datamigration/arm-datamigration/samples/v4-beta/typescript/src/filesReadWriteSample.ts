// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this method is used for requesting information for reading and writing the file content.
 *
 * @summary this method is used for requesting information for reading and writing the file content.
 * x-ms-original-file: 2025-09-01-preview/Files_ReadWrite.json
 */
async function filesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.readWrite(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    "x114d023d8",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await filesList();
}

main().catch(console.error);
