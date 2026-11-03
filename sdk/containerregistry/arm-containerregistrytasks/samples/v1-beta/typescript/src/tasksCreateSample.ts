// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryTasksManagementClient } from "@azure/arm-containerregistrytasks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a task for a container registry with the specified parameters.
 *
 * @summary creates a task for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksCreate_WithLoginIdentity.json
 */
async function tasksCreateWithLoginIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.create("myResourceGroup", "myRegistry", "mytTask", {
    identity: { type: "SystemAssigned" },
    location: "eastus",
    properties: {
      agentConfiguration: { cpu: 2 },
      credentials: { sourceRegistry: { identity: "[system]" } },
      isSystemTask: false,
      platform: { architecture: "amd64", os: "Linux" },
      status: "Enabled",
      step: {
        type: "Docker",
        arguments: [
          { name: "mytestargument", isSecret: false, value: "mytestvalue" },
          { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
        ],
        contextPath: "src",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag"],
        isPushEnabled: true,
        noCache: false,
      },
      trigger: {
        baseImageTrigger: { name: "myBaseImageTrigger", baseImageTriggerType: "Runtime" },
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              branch: "master",
              repositoryUrl: "https://github.com/Azure/azure-rest-api-specs",
              sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
              sourceControlType: "Github",
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
        timerTriggers: [{ name: "myTimerTrigger", schedule: "30 9 * * 1-5" }],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a task for a container registry with the specified parameters.
 *
 * @summary creates a task for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksCreate_WithSystemAndUserIdentities.json
 */
async function tasksCreateWithSystemAndUserIdentities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.create("myResourceGroup", "myRegistry", "mytTask", {
    identity: {
      type: "SystemAssigned, UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/f9d7ebed-adbd-4cb4-b973-aaf82c136138/resourcegroups/myResourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity2":
          {},
      },
    },
    location: "eastus",
    properties: {
      agentConfiguration: { cpu: 2 },
      isSystemTask: false,
      platform: { architecture: "amd64", os: "Linux" },
      status: "Enabled",
      step: {
        type: "Docker",
        arguments: [
          { name: "mytestargument", isSecret: false, value: "mytestvalue" },
          { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
        ],
        contextPath: "src",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag"],
        isPushEnabled: true,
        noCache: false,
      },
      trigger: {
        baseImageTrigger: {
          name: "myBaseImageTrigger",
          baseImageTriggerType: "Runtime",
          updateTriggerEndpoint: "https://user:pass@mycicd.webhook.com?token=foo",
          updateTriggerPayloadType: "Default",
        },
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              branch: "master",
              repositoryUrl: "https://github.com/Azure/azure-rest-api-specs",
              sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
              sourceControlType: "Github",
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
        timerTriggers: [{ name: "myTimerTrigger", schedule: "30 9 * * 1-5" }],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a task for a container registry with the specified parameters.
 *
 * @summary creates a task for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksCreate_WithSystemIdentity.json
 */
async function tasksCreateWithUserIdentitiesWithSystemIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.create("myResourceGroup", "myRegistry", "mytTask", {
    identity: { type: "SystemAssigned" },
    location: "eastus",
    properties: {
      agentConfiguration: { cpu: 2 },
      isSystemTask: false,
      platform: { architecture: "amd64", os: "Linux" },
      status: "Enabled",
      step: {
        type: "Docker",
        arguments: [
          { name: "mytestargument", isSecret: false, value: "mytestvalue" },
          { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
        ],
        contextPath: "src",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag"],
        isPushEnabled: true,
        noCache: false,
      },
      trigger: {
        baseImageTrigger: { name: "myBaseImageTrigger", baseImageTriggerType: "Runtime" },
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              branch: "master",
              repositoryUrl: "https://github.com/Azure/azure-rest-api-specs",
              sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
              sourceControlType: "Github",
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
        timerTriggers: [{ name: "myTimerTrigger", schedule: "30 9 * * 1-5" }],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a task for a container registry with the specified parameters.
 *
 * @summary creates a task for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksCreate_WithUserIdentities.json
 */
async function tasksCreateWithUserIdentities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.create("myResourceGroup", "myRegistry", "mytTask", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/f9d7ebed-adbd-4cb4-b973-aaf82c136138/resourcegroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
        "/subscriptions/f9d7ebed-adbd-4cb4-b973-aaf82c136138/resourcegroups/myResourceGroup1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity2":
          {},
      },
    },
    location: "eastus",
    properties: {
      agentConfiguration: { cpu: 2 },
      isSystemTask: false,
      platform: { architecture: "amd64", os: "Linux" },
      status: "Enabled",
      step: {
        type: "Docker",
        arguments: [
          { name: "mytestargument", isSecret: false, value: "mytestvalue" },
          { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
        ],
        contextPath: "src",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag"],
        isPushEnabled: true,
        noCache: false,
      },
      trigger: {
        baseImageTrigger: {
          name: "myBaseImageTrigger",
          baseImageTriggerType: "Runtime",
          updateTriggerEndpoint: "https://user:pass@mycicd.webhook.com?token=foo",
          updateTriggerPayloadType: "Default",
        },
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              branch: "master",
              repositoryUrl: "https://github.com/Azure/azure-rest-api-specs",
              sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
              sourceControlType: "Github",
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
        timerTriggers: [{ name: "myTimerTrigger", schedule: "30 9 * * 1-5" }],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a task for a container registry with the specified parameters.
 *
 * @summary creates a task for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/TasksCreate.json
 */
async function tasksCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.create("myResourceGroup", "myRegistry", "mytTask", {
    identity: { type: "SystemAssigned" },
    location: "eastus",
    properties: {
      agentConfiguration: { cpu: 2 },
      isSystemTask: false,
      logTemplate: "acr/tasks:{{.Run.OS}}",
      platform: { architecture: "amd64", os: "Linux" },
      status: "Enabled",
      step: {
        type: "Docker",
        arguments: [
          { name: "mytestargument", isSecret: false, value: "mytestvalue" },
          { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
        ],
        contextPath: "src",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag"],
        isPushEnabled: true,
        noCache: false,
      },
      trigger: {
        baseImageTrigger: {
          name: "myBaseImageTrigger",
          baseImageTriggerType: "Runtime",
          updateTriggerEndpoint: "https://user:pass@mycicd.webhook.com?token=foo",
          updateTriggerPayloadType: "Token",
        },
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              branch: "master",
              repositoryUrl: "https://github.com/Azure/azure-rest-api-specs",
              sourceControlAuthProperties: { token: "xxxxx", tokenType: "PAT" },
              sourceControlType: "Github",
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
        timerTriggers: [{ name: "myTimerTrigger", schedule: "30 9 * * 1-5" }],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a task for a container registry with the specified parameters.
 *
 * @summary creates a task for a container registry with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/TasksCreate_QuickTask.json
 */
async function tasksCreateQuickTask(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.create("myResourceGroup", "myRegistry", "quicktask", {
    location: "eastus",
    properties: { isSystemTask: true, logTemplate: "acr/tasks:{{.Run.OS}}", status: "Enabled" },
    tags: { testkey: "value" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await tasksCreateWithLoginIdentity();
  await tasksCreateWithSystemAndUserIdentities();
  await tasksCreateWithUserIdentitiesWithSystemIdentity();
  await tasksCreateWithUserIdentities();
  await tasksCreate();
  await tasksCreateQuickTask();
}

main().catch(console.error);
