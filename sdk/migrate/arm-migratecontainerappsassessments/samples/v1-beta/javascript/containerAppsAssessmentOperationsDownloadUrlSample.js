// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  MigrateContainerAppsAssessmentsManagementClient,
} = require("@azure/arm-migratecontainerappsassessments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get URL for downloading Azure Container Apps Assessment Report.
 *
 * @summary get URL for downloading Azure Container Apps Assessment Report.
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_DownloadUrl_MaximumSet_Gen.json
 */
async function containerAppsAssessmentOperationsDownloadUrlMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  const result = await client.containerAppsAssessmentOperations.downloadUrl(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
  );
  console.log(result);
}

async function main() {
  await containerAppsAssessmentOperationsDownloadUrlMaximumSet();
}

main().catch(console.error);
