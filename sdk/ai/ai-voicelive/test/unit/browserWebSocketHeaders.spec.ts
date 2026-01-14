// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";

describe("Browser WebSocket Header Conversion Logic", () => {
  // Helper function that mimics the browser implementation
  function addHeadersToUrl(url: string, headers?: Record<string, string>): string {
    if (!headers || Object.keys(headers).length === 0) {
      return url;
    }

    const urlObj = new URL(url);

    // Convert known authentication headers to appropriate query parameters
    for (const [key, value] of Object.entries(headers)) {
      const lowerKey = key.toLowerCase();

      if (lowerKey === "authorization" && value.startsWith("Bearer ")) {
        // Convert Bearer token to access_token query parameter
        urlObj.searchParams.set("authorization", value);
      } else if (lowerKey === "api-key") {
        // API key goes to api-key query parameter
        urlObj.searchParams.set("api-key", value);
      } else if (lowerKey === "x-ms-client-request-id") {
        // Client request ID as query parameter
        urlObj.searchParams.set("client-request-id", value);
      } else if (lowerKey === "user-agent") {
        // User-Agent cannot be set in WebSocket, skip it
        continue;
      } else {
        // For other headers, convert to query parameters with 'h-' prefix
        // to avoid conflicts with existing query parameters
        urlObj.searchParams.set(`h-${lowerKey}`, value);
      }
    }

    return urlObj.toString();
  }

  it("should convert Authorization header to access_token query parameter", () => {
    const headers = {
      Authorization: "Bearer test-token-123",
      "api-key": "test-api-key",
      "X-MS-Client-Request-ID": "request-id-123",
      "User-Agent": "test-agent",
    };

    const urlWithHeaders = addHeadersToUrl("wss://test.example.com/socket", headers);
    const url = new URL(urlWithHeaders);

    // Verify headers are converted to query parameters
    expect(url.searchParams.get("authorization")).toBe("Bearer test-token-123");
    expect(url.searchParams.get("api-key")).toBe("test-api-key");
    expect(url.searchParams.get("client-request-id")).toBe("request-id-123");

    // User-Agent should be skipped (cannot be set in WebSocket)
    expect(url.searchParams.has("user-agent")).toBe(false);
    expect(url.searchParams.has("h-user-agent")).toBe(false);
  });

  it("should handle URLs with existing query parameters", () => {
    const headers = {
      Authorization: "Bearer token-456",
    };

    const urlWithHeaders = addHeadersToUrl("wss://test.example.com/socket?existing=param", headers);
    const url = new URL(urlWithHeaders);

    // Both existing and new parameters should be present
    expect(url.searchParams.get("existing")).toBe("param");
    expect(url.searchParams.get("authorization")).toBe("Bearer token-456");
  });

  it("should handle custom headers with h- prefix", () => {
    const headers = {
      "X-Custom-Header": "custom-value",
      "Another-Header": "another-value",
    };

    const urlWithHeaders = addHeadersToUrl("wss://test.example.com/socket", headers);
    const url = new URL(urlWithHeaders);

    // Custom headers should get h- prefix
    expect(url.searchParams.get("h-x-custom-header")).toBe("custom-value");
    expect(url.searchParams.get("h-another-header")).toBe("another-value");
  });

  it("should return original URL when no headers provided", () => {
    const originalUrl = "wss://test.example.com/socket";
    const urlWithHeaders = addHeadersToUrl(originalUrl, undefined);

    expect(urlWithHeaders).toBe(originalUrl);
  });

  it("should handle non-Bearer authorization headers", () => {
    const headers = {
      Authorization: "Basic dGVzdDp0ZXN0", // Not Bearer token
    };

    const urlWithHeaders = addHeadersToUrl("wss://test.example.com/socket", headers);
    const url = new URL(urlWithHeaders);

    // Non-Bearer auth should go to h- prefixed parameter
    expect(url.searchParams.get("h-authorization")).toBe("Basic dGVzdDp0ZXN0");
    expect(url.searchParams.has("access_token")).toBe(false);
  });
});
