// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  MigrateContainerAppsAssessmentsManagementClient,
} = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ContainerAppsAssessment
 *
 * @summary delete a ContainerAppsAssessment
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Delete_MaximumSet_Gen.json
 */
async function containerAppsAssessmentOperationsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  await client.containerAppsAssessmentOperations.delete(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
  );
}

async function main() {
  await containerAppsAssessmentOperationsDeleteMaximumSet();
}

main().catch(console.error);
