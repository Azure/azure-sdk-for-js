// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a specified task run resource.
 *
 * @summary Deletes a specified task run resource.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/RegistryTasks/preview/2025-03-01-preview/examples/TaskRunsDelete.json
 */
async function taskRunsDelete(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const taskRunName = "myRun";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryTasksManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.taskRuns.delete(
    resourceGroupName,
    registryName,
    taskRunName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await taskRunsDelete();
}

main().catch(console.error);
