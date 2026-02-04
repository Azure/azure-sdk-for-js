// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createMockProjectsClient } from "../utils/createClient.js";
import { describe, it, expect } from "vitest";

describe("agents - error handling", () => {
  it("should properly handle permission denied error with standard Azure error format", async () => {
    // This is the expected Azure error format
    const errorBody = {
      error: {
        code: "PermissionDenied",
        message: "You do not have permission to access this agent.",
        target: "/agents/my-agent",
        details: [],
      },
    };

    const client = createMockProjectsClient(() => ({
      status: 403,
      bodyAsText: JSON.stringify(errorBody),
      body: errorBody,
    }));

    try {
      await client.agents.get("my-agent");
      expect.fail("Expected error to be thrown");
    } catch (error) {
      // The error should be properly propagated with the PermissionDenied code
      expect(error).toBeDefined();
      expect((error as any).statusCode).toBe(403);
    }
  });

  it("should handle permission denied error when API returns error without details array", async () => {
    // Some Azure services may return error without the details array
    const errorBody = {
      error: {
        code: "PermissionDenied",
        message: "You do not have permission to access this agent.",
        // Note: 'details' is missing here
      },
    };

    const client = createMockProjectsClient(() => ({
      status: 403,
      bodyAsText: JSON.stringify(errorBody),
      body: errorBody,
    }));

    try {
      await client.agents.get("my-agent");
      expect.fail("Expected error to be thrown");
    } catch (error) {
      // The error should be properly propagated even without details
      expect(error).toBeDefined();
      expect((error as any).statusCode).toBe(403);
    }
  });

  it("should handle error when API returns a different error structure", async () => {
    // Test case from issue #37227 - the API might return a different error structure
    // that doesn't match the expected ApiErrorResponse format
    const errorBody = {
      statusCode: 403,
      message: "Forbidden",
      // No 'error' property at all - this could cause the TypeError
    };

    const client = createMockProjectsClient(() => ({
      status: 403,
      bodyAsText: JSON.stringify(errorBody),
      body: errorBody,
    }));

    try {
      await client.agents.get("my-agent");
      expect.fail("Expected error to be thrown");
    } catch (error) {
      // After fix: The error should be a RestError, not a TypeError
      // The fix makes apiErrorResponseDeserializer handle undefined/malformed input
      expect((error as any).name).toBe("RestError");
      expect((error as any).statusCode).toBe(403);
    }
  });

  it("should handle error when API returns empty body", async () => {
    const client = createMockProjectsClient(() => ({
      status: 403,
      bodyAsText: "",
      body: undefined,
    }));

    try {
      await client.agents.get("my-agent");
      expect.fail("Expected error to be thrown");
    } catch (error) {
      // After fix: Should handle gracefully even with empty body
      expect((error as any).name).toBe("RestError");
      expect((error as any).statusCode).toBe(403);
    }
  });
});
