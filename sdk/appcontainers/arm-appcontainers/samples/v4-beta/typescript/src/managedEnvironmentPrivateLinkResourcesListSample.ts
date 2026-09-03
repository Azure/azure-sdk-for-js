// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list private link resources for a given managed environment.
 *
 * @summary list private link resources for a given managed environment.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironmentPrivateLinkResources_List.json
 */
async function listPrivateLinkResourcesByManagedEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedEnvironmentPrivateLinkResources.list(
    "examplerg",
    "managedEnv",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateLinkResourcesByManagedEnvironment();
}

main().catch(console.error);
