// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  MigrateContainerAppsAssessmentsManagementClient,
} = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ContainerAppsCostDetail resources by ContainerAppsAssessment
 *
 * @summary list ContainerAppsCostDetail resources by ContainerAppsAssessment
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsCostDetailOperations_ListByParent_MaximumSet_Gen.json
 */
async function containerAppsCostDetailOperationsListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsCostDetailOperations.listByParent(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await containerAppsCostDetailOperationsListByParentMaximumSet();
}

main().catch(console.error);
