// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProjectFile,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This method updates an existing file.
 *
 * @summary This method updates an existing file.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Files_Update.json
 */
async function filesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const fileName = "x114d023d8";
  const parameters: ProjectFile = {
    properties: { filePath: "DmsSdkFilePath/DmsSdkFile.sql" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.files.update(
    groupName,
    serviceName,
    projectName,
    fileName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await filesUpdate();
}

main().catch(console.error);
