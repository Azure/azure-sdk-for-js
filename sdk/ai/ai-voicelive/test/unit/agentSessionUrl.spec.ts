// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Agent Session URL Building Tests
 *
 * This test suite validates that the CredentialHandler correctly builds
 * WebSocket URLs for both model-centric and agent-centric sessions.
 *
 * Tests cover:
 * - Model mode URL with model query parameter
 * - Agent mode URL with agent-id and agent-project-name query parameters
 * - API version parameter inclusion
 * - API key handling for both modes
 */

import { describe, it, expect } from "vitest";
import type {
  TokenCredential,
  AccessToken,
  GetTokenOptions,
  KeyCredential,
} from "@azure/core-auth";
import { CredentialHandler } from "../../src/auth/credentialHandler.js";
import type { AgentSessionConfig } from "../../src/index.js";

/**
 * A mock TokenCredential that returns a fixed token
 */
class MockTokenCredential implements TokenCredential {
  constructor(private _token: string = "mock-token-12345") {}

  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    return {
      token: this._token,
      expiresOnTimestamp: Date.now() + 3600000, // 1 hour from now
    };
  }
}

/**
 * A mock KeyCredential
 */
class MockKeyCredential implements KeyCredential {
  constructor(public readonly key: string = "mock-api-key-12345") {}
}

describe("Agent Session URL Building", () => {
  const baseEndpoint = "https://voicelive.example.com";
  const apiVersion = "2025-10-01";

  describe("Model Mode URLs", () => {
    it("should build URL with model query parameter for TokenCredential", async () => {
      const credential = new MockTokenCredential();
      const handler = new CredentialHandler(credential);

      const url = await handler.getWebSocketUrl(
        baseEndpoint,
        apiVersion,
        "gpt-4o-realtime-preview",
      );

      const parsedUrl = new URL(url);
      expect(parsedUrl.protocol).toBe("wss:");
      expect(parsedUrl.pathname).toBe("/voice-live/realtime");
      expect(parsedUrl.searchParams.get("api-version")).toBe(apiVersion);
      expect(parsedUrl.searchParams.get("model")).toBe("gpt-4o-realtime-preview");
      expect(parsedUrl.searchParams.has("agent-id")).toBe(false);
      expect(parsedUrl.searchParams.has("agent-project-name")).toBe(false);
    });

    it("should build URL with model and API key for KeyCredential", async () => {
      const credential = new MockKeyCredential("my-api-key");
      const handler = new CredentialHandler(credential);

      const url = await handler.getWebSocketUrl(
        baseEndpoint,
        apiVersion,
        "gpt-4o-realtime-preview",
      );

      const parsedUrl = new URL(url);
      expect(parsedUrl.searchParams.get("model")).toBe("gpt-4o-realtime-preview");
      expect(parsedUrl.searchParams.get("api-key")).toBe("my-api-key");
    });
  });

  describe("Agent Mode URLs", () => {
    it("should build URL with agent query parameters for TokenCredential", async () => {
      const credential = new MockTokenCredential();
      const handler = new CredentialHandler(credential);
      const agentConfig: AgentSessionConfig = {
        agentId: "my-agent-id",
        projectName: "my-project-name",
      };

      const url = await handler.getWebSocketUrl(baseEndpoint, apiVersion, undefined, agentConfig);

      const parsedUrl = new URL(url);
      expect(parsedUrl.protocol).toBe("wss:");
      expect(parsedUrl.pathname).toBe("/voice-live/realtime");
      expect(parsedUrl.searchParams.get("api-version")).toBe(apiVersion);
      expect(parsedUrl.searchParams.get("agent-id")).toBe("my-agent-id");
      expect(parsedUrl.searchParams.get("agent-project-name")).toBe("my-project-name");
      expect(parsedUrl.searchParams.has("model")).toBe(false);
    });

    it("should build URL with agent parameters and API key for KeyCredential", async () => {
      const credential = new MockKeyCredential("my-api-key");
      const handler = new CredentialHandler(credential);
      const agentConfig: AgentSessionConfig = {
        agentId: "agent-abc",
        projectName: "project-xyz",
      };

      const url = await handler.getWebSocketUrl(baseEndpoint, apiVersion, undefined, agentConfig);

      const parsedUrl = new URL(url);
      expect(parsedUrl.searchParams.get("agent-id")).toBe("agent-abc");
      expect(parsedUrl.searchParams.get("agent-project-name")).toBe("project-xyz");
      expect(parsedUrl.searchParams.get("api-key")).toBe("my-api-key");
    });

    it("should handle special characters in agent configuration", async () => {
      const credential = new MockTokenCredential();
      const handler = new CredentialHandler(credential);
      const agentConfig: AgentSessionConfig = {
        agentId: "agent-with-dashes_and_underscores",
        projectName: "project/with/slashes",
      };

      const url = await handler.getWebSocketUrl(baseEndpoint, apiVersion, undefined, agentConfig);

      const parsedUrl = new URL(url);
      // URL encoding should handle special characters
      expect(parsedUrl.searchParams.get("agent-id")).toBe("agent-with-dashes_and_underscores");
      expect(parsedUrl.searchParams.get("agent-project-name")).toBe("project/with/slashes");
    });
  });

  describe("Protocol Handling", () => {
    it("should convert https to wss", async () => {
      const credential = new MockTokenCredential();
      const handler = new CredentialHandler(credential);

      const url = await handler.getWebSocketUrl("https://example.com", apiVersion, "model");

      const parsedUrl = new URL(url);
      expect(parsedUrl.protocol).toBe("wss:");
    });

    it("should convert http to ws", async () => {
      const credential = new MockTokenCredential();
      const handler = new CredentialHandler(credential);

      const url = await handler.getWebSocketUrl("http://localhost:8080", apiVersion, "model");

      const parsedUrl = new URL(url);
      expect(parsedUrl.protocol).toBe("ws:");
    });
  });

  describe("Edge Cases", () => {
    it("should build URL with neither model nor agent (both undefined)", async () => {
      const credential = new MockTokenCredential();
      const handler = new CredentialHandler(credential);

      const url = await handler.getWebSocketUrl(baseEndpoint, apiVersion, undefined, undefined);

      const parsedUrl = new URL(url);
      expect(parsedUrl.searchParams.get("api-version")).toBe(apiVersion);
      expect(parsedUrl.searchParams.has("model")).toBe(false);
      expect(parsedUrl.searchParams.has("agent-id")).toBe(false);
    });

    it("should prioritize model over agent when both are provided", async () => {
      const credential = new MockTokenCredential();
      const handler = new CredentialHandler(credential);
      const agentConfig: AgentSessionConfig = {
        agentId: "agent-id",
        projectName: "project",
      };

      // When both are provided, model takes precedence (first branch in if statement)
      const url = await handler.getWebSocketUrl(
        baseEndpoint,
        apiVersion,
        "model-name",
        agentConfig,
      );

      const parsedUrl = new URL(url);
      expect(parsedUrl.searchParams.get("model")).toBe("model-name");
      // Agent params should NOT be added when model is present
      expect(parsedUrl.searchParams.has("agent-id")).toBe(false);
    });
  });
});
