// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder } from "../utils/recordedClient.js";
import { ContentUnderstandingClient } from "../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { EnvVarKeys } from "../../utils/constants.js";
import fs from "node:fs";
import { getSampleFilePath } from "./samples/sampleTestUtils.js";

describe("ContentUnderstandingClient - Analysis", () => {
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
    testAnalyzerId = "prebuilt-documentSearch";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze a PDF file from binary", async () => {
    const filePath = getSampleFilePath("sample_invoice.pdf");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }

    const pdfBytes = fs.readFileSync(filePath);

    // Use the analyzeBinary method from the SDK
    const poller = client.analyzeBinary(testAnalyzerId, pdfBytes);

    const analyzeResult = await poller.pollUntilDone();
    const operationId = poller.operationId!;
    assert.ok(operationId, "Poller should have operationId");
    assert.ok(analyzeResult, "Expected analyzeResult in response");

    const contents = analyzeResult?.contents;
    assert.ok(contents && contents.length > 0, "Expected contents in analyzeResult");
  });

  it("should analyze a document from URL", async () => {
    // Using a public PDF URL for testing
    const testUrl =
      "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf";

    const poller = client.analyze(testAnalyzerId, [{ url: testUrl }]);

    const analyzeResult = await poller.pollUntilDone();
    const operationId = poller.operationId!;
    assert.ok(operationId, "Poller should have operationId");
    assert.ok(analyzeResult, "Expected analyzeResult in response");

    const contents = analyzeResult?.contents;
    assert.ok(contents && contents.length > 0, "Expected contents in analyzeResult");
  });

  it("should analyze with markdown output", async () => {
    const testUrl =
      "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf";

    const poller = client.analyze(testAnalyzerId, [{ url: testUrl }]);

    const analyzeResult = await poller.pollUntilDone();
    const operationId = poller.operationId!;
    assert.ok(operationId, "Poller should have operationId");
    assert.ok(analyzeResult, "Expected analyzeResult in response");

    const contents = analyzeResult?.contents;
    assert.ok(contents && contents.length > 0, "Expected contents in analyzeResult");

    // Check if markdown is present in the result
    const firstContent = contents[0];
    if (firstContent.kind === "document") {
      // Markdown should be present in the document content
      assert.isDefined(firstContent.markdown);
    }
  });

  it("should handle analysis error for invalid URL", async () => {
    const invalidUrl = "https://invalid-url-that-does-not-exist.com/nonexistent.pdf";

    // The error should occur during polling
    try {
      const poller = client.analyze(testAnalyzerId, [{ url: invalidUrl }]);
      await poller.pollUntilDone();
      // If we get here without error, the operation should have failed
      assert.fail("Expected error for invalid URL");
    } catch (error) {
      assert.ok(error, "Expected error for invalid URL");
    }
  });
});
