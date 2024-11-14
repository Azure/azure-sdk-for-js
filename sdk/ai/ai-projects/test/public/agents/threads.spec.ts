// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
 
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
 
describe("Agents - threads", () => {
  let recorder: Recorder;
  let projectsClient : AIProjectsClient;
  let agents: AgentsOperations

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents
  });

  afterEach(async function () {
     await recorder.stop();
  });

  it("client and agents operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(agents);
  });

  it("should create thread", async function () {  
    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);

    // Delete thread
    agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should retrieve thread", async function () {
    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Retrieve thread
    const _thread = await agents.getThread(thread.id);
    assert.isNotEmpty(_thread);
    assert.equal(_thread.id, thread.id);
    console.log(`Retrieved thread, thread ID: ${_thread.id}`);

    // Delete thread
    agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should update thread", async function () {  
    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Update thread
    await agents.updateThread(thread.id, { metadata: {"key": "value"} });
    const _thread = await agents.getThread(thread.id);
    assert.equal(_thread.id, thread.id);
    assert.isNotEmpty(_thread.metadata);
    assert.equal(_thread.metadata?.key, "value");
    console.log(`Updated thread to have metadata "key":"${_thread.metadata?.key}", thread ID: ${_thread.id}`);

    // Delete thread
    agents.deleteThread(thread.id);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

  it("should delete thread", async function () {
    // Create thread
    const thread = await agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    // Delete thread
    const deleted = await agents.deleteThread(thread.id);
    assert.isNotNull(deleted);
    console.log(`Deleted thread, thread ID: ${thread.id}`);
  });

});
