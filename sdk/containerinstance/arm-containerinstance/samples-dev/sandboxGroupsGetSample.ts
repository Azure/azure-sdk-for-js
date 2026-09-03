// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a SandboxGroup
 *
 * @summary get a SandboxGroup
 * x-ms-original-file: 2026-06-01-preview/SandboxGroupsGet.json
 */
async function getASandboxGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.sandboxGroups.get("myResourceGroup", "mySandboxGroup");
  console.log(result);
}

async function main(): Promise<void> {
  await getASandboxGroup();
}

main().catch(console.error);
