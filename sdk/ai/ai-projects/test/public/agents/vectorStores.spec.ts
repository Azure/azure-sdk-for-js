// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
 
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
 
describe("Agents - vector stores", () => {
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

  it("should create vector store", async function () {
    const vectorStore = await agents.createVectorStore();
    assert.isNotNull(vectorStore);
    await agents.deleteVectorStore(vectorStore.id)
  });

  it("should delete vector store", async function () {
    const vectorStore = await agents.createVectorStore();
    const deletionStatus = await agents.deleteVectorStore(vectorStore.id);
    assert.isTrue(deletionStatus.deleted);
  });

  it("get vector store", async function () {
    const vectorStore = await agents.createVectorStore();
    const _vectorStore = await agents.getVectorStore(vectorStore.id);
    assert.equal(_vectorStore.id, vectorStore.id);
    await agents.deleteVectorStore(vectorStore.id);
  });

  it("list vector stores", async function () {
    const vectorStore = await agents.createVectorStore();
    const vectorStores = await agents.listVectorStores();
    assert.isNotNull(vectorStores);
    assert.isTrue(vectorStores.data.length > 1);
    await agents.deleteVectorStore(vectorStore.id);
  });

  it("modify vector store", async function () {
    const vectorStore = await agents.createVectorStore();
    const updatedVectorStore = await agents.modifyVectorStore(vectorStore.id, { name: "updated" });
    assert.equal(updatedVectorStore.id, vectorStore.id);
    assert.equal(updatedVectorStore.name, "updated");
    await agents.deleteVectorStore(vectorStore.id);
  });

});
