// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Tests for MCP test helper functions
 */

import { describe, it, expect, beforeEach } from "vitest";
import type { TestableVoiceLiveSession, MockVoiceLiveWebSocket } from "./index.js";
import { TestSessionFactory, TestConstants } from "./index.js";
import {
  waitForMcpEvent,
  waitForApprovalRequest,
  accumulateArgumentDeltas,
  validateToolSchema,
  validateMCPServer,
  createTestMcpServerConfig,
  createTestTool,
  createCalculatorTool,
  createWeatherTool,
  expectMcpEvent,
  expectToolInList,
} from "./mcpTestHelpers.js";

describe("MCP Test Helpers", () => {
  let session: TestableVoiceLiveSession;
  let mockWebSocket: MockVoiceLiveWebSocket;

  beforeEach(async () => {
    const setup = TestSessionFactory.createSessionWithMockWebSocket();
    session = setup.session;
    mockWebSocket = setup.mockWebSocket;
    await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
  });

  describe("Event Waiting", () => {
    it("should wait for MCP event when it arrives", async () => {
      // Start waiting for event
      const eventPromise = waitForMcpEvent(session, "mcp_list_tools.completed", 1000);

      // Simulate event arrival
      const event = JSON.stringify({
        type: "mcp_list_tools.completed",
        event_id: "evt_123",
        item_id: "item_456",
      });

      mockWebSocket.enqueueInboundMessage(event);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const receivedEvent = await eventPromise;
      expect(receivedEvent.type).toBe("mcp_list_tools.completed");
      expect(receivedEvent.event_id).toBe("evt_123");
    });

    it("should timeout when event does not arrive", async () => {
      // Wait for event that never comes
      const eventPromise = waitForMcpEvent(session, "mcp_list_tools.completed", 100);

      await expect(eventPromise).rejects.toThrow(/Timeout waiting for event/);
    });

    it("should wait for approval request successfully", async () => {
      // Start waiting
      const approvalPromise = waitForApprovalRequest(session, 1000);

      // Simulate approval request
      const event = JSON.stringify({
        type: "response.output_item.added",
        event_id: "evt_123",
        item: {
          type: "mcp_approval_request",
          id: "item_approval",
          object: "realtime.item",
          name: "delete_file",
          server_label: "file-server",
        },
      });

      mockWebSocket.enqueueInboundMessage(event);
      await new Promise((resolve) => setTimeout(resolve, 50));

      const approval = await approvalPromise;
      expect(approval.type).toBe("mcp_approval_request");
      expect(approval.name).toBe("delete_file");
    });
  });

  describe("Delta Accumulation", () => {
    it("should accumulate argument deltas correctly", async () => {
      const itemId = "item_accumulate";
      const responseId = "resp_123";

      // Start accumulation
      const accumulationPromise = accumulateArgumentDeltas(session, itemId, 2000);

      // Send deltas
      const deltas = ['{"location":', '"Seattle",', '"units":','"metric"}'];

      for (let i = 0; i < deltas.length; i++) {
        const deltaEvent = JSON.stringify({
          type: "response.mcp_call_arguments.delta",
          event_id: `evt_delta_${i}`,
          response_id: responseId,
          item_id: itemId,
          output_index: 0,
          delta: deltas[i],
        });

        mockWebSocket.enqueueInboundMessage(deltaEvent);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      // Send done event
      const doneEvent = JSON.stringify({
        type: "response.mcp_call_arguments.done",
        event_id: "evt_done",
        response_id: responseId,
        item_id: itemId,
        output_index: 0,
        arguments: deltas.join(""),
      });

      mockWebSocket.enqueueInboundMessage(doneEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      const result = await accumulationPromise;
      expect(result).toBe('{"location":"Seattle","units":"metric"}');
      const parsed = JSON.parse(result);
      expect(parsed.location).toBe("Seattle");
      expect(parsed.units).toBe("metric");
    });

    it("should handle multiple rapid deltas", async () => {
      const itemId = "item_rapid";
      const responseId = "resp_456";

      const accumulationPromise = accumulateArgumentDeltas(session, itemId, 2000);

      // Send 10 rapid deltas
      const deltas = Array.from({ length: 10 }, (_, i) => `${i}`);

      for (const delta of deltas) {
        const deltaEvent = JSON.stringify({
          type: "response.mcp_call_arguments.delta",
          event_id: `evt_${delta}`,
          response_id: responseId,
          item_id: itemId,
          output_index: 0,
          delta,
        });

        mockWebSocket.enqueueInboundMessage(deltaEvent);
      }

      // Small delay for processing
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Send done
      const doneEvent = JSON.stringify({
        type: "response.mcp_call_arguments.done",
        event_id: "evt_done",
        response_id: responseId,
        item_id: itemId,
        output_index: 0,
        arguments: deltas.join(""),
      });

      mockWebSocket.enqueueInboundMessage(doneEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      const result = await accumulationPromise;
      expect(result).toBe("0123456789");
    });
  });

  describe("Factories", () => {
    it("should create test MCP server config with defaults", () => {
      const server = createTestMcpServerConfig();

      expect(server.type).toBe("mcp");
      expect(server.serverLabel).toBe("test-mcp-server");
      expect(server.serverUrl).toBe("http://localhost:8100");
    });

    it("should create test MCP server config with overrides", () => {
      const server = createTestMcpServerConfig({
        serverLabel: "custom-server",
        serverUrl: "http://custom.example.com",
        requireApproval: "always",
      });

      expect(server.serverLabel).toBe("custom-server");
      expect(server.serverUrl).toBe("http://custom.example.com");
      expect(server.requireApproval).toBe("always");
    });

    it("should create test tool with name only", () => {
      const tool = createTestTool("my-tool");

      expect(tool.name).toBe("my-tool");
      expect(tool.description).toBe("Test tool: my-tool");
      expect(tool.inputSchema).toEqual({
        type: "object",
        properties: {},
      });
    });

    it("should create test tool with all parameters", () => {
      const schema = {
        type: "object",
        properties: {
          param1: { type: "string" },
        },
      };

      const tool = createTestTool("full-tool", "Custom description", schema);

      expect(tool.name).toBe("full-tool");
      expect(tool.description).toBe("Custom description");
      expect(tool.inputSchema).toEqual(schema);
    });

    it("should create calculator tool with proper structure", () => {
      const tool = createCalculatorTool();

      expect(tool.name).toBe("calculator");
      expect(tool.description).toContain("arithmetic");
      expect(tool.inputSchema.properties.operation).toBeDefined();
      expect(tool.inputSchema.properties.a.type).toBe("number");
      expect(tool.inputSchema.required).toEqual(["operation", "a", "b"]);
      expect(tool.annotations?.category).toBe("math");
    });

    it("should create weather tool with proper structure", () => {
      const tool = createWeatherTool();

      expect(tool.name).toBe("get_weather");
      expect(tool.description).toContain("weather");
      expect(tool.inputSchema.properties.location).toBeDefined();
      expect(tool.inputSchema.properties.units.enum).toContain("metric");
      expect(tool.annotations?.readOnly).toBe(true);
    });
  });

  describe("Validation", () => {
    it("should validate correct tool schema", () => {
      const tool = {
        name: "valid-tool",
        inputSchema: {
          type: "object",
          properties: {},
        },
      };

      expect(validateToolSchema(tool)).toBe(true);
    });

    it("should reject tool without name", () => {
      const tool = {
        inputSchema: {
          type: "object",
        },
      } as any;

      expect(validateToolSchema(tool)).toBe(false);
    });

    it("should reject tool without inputSchema", () => {
      const tool = {
        name: "no-schema",
      } as any;

      expect(validateToolSchema(tool)).toBe(false);
    });

    it("should validate correct MCP server", () => {
      const server = {
        type: "mcp" as const,
        serverLabel: "valid-server",
        serverUrl: "http://localhost:8000",
      };

      expect(validateMCPServer(server)).toBe(true);
    });

    it("should reject server with invalid URL", () => {
      const server = {
        type: "mcp" as const,
        serverLabel: "invalid-url",
        serverUrl: "not-a-valid-url",
      };

      expect(validateMCPServer(server)).toBe(false);
    });
  });

  describe("Assertion Helpers", () => {
    it("should pass when event type matches", () => {
      const event = {
        type: "mcp_list_tools.completed",
        event_id: "evt_123",
      };

      expect(() => expectMcpEvent(event, "mcp_list_tools.completed")).not.toThrow();
    });

    it("should throw when event type does not match", () => {
      const event = {
        type: "mcp_list_tools.failed",
        event_id: "evt_123",
      };

      expect(() =>
        expectMcpEvent(event, "mcp_list_tools.completed"),
      ).toThrow(/Expected event type.*but received/);
    });

    it("should find tool in list", () => {
      const tools = [
        createTestTool("tool1"),
        createTestTool("tool2"),
        createTestTool("tool3"),
      ];

      expect(() => expectToolInList(tools, "tool2")).not.toThrow();
    });

    it("should throw when tool not in list", () => {
      const tools = [createTestTool("tool1"), createTestTool("tool2")];

      expect(() => expectToolInList(tools, "tool3")).toThrow(/Tool.*not found in list/);
    });
  });
});
