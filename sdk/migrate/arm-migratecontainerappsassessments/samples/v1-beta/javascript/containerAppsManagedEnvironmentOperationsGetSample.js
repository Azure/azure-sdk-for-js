// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  MigrateContainerAppsAssessmentsManagementClient,
} = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ContainerAppsManagedEnvironment
 *
 * @summary get a ContainerAppsManagedEnvironment
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsManagedEnvironmentOperations_Get_MaximumSet_Gen.json
 */
async function containerAppsManagedEnvironmentOperationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  const result = await client.containerAppsManagedEnvironmentOperations.get(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
    "testcontainerAppsAssessment-env",
  );
  console.log(result);
}

async function main() {
  await containerAppsManagedEnvironmentOperationsGetMaximumSet();
}

main().catch(console.error);
