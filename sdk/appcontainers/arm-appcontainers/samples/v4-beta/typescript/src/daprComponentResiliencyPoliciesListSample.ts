// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the resiliency policies for a Dapr component.
 *
 * @summary get the resiliency policies for a Dapr component.
 * x-ms-original-file: 2025-10-02-preview/DaprComponentResiliencyPolicies_List.json
 */
async function listDaprComponentResiliencyPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.daprComponentResiliencyPolicies.list(
    "examplerg",
    "myenvironment",
    "mydaprcomponent",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDaprComponentResiliencyPolicies();
}

main().catch(console.error);
