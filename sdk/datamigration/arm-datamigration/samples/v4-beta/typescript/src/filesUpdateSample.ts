// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this method updates an existing file.
 *
 * @summary this method updates an existing file.
 * x-ms-original-file: 2025-09-01-preview/Files_Update.json
 */
async function filesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.update(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    "x114d023d8",
    { properties: { filePath: "DmsSdkFilePath/DmsSdkFile.sql" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await filesUpdate();
}

main().catch(console.error);
