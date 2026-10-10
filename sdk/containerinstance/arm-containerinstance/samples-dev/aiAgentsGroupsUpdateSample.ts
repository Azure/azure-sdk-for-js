// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an AiAgentsGroup
 *
 * @summary update an AiAgentsGroup
 * x-ms-original-file: 2026-08-01-preview/AiAgentsGroupsUpdate.json
 */
async function updateAAiAgentsGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.aiAgentsGroups.update("myResourceGroup", "myAiAgentsGroup", {
    tags: { environment: "production" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAAiAgentsGroup();
}

main().catch(console.error);
