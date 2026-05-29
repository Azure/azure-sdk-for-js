// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all the Managed Environments in a resource group.
 *
 * @summary get all the Managed Environments in a resource group.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_ListByResourceGroup.json
 */
async function listEnvironmentsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedEnvironments.listByResourceGroup("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEnvironmentsByResourceGroup();
}

main().catch(console.error);
