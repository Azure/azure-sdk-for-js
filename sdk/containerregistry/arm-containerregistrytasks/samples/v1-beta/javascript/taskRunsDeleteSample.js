// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a specified task run resource.
 *
 * @summary deletes a specified task run resource.
 * x-ms-original-file: 2025-03-01-preview/TaskRunsDelete.json
 */
async function taskRunsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  await client.taskRuns.delete("myResourceGroup", "myRegistry", "myRun");
}

async function main() {
  await taskRunsDelete();
}

main().catch(console.error);
