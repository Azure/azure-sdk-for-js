// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to The PUT method creates a new file or updates an existing one.
 *
 * @summary The PUT method creates a new file or updates an existing one.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2021-10-30-preview/examples/Files_CreateOrUpdate.json
 */
import type { ProjectFile } from "@azure/arm-datamigration";
import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

async function filesCreateOrUpdate(): Promise<void> {
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const fileName = "x114d023d8";
  const parameters: ProjectFile = {
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

filesCreateOrUpdate().catch(console.error);
