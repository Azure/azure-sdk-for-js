// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The project resource is a nested resource representing a stored migration project. The GET method retrieves information about a project.
 *
 * @summary The project resource is a nested resource representing a stored migration project. The GET method retrieves information about a project.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Projects_Get.json
 */
async function projectsGet(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.projects.get(groupName, serviceName, projectName);
  console.log(result);
}

async function main(): Promise<void> {
  await projectsGet();
}

main().catch(console.error);
