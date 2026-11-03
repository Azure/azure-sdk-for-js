// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a task run for a container registry with the specified parameters.
 *
 * @summary creates a task run for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/TaskRunsCreate.json
 */
async function taskRunsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.taskRuns.create("myResourceGroup", "myRegistry", "myRun", {
    properties: {
      forceUpdateTag: "test",
      runRequest: {
        type: "EncodedTaskRunRequest",
        credentials: {},
        encodedTaskContent: "c3RlcHM6IAogIC0gY21kOiB7eyAuVmFsdWVzLmNvbW1hbmQgfX0K",
        encodedValuesContent: "Y29tbWFuZDogYmFzaCBlY2hvIHt7LlJ1bi5SZWdpc3RyeX19Cg==",
        platform: { architecture: "amd64", os: "Linux" },
        values: [],
      },
    },
  });
  console.log(result);
}

async function main() {
  await taskRunsCreate();
}

main().catch(console.error);
