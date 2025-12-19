// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Phase 1: MCP Model Serialization & Validation Tests
 *
 * This test suite validates the serialization and deserialization of MCP-related
 * models to ensure proper JSON structure and field mapping between TypeScript
 * models and the wire protocol format.
 */

import { describe, it, expect } from "vitest";
import type { MCPServer, MCPApprovalResponseRequestItem } from "../../src/models/index.js";
// Import serializers directly from implementation for unit testing
import {
  mcpServerSerializer,
  mcpServerDeserializer,
  mcpApprovalResponseRequestItemSerializer,
  mcpApprovalResponseRequestItemDeserializer,
  responseMCPApprovalRequestItemDeserializer,
  responseMCPApprovalResponseItemDeserializer,
  responseMCPCallItemDeserializer,
  responseMCPListToolItemDeserializer,
} from "../../src/models/models.js";

describe("MCP Models - Serialization & Validation", () => {
  describe("MCPServer Serialization", () => {
    it("should serialize MCPServer with all fields populated", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "test-server",
        serverUrl: "https://test.example.com",
        authorization: "Bearer token123",
        headers: {
          "X-API-Key": "key123",
          "X-Custom-Header": "value",
        },
        allowedTools: ["tool1", "tool2", "tool3"],
        requireApproval: "always",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.type).toBe("mcp");
      expect(serialized.server_label).toBe("test-server");
      expect(serialized.server_url).toBe("https://test.example.com");
      expect(serialized.authorization).toBe("Bearer token123");
      expect(serialized.headers).toEqual({
        "X-API-Key": "key123",
        "X-Custom-Header": "value",
      });
      expect(serialized.allowed_tools).toEqual(["tool1", "tool2", "tool3"]);
      expect(serialized.require_approval).toBe("always");
    });

    it("should serialize MCPServer with minimal required fields", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "minimal-server",
        serverUrl: "https://minimal.example.com",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.type).toBe("mcp");
      expect(serialized.server_label).toBe("minimal-server");
      expect(serialized.server_url).toBe("https://minimal.example.com");
      expect(serialized.authorization).toBeUndefined();
      expect(serialized.headers).toBeUndefined();
      expect(serialized.allowed_tools).toBeUndefined();
      expect(serialized.require_approval).toBeUndefined();
    });

    it("should serialize MCPServer with empty arrays", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "empty-arrays-server",
        serverUrl: "https://empty.example.com",
        allowedTools: [],
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.allowed_tools).toEqual([]);
    });

    it("should serialize MCPServer with empty headers object", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "empty-headers-server",
        serverUrl: "https://empty-headers.example.com",
        headers: {},
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.headers).toEqual({});
    });

    it("should deserialize MCPServer correctly", () => {
      const wireFormat = {
        type: "mcp",
        server_label: "deserialized-server",
        server_url: "https://deserialize.example.com",
        authorization: "Bearer abc123",
        headers: { "X-Test": "test-value" },
        allowed_tools: ["tool_a", "tool_b"],
        require_approval: "never",
      };

      const deserialized = mcpServerDeserializer(wireFormat);

      expect(deserialized.type).toBe("mcp");
      expect(deserialized.serverLabel).toBe("deserialized-server");
      expect(deserialized.serverUrl).toBe("https://deserialize.example.com");
      expect(deserialized.authorization).toBe("Bearer abc123");
      expect(deserialized.headers).toEqual({ "X-Test": "test-value" });
      expect(deserialized.allowedTools).toEqual(["tool_a", "tool_b"]);
      expect(deserialized.requireApproval).toBe("never");
    });
  });

  describe("requireApproval Configurations", () => {
    it("should serialize requireApproval as 'never' string", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "never-approval",
        serverUrl: "https://never.example.com",
        requireApproval: "never",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toBe("never");
    });

    it("should serialize requireApproval as 'always' string", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "always-approval",
        serverUrl: "https://always.example.com",
        requireApproval: "always",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toBe("always");
    });

    it("should serialize requireApproval as per-tool map object", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "per-tool-approval",
        serverUrl: "https://pertool.example.com",
        requireApproval: {
          delete_file: ["admin"],
          write_file: ["admin", "user"],
        },
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toEqual({
        delete_file: ["admin"],
        write_file: ["admin", "user"],
      });
    });

    it("should serialize requireApproval as empty object", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "empty-approval",
        serverUrl: "https://empty.example.com",
        requireApproval: {},
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toEqual({});
    });

    it("should handle requireApproval as undefined (default)", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "undefined-approval",
        serverUrl: "https://undefined.example.com",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toBeUndefined();
    });
  });

  describe("MCPApprovalResponseRequestItem", () => {
    it("should serialize with all fields", () => {
      const item: MCPApprovalResponseRequestItem = {
        type: "mcp_approval_response",
        id: "item_123",
        approvalRequestId: "approval_456",
        approve: true,
      };

      const serialized = mcpApprovalResponseRequestItemSerializer(item);

      expect(serialized.type).toBe("mcp_approval_response");
      expect(serialized.id).toBe("item_123");
      expect(serialized.approval_request_id).toBe("approval_456");
      expect(serialized.approve).toBe(true);
    });

    it("should serialize with approve=true", () => {
      const item: MCPApprovalResponseRequestItem = {
        type: "mcp_approval_response",
        id: "item_approved",
        approvalRequestId: "approval_789",
        approve: true,
      };

      const serialized = mcpApprovalResponseRequestItemSerializer(item);

      expect(serialized.approve).toBe(true);
    });

    it("should serialize with approve=false", () => {
      const item: MCPApprovalResponseRequestItem = {
        type: "mcp_approval_response",
        id: "item_rejected",
        approvalRequestId: "approval_999",
        approve: false,
      };

      const serialized = mcpApprovalResponseRequestItemSerializer(item);

      expect(serialized.approve).toBe(false);
    });

    it("should round-trip preserve all fields", () => {
      const original: MCPApprovalResponseRequestItem = {
        type: "mcp_approval_response",
        id: "item_roundtrip",
        approvalRequestId: "approval_roundtrip",
        approve: true,
      };

      const serialized = mcpApprovalResponseRequestItemSerializer(original);
      const deserialized = mcpApprovalResponseRequestItemDeserializer(serialized);

      expect(deserialized).toEqual(original);
    });
  });

  describe("Response Item Deserialization", () => {
    it("should deserialize ResponseMCPApprovalRequestItem", () => {
      const wireFormat = {
        type: "mcp_approval_request",
        id: "item_request_123",
        object: "realtime.item",
        arguments: '{"file": "test.txt", "action": "delete"}',
        name: "delete_file",
        server_label: "file-server",
      };

      const deserialized = responseMCPApprovalRequestItemDeserializer(wireFormat);

      expect(deserialized.type).toBe("mcp_approval_request");
      expect(deserialized.id).toBe("item_request_123");
      expect(deserialized.object).toBe("realtime.item");
      expect(deserialized.arguments).toBe('{"file": "test.txt", "action": "delete"}');
      expect(deserialized.name).toBe("delete_file");
      expect(deserialized.serverLabel).toBe("file-server");
    });

    it("should deserialize ResponseMCPApprovalRequestItem with arguments as JSON string", () => {
      const wireFormat = {
        type: "mcp_approval_request",
        id: "item_json_args",
        object: "realtime.item",
        arguments: '{"complex": {"nested": {"data": "value"}}, "array": [1, 2, 3]}',
        name: "complex_tool",
        server_label: "complex-server",
      };

      const deserialized = responseMCPApprovalRequestItemDeserializer(wireFormat);

      expect(deserialized.arguments).toBe(
        '{"complex": {"nested": {"data": "value"}}, "array": [1, 2, 3]}',
      );
      // Verify it's valid JSON
      const parsedArgs = JSON.parse(deserialized.arguments!);
      expect(parsedArgs.complex.nested.data).toBe("value");
      expect(parsedArgs.array).toEqual([1, 2, 3]);
    });

    it("should deserialize ResponseMCPApprovalResponseItem with approve=true", () => {
      const wireFormat = {
        type: "mcp_approval_response",
        id: "item_response_approved",
        object: "realtime.item",
        approval_request_id: "approval_123",
        approve: true,
        reason: "Approved by admin",
      };

      const deserialized = responseMCPApprovalResponseItemDeserializer(wireFormat);

      expect(deserialized.type).toBe("mcp_approval_response");
      expect(deserialized.id).toBe("item_response_approved");
      expect(deserialized.approvalRequestId).toBe("approval_123");
      expect(deserialized.approve).toBe(true);
      expect(deserialized.reason).toBe("Approved by admin");
    });

    it("should deserialize ResponseMCPApprovalResponseItem with approve=false", () => {
      const wireFormat = {
        type: "mcp_approval_response",
        id: "item_response_rejected",
        object: "realtime.item",
        approval_request_id: "approval_456",
        approve: false,
        reason: "Rejected due to policy",
      };

      const deserialized = responseMCPApprovalResponseItemDeserializer(wireFormat);

      expect(deserialized.approve).toBe(false);
      expect(deserialized.reason).toBe("Rejected due to policy");
    });

    it("should deserialize ResponseMCPApprovalResponseItem without reason field", () => {
      const wireFormat = {
        type: "mcp_approval_response",
        id: "item_no_reason",
        object: "realtime.item",
        approval_request_id: "approval_789",
        approve: true,
      };

      const deserialized = responseMCPApprovalResponseItemDeserializer(wireFormat);

      expect(deserialized.reason).toBeUndefined();
    });
  });

  describe("ResponseMCPCallItem", () => {
    it("should deserialize with required fields only", () => {
      const wireFormat = {
        type: "mcp_call",
        id: "call_basic",
        object: "realtime.item",
        arguments: '{"param": "value"}',
        server_label: "test-server",
        name: "test_tool",
      };

      const deserialized = responseMCPCallItemDeserializer(wireFormat);

      expect(deserialized.type).toBe("mcp_call");
      expect(deserialized.id).toBe("call_basic");
      expect(deserialized.arguments).toBe('{"param": "value"}');
      expect(deserialized.serverLabel).toBe("test-server");
      expect(deserialized.name).toBe("test_tool");
    });

    it("should deserialize with output field", () => {
      const wireFormat = {
        type: "mcp_call",
        id: "call_with_output",
        object: "realtime.item",
        arguments: '{"param": "value"}',
        server_label: "test-server",
        name: "test_tool",
        output: "Success result",
      };

      const deserialized = responseMCPCallItemDeserializer(wireFormat);

      expect(deserialized.output).toBe("Success result");
    });

    it("should deserialize with error field", () => {
      const wireFormat = {
        type: "mcp_call",
        id: "call_with_error",
        object: "realtime.item",
        arguments: '{"param": "value"}',
        server_label: "test-server",
        name: "test_tool",
        error: { message: "Tool execution failed", code: "TOOL_ERROR" },
      };

      const deserialized = responseMCPCallItemDeserializer(wireFormat);

      expect(deserialized.error).toEqual({ message: "Tool execution failed", code: "TOOL_ERROR" });
    });

    it("should deserialize with complex output", () => {
      const wireFormat = {
        type: "mcp_call",
        id: "call_complex_output",
        object: "realtime.item",
        arguments: '{"query": "test"}',
        server_label: "test-server",
        name: "search_tool",
        output: '{"results": [{"id": 1, "name": "Result 1"}]}',
      };

      const deserialized = responseMCPCallItemDeserializer(wireFormat);

      expect(deserialized.output).toBe('{"results": [{"id": 1, "name": "Result 1"}]}');
    });

    it("should deserialize with approvalRequestId", () => {
      const wireFormat = {
        type: "mcp_call",
        id: "call_with_approval",
        object: "realtime.item",
        approval_request_id: "approval_123",
        arguments: '{"action": "delete"}',
        server_label: "admin-server",
        name: "delete_tool",
        status: "in_progress",
      };

      const deserialized = responseMCPCallItemDeserializer(wireFormat);

      expect(deserialized.approvalRequestId).toBe("approval_123");
    });
  });

  describe("ResponseMCPListToolItem", () => {
    it("should deserialize with empty tools array", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "list_empty",
        object: "realtime.item",
        tools: [],
        server_label: "empty-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);

      expect(deserialized.tools).toEqual([]);
      expect(deserialized.serverLabel).toBe("empty-server");
    });

    it("should deserialize with single tool", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "list_single",
        object: "realtime.item",
        tools: [
          {
            name: "get_weather",
            description: "Get current weather",
            input_schema: {
              type: "object",
              properties: {
                location: { type: "string" },
              },
            },
          },
        ],
        server_label: "weather-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);

      expect(deserialized.tools).toHaveLength(1);
      expect(deserialized.tools[0].name).toBe("get_weather");
      expect(deserialized.tools[0].description).toBe("Get current weather");
    });

    it("should deserialize with multiple tools", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "list_multiple",
        object: "realtime.item",
        tools: [
          {
            name: "tool1",
            input_schema: { type: "object" },
          },
          {
            name: "tool2",
            input_schema: { type: "object" },
          },
          {
            name: "tool3",
            input_schema: { type: "object" },
          },
          {
            name: "tool4",
            input_schema: { type: "object" },
          },
          {
            name: "tool5",
            input_schema: { type: "object" },
          },
        ],
        server_label: "multi-tool-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);

      expect(deserialized.tools).toHaveLength(5);
      expect(deserialized.tools.map((t) => t.name)).toEqual([
        "tool1",
        "tool2",
        "tool3",
        "tool4",
        "tool5",
      ]);
    });

    it("should verify tool schemas are intact", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "list_schemas",
        object: "realtime.item",
        tools: [
          {
            name: "complex_tool",
            description: "A complex tool",
            input_schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                age: { type: "number" },
                tags: { type: "array", items: { type: "string" } },
              },
              required: ["name"],
            },
          },
        ],
        server_label: "schema-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);

      const tool = deserialized.tools[0];
      expect(tool.inputSchema.type).toBe("object");
      expect(tool.inputSchema.properties).toBeDefined();
      expect(tool.inputSchema.properties.name.type).toBe("string");
      expect(tool.inputSchema.required).toEqual(["name"]);
    });

    it("should deserialize tools with annotations field", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "list_annotations",
        object: "realtime.item",
        tools: [
          {
            name: "annotated_tool",
            input_schema: { type: "object" },
            annotations: {
              category: "data-access",
              security_level: "high",
            },
          },
        ],
        server_label: "annotated-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);

      expect(deserialized.tools[0].annotations).toEqual({
        category: "data-access",
        security_level: "high",
      });
    });
  });

  describe("MCPTool Schemas", () => {
    it("should handle simple tool schema", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "simple_schema",
        object: "realtime.item",
        tools: [
          {
            name: "simple_tool",
            description: "A simple tool",
            input_schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
          },
        ],
        server_label: "simple-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);
      const schema = deserialized.tools[0].inputSchema;

      expect(schema.type).toBe("object");
      expect(schema.properties.message.type).toBe("string");
    });

    it("should handle complex nested schema", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "nested_schema",
        object: "realtime.item",
        tools: [
          {
            name: "nested_tool",
            input_schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    address: {
                      type: "object",
                      properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                      },
                    },
                  },
                },
                tags: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        ],
        server_label: "nested-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);
      const schema = deserialized.tools[0].inputSchema;

      expect(schema.properties.user.type).toBe("object");
      expect(schema.properties.user.properties.address.properties.city.type).toBe("string");
      expect(schema.properties.tags.type).toBe("array");
    });

    it("should handle tool schema with enums", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "enum_schema",
        object: "realtime.item",
        tools: [
          {
            name: "enum_tool",
            input_schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["active", "inactive", "pending"],
                },
                priority: {
                  type: "number",
                  enum: [1, 2, 3, 4, 5],
                },
              },
            },
          },
        ],
        server_label: "enum-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);
      const schema = deserialized.tools[0].inputSchema;

      expect(schema.properties.status.enum).toEqual(["active", "inactive", "pending"]);
      expect(schema.properties.priority.enum).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle tool schema with 50+ properties (stress test)", () => {
      const properties: Record<string, any> = {};
      for (let i = 1; i <= 50; i++) {
        properties[`property_${i}`] = { type: "string" };
      }

      const wireFormat = {
        type: "mcp_list_tools",
        id: "large_schema",
        object: "realtime.item",
        tools: [
          {
            name: "large_tool",
            input_schema: {
              type: "object",
              properties,
            },
          },
        ],
        server_label: "large-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);
      const schema = deserialized.tools[0].inputSchema;

      expect(Object.keys(schema.properties)).toHaveLength(50);
      expect(schema.properties.property_1).toBeDefined();
      expect(schema.properties.property_50).toBeDefined();
    });

    it("should handle tool with special characters in name and description", () => {
      const wireFormat = {
        type: "mcp_list_tools",
        id: "special_chars",
        object: "realtime.item",
        tools: [
          {
            name: "tool_with-dash.and_underscore",
            description: "Tool with special chars: @#$%^&*()!",
            input_schema: { type: "object" },
          },
        ],
        server_label: "special-server",
      };

      const deserialized = responseMCPListToolItemDeserializer(wireFormat);

      expect(deserialized.tools[0].name).toBe("tool_with-dash.and_underscore");
      expect(deserialized.tools[0].description).toBe("Tool with special chars: @#$%^&*()!");
    });
  });
});
