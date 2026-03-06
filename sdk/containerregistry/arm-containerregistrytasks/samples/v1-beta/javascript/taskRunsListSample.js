// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the task runs for a specified container registry.
 *
 * @summary lists all the task runs for a specified container registry.
 * x-ms-original-file: 2025-03-01-preview/TaskRunsList.json
 */
async function taskRunsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.taskRuns.list("myResourceGroup", "myRegistry")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await taskRunsList();
}

main().catch(console.error);
