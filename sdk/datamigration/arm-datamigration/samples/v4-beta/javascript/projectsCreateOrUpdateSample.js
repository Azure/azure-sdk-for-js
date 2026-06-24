// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the project resource is a nested resource representing a stored migration project. The PUT method creates a new project or updates an existing one.
 *
 * @summary the project resource is a nested resource representing a stored migration project. The PUT method creates a new project or updates an existing one.
 * x-ms-original-file: 2025-09-01-preview/Projects_CreateOrUpdate.json
 */
async function projectsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate(
    "DmsSdkRg",
    "DmsSdkService",
    "DmsSdkProject",
    { location: "southcentralus", sourcePlatform: "SQL", targetPlatform: "SQLDB" },
  );
  console.log(result);
}

async function main() {
  await projectsCreateOrUpdate();
}

main().catch(console.error);
