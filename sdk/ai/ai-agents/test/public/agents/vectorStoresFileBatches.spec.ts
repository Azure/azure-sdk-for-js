// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsClient } from "@azure/ai-agents";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { isNodeLike } from "@azure/core-util";

describe("projectsClient - vector stores file batches", () => {
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

  it("should create a vector store file batch", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const fileContent1 = await generateFileStream();
    const file1 = await projectsClient.files.upload(fileContent1, "assistants", {
      fileName: "filename.txt",
    });
    const fileContent2 = await generateFileStream();
    const file2 = await projectsClient.files.upload(fileContent2, "assistants", {
      fileName: "filename.txt",
    });

    // Create vector store file batch
    const vectorStoreFileBatch = await projectsClient.vectorStoreFileBatches.create(
      vectorStore.id,
      {
        fileIds: [file1.id, file2.id],
      },
    );
    assert.isNotNull(vectorStoreFileBatch);
    assert.isNotEmpty(vectorStoreFileBatch.id);
    assert.equal(vectorStoreFileBatch.vectorStoreId, vectorStore.id);
    console.log(
      `Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`,
    );

    // Clean up
    await projectsClient.files.delete(file1.id);
    console.log(`Deleted file, file ID: ${file1.id}`);
    await projectsClient.files.delete(file2.id);
    console.log(`Deleted file, file ID: ${file2.id}`);
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should retrieve a vector store file batch", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const fileContent1 = await generateFileStream();
    const file1 = await projectsClient.files.upload(fileContent1, "assistants", {
      fileName: "filename.txt",
    });
    const fileContent2 = await generateFileStream();
    const file2 = await projectsClient.files.upload(fileContent2, "assistants", {
      fileName: "filename.txt",
    });

    // Create vector store file batch
    const vectorStoreFileBatch = await projectsClient.vectorStoreFileBatches.create(
      vectorStore.id,
      {
        fileIds: [file1.id, file2.id],
      },
    );
    console.log(
      `Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`,
    );

    // Retrieve vector store file batch
    const _vectorStoreFileBatch = await projectsClient.vectorStoreFileBatches.get(
      vectorStore.id,
      vectorStoreFileBatch.id,
    );
    assert.isNotNull(_vectorStoreFileBatch);
    assert.equal(_vectorStoreFileBatch.id, vectorStoreFileBatch.id);
    console.log(
      `Retrieved vector store file batch, vector store file batch ID: ${_vectorStoreFileBatch.id}`,
    );

    // Clean up
    await projectsClient.files.delete(file1.id);
    console.log(`Deleted file, file ID: ${file1.id}`);
    await projectsClient.files.delete(file2.id);
    console.log(`Deleted file, file ID: ${file2.id}`);
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should list vector store file batches", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const fileContent1 = await generateFileStream();
    const file1 = await projectsClient.files.upload(fileContent1, "assistants", {
      fileName: "filename.txt",
    });
    const fileContent2 = await generateFileStream();
    const file2 = await projectsClient.files.upload(fileContent2, "assistants", {
      fileName: "filename.txt",
    });

    // Create vector store file batch
    const vectorStoreFileBatch = await projectsClient.vectorStoreFileBatches.create(
      vectorStore.id,
      {
        fileIds: [file1.id, file2.id],
      },
    );
    console.log(
      `Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`,
    );

    // List vector store files in the batch
    const vectorStoreFiles = projectsClient.vectorStoreFileBatches.list(
      vectorStore.id,
      vectorStoreFileBatch.id,
    );
    assert.isNotNull(vectorStoreFiles);

    // Collect items from the PagedAsyncIterableIterator
    const vectorStoreFilesList = [];
    for await (const file of vectorStoreFiles) {
      vectorStoreFilesList.push(file);
    }
    assert.equal(vectorStoreFilesList.length, 2);
    console.log(
      `Listed ${vectorStoreFilesList.length} vector store files in the batch, vector store file batch ID: ${vectorStoreFileBatch.id}`,
    );

    // Clean up
    await projectsClient.files.delete(file1.id);
    console.log(`Deleted file, file ID: ${file1.id}`);
    await projectsClient.files.delete(file2.id);
    console.log(`Deleted file, file ID: ${file2.id}`);
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should cancel a vector store file batch", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const fileContent1 = await generateFileStream();
    const file1 = await projectsClient.files.upload(fileContent1, "assistants", {
      fileName: "filename.txt",
    });
    const fileContent2 = await generateFileStream();
    const file2 = await projectsClient.files.upload(fileContent2, "assistants", {
      fileName: "filename.txt",
    });

    // Create vector store file batch
    const vectorStoreFileBatch = await projectsClient.vectorStoreFileBatches.create(
      vectorStore.id,
      {
        fileIds: [file1.id, file2.id],
      },
    );
    console.log(
      `Created vector store file batch, vector store file batch ID: ${vectorStoreFileBatch.id}`,
    );

    // Cancel vector store file batch
    const cancelled = await projectsClient.vectorStoreFileBatches.cancel(
      vectorStore.id,
      vectorStoreFileBatch.id,
    );
    assert.isNotNull(cancelled.status);

    // Clean up
    await projectsClient.files.delete(file1.id);
    console.log(`Deleted file, file ID: ${file1.id}`);
    await projectsClient.files.delete(file2.id);
    console.log(`Deleted file, file ID: ${file2.id}`);
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create a vector store file batch and poll (through original method)", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const fileContent1 = await generateFileStream();
    const file1 = await projectsClient.files.upload(fileContent1, "assistants", {
      fileName: "filename.txt",
    });
    const fileContent2 = await generateFileStream();
    const file2 = await projectsClient.files.upload(fileContent2, "assistants", {
      fileName: "filename.txt",
    });

    // Create vector store file batch
    const vectorStoreFileBatchPoller = projectsClient.vectorStoreFileBatches.createAndPoll(
      vectorStore.id,
      {
        fileIds: [file1.id, file2.id],
      },
    );
    assert.isNotNull(vectorStoreFileBatchPoller);
    const initialState = vectorStoreFileBatchPoller.poll();
    assert.isNotNull(initialState);
    const vectorStoreFileBatch = await vectorStoreFileBatchPoller.pollUntilDone();
    assert.isNotNull(vectorStoreFileBatch);
    assert.isNotEmpty(vectorStoreFileBatch.id);
    assert.equal(vectorStoreFileBatch.vectorStoreId, vectorStore.id);
    assert.notEqual(vectorStoreFileBatch.status, "in_progress");
    console.log(
      `Created vector store file batch with status ${vectorStoreFileBatch.status}, vector store file batch ID: ${vectorStoreFileBatch.id}`,
    );

    // Clean up
    await projectsClient.files.delete(file1.id);
    console.log(`Deleted file, file ID: ${file1.id}`);
    await projectsClient.files.delete(file2.id);
    console.log(`Deleted file, file ID: ${file2.id}`);
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create a vector store file batch and poll (through creation method)", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Upload files
    const fileContent1 = await generateFileStream();
    const file1 = await projectsClient.files.upload(fileContent1, "assistants", {
      fileName: "filename.txt",
    });
    const fileContent2 = await generateFileStream();
    const file2 = await projectsClient.files.upload(fileContent2, "assistants", {
      fileName: "filename.txt",
    });

    // Create vector store file batch
    const vectorStoreFileBatchPoller = projectsClient.vectorStoreFileBatches.createAndPoll(
      vectorStore.id,
      {
        fileIds: [file1.id, file2.id],
      },
    );
    assert.isNotNull(vectorStoreFileBatchPoller);
    const initialState = vectorStoreFileBatchPoller.poll();
    assert.isNotNull(initialState);
    const vectorStoreFileBatch = await vectorStoreFileBatchPoller.pollUntilDone();
    assert.isNotEmpty(vectorStoreFileBatch.id);
    assert.equal(vectorStoreFileBatch.vectorStoreId, vectorStore.id);
    assert.notEqual(vectorStoreFileBatch.status, "in_progress");
    console.log(
      `Created vector store file batch with status ${vectorStoreFileBatch.status}, vector store file batch ID: ${vectorStoreFileBatch.id}`,
    );

    // Clean up
    await projectsClient.files.delete(file1.id);
    console.log(`Deleted file, file ID: ${file1.id}`);
    await projectsClient.files.delete(file2.id);
    console.log(`Deleted file, file ID: ${file2.id}`);
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });
});

async function generateFileStream(): Promise<ReadableStream<Uint8Array> | NodeJS.ReadableStream> {
  if (isNodeLike) {
    const stream = await import("stream");
    // Create a new stream instance each time to prevent "locked" errors
    return stream.Readable.from(Buffer.from("fileContent"));
  } else {
    return new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("fileContent"));
        controller.close();
      },
    });
  }
}
