// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";
import { ContentUnderstandingClient } from "../../../src/index.js";
import type { UsageDetails } from "../../../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";

// Mock the operations module
vi.mock("../../../src/api/operations.js", async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    _analyzeBinarySend: vi.fn(),
    _analyzeSend: vi.fn(),
  };
});

// Import the mocked module to control behavior
import * as operationsMock from "../../../src/api/operations.js";

describe("AnalysisResultPoller usage", () => {
  const endpoint = "https://example.com";
  const credential = new AzureKeyCredential("fake-key");
  let client: ContentUnderstandingClient;

  const usagePayload = {
    documentPagesMinimal: 0,
    documentPagesBasic: 1,
    documentPagesStandard: 0,
    audioHours: 0,
    videoHours: 0,
    contextualizationTokens: 1234,
    tokens: {
      "gpt-4.1-input": 500,
      "gpt-4.1-cached_input": 200,
      "gpt-4.1-output": 100,
    },
  };

  function setupClient(pollBody: Record<string, any>): void {
    client = new ContentUnderstandingClient(endpoint, credential);
    const mockGet = vi.fn().mockResolvedValue({
      status: "200",
      body: pollBody,
    });
    const mockPathUnchecked = vi.fn().mockReturnValue({ get: mockGet });
    (client as any)._client = {
      pathUnchecked: mockPathUnchecked,
    };
  }

  beforeEach(() => {
    setupClient({ status: "Succeeded", result: { contents: [] }, usage: usagePayload });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should populate usage from analyzeBinary response", async () => {
    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: {
        "operation-location":
          "https://example.com/contentunderstanding/analyzerResults/op1?api-version=2025-11-01",
      },
      body: {
        status: "Succeeded",
        result: { contents: [] },
        usage: usagePayload,
      },
    };

    (operationsMock._analyzeBinarySend as any).mockResolvedValue(mockResponse);

    const poller = client.analyzeBinary("analyzer1", new Uint8Array([1, 2, 3]));
    await poller.poll();

    const usage: UsageDetails | undefined = poller.operationState?.usage;
    assert.ok(usage, "operationState should have usage after poll");
    assert.equal(usage!.documentPagesBasic, 1);
    assert.equal(usage!.contextualizationTokens, 1234);
    assert.deepEqual(usage!.tokens, {
      "gpt-4.1-input": 500,
      "gpt-4.1-cached_input": 200,
      "gpt-4.1-output": 100,
    });
  });

  it("should populate usage from analyze (URL) response", async () => {
    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: {
        "operation-location":
          "https://example.com/contentunderstanding/analyzerResults/op2?api-version=2025-11-01",
      },
      body: {
        status: "Succeeded",
        result: { contents: [] },
        usage: usagePayload,
      },
    };

    (operationsMock._analyzeSend as any).mockResolvedValue(mockResponse);

    const poller = client.analyze("analyzer1", [{ url: "https://test.com/doc.pdf" }]);
    await poller.poll();

    const usage: UsageDetails | undefined = poller.operationState?.usage;
    assert.ok(usage, "operationState should have usage after poll");
    assert.equal(usage!.documentPagesBasic, 1);
    assert.equal(usage!.audioHours, 0);
    assert.equal(usage!.videoHours, 0);
  });

  it("should return undefined usage before poll", () => {
    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: { "operation-location": "https://example.com/analyzerResults/op3" },
      body: { status: "Succeeded", result: { contents: [] }, usage: usagePayload },
    };

    (operationsMock._analyzeBinarySend as any).mockResolvedValue(mockResponse);

    const poller = client.analyzeBinary("analyzer1", new Uint8Array([1]));
    assert.isUndefined(poller.operationState?.usage, "Usage should be undefined before polling");
  });

  it("should handle response with no usage field", async () => {
    // Re-setup client with no usage in poll response
    setupClient({ status: "Succeeded", result: { contents: [] } });

    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: { "operation-location": "https://example.com/analyzerResults/op4" },
      body: {
        status: "Succeeded",
        result: { contents: [] },
        // no usage field
      },
    };

    (operationsMock._analyzeBinarySend as any).mockResolvedValue(mockResponse);

    const poller = client.analyzeBinary("analyzer1", new Uint8Array([1]));
    await poller.poll();

    assert.isUndefined(
      poller.operationState?.usage,
      "Usage should be undefined when not in response",
    );
  });

  it("should deserialize all usage fields correctly", async () => {
    const fullUsage = {
      documentPagesMinimal: 2,
      documentPagesBasic: 3,
      documentPagesStandard: 1,
      audioHours: 0.5,
      videoHours: 1.25,
      contextualizationTokens: 5000,
      tokens: {
        "gpt-4.1-input": 1000,
        "gpt-4.1-output": 500,
        "text-embedding-3-large-input": 2000,
      },
    };

    // Re-setup client with full usage in poll response
    setupClient({ status: "Succeeded", result: { contents: [] }, usage: fullUsage });

    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: { "operation-location": "https://example.com/analyzerResults/op5" },
      body: { status: "Succeeded", result: { contents: [] }, usage: fullUsage },
    };

    (operationsMock._analyzeSend as any).mockResolvedValue(mockResponse);

    const poller = client.analyze("analyzer1", [{ url: "https://test.com/video.mp4" }]);
    await poller.poll();

    const usage = poller.operationState!.usage!;
    assert.equal(usage.documentPagesMinimal, 2);
    assert.equal(usage.documentPagesBasic, 3);
    assert.equal(usage.documentPagesStandard, 1);
    assert.equal(usage.audioHours, 0.5);
    assert.equal(usage.videoHours, 1.25);
    assert.equal(usage.contextualizationTokens, 5000);
    assert.equal(Object.keys(usage.tokens!).length, 3);
    assert.equal(usage.tokens!["text-embedding-3-large-input"], 2000);
  });

  it("should not fail the poll when usage has malformed data", async () => {
    // tokens is a number instead of an object — in JS, Object.entries(42) returns []
    // so the deserializer produces a UsageDetails with empty tokens rather than throwing
    const malformedUsage = { tokens: 42 };

    setupClient({ status: "Succeeded", result: { contents: [] }, usage: malformedUsage });

    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: { "operation-location": "https://example.com/analyzerResults/op6" },
      body: { status: "Succeeded", result: { contents: [] }, usage: malformedUsage },
    };

    (operationsMock._analyzeBinarySend as any).mockResolvedValue(mockResponse);

    const poller = client.analyzeBinary("analyzer1", new Uint8Array([1]));
    // Should not throw — the AnalysisResult should still be returned
    await poller.poll();

    // Deserializer produces a UsageDetails with empty/undefined fields (JS is lenient)
    const usage = poller.operationState?.usage;
    assert.ok(usage, "Usage should be populated even with malformed data");
    assert.deepEqual(usage!.tokens, {}, "Malformed tokens should produce empty object");
    assert.isUndefined(usage!.documentPagesBasic, "Non-existent fields should be undefined");
  });
});
