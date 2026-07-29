// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a Managed Environment used to host container apps.
 *
 * @summary get the properties of a Managed Environment used to host container apps.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_Get.json
 */
async function getEnvironmentsByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironments.get("examplerg", "jlaw-demo1");
  console.log(result);
}

async function main(): Promise<void> {
  await getEnvironmentsByName();
}

main().catch(console.error);
