// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this method deletes a file.
 *
 * @summary this method deletes a file.
 * x-ms-original-file: 2025-09-01-preview/Files_Delete.json
 */
async function filesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.files.delete("DmsSdkRg", "DmsSdkService", "DmsSdkProject", "x114d023d8");
}

async function main(): Promise<void> {
  await filesDelete();
}

main().catch(console.error);
