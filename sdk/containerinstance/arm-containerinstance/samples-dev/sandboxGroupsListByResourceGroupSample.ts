// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SandboxGroup resources by resource group
 *
 * @summary list SandboxGroup resources by resource group
 * x-ms-original-file: 2026-06-01-preview/SandboxGroupsListByResourceGroup.json
 */
async function listSandboxGroupsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sandboxGroups.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSandboxGroupsByResourceGroup();
}

main().catch(console.error);
