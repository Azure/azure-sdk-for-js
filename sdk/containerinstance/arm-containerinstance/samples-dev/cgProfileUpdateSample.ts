// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a specified container group profile.
 *
 * @summary update a specified container group profile.
 * x-ms-original-file: 2026-06-01-preview/ContainerGroupProfilesPatch.json
 */
async function containerGroupProfilesPatch(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.cgProfile.update("demoResource", "demo1", {
    tags: { tag1key: "tag1Value", tag2key: "tag2Value" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await containerGroupProfilesPatch();
}

main().catch(console.error);
