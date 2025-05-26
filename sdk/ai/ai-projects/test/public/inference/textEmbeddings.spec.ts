// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import { isUnexpected } from "@azure-rest/ai-inference";

describe("inference - textEmbeddings", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let deploymentName: string;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);

    // Get deployment name from environment variable or use a default for recording
    deploymentName = process.env["EMBEDDING_DEPLOYMENT_NAME"] || "embedding-ada";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and text embedding operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(projectsClient.inference);

    const client = projectsClient.inference.embeddings(
      recorder.configureClientOptions({
        apiVersion: "2024-05-01-preview",
      }),
    );
    assert.isNotNull(client);
  });

  it("should get text embeddings for multiple phrases", async function () {
    const client = projectsClient.inference.embeddings(
      recorder.configureClientOptions({
        apiVersion: "2024-05-01-preview",
      }),
    );

    // Test input phrases
    const testPhrases = ["first phrase", "second phrase", "third phrase"];

    // Get the text embeddings
    const response = await client.post({
      body: {
        model: deploymentName,
        input: testPhrases,
      },
    });

    assert.isNotNull(response);
    if (isUnexpected(response)) {
      throw new Error(`Text embedding failed with status ${response.status}`);
    }

    // Verify the response structure
    assert.isNotNull(response.body);
    assert.isNotNull(response.body.data);

    // Verify we got embedding vectors for each input phrase
    assert.equal(response.body.data.length, testPhrases.length);

    if (response.body.data) {
      // Check if the response is an array of EmbeddingItemOutput
      assert.isTrue(Array.isArray(response.body.data));
      const data = response.body.data;
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        assert.isNotNull(item);
        assert.isNotNull(item.embedding);

        // Verify embedding is an array of numbers
        const embedding = item.embedding;
        assert.isTrue(Array.isArray(embedding));
        assert.isTrue(embedding.length > 0);
        assert.isNumber(embedding[0]);
      }
    }
  });
});
