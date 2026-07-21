// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the project resource is a nested resource representing a stored migration project. The GET method retrieves information about a project.
 *
 * @summary the project resource is a nested resource representing a stored migration project. The GET method retrieves information about a project.
 * x-ms-original-file: 2025-09-01-preview/Projects_Get.json
 */
async function projectsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.projects.get("DmsSdkRg", "DmsSdkService", "DmsSdkProject");
  console.log(result);
}

async function main() {
  await projectsGet();
}

main().catch(console.error);
