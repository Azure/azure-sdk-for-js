// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AIProjectClient, TelemetryOperations } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("AI Projects - Telemetry", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let telemetry: TelemetryOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    telemetry = projectsClient.telemetry;
  });

  afterEach(async function () {
    await recorder.stop();
  });
  it("client and connection operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(telemetry);
  });

  it("update settings", async function () {
    assert.equal(telemetry.getSettings().enableContentRecording, false);
    telemetry.updateSettings({ enableContentRecording: true });
    assert.equal(telemetry.getSettings().enableContentRecording, true);
    telemetry.updateSettings({ enableContentRecording: false });
    assert.equal(telemetry.getSettings().enableContentRecording, false);
  });

  it("get settings", async function () {
    const options = telemetry.getSettings();
    assert.equal(options.enableContentRecording, false);
    options.enableContentRecording = true;
    assert.equal(telemetry.getSettings().enableContentRecording, false);
  });

  it("get app insights connection string", async function () {
    const workspace = await projectsClient.connections.getWorkspace();
    assert.isNotNull(workspace.properties.applicationInsights);

    const connectionString = await telemetry.getConnectionString(workspace.properties.applicationInsights);
    assert.isNotEmpty(connectionString);
    console.log(`Connection string retrieved ${connectionString}`);
  });
});
