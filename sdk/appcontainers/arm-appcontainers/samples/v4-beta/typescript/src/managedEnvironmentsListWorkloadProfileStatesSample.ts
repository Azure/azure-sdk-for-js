// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all workload Profile States for a Managed Environment.
 *
 * @summary get all workload Profile States for a Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_ListWorkloadProfileStates.json
 */
async function listEnvironmentsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedEnvironments.listWorkloadProfileStates(
    "examplerg",
    "jlaw-demo1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEnvironmentsBySubscription();
}

main().catch(console.error);
