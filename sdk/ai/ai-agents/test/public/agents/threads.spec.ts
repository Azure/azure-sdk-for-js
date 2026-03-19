// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("projectsClient - threads", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and agents operations are accessible", async function () {
    assert.isNotNull(projectsClient);
  });

  it("should create thread", async function () {
    // Create thread
    const thread = await projectsClient.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);

    // Delete thread
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should retrieve thread", async function () {
    // Create thread
    const thread = await projectsClient.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Retrieve thread
    const _thread = await projectsClient.threads.get(thread.id);
    assert.isNotEmpty(_thread);
    assert.equal(_thread.id, thread.id);
    console.log(`Retrieved thread, thread ID: ${_thread.id}`);

    // Delete thread
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should update thread", async function () {
    // Create thread
    const thread = await projectsClient.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Update thread
    await projectsClient.threads.update(thread.id, { metadata: { key: "value" } });
    const _thread = await projectsClient.threads.get(thread.id);
    assert.equal(_thread.id, thread.id);
    assert.isNotEmpty(_thread.metadata);
    assert.equal(_thread.metadata?.key, "value");
    console.log(
      `Updated thread to have metadata "key":"${_thread.metadata?.key}", thread ID: ${_thread.id}`,
    );

    // Delete thread
    await projectsClient.threads.delete(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should delete thread", async function () {
    // Create thread
    const thread = await projectsClient.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Delete thread
    const deleted = await projectsClient.threads.delete(thread.id);
    assert.isNotNull(deleted);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });
});
