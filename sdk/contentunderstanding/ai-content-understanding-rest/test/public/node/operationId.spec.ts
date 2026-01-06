// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, beforeEach, afterEach } from "vitest";
import { ContentUnderstandingClient } from "../../../src/index.js";
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

describe("AnalyzeResultPoller operationId", () => {
  const endpoint = "https://example.com";
  const credential = new AzureKeyCredential("fake-key");
  let client: ContentUnderstandingClient;

  beforeEach(() => {
    client = new ContentUnderstandingClient(endpoint, credential);

    // Mock the RLC client pathUnchecked to handle poll requests
    const mockGet = vi
      .fn()
      .mockResolvedValue({
        status: "200",
        body: { result: { status: "Succeeded", contents: [] } },
      });
    const mockPathUnchecked = vi.fn().mockReturnValue({ get: mockGet });
    (client as any)._client = {
      pathUnchecked: mockPathUnchecked,
    };

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should populate operationId from analyzeBinary response header", async () => {
    const expectedOperationId = "op-id-12345";
    const operationLocation = `https://example.com/operations/${expectedOperationId}?api-version=2024-01-01`;

    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: {
        "operation-location": operationLocation,
      },
      body: { result: { status: "Succeeded", contents: [] } },
    };

    // Setup mock return value
    (operationsMock._analyzeBinarySend as any).mockResolvedValue(mockResponse);

    const poller = client.analyzeBinary("analyzer1", new Uint8Array([1, 2, 3]));

    await poller.poll();

    assert.equal(poller.operationId, expectedOperationId);
  });

  it("should populate operationId from analyze (URL) response header", async () => {
    const expectedOperationId = "op-id-url-6789";
    const operationLocation = `https://example.com/operations/${expectedOperationId}`;

    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: {
        "operation-location": operationLocation,
      },
      body: { result: { status: "Succeeded", contents: [] } },
    };

    (operationsMock._analyzeSend as any).mockResolvedValue(mockResponse);

    const poller = client.analyze("analyzer1", { url: "http://test.com/doc.pdf" });

    await poller.poll();

    assert.equal(poller.operationId, expectedOperationId);
  });
});
