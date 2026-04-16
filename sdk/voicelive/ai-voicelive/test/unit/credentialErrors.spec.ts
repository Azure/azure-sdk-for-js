// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Credential Error Handling Tests
 *
 * This test suite validates that authentication errors from TokenCredential
 * properly bubble up to the SDK surface as VoiceLiveAuthenticationError.
 *
 * Tests cover:
 * - TokenCredential.getToken() throwing an error
 * - TokenCredential.getToken() returning null
 * - Error message and code propagation
 * - Error cause chain preservation
 */

import { describe, it, expect, vi } from "vitest";
import type { TokenCredential, AccessToken, GetTokenOptions } from "@azure/core-auth";
import { CredentialHandler } from "../../src/auth/credentialHandler.js";
import {
  VoiceLiveAuthenticationError,
  VoiceLiveErrorCodes,
} from "../../src/errors/connectionErrors.js";

/**
 * A mock TokenCredential that throws an error when getToken is called
 */
class FailingTokenCredential implements TokenCredential {
  constructor(
    private _errorMessage: string = "Authentication failed",
    private _errorType: "throw" | "null" = "throw",
  ) {}

  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    if (this._errorType === "null") {
      return null;
    }
    throw new Error(this._errorMessage);
  }
}

/**
 * A mock TokenCredential that throws a custom error type
 */
class CustomErrorCredential implements TokenCredential {
  constructor(private _error: Error) {}

  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    throw this._error;
  }
}

describe("Credential Error Handling", () => {
  describe("TokenCredential throws Error", () => {
    it("should wrap thrown error in VoiceLiveAuthenticationError", async () => {
      const errorMessage = "Network timeout while authenticating";
      const credential = new FailingTokenCredential(errorMessage);
      const handler = new CredentialHandler(credential);

      await expect(handler.getAccessToken()).rejects.toThrow(VoiceLiveAuthenticationError);
    });

    it("should preserve original error message in wrapped error", async () => {
      const errorMessage = "Azure AD token endpoint unreachable";
      const credential = new FailingTokenCredential(errorMessage);
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.message).toContain(errorMessage);
      }
    });

    it("should set error code to AUTHENTICATION_FAILED", async () => {
      const credential = new FailingTokenCredential("Any error");
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.code).toBe(VoiceLiveErrorCodes.AuthenticationFailed);
      }
    });

    it("should preserve original error as cause", async () => {
      const originalMessage = "Original credential error";
      const credential = new FailingTokenCredential(originalMessage);
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.cause).toBeDefined();
        expect(authError.cause).toBeInstanceOf(Error);
        expect(authError.cause?.message).toBe(originalMessage);
      }
    });

    it("should set context to 'authentication'", async () => {
      const credential = new FailingTokenCredential("Error");
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.context).toBe("authentication");
      }
    });

    it("should mark error as not recoverable", async () => {
      const credential = new FailingTokenCredential("Error");
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.recoverable).toBe(false);
      }
    });
  });

  describe("TokenCredential returns null", () => {
    it("should throw VoiceLiveAuthenticationError when getToken returns null", async () => {
      const credential = new FailingTokenCredential("", "null");
      const handler = new CredentialHandler(credential);

      await expect(handler.getAccessToken()).rejects.toThrow(VoiceLiveAuthenticationError);
    });

    it("should include descriptive message when getToken returns null", async () => {
      const credential = new FailingTokenCredential("", "null");
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.message).toContain("credential returned null");
      }
    });

    it("should set error code to AUTHENTICATION_FAILED for null response", async () => {
      const credential = new FailingTokenCredential("", "null");
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.code).toBe(VoiceLiveErrorCodes.AuthenticationFailed);
      }
    });
  });

  describe("Custom Error Types", () => {
    it("should handle non-Error thrown values", async () => {
      // Create a credential that throws a non-Error value
      const credential: TokenCredential = {
        getToken: async () => {
          throw "string error"; // eslint-disable-line no-throw-literal
        },
      };
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.message).toContain("Unknown error");
      }
    });

    it("should preserve custom error types in cause chain", async () => {
      class CustomAuthError extends Error {
        constructor(
          message: string,
          public readonly customCode: string,
        ) {
          super(message);
          this.name = "CustomAuthError";
        }
      }

      const customError = new CustomAuthError("Custom auth failure", "CUSTOM_001");
      const credential = new CustomErrorCredential(customError);
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.cause).toBe(customError);
        expect((authError.cause as CustomAuthError).customCode).toBe("CUSTOM_001");
      }
    });
  });

  describe("Error propagation through CredentialHandler methods", () => {
    it("should propagate error from getAccessToken to getWebSocketUrl", async () => {
      const credential = new FailingTokenCredential("Token fetch failed");
      const handler = new CredentialHandler(credential);

      await expect(
        handler.getWebSocketUrl("https://example.azure.com", "2024-10-01"),
      ).rejects.toThrow(VoiceLiveAuthenticationError);
    });

    it("should propagate error from getAccessToken to getAuthHeaders", async () => {
      const credential = new FailingTokenCredential("Token fetch failed");
      const handler = new CredentialHandler(credential);

      await expect(handler.getAuthHeaders()).rejects.toThrow(VoiceLiveAuthenticationError);
    });

    it("should include scope in error context when available", async () => {
      const customScope = "https://custom.scope/.default";
      const credential = new FailingTokenCredential("Scope not authorized");
      const handler = new CredentialHandler(credential, customScope);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        // The error message should contain the original error message
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.message).toContain("Scope not authorized");
      }
    });
  });

  describe("Retry behavior with failing credentials", () => {
    it("should throw error on each call when credential consistently fails", async () => {
      const credential = new FailingTokenCredential("Persistent failure");
      const handler = new CredentialHandler(credential);

      // First call
      await expect(handler.getAccessToken()).rejects.toThrow(VoiceLiveAuthenticationError);

      // Second call - should also throw, not cache the error
      await expect(handler.getAccessToken()).rejects.toThrow(VoiceLiveAuthenticationError);
    });

    it("should call getToken each time when previous calls failed", async () => {
      const getTokenMock = vi.fn().mockRejectedValue(new Error("Auth failed"));
      const credential: TokenCredential = {
        getToken: getTokenMock,
      };
      const handler = new CredentialHandler(credential);

      // Call multiple times
      await expect(handler.getAccessToken()).rejects.toThrow();
      await expect(handler.getAccessToken()).rejects.toThrow();
      await expect(handler.getAccessToken()).rejects.toThrow();

      // Should have called getToken each time since no token was cached
      expect(getTokenMock).toHaveBeenCalledTimes(3);
    });
  });

  describe("Error properties for debugging", () => {
    it("should include timestamp in error", async () => {
      const credential = new FailingTokenCredential("Error");
      const handler = new CredentialHandler(credential);
      const beforeError = new Date();

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        const afterError = new Date();
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.timestamp).toBeDefined();
        expect(authError.timestamp.getTime()).toBeGreaterThanOrEqual(beforeError.getTime());
        expect(authError.timestamp.getTime()).toBeLessThanOrEqual(afterError.getTime());
      }
    });

    it("should have proper error name for instanceof checks", async () => {
      const credential = new FailingTokenCredential("Error");
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(VoiceLiveAuthenticationError);
        const authError = error as VoiceLiveAuthenticationError;
        expect(authError.name).toBe("VoiceLiveAuthenticationError");
      }
    });

    it("should have enumerable properties for JSON serialization", async () => {
      const credential = new FailingTokenCredential("Serialization test error");
      const handler = new CredentialHandler(credential);

      try {
        await handler.getAccessToken();
        expect.fail("Expected error to be thrown");
      } catch (error) {
        const authError = error as VoiceLiveAuthenticationError;
        const json = JSON.stringify(authError);
        const parsed = JSON.parse(json);

        expect(parsed.message).toContain("Serialization test error");
        expect(parsed.name).toBe("VoiceLiveAuthenticationError");
        expect(parsed.code).toBe(VoiceLiveErrorCodes.AuthenticationFailed);
      }
    });
  });
});
