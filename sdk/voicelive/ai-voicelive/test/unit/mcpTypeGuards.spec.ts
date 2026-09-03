// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Phase 2: MCP TypeScript Type Safety Tests
 *
 * This test suite validates TypeScript discriminated unions and type narrowing
 * for MCP-related types. It ensures that the type system correctly narrows types
 * based on discriminator fields at both compile-time and runtime.
 */

import { describe, it, expect } from "vitest";
import type {
  Tool,
  MCPServer,
  FunctionTool,
  ResponseItemUnion,
  ResponseMCPApprovalRequestItem,
  ResponseMCPApprovalResponseItem,
  ResponseMCPCallItem,
  ResponseMCPListToolItem,
  ServerEventMcpListToolsInProgress,
  ServerEventMcpListToolsCompleted,
  ServerEventMcpListToolsFailed,
  ServerEventResponseMcpCallInProgress,
  ServerEventResponseMcpCallCompleted,
  ServerEventResponseMcpCallFailed,
} from "../../src/models/index.js";

// Type guard helper functions for testing
function isMCPServer(tool: Tool): tool is MCPServer {
  return tool.type === "mcp";
}

function isFunctionTool(tool: Tool): tool is FunctionTool {
  return tool.type === "function";
}

function isMCPApprovalRequestItem(item: ResponseItemUnion): item is ResponseMCPApprovalRequestItem {
  return item.type === "mcp_approval_request";
}

function isMCPApprovalResponseItem(
  item: ResponseItemUnion,
): item is ResponseMCPApprovalResponseItem {
  return item.type === "mcp_approval_response";
}

function isMCPCallItem(item: ResponseItemUnion): item is ResponseMCPCallItem {
  return item.type === "mcp_call";
}

function isMCPListToolsItem(item: ResponseItemUnion): item is ResponseMCPListToolItem {
  return item.type === "mcp_list_tools";
}

describe("MCP Type Guards - TypeScript Type Safety", () => {
  describe("Tool Type Discrimination", () => {
    it("should discriminate MCPServer from FunctionTool by type field", () => {
      const mcpTool: MCPServer = {
        type: "mcp",
        serverLabel: "test-server",
        serverUrl: "https://test.example.com",
      };

      const functionTool: FunctionTool = {
        type: "function",
        name: "test_function",
        description: "Test function",
      };

      // Test inline narrowing with type field
      if (mcpTool.type === "mcp") {
        // TypeScript should narrow to MCPServer
        expect(mcpTool.serverLabel).toBe("test-server");
        expect(mcpTool.serverUrl).toBe("https://test.example.com");
      } else {
        throw new Error("Type narrowing failed for MCPServer");
      }

      if (functionTool.type === "function") {
        // TypeScript should narrow to FunctionTool
        expect(functionTool.name).toBe("test_function");
        expect(functionTool.description).toBe("Test function");
      } else {
        throw new Error("Type narrowing failed for FunctionTool");
      }
    });

    it("should use type guard function for MCPServer", () => {
      const mcpTool: MCPServer = {
        type: "mcp",
        serverLabel: "guarded-server",
        serverUrl: "https://guarded.example.com",
        requireApproval: "always",
      };

      const functionTool: FunctionTool = {
        type: "function",
        name: "guarded_function",
      };

      // Test with type guard function
      expect(isMCPServer(mcpTool)).toBe(true);
      expect(isMCPServer(functionTool)).toBe(false);

      if (isMCPServer(mcpTool)) {
        // TypeScript should narrow type here
        expect(mcpTool.serverLabel).toBe("guarded-server");
        expect(mcpTool.requireApproval).toBe("always");
      } else {
        throw new Error("Type guard failed for MCPServer");
      }

      if (isFunctionTool(functionTool)) {
        // TypeScript should narrow type here
        expect(functionTool.name).toBe("guarded_function");
      } else {
        throw new Error("Type guard failed for FunctionTool");
      }
    });
  });

  describe("Response Item Discrimination", () => {
    it("should discriminate ResponseMCPApprovalRequestItem", () => {
      const item: ResponseItemUnion = {
        type: "mcp_approval_request",
        id: "item_approval_request",
        object: "realtime.item",
        name: "delete_file",
        serverLabel: "file-server",
      };

      expect(isMCPApprovalRequestItem(item)).toBe(true);

      if (item.type === "mcp_approval_request") {
        // TypeScript should narrow to ResponseMCPApprovalRequestItem
        expect(item.name).toBe("delete_file");
        expect(item.serverLabel).toBe("file-server");
      } else {
        throw new Error("Type narrowing failed for ResponseMCPApprovalRequestItem");
      }

      // Using type guard
      if (isMCPApprovalRequestItem(item)) {
        expect(item.name).toBe("delete_file");
      } else {
        throw new Error("Type guard failed for ResponseMCPApprovalRequestItem");
      }
    });

    it("should discriminate ResponseMCPApprovalResponseItem", () => {
      const item: ResponseItemUnion = {
        type: "mcp_approval_response",
        id: "item_approval_response",
        object: "realtime.item",
        approvalRequestId: "approval_123",
        approve: true,
        reason: "Approved by admin",
      };

      expect(isMCPApprovalResponseItem(item)).toBe(true);

      if (item.type === "mcp_approval_response") {
        // TypeScript should narrow to ResponseMCPApprovalResponseItem
        expect(item.approvalRequestId).toBe("approval_123");
        expect(item.approve).toBe(true);
        expect(item.reason).toBe("Approved by admin");
      } else {
        throw new Error("Type narrowing failed for ResponseMCPApprovalResponseItem");
      }
    });

    it("should discriminate ResponseMCPCallItem", () => {
      const item: ResponseItemUnion = {
        type: "mcp_call",
        id: "item_mcp_call",
        object: "realtime.item",
        arguments: '{"query": "test"}',
        serverLabel: "search-server",
        name: "search_tool",
      };

      expect(isMCPCallItem(item)).toBe(true);

      if (item.type === "mcp_call") {
        // TypeScript should narrow to ResponseMCPCallItem
        expect(item.name).toBe("search_tool");
        expect(item.serverLabel).toBe("search-server");
        expect(item.arguments).toBe('{"query": "test"}');
      } else {
        throw new Error("Type narrowing failed for ResponseMCPCallItem");
      }
    });

    it("should discriminate ResponseMCPListToolItem", () => {
      const item: ResponseItemUnion = {
        type: "mcp_list_tools",
        id: "item_list_tools",
        object: "realtime.item",
        tools: [
          {
            name: "tool1",
            inputSchema: { type: "object" },
          },
          {
            name: "tool2",
            description: "Tool 2",
            inputSchema: { type: "object" },
          },
        ],
        serverLabel: "tool-server",
      };

      expect(isMCPListToolsItem(item)).toBe(true);

      if (item.type === "mcp_list_tools") {
        // TypeScript should narrow to ResponseMCPListToolItem
        expect(item.tools).toHaveLength(2);
        expect(item.serverLabel).toBe("tool-server");
        expect(item.tools[0].name).toBe("tool1");
      } else {
        throw new Error("Type narrowing failed for ResponseMCPListToolItem");
      }
    });
  });

  describe("Server Event Discrimination", () => {
    it("should discriminate mcp_list_tools events", () => {
      const inProgressEvent: ServerEventMcpListToolsInProgress = {
        type: "mcp_list_tools.in_progress",
        eventId: "evt_in_progress",
        itemId: "item_123",
      };

      const completedEvent: ServerEventMcpListToolsCompleted = {
        type: "mcp_list_tools.completed",
        eventId: "evt_completed",
        itemId: "item_123",
      };

      const failedEvent: ServerEventMcpListToolsFailed = {
        type: "mcp_list_tools.failed",
        eventId: "evt_failed",
        itemId: "item_123",
      };

      // Test type narrowing with inline checks
      if (inProgressEvent.type === "mcp_list_tools.in_progress") {
        expect(inProgressEvent.itemId).toBe("item_123");
      } else {
        throw new Error("Type narrowing failed for mcp_list_tools.in_progress");
      }

      if (completedEvent.type === "mcp_list_tools.completed") {
        expect(completedEvent.itemId).toBe("item_123");
      } else {
        throw new Error("Type narrowing failed for mcp_list_tools.completed");
      }

      if (failedEvent.type === "mcp_list_tools.failed") {
        expect(failedEvent.itemId).toBe("item_123");
      } else {
        throw new Error("Type narrowing failed for mcp_list_tools.failed");
      }
    });

    it("should discriminate response.mcp_call events", () => {
      const inProgressEvent: ServerEventResponseMcpCallInProgress = {
        type: "response.mcp_call.in_progress",
        eventId: "evt_call_progress",
        itemId: "item_call",
        outputIndex: 0,
      };

      const completedEvent: ServerEventResponseMcpCallCompleted = {
        type: "response.mcp_call.completed",
        eventId: "evt_call_completed",
        itemId: "item_call",
        outputIndex: 0,
      };

      const failedEvent: ServerEventResponseMcpCallFailed = {
        type: "response.mcp_call.failed",
        eventId: "evt_call_failed",
        itemId: "item_call",
        outputIndex: 0,
      };

      // Test type narrowing
      if (inProgressEvent.type === "response.mcp_call.in_progress") {
        expect(inProgressEvent.itemId).toBe("item_call");
      } else {
        throw new Error("Type narrowing failed for response.mcp_call.in_progress");
      }

      if (completedEvent.type === "response.mcp_call.completed") {
        expect(completedEvent.itemId).toBe("item_call");
      } else {
        throw new Error("Type narrowing failed for response.mcp_call.completed");
      }

      if (failedEvent.type === "response.mcp_call.failed") {
        expect(failedEvent.itemId).toBe("item_call");
      } else {
        throw new Error("Type narrowing failed for response.mcp_call.failed");
      }
    });
  });

  describe("Union Type Exhaustiveness", () => {
    it("should handle all tool types in switch statement", () => {
      function handleTool(tool: Tool): string {
        switch (tool.type) {
          case "function":
            return "function";
          case "mcp":
            return "mcp";
          default:
            return "unknown";
        }
      }

      const mcpTool: MCPServer = {
        type: "mcp",
        serverLabel: "test",
        serverUrl: "https://test.com",
      };

      const functionTool: FunctionTool = {
        type: "function",
        name: "test",
      };

      expect(handleTool(mcpTool)).toBe("mcp");
      expect(handleTool(functionTool)).toBe("function");
    });

    it("should handle MCP response item types in switch statement", () => {
      function handleMCPItem(item: ResponseItemUnion): string {
        switch (item.type) {
          case "mcp_approval_request":
            return "approval_request";
          case "mcp_approval_response":
            return "approval_response";
          case "mcp_call":
            return "call";
          case "mcp_list_tools":
            return "list_tools";
          default:
            return "other";
        }
      }

      const approvalRequestItem: ResponseItemUnion = {
        type: "mcp_approval_request",
        id: "item_1",
        object: "realtime.item",
        name: "tool",
        serverLabel: "server",
      };

      const callItem: ResponseItemUnion = {
        type: "mcp_call",
        id: "item_2",
        object: "realtime.item",
        name: "tool",
        serverLabel: "server",
        arguments: "{}",
      };

      expect(handleMCPItem(approvalRequestItem)).toBe("approval_request");
      expect(handleMCPItem(callItem)).toBe("call");
    });
  });

  describe("Runtime Type Checking", () => {
    it("should verify runtime type matches TypeScript type", () => {
      const tool: MCPServer = {
        type: "mcp",
        serverLabel: "runtime-server",
        serverUrl: "https://runtime.example.com",
      };

      // Runtime check
      const runtimeType = tool.type;
      expect(runtimeType).toBe("mcp");

      // Type guard check
      expect(isMCPServer(tool)).toBe(true);

      // TypeScript compile-time narrowing
      if (isMCPServer(tool)) {
        // At compile time, TypeScript knows this is MCPServer
        // At runtime, we verify the type field matches
        expect(tool.type).toBe("mcp");
        expect(tool.serverLabel).toBeDefined();
        expect(tool.serverUrl).toBeDefined();
      }
    });

    it("should verify type narrowing for complex discriminated unions", () => {
      const items: ResponseItemUnion[] = [
        {
          type: "mcp_approval_request",
          id: "item_1",
          object: "realtime.item",
          name: "tool1",
          serverLabel: "server1",
        },
        {
          type: "mcp_call",
          id: "item_2",
          object: "realtime.item",
          name: "tool2",
          serverLabel: "server2",
          arguments: "{}",
        },
        {
          type: "mcp_list_tools",
          id: "item_3",
          object: "realtime.item",
          tools: [],
          serverLabel: "server3",
        },
      ];

      // Process items with type narrowing
      let approvalRequestCount = 0;
      let callCount = 0;
      let listToolsCount = 0;

      for (const item of items) {
        if (isMCPApprovalRequestItem(item)) {
          approvalRequestCount++;
          expect(item.name).toBeDefined();
          expect(item.serverLabel).toBeDefined();
        } else if (isMCPCallItem(item)) {
          callCount++;
          expect(item.name).toBeDefined();
          expect(item.arguments).toBeDefined();
        } else if (isMCPListToolsItem(item)) {
          listToolsCount++;
          expect(item.tools).toBeDefined();
        }
      }

      expect(approvalRequestCount).toBe(1);
      expect(callCount).toBe(1);
      expect(listToolsCount).toBe(1);
    });
  });
});
