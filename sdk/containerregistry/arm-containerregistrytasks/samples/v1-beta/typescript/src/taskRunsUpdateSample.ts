// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a task run with the specified parameters.
 *
 * @summary updates a task run with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/TaskRunsUpdate.json
 */
async function taskRunsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.taskRuns.update("myResourceGroup", "myRegistry", "myRun", {
    forceUpdateTag: "test",
    runRequest: {
      type: "EncodedTaskRunRequest",
      credentials: {},
      encodedTaskContent: "c3RlcHM6IAogIC0gY21kOiB7eyAuVmFsdWVzLmNvbW1hbmQgfX0K",
      encodedValuesContent: "Y29tbWFuZDogYmFzaCBlY2hvIHt7LlJ1bi5SZWdpc3RyeX19Cg==",
      isArchiveEnabled: true,
      platform: { architecture: "amd64", os: "Linux" },
      values: [],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await taskRunsUpdate();
}

main().catch(console.error);
