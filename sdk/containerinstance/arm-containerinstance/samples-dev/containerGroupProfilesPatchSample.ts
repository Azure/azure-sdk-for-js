// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerGroupProfilePatch } from "@azure/arm-containerinstance";
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patches container group profile with specified properties.
 *
 * @summary Patches container group profile with specified properties.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupProfilesPatch.json
 */
async function containerGroupProfilesPatch(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demoResource";
  const containerGroupProfileName = "demo1";
  const properties: ContainerGroupProfilePatch = {
    tags: { tag1key: "tag1Value", tag2key: "tag2Value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroupProfiles.patch(
    resourceGroupName,
    containerGroupProfileName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerGroupProfilesPatch();
}

main().catch(console.error);
