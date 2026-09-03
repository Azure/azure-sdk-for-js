// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import type { AzureAISearchIndex } from "../../../src/index.js";

describe("indexes - basic operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create, get, list, and delete an index", async function () {
    const azureAIIndexName = assertEnvironmentVariable("AI_SEARCH_INDEX_NAME");
    const azureAIIndexVersion = assertEnvironmentVariable("AI_SEARCH_INDEX_VERSION");
    const azureAIConnectionName = assertEnvironmentVariable("AI_SEARCH_CONNECTION_NAME");

    const name = "my-azure-search-index";
    const azureAIConnectionConfig: AzureAISearchIndex = {
      name,
      type: "AzureSearch",
      version: azureAIIndexVersion,
      indexName: azureAIIndexName,
      connectionName: azureAIConnectionName,
    };

    // Create a new index
    const newIndex = await projectsClient.indexes.createOrUpdate(
      name,
      "1.0",
      azureAIConnectionConfig,
    );
    assert.isNotNull(newIndex);
    assert.equal(newIndex.name, name);
    console.log(`Created index: ${JSON.stringify(newIndex)}`);

    // Get the index by name and version
    const index = await projectsClient.indexes.get(name, newIndex.version);
    assert.isNotNull(index);
    assert.equal(index.name, name);
    console.log(`Retrieved index version: ${index.version}`);

    // List all versions of the index
    const indexVersions = [];
    for await (const indexVersion of projectsClient.indexes.listVersions(name)) {
      indexVersions.push(indexVersion);
    }
    assert.isTrue(indexVersions.length >= 1);
    console.log(`Found ${indexVersions.length} version(s)`);

    // List all indexes
    const allIndexes = [];
    for await (const i of projectsClient.indexes.list()) {
      allIndexes.push(i);
    }
    assert.isTrue(allIndexes.length >= 1);
    console.log(`Found ${allIndexes.length} total index(es)`);

    // Clean up
    await projectsClient.indexes.delete(name, newIndex.version);
    console.log("Index deleted");
  });
});
