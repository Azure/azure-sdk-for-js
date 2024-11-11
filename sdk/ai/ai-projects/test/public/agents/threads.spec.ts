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
    const thread = await agents.createThread()
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    agents.deleteThread(thread.id);
  });
 
  it("should retrieve thread", async function () {
    const thread = await agents.createThread()
    const _thread = await agents.getThread(thread.id);
    agents.deleteThread(thread.id);
    assert.isNotEmpty(_thread);
    assert.equal(_thread.id, thread.id)
  });

  it("should update thread", async function () {  
    const thread = await agents.createThread()
    await agents.updateThread(thread.id, { metadata: {"key": "value"} });
    const _thread = await agents.getThread(thread.id);
    assert.equal(_thread.id, thread.id);
    assert.isNotEmpty(_thread.metadata);
    assert.equal(_thread.metadata?.key, "value");
  });
 
  it("should delete thread", async function () {
    const thread = await agents.createThread()
    const deleted = await agents.deleteThread(thread.id);
    assert.isNotNull(deleted);
  });

});
