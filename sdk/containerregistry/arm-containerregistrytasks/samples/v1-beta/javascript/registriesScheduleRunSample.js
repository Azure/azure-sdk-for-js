// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryTasksManagementClient } = require("@azure/arm-containerregistrytasks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to schedules a new run based on the request parameters and add it to the run queue.
 *
 * @summary schedules a new run based on the request parameters and add it to the run queue.
 * x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun.json
 */
async function registriesScheduleRun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.scheduleRun("myResourceGroup", "myRegistry", {
    type: "DockerBuildRequest",
    agentConfiguration: { cpu: 2 },
    arguments: [
      { name: "mytestargument", isSecret: false, value: "mytestvalue" },
      { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
    ],
    dockerFilePath: "DockerFile",
    imageNames: ["azurerest:testtag"],
    isArchiveEnabled: true,
    isPushEnabled: true,
    noCache: true,
    platform: { architecture: "amd64", os: "Linux" },
    sourceLocation:
      "https://myaccount.blob.core.windows.net/sascontainer/source.zip?sv=2015-04-05&st=2015-04-29T22%3A18%3A26Z&se=2015-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=Z%2FRHIX5Xcg0Mq2rqI3OlWTjEg2tYkboXr1P9ZUXDtkk%3D",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to schedules a new run based on the request parameters and add it to the run queue.
 *
 * @summary schedules a new run based on the request parameters and add it to the run queue.
 * x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun_EncodedTaskRun.json
 */
async function registriesScheduleRunEncodedTaskRun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.scheduleRun("myResourceGroup", "myRegistry", {
    type: "EncodedTaskRunRequest",
    agentConfiguration: { cpu: 2 },
    encodedTaskContent:
      "c3RlcHM6Cnt7IGlmIFZhbHVlcy5lbnZpcm9ubWVudCA9PSAncHJvZCcgfX0KICAtIHJ1bjogcHJvZCBzZXR1cAp7eyBlbHNlIGlmIFZhbHVlcy5lbnZpcm9ubWVudCA9PSAnc3RhZ2luZycgfX0KICAtIHJ1bjogc3RhZ2luZyBzZXR1cAp7eyBlbHNlIH19CiAgLSBydW46IGRlZmF1bHQgc2V0dXAKe3sgZW5kIH19CgogIC0gcnVuOiBidWlsZCAtdCBGYW5jeVRoaW5nOnt7LlZhbHVlcy5lbnZpcm9ubWVudH19LXt7LlZhbHVlcy52ZXJzaW9ufX0gLgoKcHVzaDogWydGYW5jeVRoaW5nOnt7LlZhbHVlcy5lbnZpcm9ubWVudH19LXt7LlZhbHVlcy52ZXJzaW9ufX0nXQ==",
    encodedValuesContent: "ZW52aXJvbm1lbnQ6IHByb2QKdmVyc2lvbjogMQ==",
    platform: { os: "Linux" },
    values: [
      { name: "mytestargument", isSecret: false, value: "mytestvalue" },
      { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to schedules a new run based on the request parameters and add it to the run queue.
 *
 * @summary schedules a new run based on the request parameters and add it to the run queue.
 * x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun_FileTaskRun.json
 */
async function registriesScheduleRunFileTaskRun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.scheduleRun("myResourceGroup", "myRegistry", {
    type: "FileTaskRunRequest",
    agentConfiguration: { cpu: 2 },
    platform: { os: "Linux" },
    sourceLocation:
      "https://myaccount.blob.core.windows.net/sascontainer/source.zip?sv=2015-04-05&st=2015-04-29T22%3A18%3A26Z&se=2015-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=Z%2FRHIX5Xcg0Mq2rqI3OlWTjEg2tYkboXr1P9ZUXDtkk%3D",
    taskFilePath: "acb.yaml",
    values: [
      { name: "mytestargument", isSecret: false, value: "mytestvalue" },
      { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
    ],
    valuesFilePath: "prod-values.yaml",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to schedules a new run based on the request parameters and add it to the run queue.
 *
 * @summary schedules a new run based on the request parameters and add it to the run queue.
 * x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun_FileTask_WithCustomCredentials.json
 */
async function registriesScheduleRunTaskWithCustomCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.scheduleRun("myResourceGroup", "myRegistry", {
    type: "FileTaskRunRequest",
    credentials: {
      customRegistries: {
        "myregistry.azurecr.io": {
          password: { type: "Opaque", value: "***" },
          userName: { type: "Opaque", value: "reg1" },
        },
      },
      sourceRegistry: { loginMode: "Default" },
    },
    platform: { os: "Linux" },
    taskFilePath: "acb.yaml",
    values: [
      { name: "mytestargument", isSecret: false, value: "mytestvalue" },
      { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to schedules a new run based on the request parameters and add it to the run queue.
 *
 * @summary schedules a new run based on the request parameters and add it to the run queue.
 * x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun_Task.json
 */
async function registriesScheduleRunTask() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.scheduleRun("myResourceGroup", "myRegistry", {
    type: "TaskRunRequest",
    overrideTaskStepProperties: {
      arguments: [
        { name: "mytestargument", isSecret: false, value: "mytestvalue" },
        { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
      ],
      file: "overriddenDockerfile",
      target: "build",
      updateTriggerToken: "aGVsbG8gd29ybGQ=",
      values: [
        { name: "mytestname", isSecret: false, value: "mytestvalue" },
        { name: "mysecrettestname", isSecret: true, value: "mysecrettestvalue" },
      ],
    },
    taskId: "myTask",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to schedules a new run based on the request parameters and add it to the run queue.
 *
 * @summary schedules a new run based on the request parameters and add it to the run queue.
 * x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun_WithCustomCredentials.json
 */
async function registriesScheduleRunWithCustomCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.scheduleRun("myResourceGroup", "myRegistry", {
    type: "DockerBuildRequest",
    agentConfiguration: { cpu: 2 },
    arguments: [
      { name: "mytestargument", isSecret: false, value: "mytestvalue" },
      { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
    ],
    credentials: {
      customRegistries: {
        "myregistry.azurecr.io": {
          password: { type: "Opaque", value: "***" },
          userName: { type: "Opaque", value: "reg1" },
        },
        "myregistry2.azurecr.io": {
          password: { type: "Opaque", value: "***" },
          userName: { type: "Opaque", value: "reg2" },
        },
      },
      sourceRegistry: { loginMode: "Default" },
    },
    dockerFilePath: "DockerFile",
    imageNames: ["azurerest:testtag"],
    isArchiveEnabled: true,
    isPushEnabled: true,
    noCache: true,
    platform: { architecture: "amd64", os: "Linux" },
    sourceLocation:
      "https://myaccount.blob.core.windows.net/sascontainer/source.zip?sv=2015-04-05&st=2015-04-29T22%3A18%3A26Z&se=2015-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=Z%2FRHIX5Xcg0Mq2rqI3OlWTjEg2tYkboXr1P9ZUXDtkk%3D",
    target: "stage1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to schedules a new run based on the request parameters and add it to the run queue.
 *
 * @summary schedules a new run based on the request parameters and add it to the run queue.
 * x-ms-original-file: 2025-03-01-preview/RegistriesScheduleRun_WithLogTemplate.json
 */
async function registriesScheduleRunWithLogTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new ContainerRegistryTasksManagementClient(credential, subscriptionId);
  const result = await client.registries.scheduleRun("myResourceGroup", "myRegistry", {
    type: "DockerBuildRequest",
    agentConfiguration: { cpu: 2 },
    arguments: [
      { name: "mytestargument", isSecret: false, value: "mytestvalue" },
      { name: "mysecrettestargument", isSecret: true, value: "mysecrettestvalue" },
    ],
    dockerFilePath: "DockerFile",
    imageNames: ["azurerest:testtag"],
    isArchiveEnabled: true,
    isPushEnabled: true,
    logTemplate: "acr/tasks:{{.Run.OS}}",
    noCache: true,
    platform: { architecture: "amd64", os: "Linux" },
    sourceLocation:
      "https://myaccount.blob.core.windows.net/sascontainer/source.zip?sv=2015-04-05&st=2015-04-29T22%3A18%3A26Z&se=2015-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=Z%2FRHIX5Xcg0Mq2rqI3OlWTjEg2tYkboXr1P9ZUXDtkk%3D",
  });
  console.log(result);
}

async function main() {
  await registriesScheduleRun();
  await registriesScheduleRunEncodedTaskRun();
  await registriesScheduleRunFileTaskRun();
  await registriesScheduleRunTaskWithCustomCredentials();
  await registriesScheduleRunTask();
  await registriesScheduleRunWithCustomCredentials();
  await registriesScheduleRunWithLogTemplate();
}

main().catch(console.error);
