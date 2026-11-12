// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of the specified NGroups resource.
 *
 * @summary get the properties of the specified NGroups resource.
 * x-ms-original-file: 2026-07-01/NGroupsGet.json
 */
async function nGroupsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.nGroups.get("demo", "demo-ngroup");
  console.log(result);
}

async function main(): Promise<void> {
  await nGroupsGet();
}

main().catch(console.error);
