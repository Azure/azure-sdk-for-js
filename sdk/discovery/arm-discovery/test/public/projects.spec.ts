// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import type { Project, ProjectUpdate } from "../../src/index.js";
import { DiscoveryClient } from "../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";

const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

const WORKSPACE_NAME = "itworkaasdg";
const RESOURCE_GROUP_NAME = "aaooa";
const PROJECT_NAME = "testproject4";

describe("Discovery ARM Client - Projects", () => {
  let recorder: Recorder;
  let client: DiscoveryClient;
  let subscriptionId: string;
  let resourceGroupName: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    const credential = createTestCredential();
    client = new DiscoveryClient(credential, subscriptionId, recorder.configureClientOptions({}));
    resourceGroupName = RESOURCE_GROUP_NAME || env.DISCOVERY_RESOURCE_GROUP;
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it("should list projects by workspace", async () => {
    const projects: any[] = [];
    for await (const project of client.projects.listByWorkspace(
      resourceGroupName,
      WORKSPACE_NAME,
    )) {
      projects.push(project);
    }
    assert.isArray(projects);
  });

  it("should get a project", async () => {
    const project = await client.projects.get(resourceGroupName, WORKSPACE_NAME, PROJECT_NAME);
    assert.isDefined(project);
    assert.isDefined(project.name);
    assert.isDefined(project.location);
  });

  it("should create a project", async () => {
    const projectData: Project = {
      location: "uksouth",
      properties: {
        storageContainerIds: [
          `/subscriptions/${subscriptionId}/resourceGroups/aaooa/providers/Microsoft.Discovery/storageContainers/itsconaasdg`,
        ],
      },
    };
    const poller = client.projects.createOrUpdate(
      resourceGroupName,
      WORKSPACE_NAME,
      PROJECT_NAME,
      projectData,
      testPollingOptions,
    );
    const project = await poller.pollUntilDone();
    assert.isDefined(project);
  });

  // Skipped: no recording available
  it.skip("should update a project", async () => {
    const updateData: ProjectUpdate = { tags: { SkipAutoDeleteTill: "2026-12-31" } };
    const poller = client.projects.update(
      resourceGroupName,
      WORKSPACE_NAME,
      PROJECT_NAME,
      updateData,
      testPollingOptions,
    );
    const project = await poller.pollUntilDone();
    assert.isDefined(project);
  });

  it("should delete a project", async () => {
    const poller = client.projects.delete(
      resourceGroupName,
      WORKSPACE_NAME,
      PROJECT_NAME,
      testPollingOptions,
    );
    await poller.pollUntilDone();
  });
});
