// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migratecontainerappsassessments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ContainerAppsManagedEnvironment resources by ContainerAppsAssessment
 *
 * @summary list ContainerAppsManagedEnvironment resources by ContainerAppsAssessment
 * x-ms-original-file: 2025-09-09-preview/ContainerAppsManagedEnvironmentOperations_ListByParent_MaximumSet_Gen.json
 */
async function containerAppsManagedEnvironmentOperationsListByParentMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "572C3D3F-425D-4AE8-A935-72631EADDE56";
  const client = new MigrateClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsManagedEnvironmentOperations.listByParent(
    "rgcontainerAppsAssessments",
    "testProject",
    "testcontainerAppsAssessment",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await containerAppsManagedEnvironmentOperationsListByParentMaximumSet();
}

main().catch(console.error);
