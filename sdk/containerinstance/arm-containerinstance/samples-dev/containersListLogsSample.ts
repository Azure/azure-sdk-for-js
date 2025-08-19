// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the logs for a specified container instance in a specified resource group and container group.
 *
 * @summary Get the logs for a specified container instance in a specified resource group and container group.
 * x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/preview/2024-05-01-preview/examples/ContainerListLogs.json
 */

import type { ContainersListLogsOptionalParams } from "@azure/arm-containerinstance";
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function containerListLogs(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERINSTANCE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERINSTANCE_RESOURCE_GROUP"] || "demo";
  const containerGroupName = "demo1";
  const containerName = "container1";
  const tail = 10;
  const options: ContainersListLogsOptionalParams = { tail };
  const credential = new DefaultAzureCredential();
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const result = await client.containers.listLogs(
    resourceGroupName,
    containerGroupName,
    containerName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await containerListLogs();
}

main().catch(console.error);
