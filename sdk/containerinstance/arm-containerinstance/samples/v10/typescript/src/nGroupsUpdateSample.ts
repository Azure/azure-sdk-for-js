// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a specified NGroups resource.
 *
 * @summary update a specified NGroups resource.
 * x-ms-original-file: 2026-07-01/NGroupsUpdate.json
 */
async function nGroupsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.nGroups.update("demo", "demo-ngroup", { tags: { env: "test" } });
  console.log(result);
}

async function main(): Promise<void> {
  await nGroupsUpdate();
}

main().catch(console.error);
