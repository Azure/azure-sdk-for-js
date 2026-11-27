// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateContainerAppsAssessmentsManagementClient } from "@azure/arm-migratecontainerappsassessments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ContainerAppsAssessment
 *
 * @summary get a ContainerAppsAssessment
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Get_MaximumSet_Gen.json
 */
async function containerAppsAssessmentOperationsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  const result = await client.containerAppsAssessmentOperations.get(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerAppsAssessmentOperationsGetMaximumSet();
}

main().catch(console.error);
