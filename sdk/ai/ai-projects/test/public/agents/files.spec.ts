// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
 
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
 
describe("Agents - files", () => {
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

  it("should list files", async function () {
    const files = await agents.listFiles();
    assert.isNotEmpty(files);
  });

  it("should upload file", async function () {
    const file = await agents.uploadFile({file: "file"});
    assert.isNotEmpty(file);
  });

  it("should delete file", async function () {
    const file = await agents.uploadFile({file: "file"});
    const deleted = await agents.deleteFile(file.id);
    assert.isNotNull(deleted);
  });
  
  it("should retrieve file", async function () {
    const file = await agents.uploadFile({file: "file"});
    const _file = await agents.getFile(file.id);
    assert.isNotEmpty(_file);
    assert.equal(_file.id, file.id)
    await agents.deleteFile(file.id);
  });

  it("should retrieve file content", async function () {
    const file = await agents.uploadFile({file: "file"});
    const content = await agents.getFileContent(file.id);
    assert.isNotEmpty(content);
  });

});
