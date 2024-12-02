// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
 
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
 
describe("Agents - vector stores files", () => {
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

  it("should create a vector store file", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file = await agents.uploadFile(fileContent, "assistants", "filename.txt");
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await agents.createVectorStoreFile(vectorStore.id, {fileId: file.id});
    assert.isNotNull(vectorStoreFile);
    assert.isNotEmpty(vectorStoreFile.id);
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Clean up
    await agents.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await agents.deleteFile(file.id)
    console.log(`Deleted file, file ID: ${file.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should retrieve a vector store file", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file = await agents.uploadFile(fileContent, "assistants", "filename.txt");
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await agents.createVectorStoreFile(vectorStore.id, {fileId: file.id});
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Retrieve vector store file
    const _vectorStoreFile = await agents.getVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    assert.isNotNull(_vectorStoreFile);
    assert.equal(_vectorStoreFile.id, vectorStoreFile.id);
    console.log(`Retrieved vector store file, vector store file ID: ${_vectorStoreFile.id}`);

    // Clean up
    await agents.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await agents.deleteFile(file.id)
    console.log(`Deleted file, file ID: ${file.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should list vector store files", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file = await agents.uploadFile(fileContent, "assistants", "filename.txt");
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await agents.createVectorStoreFile(vectorStore.id, {fileId: file.id});
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Clean up
    await agents.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await agents.deleteFile(file.id)
    console.log(`Deleted file, file ID: ${file.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should delete a vector store file", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file = await agents.uploadFile(fileContent, "assistants", "fileName.txt");
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await agents.createVectorStoreFile(vectorStore.id, {fileId: file.id});
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Clean up
    const deletionStatus = await agents.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    assert(deletionStatus.deleted)
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await agents.deleteFile(file.id)
    console.log(`Deleted file, file ID: ${file.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create a vector store file and poll.", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file = await agents.uploadFile(fileContent, "assistants", "filename.txt");
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file and poll
    const vectorStoreFile = await agents.createVectorStoreFileAndPoll(vectorStore.id, {fileId: file.id});
    assert.isNotNull(vectorStoreFile);
    assert.isNotEmpty(vectorStoreFile.id);
    assert.notEqual(vectorStoreFile.status, "in_progress");
    console.log(`Created vector store file with status ${vectorStoreFile.status}, vector store file ID: ${vectorStoreFile.id}`);

    // Clean up
    await agents.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await agents.deleteFile(file.id)
    console.log(`Deleted file, file ID: ${file.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

});
