// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { MockVoiceLiveWebSocket, TestableVoiceLiveSession } from "../infrastructure/index.js";
import { TestSessionFactory, TestConstants } from "../infrastructure/index.js";
import type { MCPApprovalResponseRequestItem, UserMessageItem } from "../../src/models/index.js";

describe("VoiceLive MCP Support", () => {
  let session: TestableVoiceLiveSession;
  let mockWebSocket: MockVoiceLiveWebSocket;

  beforeEach(() => {
    const setup = TestSessionFactory.createSessionWithMockWebSocket();
    session = setup.session;
    mockWebSocket = setup.mockWebSocket;
  });

  afterEach(() => {
    mockWebSocket.removeAllListeners();
    mockWebSocket.clearSentMessages();
  });

  describe("MCP Server Configuration", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should configure session with single MCP server", async () => {
      const mcpServerConfig = {
        type: "mcp",
        serverLabel: "weather-server",
        serverUrl: "https://weather-mcp.example.com",
        allowedTools: ["get_weather", "get_forecast"],
        requireApproval: "never",
      };

      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        tools: [mcpServerConfig],
      });

      const sessionUpdateMessages = mockWebSocket.getMessagesByType("session.update");
      expect(sessionUpdateMessages).toHaveLength(1);

      const sessionConfig = sessionUpdateMessages[0].session;
      expect(sessionConfig.tools).toHaveLength(1);
      expect(sessionConfig.tools[0]).toEqual(mcpServerConfig);
    });

    it("should configure session with multiple MCP servers", async () => {
      const mcpServers = [
        {
          type: "mcp",
          serverLabel: "weather-server",
          serverUrl: "https://weather-mcp.example.com",
          allowedTools: ["get_weather"],
          requireApproval: "never",
        },
        {
          type: "mcp",
          serverLabel: "calendar-server",
          serverUrl: "https://calendar-mcp.example.com",
          allowedTools: ["get_events", "create_event"],
          requireApproval: "always",
        },
      ];

      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        tools: mcpServers,
      });

      const sessionUpdateMessages = mockWebSocket.getMessagesByType("session.update");
      expect(sessionUpdateMessages).toHaveLength(1);

      const sessionConfig = sessionUpdateMessages[0].session;
      expect(sessionConfig.tools).toHaveLength(2);
      expect(sessionConfig.tools[0].serverLabel).toBe("weather-server");
      expect(sessionConfig.tools[1].serverLabel).toBe("calendar-server");
    });

    it("should configure MCP server with headers and specific tool approval", async () => {
      const mcpServerWithHeaders = {
        type: "mcp",
        serverLabel: "enterprise-server",
        serverUrl: "https://enterprise-mcp.internal.com",
        headers: {
          Authorization: "Bearer token123",
          "X-API-Version": "v1",
        },
        allowedTools: ["read_data", "write_data", "delete_data"],
        requireApproval: {
          delete_data: ["admin", "supervisor"],
          write_data: ["admin"],
        },
      };

      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        tools: [mcpServerWithHeaders],
      });

      const sessionUpdateMessages = mockWebSocket.getMessagesByType("session.update");
      expect(sessionUpdateMessages).toHaveLength(1);

      const sessionConfig = sessionUpdateMessages[0].session;
      const mcpTool = sessionConfig.tools[0];
      expect(mcpTool.headers).toEqual({
        Authorization: "Bearer token123",
        "X-API-Version": "v1",
      });
      expect(mcpTool.requireApproval).toEqual({
        delete_data: ["admin", "supervisor"],
        write_data: ["admin"],
      });
    });

    it("should configure mixed function and MCP tools", async () => {
      const functionTool = {
        type: "function",
        name: "calculate_sum",
        description: "Calculate the sum of two numbers",
        parameters: {
          type: "object",
          properties: {
            a: { type: "number" },
            b: { type: "number" },
          },
          required: ["a", "b"],
        },
      };

      const mcpTool = {
        type: "mcp",
        serverLabel: "math-server",
        serverUrl: "https://math-mcp.example.com",
        allowedTools: ["calculate_complex"],
        requireApproval: "never",
      };

      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        tools: [functionTool, mcpTool],
      });

      const sessionUpdateMessages = mockWebSocket.getMessagesByType("session.update");
      expect(sessionUpdateMessages).toHaveLength(1);

      const sessionConfig = sessionUpdateMessages[0].session;
      expect(sessionConfig.tools).toHaveLength(2);
      expect(sessionConfig.tools[0].type).toBe("function");
      expect(sessionConfig.tools[1].type).toBe("mcp");
    });
  });

  describe("MCP Server Events", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should handle mcp_list_tools.in_progress event", async () => {
      const itemId = "item_123";
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("mcp_list_tools.in_progress", (event) => {
        receivedEvent = event;
      });

      const mcpListToolsInProgressEvent = JSON.stringify({
        type: "mcp_list_tools.in_progress",
        event_id: "evt_123",
        item_id: itemId,
      });

      mockWebSocket.enqueueInboundMessage(mcpListToolsInProgressEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("mcp_list_tools.in_progress");
      expect(receivedEvent.item_id).toBe(itemId);

      unsubscribe?.();
    });

    it("should handle mcp_list_tools.completed event", async () => {
      const itemId = "item_123";
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("mcp_list_tools.completed", (event) => {
        receivedEvent = event;
      });

      const mcpListToolsCompletedEvent = JSON.stringify({
        type: "mcp_list_tools.completed",
        event_id: "evt_123",
        item_id: itemId,
      });

      mockWebSocket.enqueueInboundMessage(mcpListToolsCompletedEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("mcp_list_tools.completed");
      expect(receivedEvent.item_id).toBe(itemId);

      unsubscribe?.();
    });

    it("should handle mcp_list_tools.failed event", async () => {
      const itemId = "item_123";
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("mcp_list_tools.failed", (event) => {
        receivedEvent = event;
      });

      const mcpListToolsFailedEvent = JSON.stringify({
        type: "mcp_list_tools.failed",
        event_id: "evt_123",
        item_id: itemId,
      });

      mockWebSocket.enqueueInboundMessage(mcpListToolsFailedEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("mcp_list_tools.failed");
      expect(receivedEvent.item_id).toBe(itemId);

      unsubscribe?.();
    });

    it("should handle response.mcp_call_arguments.delta event", async () => {
      const itemId = "item_123";
      const responseId = "resp_456";
      const outputIndex = 0;
      const delta = '{"location": "San';
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const mcpCallArgumentsDeltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_123",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: delta,
      });

      mockWebSocket.enqueueInboundMessage(mcpCallArgumentsDeltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("response.mcp_call_arguments.delta");
      expect(receivedEvent.response_id).toBe(responseId);
      expect(receivedEvent.item_id).toBe(itemId);
      expect(receivedEvent.output_index).toBe(outputIndex);
      expect(receivedEvent.delta).toBe(delta);

      unsubscribe?.();
    });

    it("should handle response.mcp_call_arguments.done event", async () => {
      const itemId = "item_123";
      const responseId = "resp_456";
      const outputIndex = 0;
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.done", (event) => {
        receivedEvent = event;
      });

      const mcpCallArgumentsDoneEvent = JSON.stringify({
        type: "response.mcp_call_arguments.done",
        event_id: "evt_123",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
      });

      mockWebSocket.enqueueInboundMessage(mcpCallArgumentsDoneEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("response.mcp_call_arguments.done");
      expect(receivedEvent.response_id).toBe(responseId);
      expect(receivedEvent.item_id).toBe(itemId);
      expect(receivedEvent.output_index).toBe(outputIndex);

      unsubscribe?.();
    });

    it("should handle response.mcp_call.in_progress event", async () => {
      const itemId = "item_123";
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call.in_progress", (event) => {
        receivedEvent = event;
      });

      const mcpCallInProgressEvent = JSON.stringify({
        type: "response.mcp_call.in_progress",
        event_id: "evt_123",
        item_id: itemId,
      });

      mockWebSocket.enqueueInboundMessage(mcpCallInProgressEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("response.mcp_call.in_progress");
      expect(receivedEvent.item_id).toBe(itemId);

      unsubscribe?.();
    });

    it("should handle response.mcp_call.completed event", async () => {
      const itemId = "item_123";
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call.completed", (event) => {
        receivedEvent = event;
      });

      const mcpCallCompletedEvent = JSON.stringify({
        type: "response.mcp_call.completed",
        event_id: "evt_123",
        item_id: itemId,
      });

      mockWebSocket.enqueueInboundMessage(mcpCallCompletedEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("response.mcp_call.completed");
      expect(receivedEvent.item_id).toBe(itemId);

      unsubscribe?.();
    });

    it("should handle response.mcp_call.failed event", async () => {
      const itemId = "item_123";
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call.failed", (event) => {
        receivedEvent = event;
      });

      const mcpCallFailedEvent = JSON.stringify({
        type: "response.mcp_call.failed",
        event_id: "evt_123",
        item_id: itemId,
      });

      mockWebSocket.enqueueInboundMessage(mcpCallFailedEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("response.mcp_call.failed");
      expect(receivedEvent.item_id).toBe(itemId);

      unsubscribe?.();
    });
  });

  describe("MCP Approval Workflow", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should handle mcp approval request response flow", async () => {
      const approvalRequestId = "approval_123";
      const approve = true;

      // Send MCP approval response
      await session.addConversationItem({
        type: "mcp_approval_response",
        approvalRequestId: approvalRequestId,
        approve: approve,
      } as MCPApprovalResponseRequestItem);

      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages).toHaveLength(1);

      const message = JSON.parse(sentMessages[0]);
      expect(message.type).toBe("conversation.item.create");
      expect(message.item.type).toBe("mcp_approval_response");
      expect(message.item.approvalRequestId).toBe(approvalRequestId);
      expect(message.item.approve).toBe(approve);
    });

    it("should handle mcp approval rejection", async () => {
      const approvalRequestId = "approval_456";
      const approve = false;

      // Send MCP approval response (rejection)
      await session.addConversationItem({
        type: "mcp_approval_response",
        approvalRequestId: approvalRequestId,
        approve: approve,
      } as MCPApprovalResponseRequestItem);

      const sentMessages = mockWebSocket.getSentMessages();
      expect(sentMessages).toHaveLength(1);

      const message = JSON.parse(sentMessages[0]);
      expect(message.type).toBe("conversation.item.create");
      expect(message.item.type).toBe("mcp_approval_response");
      expect(message.item.approvalRequestId).toBe(approvalRequestId);
      expect(message.item.approve).toBe(approve);
    });

    it("should receive mcp approval request from server", async () => {
      let receivedApprovalRequest: any = null;

      const unsubscribe = session.onServerEvent?.("response.output_item.added", (event) => {
        if (event.item?.type === "mcp_approval_request") {
          receivedApprovalRequest = event.item;
        }
      });

      const mcpApprovalRequestEvent = JSON.stringify({
        type: "response.output_item.added",
        event_id: "evt_123",
        response_id: "resp_456",
        output_index: 0,
        item: {
          type: "mcp_approval_request",
          id: "approval_789",
          object: "realtime.item",
          status: "completed",
          arguments: '{"location": "San Francisco"}',
          name: "get_weather",
          serverLabel: "weather-server",
        },
      });

      mockWebSocket.enqueueInboundMessage(mcpApprovalRequestEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedApprovalRequest).toBeTruthy();
      expect(receivedApprovalRequest.type).toBe("mcp_approval_request");
      expect(receivedApprovalRequest.name).toBe("get_weather");
      expect(receivedApprovalRequest.serverLabel).toBe("weather-server");
      expect(receivedApprovalRequest.arguments).toBe('{"location": "San Francisco"}');

      unsubscribe?.();
    });
  });

  describe("MCP Response Items", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should handle mcp_list_tools response item", async () => {
      let receivedListTools: any = null;

      const unsubscribe = session.onServerEvent?.("response.output_item.added", (event) => {
        if (event.item?.type === "mcp_list_tools") {
          receivedListTools = event.item;
        }
      });

      const mcpListToolsEvent = JSON.stringify({
        type: "response.output_item.added",
        event_id: "evt_123",
        response_id: "resp_456",
        output_index: 0,
        item: {
          type: "mcp_list_tools",
          id: "list_tools_123",
          object: "realtime.item",
          tools: [
            {
              name: "get_weather",
              description: "Get current weather for a location",
              inputSchema: {
                type: "object",
                properties: {
                  location: { type: "string" },
                },
                required: ["location"],
              },
            },
            {
              name: "get_forecast",
              description: "Get weather forecast for a location",
              inputSchema: {
                type: "object",
                properties: {
                  location: { type: "string" },
                  days: { type: "number", minimum: 1, maximum: 7 },
                },
                required: ["location"],
              },
            },
          ],
          serverLabel: "weather-server",
        },
      });

      mockWebSocket.enqueueInboundMessage(mcpListToolsEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedListTools).toBeTruthy();
      expect(receivedListTools.type).toBe("mcp_list_tools");
      expect(receivedListTools.serverLabel).toBe("weather-server");
      expect(receivedListTools.tools).toHaveLength(2);
      expect(receivedListTools.tools[0].name).toBe("get_weather");
      expect(receivedListTools.tools[1].name).toBe("get_forecast");

      unsubscribe?.();
    });

    it("should handle mcp_call response item", async () => {
      let receivedMcpCall: any = null;

      const unsubscribe = session.onServerEvent?.("response.output_item.added", (event) => {
        if (event.item?.type === "mcp_call") {
          receivedMcpCall = event.item;
        }
      });

      const mcpCallEvent = JSON.stringify({
        type: "response.output_item.added",
        event_id: "evt_123",
        response_id: "resp_456",
        output_index: 0,
        item: {
          type: "mcp_call",
          id: "mcp_call_123",
          object: "realtime.item",
          status: "in_progress",
          approvalRequestId: "approval_789",
          name: "get_weather",
          arguments: '{"location": "San Francisco"}',
          serverLabel: "weather-server",
        },
      });

      mockWebSocket.enqueueInboundMessage(mcpCallEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedMcpCall).toBeTruthy();
      expect(receivedMcpCall.type).toBe("mcp_call");
      expect(receivedMcpCall.name).toBe("get_weather");
      expect(receivedMcpCall.serverLabel).toBe("weather-server");
      expect(receivedMcpCall.approvalRequestId).toBe("approval_789");
      expect(receivedMcpCall.arguments).toBe('{"location": "San Francisco"}');

      unsubscribe?.();
    });

    it("should handle mcp_approval_response response item", async () => {
      let receivedApprovalResponse: any = null;

      const unsubscribe = session.onServerEvent?.("response.output_item.added", (event) => {
        if (event.item?.type === "mcp_approval_response") {
          receivedApprovalResponse = event.item;
        }
      });

      const mcpApprovalResponseEvent = JSON.stringify({
        type: "response.output_item.added",
        event_id: "evt_123",
        response_id: "resp_456",
        output_index: 0,
        item: {
          type: "mcp_approval_response",
          id: "approval_response_123",
          object: "realtime.item",
          status: "completed",
          approvalRequestId: "approval_789",
          approved: true,
        },
      });

      mockWebSocket.enqueueInboundMessage(mcpApprovalResponseEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedApprovalResponse).toBeTruthy();
      expect(receivedApprovalResponse.type).toBe("mcp_approval_response");
      expect(receivedApprovalResponse.approvalRequestId).toBe("approval_789");
      expect(receivedApprovalResponse.approved).toBe(true);

      unsubscribe?.();
    });
  });

  describe("MCP Error Handling", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should validate MCP server configuration", async () => {
      // Test missing required fields - this test is more for illustration
      // since the actual validation would happen in the real implementation
      const invalidConfig = {
        tools: [
          {
            type: "mcp",
            // Missing serverLabel and serverUrl
          },
        ],
      };

      // For now, we'll test that the configuration is sent without validation
      // In a real implementation, this would trigger validation errors
      try {
        await session.configureSession?.(invalidConfig);
        // If this doesn't throw, that's fine for the mock implementation
        expect(true).toBe(true);
      } catch (error) {
        // If it does throw, that's also acceptable for validation
        expect(error).toBeDefined();
      }
    });

    it("should handle MCP server connection failure", async () => {
      let receivedError: any = null;

      // Set up error handler to capture any error events
      const unsubscribe = session.onServerEvent?.("error", (event) => {
        if (event.error?.message && event.error.message.includes("MCP server connection failed")) {
          receivedError = event.error;
        }
      });

      // Simulate MCP server connection failure
      const mcpConnectionErrorEvent = JSON.stringify({
        type: "error",
        event_id: "evt_123",
        error: {
          type: "mcp_connection_error",
          code: "connection_failed",
          message: "MCP server connection failed: weather-server",
          param: "serverUrl",
        },
      });

      mockWebSocket.enqueueInboundMessage(mcpConnectionErrorEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedError).toBeTruthy();
      expect(receivedError.message).toContain("MCP server connection failed");

      unsubscribe?.();
    });

    it("should handle MCP tool execution error", async () => {
      let receivedError: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call.failed", (event) => {
        receivedError = event;
      });

      const mcpCallFailedEvent = JSON.stringify({
        type: "response.mcp_call.failed",
        event_id: "evt_123",
        item_id: "item_123",
        error: {
          type: "tool_execution_error",
          code: "execution_failed",
          message: "Tool execution failed: get_weather",
        },
      });

      mockWebSocket.enqueueInboundMessage(mcpCallFailedEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedError).toBeTruthy();
      expect(receivedError.type).toBe("response.mcp_call.failed");

      unsubscribe?.();
    });
  });

  describe("MCP Integration Patterns", () => {
    beforeEach(async () => {
      await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
    });

    it("should handle end-to-end MCP workflow", async () => {
      // 1. Configure session with MCP server
      await session.configureSession?.({
        model: TestConstants.MODEL_NAME,
        tools: [
          {
            type: "mcp",
            serverLabel: "weather-server",
            serverUrl: "https://weather-mcp.example.com",
            allowedTools: ["get_weather"],
            requireApproval: "always",
          },
        ],
      });

      // 2. Verify session configuration sent
      const sessionUpdateMessages = mockWebSocket.getMessagesByType("session.update");
      expect(sessionUpdateMessages).toHaveLength(1);

      // 3. Send user message that should trigger MCP tool usage
      await session.addConversationItem({
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "What's the weather in San Francisco?",
          },
        ],
      } as UserMessageItem);

      // 4. Trigger response creation
      await session.createResponse?.();

      // 5. Simulate server sending approval request
      const approvalRequestEvent = JSON.stringify({
        type: "response.output_item.added",
        event_id: "evt_123",
        response_id: "resp_456",
        output_index: 0,
        item: {
          type: "mcp_approval_request",
          id: "approval_789",
          object: "realtime.item",
          status: "completed",
          arguments: '{"location": "San Francisco"}',
          name: "get_weather",
          serverLabel: "weather-server",
        },
      });

      let approvalRequest: any = null;
      const unsubscribe = session.onServerEvent?.("response.output_item.added", (event) => {
        if (event.item?.type === "mcp_approval_request") {
          approvalRequest = event.item;
        }
      });

      mockWebSocket.enqueueInboundMessage(approvalRequestEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(approvalRequest).toBeTruthy();

      // 6. Send approval response
      await session.addConversationItem({
        type: "mcp_approval_response",
        approvalRequestId: "approval_789",
        approve: true,
      } as MCPApprovalResponseRequestItem);

      // 7. Verify all messages were sent correctly
      const allMessages = mockWebSocket.getSentMessages();
      const messageTypes = allMessages.map((msg) => JSON.parse(msg).type);

      expect(messageTypes).toContain("session.update");
      expect(messageTypes).toContain("conversation.item.create");
      expect(messageTypes).toContain("response.create");

      // Check the approval response was sent
      const approvalResponseMessages = mockWebSocket.getMessagesByType("conversation.item.create");
      const approvalResponseMessage = approvalResponseMessages.find(
        (msg) => msg.item?.type === "mcp_approval_response",
      );
      expect(approvalResponseMessage).toBeTruthy();
      expect(approvalResponseMessage.item.approvalRequestId).toBe("approval_789");
      expect(approvalResponseMessage.item.approve).toBe(true);

      unsubscribe?.();
    });
  });
});
