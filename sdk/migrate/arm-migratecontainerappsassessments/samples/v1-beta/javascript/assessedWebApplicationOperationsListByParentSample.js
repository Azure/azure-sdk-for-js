// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MigrateClient } = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AssessedWebApplication resources by ContainerAppsAssessment
 *
 * @summary list AssessedWebApplication resources by ContainerAppsAssessment
 * x-ms-original-file: 2025-09-09-preview/AssessedWebApplicationOperations_ListByParent_MaximumSet_Gen.json
 */
async function assessedWebApplicationOperationsListByParentMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.assessedWebApplicationOperations.listByParent(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await assessedWebApplicationOperationsListByParentMaximumSet();
}

main().catch(console.error);
