// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a task with extended information that includes all secrets.
 *
 * @summary returns a task with extended information that includes all secrets.
 * x-ms-original-file: 2025-03-01-preview/TasksGetDetails.json
 */
async function tasksGetDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.getDetails("myResourceGroup", "myRegistry", "myTask");
  console.log(result);
}

async function main() {
  await tasksGetDetails();
}

main().catch(console.error);
