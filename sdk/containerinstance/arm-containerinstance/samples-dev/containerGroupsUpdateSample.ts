// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates container group tags with specified values.
 *
 * @summary Updates container group tags with specified values.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupsUpdate.json
 */

import type { Resource } from "@azure/arm-containerinstance";
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function containerGroupsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demoResource";
  const containerGroupName = "demo1";
  const resource: Resource = {
    tags: { tag1key: "tag1Value", tag2key: "tag2Value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.update(
    resourceGroupName,
    containerGroupName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerGroupsUpdate();
}

main().catch(console.error);
