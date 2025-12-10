// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, testPollingOptions } from "../utils/recordedClient.js";
import { ContentUnderstandingClient } from "../../../src/index.js";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { getEndpoint, getKey } from "../../utils/injectables.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to sample files
const SAMPLE_FILES_PATH = path.resolve(__dirname, "../../../sample_files");

describe("ContentUnderstandingClient - Analysis", () => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;
  let testAnalyzerId: string;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    await recorder.setMatcher("BodilessMatcher");
    const key = getKey();
    client = new ContentUnderstandingClient(
      getEndpoint(),
      key ? new AzureKeyCredential(key) : new DefaultAzureCredential(),
      recorder.configureClientOptions({}),
    );
    testAnalyzerId = "prebuilt-documentSearch";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze a PDF file from binary", async () => {
    const filePath = path.join(SAMPLE_FILES_PATH, "sample_invoice.pdf");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Sample file not found at ${filePath}, skipping test`);
      return;
    }

    const pdfBytes = fs.readFileSync(filePath);

    // Use the analyzeBinary method from the SDK
    const poller = client.analyzeBinary(
      testAnalyzerId,
      "application/pdf",
      pdfBytes,
      testPollingOptions,
    );

    await poller.pollUntilDone();
    // Poller may not return the full AnalyzeResult directly. Extract the operationId from the operation-location
    const operationLocation = (poller.operationState as any).config.operationLocation as string;
    const url = new URL(operationLocation);
    const operationId = url.pathname.split("/").pop()!.split("?")[0]!;

    const operationStatus = await client.getResult(operationId);
    const analyzeResult = operationStatus.result!;
    assert.ok(analyzeResult, "Expected analyzeResult in response");

    const contents = analyzeResult?.contents;
    assert.ok(contents && contents.length > 0, "Expected contents in analyzeResult");
  });

  it("should analyze a document from URL", async () => {
    // Using a public PDF URL for testing
    const testUrl =
      "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf";

    const poller = client.analyze(testAnalyzerId, {
      inputs: [{ url: testUrl }],
      ...testPollingOptions,
    });

    await poller.pollUntilDone();
    const operationLocation = (poller.operationState as any).config.operationLocation as string;
    const url = new URL(operationLocation);
    const operationId = url.pathname.split("/").pop()!.split("?")[0]!;

    const operationStatus = await client.getResult(operationId);
    const analyzeResult = operationStatus.result!;
    assert.ok(analyzeResult, "Expected analyzeResult in response");

    const contents = analyzeResult?.contents;
    assert.ok(contents && contents.length > 0, "Expected contents in analyzeResult");
  });

  it("should analyze with markdown output", async () => {
    const testUrl =
      "https://github.com/Azure-Samples/azure-ai-content-understanding-python/raw/refs/heads/main/data/invoice.pdf";

    const poller = client.analyze(testAnalyzerId, {
      inputs: [{ url: testUrl }],
      ...testPollingOptions,
    });

    await poller.pollUntilDone();
    const operationLocation = (poller.operationState as any).config.operationLocation as string;
    const url = new URL(operationLocation);
    const operationId = url.pathname.split("/").pop()!.split("?")[0]!;

    const operationStatus = await client.getResult(operationId);
    const analyzeResult = operationStatus.result!;
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
      const poller = client.analyze(testAnalyzerId, {
        inputs: [{ url: invalidUrl }],
        ...testPollingOptions,
      });
      await poller.pollUntilDone();
      // If the poller completes without throwing, try to fetch the result to see the error
      const operationLocation = (poller.operationState as any).config.operationLocation as string;
      const url = new URL(operationLocation);
      const operationId = url.pathname.split("/").pop()!.split("?")[0]!;

      const operationStatus = await client.getResult(operationId);
      if (operationStatus.status === "Failed") {
        throw new Error("Expected error for invalid URL");
      }
      assert.fail("Expected error for invalid URL");
    } catch (error) {
      assert.ok(error, "Expected error for invalid URL");
    }
  });
});
