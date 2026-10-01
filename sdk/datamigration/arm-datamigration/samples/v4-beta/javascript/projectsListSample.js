// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the project resource is a nested resource representing a stored migration project. This method returns a list of projects owned by a service resource.
 *
 * @summary the project resource is a nested resource representing a stored migration project. This method returns a list of projects owned by a service resource.
 * x-ms-original-file: 2025-09-01-preview/Projects_List.json
 */
async function projectsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.list("DmsSdkRg", "DmsSdkService")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await projectsList();
}

main().catch(console.error);
