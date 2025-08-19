// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the properties of the specified container group profile in the specified subscription and resource group. The operation returns the properties of container group profile including containers, image registry credentials, restart policy, IP address type, OS type, volumes, current revision number, etc.
 *
 * @summary Gets the properties of the specified container group profile in the specified subscription and resource group. The operation returns the properties of container group profile including containers, image registry credentials, restart policy, IP address type, OS type, volumes, current revision number, etc.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupProfilesGetPriority.json
 */
async function containerGroupProfilesGetWithPriority(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupProfileName = "demo1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroupProfiles.get(
    resourceGroupName,
    containerGroupProfileName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the properties of the specified container group profile in the specified subscription and resource group. The operation returns the properties of container group profile including containers, image registry credentials, restart policy, IP address type, OS type, volumes, current revision number, etc.
 *
 * @summary Gets the properties of the specified container group profile in the specified subscription and resource group. The operation returns the properties of container group profile including containers, image registry credentials, restart policy, IP address type, OS type, volumes, current revision number, etc.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupProfilesGet.json
 */
async function containerGroupProfilesGetSucceeded(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupProfileName = "demo1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroupProfiles.get(
    resourceGroupName,
    containerGroupProfileName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerGroupProfilesGetWithPriority();
  await containerGroupProfilesGetSucceeded();
}

main().catch(console.error);
