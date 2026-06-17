// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the project resource is a nested resource representing a stored migration project. This method returns a list of files owned by a project resource.
 *
 * @summary the project resource is a nested resource representing a stored migration project. This method returns a list of files owned by a project resource.
 * x-ms-original-file: 2025-09-01-preview/Files_List.json
 */
async function filesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.files.list("DmsSdkRg", "DmsSdkService", "DmsSdkProject")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await filesList();
}

main().catch(console.error);
