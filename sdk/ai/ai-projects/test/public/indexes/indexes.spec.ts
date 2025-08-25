// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type {
  AIProjectClient,
  IndexesOperations,
  AzureAISearchIndex,
  IndexUnion,
} from "@azure/ai-projects";

describe("indexes - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let indexes: IndexesOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    indexes = projectsClient.indexes;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and indexes operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(indexes);
  });

  it("should create, get, list versions", async function () {
    const indexName = `azure-search-index-test`;
    const indexVersion = "1.2";

    // Mock Azure AI Search configuration
    const azureAIConnectionConfig: AzureAISearchIndex = {
      name: indexName,
      type: "AzureSearch",
      version: indexVersion,
      indexName: "test-index-name",
      connectionName: "test-connection-name",
    };

    // Create a new Index
    const newIndex = await indexes.createOrUpdate(indexName, indexVersion, azureAIConnectionConfig);
    assert.isNotNull(newIndex);
    assert.equal(newIndex.name, indexName);
    assert.equal(newIndex.version, indexVersion);

    // Get the existing Index by name and version
    const retrievedIndex = await indexes.get(indexName, newIndex.version);
    assert.isNotNull(retrievedIndex);
    assert.equal(retrievedIndex.name, indexName);
    assert.equal(retrievedIndex.version, indexVersion);

    // List all indexes
    const allIndexesIterator = indexes.list();
    const indexesList: IndexUnion[] = [];
    for await (const index of allIndexesIterator) {
      indexesList.push(index);
    }
    assert.isNotNull(indexesList);
    assert.isAtLeast(indexesList.length, 1);

    // List all versions of the Index
    const indexVersionsIterator = indexes.listVersions(indexName);
    const versionsList: IndexUnion[] = [];
    for await (const versionItem of indexVersionsIterator) {
      versionsList.push(versionItem);
    }

    assert.isNotNull(versionsList);
    assert.isArray(versionsList);
    assert.isAtLeast(versionsList.length, 1);

    // Verify our created index is in the versions list
    const foundVersion = versionsList.find(
      (v) => v.name === indexName && v.version === indexVersion,
    );
    assert.isNotNull(foundVersion);
  });
});
