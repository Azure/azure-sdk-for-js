// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AgentsClient } from "@azure/ai-agents";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

describe("projectsClient - vector stores", () => {
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

  it("should create vector store", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    assert.isNotNull(vectorStore);
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Delete vector store
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should delete vector store", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Delete vector store
    const deletionStatus = await projectsClient.vectorStores.delete(vectorStore.id);
    assert.isTrue(deletionStatus.deleted);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("get vector store", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Retrieve vector store
    const _vectorStore = await projectsClient.vectorStores.get(vectorStore.id);
    assert.equal(_vectorStore.id, vectorStore.id);
    console.log(`Retrieved vector store, vector store ID: ${_vectorStore.id}`);

    // Delete vector store
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("list vector stores", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // List vector stores
    const vectorStores = await projectsClient.vectorStores.list();
    assert.isNotNull(vectorStores);

    // Collect all items from the PagedAsyncIterableIterator
    const vectorStoreItems = [];
    for await (const item of vectorStores) {
      vectorStoreItems.push(item);
    }

    assert.isAtLeast(vectorStoreItems.length, 1);
    console.log(`Listed ${vectorStoreItems.length} vector stores`);

    // Delete vector store
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("modify vector store", async function () {
    // Create vector store
    const vectorStore = await projectsClient.vectorStores.create();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Modify vector store
    const updatedVectorStore = await projectsClient.vectorStores.update(vectorStore.id, {
      name: "updated",
    });
    assert.equal(updatedVectorStore.id, vectorStore.id);
    assert.equal(updatedVectorStore.name, "updated");
    console.log(
      `Updated vector store name to ${updatedVectorStore.name}, vector store ID: ${updatedVectorStore.id}`,
    );

    // Delete vector store
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create vector store and poll (through original method)", async function () {
    // Create vector store
    const vectorStorePoller = projectsClient.vectorStores.createAndPoll();
    const initialState = vectorStorePoller.poll();
    assert.isNotNull(initialState);
    const vectorStore = await vectorStorePoller.pollUntilDone();
    assert.isNotNull(vectorStore);
    assert.notEqual(vectorStore.status, "in_progress");
    console.log(
      `Created vector store with status ${vectorStore.status}, vector store ID: ${vectorStore.id}`,
    );

    // Delete vector store
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });

  it("should create vector store and poll (through creation method)", async function () {
    // Create vector store
    const vectorStorePoller = projectsClient.vectorStores.createAndPoll({
      pollingOptions: { intervalInMs: 2000 },
    });
    const initialState = vectorStorePoller.poll();
    assert.isNotNull(initialState);
    const vectorStore = await vectorStorePoller.pollUntilDone();
    assert.isNotNull(vectorStore);
    assert.notEqual(vectorStore.status, "in_progress");
    console.log(
      `Created vector store with status ${vectorStore.status}, vector store ID: ${vectorStore.id}`,
    );

    // Delete vector store
    await projectsClient.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
  });
});
