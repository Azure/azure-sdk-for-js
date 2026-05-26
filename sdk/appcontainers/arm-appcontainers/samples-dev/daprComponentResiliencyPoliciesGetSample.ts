// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Dapr component resiliency policy.
 *
 * @summary get a Dapr component resiliency policy.
 * x-ms-original-file: 2025-10-02-preview/DaprComponentResiliencyPolicies_Get.json
 */
async function getDaprComponentResiliencyPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponentResiliencyPolicies.get(
    "examplerg",
    "myenvironment",
    "mydaprcomponent",
    "myresiliencypolicy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDaprComponentResiliencyPolicy();
}

main().catch(console.error);
