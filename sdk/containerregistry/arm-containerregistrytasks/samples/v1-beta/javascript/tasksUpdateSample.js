// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a task with the specified parameters.
 *
 * @summary updates a task with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksUpdate_WithKeyVaultCustomCredentials.json
 */
async function tasksUpdateWithKeyVaultCustomCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.update("myResourceGroup", "myRegistry", "myTask", {
    properties: {
      agentConfiguration: { cpu: 3 },
      credentials: {
        customRegistries: {
          "myregistry.azurecr.io": {
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
      status: "Enabled",
      step: {
        type: "Docker",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag1"],
      },
      trigger: {
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              sourceControlAuthProperties: {
                token: "xxxxx",
                tokenType: "PAT",
              },
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a task with the specified parameters.
 *
 * @summary updates a task with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksUpdate_WithLoginIdentity.json
 */
async function tasksUpdateWithLoginIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.update("myResourceGroup", "myRegistry", "myTask", {
    properties: {
      agentConfiguration: { cpu: 3 },
      credentials: { sourceRegistry: { identity: "[system]" } },
      status: "Enabled",
      step: {
        type: "Docker",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag1"],
      },
      trigger: {
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              sourceControlAuthProperties: {
                token: "xxxxx",
                tokenType: "PAT",
              },
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a task with the specified parameters.
 *
 * @summary updates a task with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/ManagedIdentity/TasksUpdate_WithMSICustomCredentials.json
 */
async function tasksUpdateWithMSICustomCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.update("myResourceGroup", "myRegistry", "myTask", {
    properties: {
      agentConfiguration: { cpu: 3 },
      credentials: {
        customRegistries: {
          "myregistry.azurecr.io": { identity: "[system]" },
        },
      },
      status: "Enabled",
      step: {
        type: "Docker",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag1"],
      },
      trigger: {
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              sourceControlAuthProperties: {
                token: "xxxxx",
                tokenType: "PAT",
              },
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a task with the specified parameters.
 *
 * @summary updates a task with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/TasksUpdate.json
 */
async function tasksUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.update("myResourceGroup", "myRegistry", "myTask", {
    properties: {
      agentConfiguration: { cpu: 3 },
      credentials: {
        customRegistries: {
          "myregistry.azurecr.io": {
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
      trigger: {
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              sourceControlAuthProperties: {
                token: "xxxxx",
                tokenType: "PAT",
              },
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a task with the specified parameters.
 *
 * @summary updates a task with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/TasksUpdate_QuickTask.json
 */
async function tasksUpdateQuickTask() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.update("myResourceGroup", "myRegistry", "quicktask", {
    properties: { logTemplate: "acr/tasks:{{.Run.OS}}", status: "Enabled" },
    tags: { testkey: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates a task with the specified parameters.
 *
 * @summary updates a task with the specified parameters.
 * x-ms-original-file: 2025-03-01-preview/TasksUpdate_WithOpaqueCustomCredentials.json
 */
async function tasksUpdateWithOpaqueCustomCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.tasks.update("myResourceGroup", "myRegistry", "myTask", {
    properties: {
      agentConfiguration: { cpu: 3 },
      credentials: {
        customRegistries: {
          "myregistry.azurecr.io": {
            password: { type: "Opaque", value: "***" },
            userName: { type: "Opaque", value: "username" },
          },
        },
      },
      status: "Enabled",
      step: {
        type: "Docker",
        dockerFilePath: "src/DockerFile",
        imageNames: ["azurerest:testtag1"],
      },
      trigger: {
        sourceTriggers: [
          {
            name: "mySourceTrigger",
            sourceRepository: {
              sourceControlAuthProperties: {
                token: "xxxxx",
                tokenType: "PAT",
              },
            },
            sourceTriggerEvents: ["commit"],
          },
        ],
      },
    },
    tags: { testkey: "value" },
  });
  console.log(result);
}

async function main() {
  await tasksUpdateWithKeyVaultCustomCredentials();
  await tasksUpdateWithLoginIdentity();
  await tasksUpdateWithMSICustomCredentials();
  await tasksUpdate();
  await tasksUpdateQuickTask();
  await tasksUpdateWithOpaqueCustomCredentials();
}

main().catch(console.error);
