// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a goal resource.
 *
 * @summary gets a goal resource.
 * x-ms-original-file: 2026-10-01/GoalResources_Get_Complete_Example.json
 */
async function goalResourcesGetCompleteExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalResources.get(
    "production-sg",
    "zonal-resiliency-goal",
    "primary-vm",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a goal resource.
 *
 * @summary gets a goal resource.
 * x-ms-original-file: 2026-10-01/GoalResources_Get_MaximumSet_Gen.json
 */
async function goalResourcesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalResources.get(
    "production-sg",
    "zonal-resiliency-goal",
    "primary-vm",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a goal resource.
 *
 * @summary gets a goal resource.
 * x-ms-original-file: 2026-10-01/GoalResources_Get_MinimumSet_Gen.json
 */
async function goalResourcesGetMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.goalResources.get(
    "production-sg",
    "zonal-resiliency-goal",
    "primary-vm",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await goalResourcesGetCompleteExample();
  await goalResourcesGetMaximumSet();
  await goalResourcesGetMinimumSet();
}

main().catch(console.error);
