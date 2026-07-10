// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a SandboxGroup
 *
 * @summary update a SandboxGroup
 * x-ms-original-file: 2026-07-01/SandboxGroupsUpdate.json
 */
async function updateASandboxGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.sandboxGroups.update("myResourceGroup", "mySandboxGroup", {
    tags: { environment: "production" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateASandboxGroup();
}

main().catch(console.error);
