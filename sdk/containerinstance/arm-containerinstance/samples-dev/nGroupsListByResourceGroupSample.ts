// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all NGroups resources under a resource group.
 *
 * @summary gets a list of all NGroups resources under a resource group.
 * x-ms-original-file: 2026-07-01/NGroupsListByResourceGroup.json
 */
async function nGroupsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nGroups.listByResourceGroup("demo")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await nGroupsListByResourceGroup();
}

main().catch(console.error);
