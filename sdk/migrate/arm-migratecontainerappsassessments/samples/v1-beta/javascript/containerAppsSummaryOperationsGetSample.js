// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  MigrateContainerAppsAssessmentsManagementClient,
} = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ContainerAppsSummary
 *
 * @summary get a ContainerAppsSummary
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsSummaryOperations_Get_MaximumSet_Gen.json
 */
async function containerAppsSummaryOperationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  const result = await client.containerAppsSummaryOperations.get(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
    "ContainerApps",
  );
  console.log(result);
}

async function main() {
  await containerAppsSummaryOperationsGetMaximumSet();
}

main().catch(console.error);
