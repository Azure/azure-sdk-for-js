// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the detailed information for a given task run that includes all secrets.
 *
 * @summary gets the detailed information for a given task run that includes all secrets.
 * x-ms-original-file: 2025-03-01-preview/TaskRunsGetDetails.json
 */
async function taskRunsGetDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.taskRuns.getDetails("myResourceGroup", "myRegistry", "myRun");
  console.log(result);
}

async function main() {
  await taskRunsGetDetails();
}

main().catch(console.error);
