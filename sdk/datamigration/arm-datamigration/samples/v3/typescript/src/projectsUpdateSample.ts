// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Project,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The project resource is a nested resource representing a stored migration project. The PATCH method updates an existing project.
 *
 * @summary The project resource is a nested resource representing a stored migration project. The PATCH method updates an existing project.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Projects_Update.json
 */
async function projectsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const parameters: Project = {
    location: "southcentralus",
    sourcePlatform: "SQL",
    targetPlatform: "SQLDB",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.projects.update(
    groupName,
    serviceName,
    projectName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectsUpdate();
}

main().catch(console.error);
