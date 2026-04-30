import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { ContainerRegistryTasksManagementClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "88888888-8888-8888-8888-888888888888",
  RESOURCE_GROUP: "myjstest",
  REGISTRY_NAME: "myregistryxxx",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("ContainerRegistryTasks test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: ContainerRegistryTasksManagementClient;
  let location: string;
  let resourceGroup: string;
  let registryName: string;
  let taskName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    // This is an example of how the environment variables are used
    subscriptionId = env.SUBSCRIPTION_ID || "";
    resourceGroup = env.RESOURCE_GROUP || "myjstest";
    registryName = env.REGISTRY_NAME || "myregistryxxx";
    const credential = createTestCredential();
    client = new ContainerRegistryTasksManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "eastus";
    taskName = "mytaskxxx";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("tasks create test", async () => {
    const res = await client.tasks.create(resourceGroup, registryName, taskName, {
      location: location,
      tags: {
        testkey: "value",
      },
      properties: {
        status: "Enabled",
        platform: {
          os: "Linux",
          architecture: "amd64",
        },
        agentConfiguration: {
          cpu: 2,
        },
        step: {
          type: "Docker",
          contextPath: "https://github.com/SteveLasker/node-helloworld",
          imageNames: ["testtask:v1"],
          dockerFilePath: "DockerFile",
          isPushEnabled: true,
          noCache: false,
        },
        trigger: {
          baseImageTrigger: {
            name: "myBaseImageTrigger",
            baseImageTriggerType: "Runtime",
            updateTriggerPayloadType: "Default",
            status: "Enabled",
          },
        },
      },
    });
    assert.equal(res.name, taskName);
  });

  it("tasks get test", async () => {
    const res = await client.tasks.get(resourceGroup, registryName, taskName);
    assert.equal(res.name, taskName);
  });

  it("tasks list test", async () => {
    const resArray = new Array();
    for await (const item of client.tasks.list(resourceGroup, registryName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("tasks update test", async () => {
    const res = await client.tasks.update(resourceGroup, registryName, taskName, {
      tags: {
        testkey: "updatedvalue",
      },
      status: "Enabled",
      platform: {
        os: "Linux",
        architecture: "amd64",
      },
      agentConfiguration: {
        cpu: 2,
      },
      step: {
        type: "Docker",
        contextPath: "https://github.com/SteveLasker/node-helloworld",
        imageNames: ["testtask:v1"],
        dockerFilePath: "DockerFile",
        isPushEnabled: true,
        noCache: false,
      },
      trigger: {
        baseImageTrigger: {
          name: "myBaseImageTrigger",
          baseImageTriggerType: "Runtime",
          updateTriggerPayloadType: "Default",
          status: "Enabled",
        },
      },
    });
    assert.equal(res.type, "Microsoft.ContainerRegistry/registries/tasks");
  });

  it("tasks delete test", async () => {
    await client.tasks.delete(resourceGroup, registryName, taskName);
    const resArray = new Array();
    for await (const item of client.tasks.list(resourceGroup, registryName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
