/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to The project resource is a nested resource representing a stored migration project. The PUT method creates a new project or updates an existing one.
 *
 * @summary The project resource is a nested resource representing a stored migration project. The PUT method creates a new project or updates an existing one.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2021-10-30-preview/examples/Projects_CreateOrUpdate.json
 */
const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

async function projectsCreateOrUpdate() {
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const serviceName = "DmsSdkService";
  const projectName = "DmsSdkProject";
  const parameters = {
    location: "southcentralus",
    sourcePlatform: "SQL",
    targetPlatform: "SQLDB",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.projects.createOrUpdate(
    groupName,
    serviceName,
    projectName,
    parameters,
  );
  console.log(result);
}

projectsCreateOrUpdate().catch(console.error);
