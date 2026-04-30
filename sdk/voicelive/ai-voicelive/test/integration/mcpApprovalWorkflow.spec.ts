// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Phase 5: MCP Approval Workflow Integration Tests
 *
 * These tests verify the critical approval workflow for MCP tool execution.
 * The approval workflow is a human-in-the-loop safety mechanism that allows
 * applications to require user approval before executing potentially sensitive
 * tool operations.
 *
 * Uses Microsoft Learn MCP Server: https://learn.microsoft.com/api/mcp
 *
 * ARCHITECTURE:
 * - Client configures MCP server with requireApproval settings
 * - VoiceLive service enforces approval policy
 * - Client receives approval requests and sends responses
 * - MCP server is agnostic to approval (just executes tools when called)
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { KeyCredential } from "@azure/core-auth";
import {
  VoiceLiveClient,
  type VoiceLiveSession,
  type MCPApprovalResponseRequestItem,
  type ClientEventResponseCreate,
  KnownClientEventType,
  KnownServerEventType,
  KnownItemType,
  KnownMessageRole,
  KnownContentPartType,
  type ResponseMCPCallItem,
  type ServerEventConversationItemCreated,
  type ServerEventResponseOutputItemDone,
  type ServerEventResponseOutputItemAdded,
} from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { MICROSOFT_LEARN_MCP_SERVER } from "../infrastructure/index.js";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";

describe.runIf(isLiveMode())("MCP Approval Workflow - Live", () => {
  let client: VoiceLiveClient;
  let sessions: VoiceLiveSession[] = [];
  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;
  const model = "gpt-4o";
  const timeoutMs = 90000; // Approval tests take longer

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

  // Helper to create approval response
  function createApprovalResponse(
    approvalRequestId: string,
    approve: boolean,
  ): MCPApprovalResponseRequestItem {
    return {
      type: KnownClientEventType.McpApprovalResponse,
      id: `approval_response_${Date.now()}_${Math.random()}`,
      approvalRequestId,
      approve,
    };
  }

  describe("Basic Approval Flow - Approve", () => {
    it(
      "should request approval for tool with requireApproval: always",
      async () => {
        // Configure session with Microsoft Learn MCP server requiring approval
        const mcpServerWithApproval = {
          ...MICROSOFT_LEARN_MCP_SERVER,
          requireApproval: "always" as const,
        };

        const sessionConfig = {
          model,
          tools: [mcpServerWithApproval],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.SessionUpdated);
        await recorder.waitForEvent(KnownServerEventType.McpListToolsCompleted);

        // Send user message that might trigger tool use
        // Add a text message to the conversation
        const userMessage = {
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: KnownContentPartType.InputText,
              text: "Search Microsoft Learn for Azure SDK documentation",
            },
          ],
        };
        await session.addConversationItem(userMessage);

        // Create response to allow AI to potentially use tools
        const createResponseEvent: ClientEventResponseCreate = {
          type: KnownClientEventType.ResponseCreate,
        };
        await session.sendEvent(createResponseEvent);

        // Wait for approval request (or timeout if AI doesn't decide to use tool)
        // This test verifies that IF a tool is called, approval is requested
        const outputItemEvent = (await recorder.waitForEvent(
          KnownServerEventType.ResponseOutputItemAdded,
          { timeout: 30000 },
        )) as ServerEventResponseOutputItemAdded;

        // Check if we got an approval request
        const approvalRequest = outputItemEvent.item as ResponseMCPCallItem;

        // Verify approval request structure
        expect(approvalRequest).toBeDefined();
        expect(approvalRequest.type).toBe(KnownItemType.McpCall);
        expect(approvalRequest.id).toBeDefined();
        expect(approvalRequest.name).toBeDefined(); // Tool name
        expect(approvalRequest.serverLabel).toBe("microsoft-learn");

        console.log("✓ Approval request received:", {
          tool: approvalRequest.name,
          server: approvalRequest.serverLabel,
          hasArguments: !!approvalRequest.arguments,
        });
      },
      timeoutMs,
    );

    it.skip(
      "should execute tool after approval granted",
      async () => {
        const mcpServerWithApproval = {
          ...MICROSOFT_LEARN_MCP_SERVER,
          requireApproval: "always" as const,
        };

        const sessionConfig = {
          model,
          tools: [mcpServerWithApproval],
        };

        const session = await client.createSession(sessionConfig);
        sessions.push(session);

        const recorder = new SessionEventRecorder(session);

        await session.connect();
        await recorder.waitForEvent(KnownServerEventType.SessionCreated);
        await session.updateSession(sessionConfig);
        await recorder.waitForEvent(KnownServerEventType.McpListToolsCompleted);

        const userMessage = {
          type: KnownItemType.Message,
          role: KnownMessageRole.User,
          content: [
            {
              type: KnownContentPartType.InputText,
              text: "Use Microsoft Learn tools to find the default silence timeout for the Azure Speech SDK.",
            },
          ],
        };
        await session.addConversationItem(userMessage);
        await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

        // Send message
        const createResponseEvent: ClientEventResponseCreate = {
          type: KnownClientEventType.ResponseCreate,
        };
        await session.sendEvent(createResponseEvent);

        const events = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
        const deltaEvents = events.find(
          (event) => event.type === KnownServerEventType.ResponseMcpCallArgumentsDelta,
        );
        expect(deltaEvents).toBeDefined();
        expect(
          events.find((event) => event.type === KnownServerEventType.ResponseMcpCallArgumentsDone),
        ).toBeDefined();
        const itemCreated = events.find(
          (event) => event.type === KnownServerEventType.ConversationItemCreated,
        ) as ServerEventConversationItemCreated;
        expect(itemCreated).toBeDefined();
        expect(itemCreated.item?.type).toBe(KnownItemType.McpCall);
        const items = events.filter(
          (event) => event.type === KnownServerEventType.ConversationItemCreated,
        ) as ServerEventConversationItemCreated[];
        const approvalRequest = items[1].item as MCPApprovalResponseRequestItem;
        const approvalRequestId: string | undefined = approvalRequest.id;
        expect(approvalRequestId).toBeDefined();

        // Listen for tool execution start
        console.log("Sending approval response...");

        // Send approval
        await session.addConversationItem(
          createApprovalResponse(approvalRequestId as string, true),
        );
        await recorder.waitForEvent(KnownServerEventType.ResponseMcpCallInProgress);
        await recorder.waitForEvent(KnownServerEventType.ResponseMcpCallCompleted);

        const mcpResponse = (await recorder.waitForEvent(
          KnownServerEventType.ResponseOutputItemDone,
        )) as ServerEventResponseOutputItemDone;
        expect(mcpResponse).toBeDefined();

        await session.sendEvent({ type: KnownClientEventType.ResponseCreate });

        await recorder.waitForEvent(KnownServerEventType.ResponseDone);

        console.log("✓ Tool executed successfully after approval");
      },
      timeoutMs,
    );
  });
});
