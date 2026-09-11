// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SandboxGroup resources by subscription ID
 *
 * @summary list SandboxGroup resources by subscription ID
 * x-ms-original-file: 2026-07-01/SandboxGroupsListBySubscription.json
 */
async function listSandboxGroupsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sandboxGroups.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSandboxGroupsBySubscription();
}

main().catch(console.error);
