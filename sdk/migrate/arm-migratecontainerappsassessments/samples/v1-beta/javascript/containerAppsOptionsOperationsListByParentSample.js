// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ContainerAppsAssessmentOptions resources by AssessmentProject
 *
 * @summary list ContainerAppsAssessmentOptions resources by AssessmentProject
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsOptionsOperations_ListByParent_MaximumSet_Gen.json
 */
async function containerAppsOptionsOperationsListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsOptionsOperations.listByParent(
    "rgcontainerAppsAssessments",
    "testProject",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await containerAppsOptionsOperationsListByParentMaximumSet();
}

main().catch(console.error);
