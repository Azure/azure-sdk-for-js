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
  };
});

// Import the mocked module to control behavior
import * as operationsMock from "../../../src/api/operations.js";

describe("analyzeBinary contentRange option", () => {
  const endpoint = "https://example.com";
  const credential = new AzureKeyCredential("fake-key");
  let client: ContentUnderstandingClient;

  beforeEach(() => {
    client = new ContentUnderstandingClient(endpoint, credential);

    // Mock the RLC client pathUnchecked to handle poll requests
    const mockGet = vi.fn().mockResolvedValue({
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

  it("should pass contentRange option through to _analyzeBinarySend", async () => {
    const mockResponse = {
      request: { url: "https://example.com/analyze", method: "POST" },
      status: "200",
      headers: {
        "operation-location": "https://example.com/operations/op-123",
      },
      body: { result: { status: "Succeeded", contents: [] } },
    };

    (operationsMock._analyzeBinarySend as any).mockResolvedValue(mockResponse);

    const poller = client.analyzeBinary("analyzer1", new Uint8Array([1, 2, 3]), undefined, {
      contentRange: "1-3,5",
    });

    await poller.poll();

    // Verify _analyzeBinarySend was called with the contentRange in options
    const sendCall = (operationsMock._analyzeBinarySend as any).mock.calls[0];
    const options = sendCall[4]; // 5th argument is options
    assert.equal(
      options.contentRange,
      "1-3,5",
      "contentRange should be passed through to _analyzeBinarySend",
    );
  });
});
