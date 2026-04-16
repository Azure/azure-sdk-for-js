// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Phase 4: MCP Server Connection Integration Tests
 *
 * These tests verify that the SDK can correctly configure MCP servers
 * and establish connections with the VoiceLive service.
 *
 * Uses Microsoft Learn MCP Server: https://learn.microsoft.com/api/mcp
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { KeyCredential } from "@azure/core-auth";
import { VoiceLiveClient, type VoiceLiveSession, KnownServerEventType } from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { MICROSOFT_LEARN_MCP_SERVER } from "../infrastructure/index.js";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";

describe.runIf(isLiveMode())("MCP Server Connection - Live", () => {
  let client: VoiceLiveClient;
  let sessions: VoiceLiveSession[] = [];

  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;
  const model = "gpt-4o";
  const timeoutMs = 60000;

  beforeEach(function (this: any) {
    // Throw error if no endpoint configured
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    // Create client - prefer API key, fall back to token credential
    if (!apiKey) {
      const credential = createTestCredential();
      client = new VoiceLiveClient(endpoint, credential);
    } else {
      client = new VoiceLiveClient(endpoint, { key: apiKey } as KeyCredential);
    }
  });

  afterEach(async () => {
    // Clean up all sessions
    for (const session of sessions) {
      try {
        if (session.isConnected) {
          await session.disconnect();
        }
      } catch (error) {
        console.warn("Error disconnecting session:", error);
      }
    }
    sessions = [];
  });

  describe("Basic Connection", () => {
    it(
      "should connect to VoiceLive with MCP server configured",
      async () => {
        // Create session with Microsoft Learn MCP server
        const sessionConfig = {
          model,
          tools: [MICROSOFT_LEARN_MCP_SERVER],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();

        // Wait for session createdy
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        // Verify session is connected
        expect(session.isConnected).toBe(true);
        expect(session.sessionId).toBeTruthy();
      },
      timeoutMs,
    );

    it(
      "should receive session.updated with MCP tools configured",
      async () => {
        const sessionConfig = {
          model,
          tools: [MICROSOFT_LEARN_MCP_SERVER],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        // Update session with MCP server
        await session.updateSession(sessionConfig);
        const sessionUpdated: any = await recorder.waitForEvent(
          KnownServerEventType.SessionUpdated,
        );

        // Verify MCP tool is configured
        expect(sessionUpdated.session.tools).toBeDefined();
        expect(sessionUpdated.session.tools.length).toBeGreaterThan(0);

        const mcpTool = sessionUpdated.session.tools.find((t: any) => t.type === "mcp");
        expect(mcpTool).toBeDefined();
        expect(mcpTool.serverLabel).toBe("microsoft-learn");
      },
      timeoutMs,
    );
  });

  describe("Tool Discovery", () => {
    it(
      "should receive mcp_list_tools.in_progress event",
      async () => {
        const sessionConfig = {
          model,
          tools: [MICROSOFT_LEARN_MCP_SERVER],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        // Configure with MCP server triggers tool discovery
        await session.updateSession(sessionConfig);

        // Wait for tool discovery events
        const inProgressEvent: any = await recorder.waitForEvent(
          KnownServerEventType.McpListToolsInProgress,
          { timeout: 15000 },
        );

        expect(inProgressEvent).toBeDefined();
        expect(inProgressEvent.type).toBe(KnownServerEventType.McpListToolsInProgress);
        expect(inProgressEvent.itemId).toBeDefined();
      },
      timeoutMs,
    );

    it(
      "should receive mcp_list_tools.completed event",
      async () => {
        const sessionConfig = {
          model,
          tools: [MICROSOFT_LEARN_MCP_SERVER],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);

        // Wait for completion
        const completedEvent: any = await recorder.waitForEvent(
          KnownServerEventType.McpListToolsCompleted,
          { timeout: 15000 },
        );

        expect(completedEvent).toBeDefined();
        expect(completedEvent.type).toBe(KnownServerEventType.McpListToolsCompleted);
        expect(completedEvent.itemId).toBeDefined();
      },
      timeoutMs,
    );

    it.skip(
      "should receive tools list in response item",
      async () => {
        const sessionConfig = {
          model,
          tools: [MICROSOFT_LEARN_MCP_SERVER],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);

        // Wait for output item with tool list
        const outputItemEvent: any = await recorder.waitForEvent(
          KnownServerEventType.ResponseOutputItemAdded,
          { timeout: 15000 },
        );

        expect(outputItemEvent).toBeDefined();
        expect(outputItemEvent.item).toBeDefined();

        // The item should be mcp_list_tools type
        if (outputItemEvent.item.type === "mcp_list_tools") {
          expect(outputItemEvent.item.tools).toBeDefined();
          expect(outputItemEvent.item.tools.length).toBeGreaterThan(0);
        }
      },
      timeoutMs,
    );

    it.skip(
      "should verify tool schemas are valid",
      async () => {
        const sessionConfig = {
          model,
          tools: [MICROSOFT_LEARN_MCP_SERVER],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);

        // Wait for tool list
        const outputItemEvent: any = await recorder.waitForEvent(
          KnownServerEventType.ResponseOutputItemAdded,
          { timeout: 15000 },
        );

        if (outputItemEvent.item.type === "mcp_list_tools") {
          const tools = outputItemEvent.item.tools;

          expect(tools.length).toBeGreaterThan(0);

          // Validate each tool has required fields
          for (const tool of tools) {
            expect(tool.name).toBeDefined();
            expect(typeof tool.name).toBe("string");
            expect(tool.input_schema).toBeDefined();
            expect(tool.input_schema.type).toBeDefined();
          }
        }
      },
      timeoutMs,
    );
  });

  describe("Error Handling", () => {
    it(
      "should handle invalid MCP server URL gracefully",
      async () => {
        const invalidServer = {
          type: "mcp" as const,
          serverLabel: "invalid-server",
          serverUrl: "https://nonexistent.invalid.microsoft.com/mcp",
          requireApproval: "never" as const,
        };

        const sessionConfig = {
          model,
          tools: [invalidServer],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);

        // This should either error or timeout gracefully
        await session.updateSession(sessionConfig);

        // Wait to see if error occurs or if it just times out
        try {
          await recorder.waitForEvent("error" as any, { timeout: 5000 });
        } catch (timeoutError) {
          // Timeout is acceptable - service may just not respond
        }

        // Session should still be connected even if MCP server fails
        expect(session.isConnected).toBe(true);
      },
      timeoutMs,
    );
  });
});
