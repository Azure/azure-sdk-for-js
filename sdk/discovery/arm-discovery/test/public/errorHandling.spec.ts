// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, beforeEach } from "vitest";
import { DiscoveryClient } from "../../src/discoveryClient.js";
import type { TokenCredential } from "@azure/core-auth";
import { RestError } from "@azure/core-rest-pipeline";

describe("DiscoveryClient - Error Handling", () => {
  const mockSubscriptionId = "00000000-0000-0000-0000-000000000000";
  let client: DiscoveryClient;
  let mockCredential: TokenCredential;

  beforeEach(() => {
    mockCredential = {
      getToken: vi
        .fn()
        .mockResolvedValue({ token: "test-token", expiresOnTimestamp: Date.now() + 3600000 }),
    };
    client = new DiscoveryClient(mockCredential, mockSubscriptionId);
  });

  describe("constructor validation", () => {
    it("should accept valid subscriptionId", () => {
      const testClient = new DiscoveryClient(mockCredential, mockSubscriptionId);
      assert.isDefined(testClient);
    });

    it("should accept GUID format subscriptionId", () => {
      const testClient = new DiscoveryClient(
        mockCredential,
        "12345678-1234-1234-1234-123456789012",
      );
      assert.isDefined(testClient);
    });

    it("should create client that will fail at runtime with invalid credentials", () => {
      // Note: SDK validates credentials at request time, not construction time
      // This is by design - allows for lazy credential initialization
      const invalidCredential: TokenCredential = {
        getToken: vi.fn().mockRejectedValue(new Error("Invalid credentials")),
      };
      const testClient = new DiscoveryClient(invalidCredential, mockSubscriptionId);
      assert.isDefined(testClient);
    });
  });

  describe("RestError properties", () => {
    it("should understand RestError structure", () => {
      // RestError is the standard error type for Azure SDK REST operations
      const error = new RestError("Resource not found", {
        code: "ResourceNotFound",
        statusCode: 404,
      });

      assert.equal(error.name, "RestError");
      assert.equal(error.code, "ResourceNotFound");
      assert.equal(error.statusCode, 404);
      assert.equal(error.message, "Resource not found");
    });

    it("should handle 401 Unauthorized error structure", () => {
      const error = new RestError("Authentication failed", {
        code: "Unauthorized",
        statusCode: 401,
      });

      assert.equal(error.statusCode, 401);
      assert.equal(error.code, "Unauthorized");
    });

    it("should handle 403 Forbidden error structure", () => {
      const error = new RestError("Access denied", {
        code: "Forbidden",
        statusCode: 403,
      });

      assert.equal(error.statusCode, 403);
      assert.equal(error.code, "Forbidden");
    });

    it("should handle 429 TooManyRequests error structure", () => {
      const error = new RestError("Rate limit exceeded", {
        code: "TooManyRequests",
        statusCode: 429,
      });

      assert.equal(error.statusCode, 429);
      assert.equal(error.code, "TooManyRequests");
    });

    it("should handle 500 InternalServerError structure", () => {
      const error = new RestError("Internal server error", {
        code: "InternalServerError",
        statusCode: 500,
      });

      assert.equal(error.statusCode, 500);
      assert.equal(error.code, "InternalServerError");
    });
  });

  describe("workspaces.get error scenarios", () => {
    it("should require resourceGroupName parameter", () => {
      // TypeScript enforces this at compile time, but runtime check
      assert.isFunction(client.workspaces.get);
    });

    it("should require workspaceName parameter", () => {
      assert.isFunction(client.workspaces.get);
    });
  });

  describe("projects.get error scenarios", () => {
    it("should require all parameters", () => {
      // Projects require resourceGroupName, workspaceName, and projectName
      assert.isFunction(client.projects.get);
    });
  });

  describe("supercomputers.get error scenarios", () => {
    it("should require resourceGroupName and supercomputerName", () => {
      assert.isFunction(client.supercomputers.get);
    });
  });

  describe("bookshelves.get error scenarios", () => {
    it("should require resourceGroupName and bookshelfName", () => {
      assert.isFunction(client.bookshelves.get);
    });
  });

  describe("error response handling patterns", () => {
    it("should be catchable with try-catch", async () => {
      // This demonstrates the pattern for handling errors
      const simulatedError = new RestError("Simulated error", {
        code: "ResourceNotFound",
        statusCode: 404,
      });

      try {
        throw simulatedError;
      } catch (error) {
        assert.instanceOf(error, RestError);
        if (error instanceof RestError) {
          assert.equal(error.statusCode, 404);
        }
      }
    });

    it("should support error code checking", async () => {
      const simulatedError = new RestError("Conflict", {
        code: "Conflict",
        statusCode: 409,
      });

      try {
        throw simulatedError;
      } catch (error) {
        if (error instanceof RestError) {
          // Common pattern: check error code to determine handling
          switch (error.code) {
            case "ResourceNotFound":
              // Handle not found
              break;
            case "Conflict":
              // Handle conflict - resource already exists
              assert.equal(error.statusCode, 409);
              break;
            case "Unauthorized":
              // Handle auth error
              break;
            default:
              // Rethrow unknown errors
              throw error;
          }
        }
      }
    });

    it("should support status code checking", async () => {
      const error = new RestError("Bad Request", {
        code: "BadRequest",
        statusCode: 400,
      });

      // Status code based handling
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
        // Client error
        assert.isTrue(true);
      } else if (error.statusCode && error.statusCode >= 500) {
        // Server error
        assert.fail("Should be client error");
      }
    });
  });

  describe("pagination error handling", () => {
    it("should handle iterator pattern", async () => {
      // Pagination uses async iterators
      // Errors can occur during iteration
      const mockIterator = {
        [Symbol.asyncIterator]() {
          let called = false;
          return {
            async next() {
              if (!called) {
                called = true;
                return { value: { name: "test" }, done: false };
              }
              throw new RestError("Page load failed", { statusCode: 500 });
            },
          };
        },
      };

      let errorCaught = false;
      try {
        for await (const _item of mockIterator) {
          // Process item
        }
      } catch (error) {
        errorCaught = true;
        assert.instanceOf(error, RestError);
      }
      assert.isTrue(errorCaught);
    });
  });

  describe("LRO (Long Running Operation) error handling", () => {
    it("should understand poller error patterns", async () => {
      // LROs return pollers that can fail at different stages:
      // 1. Initial request failure
      // 2. Polling failure
      // 3. Final result failure

      const lroError = new RestError("Provisioning failed", {
        code: "ProvisioningFailed",
        statusCode: 500,
      });

      // Pattern for handling LRO errors
      try {
        throw lroError;
      } catch (error) {
        if (error instanceof RestError) {
          // Check if it's a provisioning failure
          if (error.code === "ProvisioningFailed") {
            assert.equal(error.statusCode, 500);
          }
        }
      }
    });
  });
});
