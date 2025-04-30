// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsClient } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { isNodeLike } from "@azure/core-util";

describe("projectsClient - vector stores files", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and projectsClient operations are accessible", async function () {
    assert.isNotNull(projectsClient);
  });

  it("should create a vector store file", async function () {
    // Create vector store
    const vectorStore = await projectsClient.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = await generateFileStream();
    const file = await projectsClient.uploadFile(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await projectsClient.createVectorStoreFile(vectorStore.id, {
      fileId: file.id,
    });
    assert.isNotNull(vectorStoreFile);
    assert.isNotEmpty(vectorStoreFile.id);
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Clean up
    await projectsClient.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await projectsClient.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);
    await projectsClient.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should retrieve a vector store file", async function () {
    // Create vector store
    const vectorStore = await projectsClient.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = await generateFileStream();
    const file = await projectsClient.uploadFile(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await projectsClient.createVectorStoreFile(vectorStore.id, {
      fileId: file.id,
    });
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Retrieve vector store file
    const _vectorStoreFile = await projectsClient.getVectorStoreFile(
      vectorStore.id,
      vectorStoreFile.id,
    );
    assert.isNotNull(_vectorStoreFile);
    assert.equal(_vectorStoreFile.id, vectorStoreFile.id);
    console.log(`Retrieved vector store file, vector store file ID: ${_vectorStoreFile.id}`);

    // Clean up
    await projectsClient.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await projectsClient.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);
    await projectsClient.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should list vector store files", async function () {
    // Create vector store
    const vectorStore = await projectsClient.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = await generateFileStream();
    const file = await projectsClient.uploadFile(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await projectsClient.createVectorStoreFile(vectorStore.id, {
      fileId: file.id,
    });
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Clean up
    await projectsClient.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await projectsClient.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);
    await projectsClient.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should delete a vector store file", async function () {
    // Create vector store
    const vectorStore = await projectsClient.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = await generateFileStream();
    const file = await projectsClient.uploadFile(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFile = await projectsClient.createVectorStoreFile(vectorStore.id, {
      fileId: file.id,
    });
    console.log(`Created vector store file, vector store file ID: ${vectorStoreFile.id}`);

    // Clean up
    const deletionStatus = await projectsClient.deleteVectorStoreFile(
      vectorStore.id,
      vectorStoreFile.id,
    );
    assert(deletionStatus.deleted);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await projectsClient.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);
    await projectsClient.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create a vector store file and poll (through original method)", async function () {
    // Create vector store
    const vectorStore = await projectsClient.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = await generateFileStream();
    const file = await projectsClient.uploadFile(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file and poll
    const vectorStoreFilePoller = projectsClient.createVectorStoreFileAndPoll(vectorStore.id, {
      fileId: file.id,
    });
    assert.isNotNull(vectorStoreFilePoller);
    const initialState = vectorStoreFilePoller.poll();
    assert.isNotNull(initialState);
    const vectorStoreFile = await vectorStoreFilePoller.pollUntilDone();
    assert.isNotNull(vectorStoreFile);
    assert.isNotEmpty(vectorStoreFile.id);
    assert.notEqual(vectorStoreFile.status, "in_progress");
    console.log(
      `Created vector store file with status ${vectorStoreFile.status}, vector store file ID: ${vectorStoreFile.id}`,
    );

    // Clean up
    await projectsClient.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await projectsClient.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);
    await projectsClient.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create a vector store file and poll (through creation method)", async function () {
    // Create vector store
    const vectorStore = await projectsClient.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload file
    const fileContent = await generateFileStream();
    const file = await projectsClient.uploadFile(fileContent, "assistants", {
      fileName: "filename.txt",
    });
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file and poll
    const vectorStoreFilePoller = projectsClient.createVectorStoreFileAndPoll(vectorStore.id, {
      fileId: file.id,
    });
    assert.isNotNull(vectorStoreFilePoller);
    const initialState = vectorStoreFilePoller.poll();
    assert.isNotNull(initialState);
    const vectorStoreFile = await vectorStoreFilePoller.pollUntilDone();
    assert.isNotNull(vectorStoreFile);
    assert.isNotEmpty(vectorStoreFile.id);
    assert.notEqual(vectorStoreFile.status, "in_progress");
    console.log(
      `Created vector store file with status ${vectorStoreFile.status}, vector store file ID: ${vectorStoreFile.id}`,
    );

    // Clean up
    await projectsClient.deleteVectorStoreFile(vectorStore.id, vectorStoreFile.id);
    console.log(`Deleted vector store file, vector store file ID: ${vectorStoreFile.id}`);
    await projectsClient.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);
    await projectsClient.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });
});

async function generateFileStream(): Promise<ReadableStream | NodeJS.ReadableStream> {
  if (isNodeLike) {
    const stream = await import("stream");
    return stream.Readable.from("fileContent");
  } else {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
  }
}
