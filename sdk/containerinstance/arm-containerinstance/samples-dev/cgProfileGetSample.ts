// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of the specified container group profile.
 *
 * @summary get the properties of the specified container group profile.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupProfilesGet.json
 */
async function containerGroupProfilesGetSucceeded(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.get("demo", "demo1");
  console.log(result);
}

/**
 * This sample demonstrates how to get the properties of the specified container group profile.
 *
 * @summary get the properties of the specified container group profile.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupProfilesGetPriority.json
 */
async function containerGroupProfilesGetWithPriority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.get("demo", "demo1");
  console.log(result);
}

async function main(): Promise<void> {
  await containerGroupProfilesGetSucceeded();
  await containerGroupProfilesGetWithPriority();
}

main().catch(console.error);
