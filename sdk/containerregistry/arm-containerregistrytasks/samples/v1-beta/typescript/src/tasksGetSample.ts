// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a specified task.
 *
 * @summary get the properties of a specified task.
 * x-ms-original-file: 2025-03-01-preview/TasksGet.json
 */
async function tasksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.get("myResourceGroup", "myRegistry", "myTask");
  console.log(result);
}

async function main(): Promise<void> {
  await tasksGet();
}

main().catch(console.error);
