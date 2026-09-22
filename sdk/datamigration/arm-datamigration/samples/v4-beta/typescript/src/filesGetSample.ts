// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file.
 *
 * @summary the files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file.
 * x-ms-original-file: 2025-09-01-preview/Files_Get.json
 */
async function filesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.get("DmsSdkRg", "DmsSdkService", "DmsSdkProject", "x114d023d8");
  console.log(result);
}

async function main(): Promise<void> {
  await filesList();
}

main().catch(console.error);
