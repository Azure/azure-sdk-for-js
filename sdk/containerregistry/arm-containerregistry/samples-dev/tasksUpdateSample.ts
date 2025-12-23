// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TaskUpdateParameters} from "@azure/arm-containerregistry";
import {
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a task with the specified parameters.
 *
 * @summary Updates a task with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/TasksUpdate.json
 */
async function tasksUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const taskName = "myTask";
  const taskUpdateParameters: TaskUpdateParameters = {
    agentConfiguration: { cpu: 3 },
    credentials: {
      customRegistries: {
        myregistryAzurecrIo: {
          identity: "[system]",
          password: {
            type: "Vaultsecret",
            value: "https://myacbvault.vault.azure.net/secrets/password",
          },
          userName: { type: "Opaque", value: "username" },
        },
      },
    },
    logTemplate: "acr/tasks:{{.Run.OS}}",
    status: "Enabled",
    step: {
      type: "Docker",
      dockerFilePath: "src/DockerFile",
      imageNames: ["azurerest:testtag1"],
    },
    tags: { testkey: "value" },
    trigger: {
      sourceTriggers: [
        {
          name: "mySourceTrigger",
          sourceRepository: {
            sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
          },
          sourceTriggerEvents: ["commit"],
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.tasks.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    taskName,
    taskUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a task with the specified parameters.
 *
 * @summary Updates a task with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/TasksUpdate_QuickTask.json
 */
async function tasksUpdateQuickTask(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const taskName = "quicktask";
  const taskUpdateParameters: TaskUpdateParameters = {
    logTemplate: "acr/tasks:{{.Run.OS}}",
    status: "Enabled",
    tags: { testkey: "value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.tasks.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    taskName,
    taskUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a task with the specified parameters.
 *
 * @summary Updates a task with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/ManagedIdentity/TasksUpdate_WithKeyVaultCustomCredentials.json
 */
async function tasksUpdateWithKeyVaultCustomCredentials(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const taskName = "myTask";
  const taskUpdateParameters: TaskUpdateParameters = {
    agentConfiguration: { cpu: 3 },
    credentials: {
      customRegistries: {
        myregistryAzurecrIo: {
          identity: "[system]",
          password: {
            type: "Vaultsecret",
            value: "https://myacbvault.vault.azure.net/secrets/password",
          },
          userName: {
            type: "Vaultsecret",
            value: "https://myacbvault.vault.azure.net/secrets/username",
          },
        },
      },
    },
    logTemplate: undefined,
    status: "Enabled",
    step: {
      type: "Docker",
      dockerFilePath: "src/DockerFile",
      imageNames: ["azurerest:testtag1"],
    },
    tags: { testkey: "value" },
    trigger: {
      sourceTriggers: [
        {
          name: "mySourceTrigger",
          sourceRepository: {
            sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
          },
          sourceTriggerEvents: ["commit"],
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.tasks.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    taskName,
    taskUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a task with the specified parameters.
 *
 * @summary Updates a task with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/ManagedIdentity/TasksUpdate_WithMSICustomCredentials.json
 */
async function tasksUpdateWithMsiCustomCredentials(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const taskName = "myTask";
  const taskUpdateParameters: TaskUpdateParameters = {
    agentConfiguration: { cpu: 3 },
    credentials: {
      customRegistries: { myregistryAzurecrIo: { identity: "[system]" } },
    },
    logTemplate: undefined,
    status: "Enabled",
    step: {
      type: "Docker",
      dockerFilePath: "src/DockerFile",
      imageNames: ["azurerest:testtag1"],
    },
    tags: { testkey: "value" },
    trigger: {
      sourceTriggers: [
        {
          name: "mySourceTrigger",
          sourceRepository: {
            sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
          },
          sourceTriggerEvents: ["commit"],
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.tasks.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    taskName,
    taskUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates a task with the specified parameters.
 *
 * @summary Updates a task with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2019-06-01-preview/examples/TasksUpdate_WithOpaqueCustomCredentials.json
 */
async function tasksUpdateWithOpaqueCustomCredentials(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const taskName = "myTask";
  const taskUpdateParameters: TaskUpdateParameters = {
    agentConfiguration: { cpu: 3 },
    credentials: {
      customRegistries: {
        myregistryAzurecrIo: {
          password: { type: "Opaque", value: "***" },
          userName: { type: "Opaque", value: "username" },
        },
      },
    },
    logTemplate: undefined,
    status: "Enabled",
    step: {
      type: "Docker",
      dockerFilePath: "src/DockerFile",
      imageNames: ["azurerest:testtag1"],
    },
    tags: { testkey: "value" },
    trigger: {
      sourceTriggers: [
        {
          name: "mySourceTrigger",
          sourceRepository: {
            sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
          },
          sourceTriggerEvents: ["commit"],
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.tasks.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    taskName,
    taskUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tasksUpdate();
  await tasksUpdateQuickTask();
  await tasksUpdateWithKeyVaultCustomCredentials();
  await tasksUpdateWithMsiCustomCredentials();
  await tasksUpdateWithOpaqueCustomCredentials();
}

main().catch(console.error);
