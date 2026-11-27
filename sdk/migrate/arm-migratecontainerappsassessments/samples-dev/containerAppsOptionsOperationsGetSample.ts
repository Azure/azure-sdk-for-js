// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateContainerAppsAssessmentsManagementClient } from "@azure/arm-migratecontainerappsassessments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ContainerAppsAssessmentOptions
 *
 * @summary get a ContainerAppsAssessmentOptions
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsOptionsOperations_Get_MaximumSet_Gen.json
 */
async function containerAppsOptionsOperationsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateContainerAppsAssessmentsManagementClient(credential, subscriptionId);
  const result = await client.containerAppsOptionsOperations.get(
    "rgcontainerAppsAssessments",
    "testProject",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerAppsOptionsOperationsGetMaximumSet();
}

main().catch(console.error);
