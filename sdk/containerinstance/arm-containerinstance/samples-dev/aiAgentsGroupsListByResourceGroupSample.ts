// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AiAgentsGroup resources by resource group
 *
 * @summary list AiAgentsGroup resources by resource group
 * x-ms-original-file: 2026-08-01-preview/AiAgentsGroupsListByResourceGroup.json
 */
async function listAiAgentsGroupsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiAgentsGroups.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAiAgentsGroupsByResourceGroup();
}

main().catch(console.error);
