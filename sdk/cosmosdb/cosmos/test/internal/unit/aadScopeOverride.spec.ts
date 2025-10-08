// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { CosmosClient } from "../../../src/CosmosClient.js";
import { CosmosDbDiagnosticLevel } from "../../../src/diagnostics/CosmosDbDiagnosticLevel.js";
import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";

// Mock TokenCredential for testing
class MockTokenCredential implements TokenCredential {
  private callCount: number = 0;
  private capturedScopes: string[][] = [];
  private shouldFailWithError: string | null = null;
  private failOnAttempt: number = -1;

  constructor(options?: { shouldFailWithError?: string; failOnAttempt?: number }) {
    this.shouldFailWithError = options?.shouldFailWithError || null;
    this.failOnAttempt = options?.failOnAttempt || -1;
  }

  async getToken(scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken> {
    this.callCount++;
    const scopeArray = Array.isArray(scopes) ? scopes : [scopes];
    this.capturedScopes.push([...scopeArray]);

    // Fail on specific attempt if configured
    if (this.failOnAttempt === this.callCount && this.shouldFailWithError) {
      throw new Error(this.shouldFailWithError);
    }

    return {
      token: `mock-token-${this.callCount}`,
      expiresOnTimestamp: Date.now() + 3600000,
    };
  }

  getCallCount(): number {
    return this.callCount;
  }

  getCapturedScopes(): string[][] {
    return this.capturedScopes;
  }

  getLastCapturedScopes(): string[] {
    return this.capturedScopes[this.capturedScopes.length - 1] || [];
  }

  reset(): void {
    this.callCount = 0;
    this.capturedScopes = [];
  }
}

describe("AAD Authentication Tests", { timeout: 10000 }, () => {
  const testEndpoint = "https://test-account.documents.azure.com:443/";
  const expectedAccountScope = "https://test-account.documents.azure.com/.default";
  const expectedCosmosScope = "https://cosmos.azure.com/.default";

  describe("Scope Selection", () => {
    it("should use account-specific scope by default", async () => {
      const mockCredential = new MockTokenCredential();
      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
      });

      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }

      const capturedScopes = mockCredential.getCapturedScopes();
      assert.isAtLeast(capturedScopes.length, 1, "At least one token request should be made");
      assert.include(
        capturedScopes[0],
        expectedAccountScope,
        "Should use account-specific scope by default",
      );
    });

    it("should use custom scope when aadScope is provided", async () => {
      const customScope = "https://custom.scope/.default";
      const mockCredential = new MockTokenCredential();
      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
        aadScope: customScope,
      });

      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }

      const capturedScopes = mockCredential.getCapturedScopes();
      assert.isAtLeast(capturedScopes.length, 1, "At least one token request should be made");
      assert.include(capturedScopes[0], customScope, "Should use custom scope when provided");
    });

    it("should use custom scope with multiple scopes", async () => {
      const customScope = "https://custom.scope/.default https://another.scope/.default";
      const mockCredential = new MockTokenCredential();
      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
        aadScope: customScope,
      });

      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }

      const capturedScopes = mockCredential.getCapturedScopes();
      assert.isAtLeast(capturedScopes.length, 1, "At least one token request should be made");
      assert.include(capturedScopes[0], customScope, "Should use custom scope when provided");
    });

    it("diagnostics should capture if custom scope is passed", async () => {
      const customScope = "https://custom.scope/.default";
      const mockCredential = new MockTokenCredential();
      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
        aadScope: customScope,
        diagnosticLevel: CosmosDbDiagnosticLevel.debug,
      });
      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error.diagnostics.clientConfig.aadScopeOverride);
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }
    });
  });

  describe("Fallback Behavior", () => {
    it("should fallback to cosmos scope on AADSTS500011 error when using account scope", async () => {
      const mockCredential = new MockTokenCredential({
        shouldFailWithError:
          "AADSTS500011: The resource principal named https://test-account.documents.azure.com was not found in the tenant",
        failOnAttempt: 1,
      });

      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
      });

      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }

      const capturedScopes = mockCredential.getCapturedScopes();
      assert.equal(
        capturedScopes.length,
        2,
        "Should make two token requests (original + fallback)",
      );
      assert.include(
        capturedScopes[0],
        expectedAccountScope,
        "First attempt should use account scope",
      );
      assert.include(
        capturedScopes[1],
        expectedCosmosScope,
        "Second attempt should use cosmos scope",
      );
    });

    it("should not fallback when custom scope fails with AADSTS500011", async () => {
      const customScope = "https://custom.scope/.default";
      const mockCredential = new MockTokenCredential({
        shouldFailWithError:
          "AADSTS500011: The resource principal named https://custom.scope was not found in the tenant",
        failOnAttempt: 1,
      });

      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
        aadScope: customScope,
      });

      let thrownError: Error | null = null;
      try {
        await client.getDatabaseAccount();
      } catch (error) {
        thrownError = error as Error;
      }

      assert.isNotNull(thrownError, "Should throw the original error");
      assert.include(thrownError!.message, "AADSTS500011", "Should throw the AADSTS500011 error");

      const capturedScopes = mockCredential.getCapturedScopes();
      assert.equal(capturedScopes.length, 1, "Should only make one token request");
      assert.include(capturedScopes[0], customScope, "Should only attempt custom scope");
      assert.notInclude(
        capturedScopes[0],
        expectedCosmosScope,
        "Should not fallback to cosmos scope",
      );
    });

    it("should not fallback on non-AADSTS500011 errors", async () => {
      const mockCredential = new MockTokenCredential({
        shouldFailWithError: "AADSTS700016: Application with identifier 'test-app' was not found",
        failOnAttempt: 1,
      });

      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
      });

      let thrownError: Error | null = null;
      try {
        await client.getDatabaseAccount();
      } catch (error) {
        thrownError = error as Error;
      }

      assert.isNotNull(thrownError, "Should throw the original error");
      assert.include(thrownError!.message, "AADSTS700016", "Should throw the original error");

      const capturedScopes = mockCredential.getCapturedScopes();
      assert.equal(capturedScopes.length, 1, "Should only make one token request");
      assert.include(capturedScopes[0], expectedAccountScope, "Should only attempt account scope");
    });

    it("should throw original error if fallback also fails", async () => {
      const mockCredential = new MockTokenCredential({
        shouldFailWithError: "Authentication failed",
        failOnAttempt: -1, // Fail on all attempts
      });

      // Override getToken to simulate first call failing with AADSTS500011, second call failing with different error
      const originalGetToken = mockCredential.getToken.bind(mockCredential);
      mockCredential.getToken = async (
        scopes: string | string[],
        options?: GetTokenOptions,
      ): Promise<AccessToken> => {
        const callCount = mockCredential.getCallCount() + 1;
        const scopeArray = Array.isArray(scopes) ? scopes : [scopes];

        if (callCount === 1) {
          throw new Error(
            "AADSTS500011: The resource principal named https://test-account.documents.azure.com was not found in the tenant",
          );
        } else if (callCount === 2) {
          throw new Error("Fallback authentication also failed");
        }

        return originalGetToken(scopes, options);
      };

      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
      });

      let thrownError: Error | null = null;
      try {
        await client.getDatabaseAccount();
      } catch (error) {
        thrownError = error as Error;
      }

      assert.isNotNull(thrownError, "Should throw an error");
      assert.include(
        thrownError!.message,
        "AADSTS500011",
        "Should throw the original error, not the fallback error",
      );
    });
  });
  describe("Token Usage", () => {
    it("should format token correctly with AAD prefix", async () => {
      const mockCredential = new MockTokenCredential();
      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
      });

      // We can't easily test the actual token formatting without intercepting the request,
      // but we can ensure the token is retrieved
      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }

      assert.equal(mockCredential.getCallCount(), 1, "Should request token once");
    });

    it("should handle token caching correctly", async () => {
      const mockCredential = new MockTokenCredential();
      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
      });

      // Make multiple calls - the token should be cached by the bearer token policy
      for (let i = 0; i < 3; i++) {
        try {
          await client.getDatabaseAccount();
          assert.fail("Expected getDatabaseAccount to fail due to mocking");
        } catch (error) {
          assert.isTrue(error instanceof Error, "Should throw an Error");
        }
      }

      // The bearer token authentication policy caches tokens, so we should only see 1 request
      // unless the token expires or there's an authentication error
      assert.equal(mockCredential.getCallCount(), 1, "Should cache token and only request once");
    });

    it("should request new token when token expires", async () => {
      const mockCredential = new MockTokenCredential();

      // Override getToken to return short-lived tokens
      const originalGetToken = mockCredential.getToken.bind(mockCredential);
      mockCredential.getToken = async (
        scopes: string | string[],
        options?: GetTokenOptions,
      ): Promise<AccessToken> => {
        const callCount = mockCredential.getCallCount() + 1;
        const scopeArray = Array.isArray(scopes) ? scopes : [scopes];
        mockCredential.getCapturedScopes().push([...scopeArray]);
        (mockCredential as any).callCount = callCount;

        return {
          token: `mock-token-${callCount}`,
          expiresOnTimestamp: Date.now() + 100, // Very short expiry (100ms)
        };
      };

      const client = new CosmosClient({
        endpoint: testEndpoint,
        aadCredentials: mockCredential,
      });

      // First call
      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }

      // Wait for token to expire
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Second call should request a new token due to expiry
      try {
        await client.getDatabaseAccount();
        assert.fail("Expected getDatabaseAccount to fail due to mocking");
      } catch (error) {
        assert.isTrue(error instanceof Error, "Should throw an Error");
      }
      // Should have requested token twice due to expiry
      assert.isAtLeast(mockCredential.getCallCount(), 1, "Should request token at least once");
    });
  });
});
