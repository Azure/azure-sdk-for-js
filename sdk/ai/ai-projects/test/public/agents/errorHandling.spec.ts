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
      // This is the root cause of issue #37227:
      // When the API returns a different error structure, the deserializer fails
      // with TypeError: Cannot read properties of undefined (reading 'map')
      // Instead it should throw a proper RestError with status code 403
      console.log("Caught error:", error);
      console.log("Error name:", (error as any).name);
      console.log("Error message:", (error as any).message);
      console.log("Error statusCode:", (error as any).statusCode);
      console.log("Error code:", (error as any).code);

      // The error should NOT be a TypeError - it should be a RestError
      expect((error as any).name).not.toBe("TypeError");
      expect(error).toBeDefined();
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
      // Should handle gracefully even with empty body
      console.log("Caught error:", error);
      console.log("Error name:", (error as any).name);
      console.log("Error message:", (error as any).message);
      console.log("Error statusCode:", (error as any).statusCode);
      console.log("Error code:", (error as any).code);

      // The error should NOT be a TypeError - it should be a RestError
      expect((error as any).name).not.toBe("TypeError");
      expect(error).toBeDefined();
    }
  });
});
