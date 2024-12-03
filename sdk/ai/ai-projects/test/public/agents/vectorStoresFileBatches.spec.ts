// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
 
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
 
describe("Agents - vector stores file batches", () => {
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

  it("should create a vector store file batch", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const file1Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file1 = await agents.uploadFile(file1Content, "assistants", "file1.txt");
    console.log(`Uploaded file1, file1 ID: ${file1.id}`);

    const file2Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file2 = await agents.uploadFile(file2Content, "assistants", "file2.txt");
    console.log(`Uploaded file2, file2 ID: ${file2.id}`);

    // Create vector store file batch
    const vectorStoreFileBatch = await agents.createVectorStoreFileBatch(vectorStore.id, {fileIds: [file1.id, file2.id]});
    assert.isNotNull(vectorStoreFileBatch);
    assert.isNotEmpty(vectorStoreFileBatch.id);
    assert.equal(vectorStoreFileBatch.vector_store_id, vectorStore.id);
    console.log(`Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`);

    // Clean up
    await agents.deleteFile(file1.id)
    console.log(`Deleted file1, file1 ID: ${file1.id}`);
    await agents.deleteFile(file2.id)
    console.log(`Deleted file2, file2 ID: ${file2.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should retrieve a vector store file batch", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const file1Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file1 = await agents.uploadFile(file1Content, "assistants", "file1.txt");
    console.log(`Uploaded file1, file1 ID: ${file1.id}`);

    const file2Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file2 = await agents.uploadFile(file2Content, "assistants", "file2.txt");
    console.log(`Uploaded file2, file2 ID: ${file2.id}`);

    // Create vector store file batch
    const vectorStoreFileBatch = await agents.createVectorStoreFileBatch(vectorStore.id, {fileIds: [file1.id, file2.id]});
    console.log(`Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`);

    // Retrieve vector store file batch
    const _vectorStoreFileBatch = await agents.getVectorStoreFileBatch(vectorStore.id, vectorStoreFileBatch.id);
    assert.isNotNull(_vectorStoreFileBatch);
    assert.equal(_vectorStoreFileBatch.id, vectorStoreFileBatch.id);
    console.log(`Retrieved vector store file batch, vector store file batch ID: ${_vectorStoreFileBatch.id}`);

    // Clean up
    await agents.deleteFile(file1.id)
    console.log(`Deleted file1, file1 ID: ${file1.id}`);
    await agents.deleteFile(file2.id)
    console.log(`Deleted file2, file2 ID: ${file2.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should list vector store file batches", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const file1Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file1 = await agents.uploadFile(file1Content, "assistants", "file1.txt");
    console.log(`Uploaded file1, file1 ID: ${file1.id}`);

    const file2Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file2 = await agents.uploadFile(file2Content, "assistants", "file2.txt");
    console.log(`Uploaded file2, file2 ID: ${file2.id}`);

    // Create vector store file batch
    const vectorStoreFileBatch = await agents.createVectorStoreFileBatch(vectorStore.id, {fileIds: [file1.id, file2.id]});
    console.log(`Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`);

    // List vector store files in the batch
    const vectorStoreFiles = await agents.listVectorStoreFileBatchFiles(vectorStore.id, vectorStoreFileBatch.id);
    assert.isNotNull(vectorStoreFiles);
    assert.equal(vectorStoreFiles.data.length, 2);
    console.log(`Listed ${vectorStoreFiles.data.length} vector store files in the batch, vector store file batch ID: ${vectorStoreFileBatch.id}`);

    // Clean up
    await agents.deleteFile(file1.id)
    console.log(`Deleted file1, file1 ID: ${file1.id}`);
    await agents.deleteFile(file2.id)
    console.log(`Deleted file2, file2 ID: ${file2.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should cancel a vector store file batch", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const file1Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file1 = await agents.uploadFile(file1Content, "assistants", "file1.txt");
    console.log(`Uploaded file1, file1 ID: ${file1.id}`);

    const file2Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file2 = await agents.uploadFile(file2Content, "assistants", "file2.txt");
    console.log(`Uploaded file2, file2 ID: ${file2.id}`);

    // Create vector store file batch
    const vectorStoreFileBatch = await agents.createVectorStoreFileBatch(vectorStore.id, {fileIds: [file1.id, file2.id]});
    console.log(`Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`);
  
    // Cancel vector store file batch
    const cancelled = await agents.cancelVectorStoreFileBatch(vectorStore.id, vectorStoreFileBatch.id);
    assert.isNotNull(cancelled.status);

    // Clean up
    await agents.deleteFile(file1.id)
    console.log(`Deleted file1, file1 ID: ${file1.id}`);
    await agents.deleteFile(file2.id)
    console.log(`Deleted file2, file2 ID: ${file2.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create a vector store file batch and poll", async function () {
    // Create vector store
    const vectorStore = await agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const file1Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file1 = await agents.uploadFile(file1Content, "assistants", "file1.txt");
    console.log(`Uploaded file1, file1 ID: ${file1.id}`);

    const file2Content = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      }
    });
    const file2 = await agents.uploadFile(file2Content, "assistants", "file2.txt");
    console.log(`Uploaded file2, file2 ID: ${file2.id}`);

    // Create vector store file batch
    const vectorStoreFileBatch = await agents.createVectorStoreFileBatchAndPoll(vectorStore.id, {fileIds: [file1.id, file2.id]});
    assert.isNotNull(vectorStoreFileBatch);
    assert.isNotEmpty(vectorStoreFileBatch.id);
    assert.equal(vectorStoreFileBatch.vector_store_id, vectorStore.id);
    assert.notEqual(vectorStoreFileBatch.status, "in_progress");
    console.log(`Created vector store file batch with status ${vectorStoreFileBatch.status}, vector store file batch ID: ${vectorStoreFileBatch.id}`);

    // Clean up
    await agents.deleteFile(file1.id)
    console.log(`Deleted file1, file1 ID: ${file1.id}`);
    await agents.deleteFile(file2.id)
    console.log(`Deleted file2, file2 ID: ${file2.id}`);
    await agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

});
