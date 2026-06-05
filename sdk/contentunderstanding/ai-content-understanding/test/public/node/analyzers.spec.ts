// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, testPollingOptions } from "../utils/recordedClient.js";
import { ContentUnderstandingClient } from "../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { EnvVarKeys } from "../../utils/constants.js";

describe("ContentUnderstandingClient - Analyzers", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    // Use CustomDefaultMatcher with excluded headers to allow recordings made with either
    // API key auth (Ocp-Apim-Subscription-Key) or AAD auth (Authorization) to work in playback
    await recorder.setMatcher("CustomDefaultMatcher", {
      excludedHeaders: ["Authorization", "Ocp-Apim-Subscription-Key"],
      ignoredHeaders: ["Content-Length"],
      compareBodies: false,
    });
    const endpoint = assertEnvironmentVariable(EnvVarKeys.ENDPOINT);
    const key = process.env[EnvVarKeys.KEY];
    client = new ContentUnderstandingClient(
      endpoint,
      key ? new AzureKeyCredential(key) : createTestCredential(),
      recorder.configureClientOptions({}),
    );
    // Note: Analyzer IDs cannot contain hyphens
    // Use recorder.variable to ensure consistent IDs between record and playback modes
    // Add random suffix to avoid conflicts when tests run in parallel
    testAnalyzerId = recorder.variable(
      "testAnalyzerId",
      `test_main_analyzer_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 10000)}`,
    );
  });

  afterEach(async () => {
    // Clean up: try to delete test analyzer if it exists
    try {
      await client.deleteAnalyzer(testAnalyzerId);
      console.log(`Cleaned up test analyzer: ${testAnalyzerId}`);
    } catch (error) {
      // Ignore errors during cleanup
    }
    await recorder.stop();
  });

  it("should create an analyzer", async () => {
    const analyzerConfig = {
      baseAnalyzerId: "prebuilt-document",
      description: "Test analyzer for extraction",
      config: {
        returnDetails: true,
      },
      fieldSchema: {
        name: "test_schema",
        description: "Schema for test",
        fields: {
          test_field: {
            type: "string",
            method: "extract",
            description: "Test field",
          },
        },
      },
      models: {
        completion: "gpt-4.1",
      },
    };

    const poller = client.createAnalyzer(testAnalyzerId, analyzerConfig as any, testPollingOptions);

    const result = await poller.pollUntilDone();
    assert.ok(result, "Expected a result from the poller");
    assert.equal(result.analyzerId, testAnalyzerId);
  });

  it("should get an analyzer", async () => {
    // First create an analyzer
    const analyzerConfig = {
      baseAnalyzerId: "prebuilt-document",
      description: "Test analyzer for extraction",
      config: {
        returnDetails: true,
      },
      fieldSchema: {
        name: "test_schema",
        description: "Schema for test",
        fields: {
          test_field: {
            type: "string",
            method: "extract",
            description: "Test field",
          },
        },
      },
      models: {
        completion: "gpt-4.1",
      },
    };

    const createPoller = client.createAnalyzer(
      testAnalyzerId,
      analyzerConfig as any,
      testPollingOptions,
    );

    const result = await createPoller.pollUntilDone();

    // Now get the analyzer
    const getResponse = await client.getAnalyzer(testAnalyzerId);

    assert.equal(getResponse.analyzerId, testAnalyzerId);
    assert.equal(getResponse.baseAnalyzerId, "prebuilt-document");
  });

  it("should update an analyzer", async () => {
    // First create an analyzer
    const analyzerConfig = {
      baseAnalyzerId: "prebuilt-document",
      description: "Test analyzer for extraction",
      config: {
        returnDetails: true,
      },
      fieldSchema: {
        name: "test_schema",
        description: "Schema for test",
        fields: {
          test_field: {
            type: "string",
            method: "extract",
            description: "Test field",
          },
        },
      },
      models: {
        completion: "gpt-4.1",
      },
    };

    const createPoller = client.createAnalyzer(
      testAnalyzerId,
      analyzerConfig as any,
      testPollingOptions,
    );

    await createPoller.pollUntilDone();

    // Update the analyzer with a description
    const updateResponse = await client.updateAnalyzer(testAnalyzerId, {
      baseAnalyzerId: "prebuilt-document",
      description: "Updated test analyzer",
      models: {
        completion: "gpt-4.1",
      },
    } as any);

    assert.equal(updateResponse.description, "Updated test analyzer");
  });

  it("should list analyzers", async () => {
    // First create an analyzer to ensure there's at least one
    const analyzerConfig = {
      baseAnalyzerId: "prebuilt-document",
      description: "Test analyzer for extraction",
      config: {
        returnDetails: true,
      },
      fieldSchema: {
        name: "test_schema",
        description: "Schema for test",
        fields: {
          test_field: {
            type: "string",
            method: "extract",
            description: "Test field",
          },
        },
      },
      models: {
        completion: "gpt-4.1",
      },
    };

    const createPoller = client.createAnalyzer(
      testAnalyzerId,
      analyzerConfig as any,
      testPollingOptions,
    );

    await createPoller.pollUntilDone();

    // List analyzers
    const analyzers = [];
    for await (const analyzer of client.listAnalyzers()) {
      analyzers.push(analyzer);
    }

    assert.ok(analyzers.length > 0, "Expected at least one analyzer");
    const foundAnalyzer = analyzers.find((a) => a.analyzerId === testAnalyzerId);
    assert.ok(foundAnalyzer, `Expected to find analyzer ${testAnalyzerId}`);
  });

  it("should delete an analyzer", async () => {
    // First create an analyzer
    const analyzerConfig = {
      baseAnalyzerId: "prebuilt-document",
      description: "Test analyzer for extraction",
      config: {
        returnDetails: true,
      },
      fieldSchema: {
        name: "test_schema",
        description: "Schema for test",
        fields: {
          test_field: {
            type: "string",
            method: "extract",
            description: "Test field",
          },
        },
      },
      models: {
        completion: "gpt-4.1",
      },
    };

    const createPoller = client.createAnalyzer(
      testAnalyzerId,
      analyzerConfig as any,
      testPollingOptions,
    );

    await createPoller.pollUntilDone();

    // Delete the analyzer
    await client.deleteAnalyzer(testAnalyzerId);

    // Try to get the deleted analyzer - should fail
    try {
      await client.getAnalyzer(testAnalyzerId);
      assert.fail("Expected error when getting deleted analyzer");
    } catch (error) {
      assert.ok(error, "Expected error when getting deleted analyzer");
    }
  });

  it("should handle analyzer not found error", async () => {
    const nonExistentId = "non-existent-analyzer-12345";

    try {
      await client.getAnalyzer(nonExistentId);
      assert.fail("Expected error for non-existent analyzer");
    } catch (error) {
      assert.ok(error, "Expected error for non-existent analyzer");
    }
  });
});
