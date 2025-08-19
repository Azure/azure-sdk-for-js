// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restarts all containers in a container group in place. If container image has updates, new image will be downloaded.
 *
 * @summary Restarts all containers in a container group in place. If container image has updates, new image will be downloaded.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerGroupsRestart.json
 */

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function containerRestart(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containerGroups.beginRestartAndWait(
    resourceGroupName,
    containerGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerRestart();
}

main().catch(console.error);
