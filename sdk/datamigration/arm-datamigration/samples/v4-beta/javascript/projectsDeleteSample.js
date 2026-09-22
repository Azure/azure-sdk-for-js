// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the project resource is a nested resource representing a stored migration project. The DELETE method deletes a project.
 *
 * @summary the project resource is a nested resource representing a stored migration project. The DELETE method deletes a project.
 * x-ms-original-file: 2025-09-01-preview/Projects_Delete.json
 */
async function projectsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.projects.delete("DmsSdkRg", "DmsSdkService", "DmsSdkProject");
}

async function main() {
  await projectsDelete();
}

main().catch(console.error);
