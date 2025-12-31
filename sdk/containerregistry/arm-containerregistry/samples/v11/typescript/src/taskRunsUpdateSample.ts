// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TaskRunUpdateParameters} from "@azure/arm-containerregistry";
import {
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a task run with the specified parameters.
 *
 * @summary Updates a task run with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/TaskRunsUpdate.json
 */
async function taskRunsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const taskRunName = "myRun";
  const updateParameters: TaskRunUpdateParameters = {
    forceUpdateTag: "test",
    runRequest: {
      type: "EncodedTaskRunRequest",
      credentials: {},
      encodedTaskContent:
        "c3RlcHM6IAogIC0gY21kOiB7eyAuVmFsdWVzLmNvbW1hbmQgfX0K",
      encodedValuesContent:
        "Y29tbWFuZDogYmFzaCBlY2hvIHt7LlJ1bi5SZWdpc3RyeX19Cg==",
      isArchiveEnabled: true,
      platform: { architecture: "amd64", os: "Linux" },
      values: [],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.taskRuns.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    taskRunName,
    updateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await taskRunsUpdate();
}

main().catch(console.error);
