// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Phase 1: MCP Approval Types Tests
 *
 * This test suite validates the different approval type configurations for MCP servers,
 * including string literals ("never", "always") and per-tool approval maps with role arrays.
 */

import { describe, it, expect } from "vitest";
import type { MCPServer } from "../../src/models/index.js";
// Import serializers directly from implementation for unit testing
import { mcpServerSerializer, mcpServerDeserializer } from "../../src/models/models.js";

describe("MCP Approval Types", () => {
  describe("Basic Approval Types", () => {
    it("should handle 'never' approval type", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "never-approval-server",
        serverUrl: "https://never.example.com",
        requireApproval: "never",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toBe("never");
      expect(typeof serialized.require_approval).toBe("string");
    });

    it("should handle 'always' approval type", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "always-approval-server",
        serverUrl: "https://always.example.com",
        requireApproval: "always",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toBe("always");
      expect(typeof serialized.require_approval).toBe("string");
    });

    it("should handle undefined approval (default behavior)", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "default-approval-server",
        serverUrl: "https://default.example.com",
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toBeUndefined();
    });
  });

  describe("Per-Tool Approval Maps", () => {
    it("should handle single tool with single role", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "single-tool-single-role",
        serverUrl: "https://single.example.com",
        requireApproval: {
          sensitive_tool: ["admin"],
        },
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toEqual({
        sensitive_tool: ["admin"],
      });
      expect(typeof serialized.require_approval).toBe("object");
      expect(Array.isArray(serialized.require_approval.sensitive_tool)).toBe(true);
    });

    it("should handle single tool with multiple roles", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "single-tool-multi-role",
        serverUrl: "https://multi-role.example.com",
        requireApproval: {
          sensitive_tool: ["admin", "supervisor", "owner"],
        },
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval.sensitive_tool).toEqual(["admin", "supervisor", "owner"]);
      expect(serialized.require_approval.sensitive_tool).toHaveLength(3);
    });

    it("should handle multiple tools with different roles", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "multi-tool-different-roles",
        serverUrl: "https://multi-tool.example.com",
        requireApproval: {
          delete: ["admin"],
          write: ["admin", "user"],
          read: [],
        },
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toEqual({
        delete: ["admin"],
        write: ["admin", "user"],
        read: [],
      });
      expect(Object.keys(serialized.require_approval)).toHaveLength(3);
    });

    it("should handle empty approval map", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "empty-map-server",
        serverUrl: "https://empty-map.example.com",
        requireApproval: {},
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval).toEqual({});
      expect(typeof serialized.require_approval).toBe("object");
      expect(Object.keys(serialized.require_approval)).toHaveLength(0);
    });

    it("should handle tool with empty role array", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "empty-roles-server",
        serverUrl: "https://empty-roles.example.com",
        requireApproval: {
          public_tool: [],
        },
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval.public_tool).toEqual([]);
      expect(Array.isArray(serialized.require_approval.public_tool)).toBe(true);
    });
  });

  describe("Approval Type Serialization", () => {
    it("should serialize string approval types as strings", () => {
      const neverServer: MCPServer = {
        type: "mcp",
        serverLabel: "never-server",
        serverUrl: "https://never.example.com",
        requireApproval: "never",
      };

      const alwaysServer: MCPServer = {
        type: "mcp",
        serverLabel: "always-server",
        serverUrl: "https://always.example.com",
        requireApproval: "always",
      };

      const neverSerialized = mcpServerSerializer(neverServer);
      const alwaysSerialized = mcpServerSerializer(alwaysServer);

      expect(typeof neverSerialized.require_approval).toBe("string");
      expect(typeof alwaysSerialized.require_approval).toBe("string");
    });

    it("should serialize object approval types as objects", () => {
      const objectServer: MCPServer = {
        type: "mcp",
        serverLabel: "object-server",
        serverUrl: "https://object.example.com",
        requireApproval: {
          tool1: ["role1"],
          tool2: ["role2", "role3"],
        },
      };

      const serialized = mcpServerSerializer(objectServer);

      expect(typeof serialized.require_approval).toBe("object");
      expect(Array.isArray(serialized.require_approval)).toBe(false);
    });

    it("should round-trip preserve approval configuration", () => {
      // Test with string approval
      const stringServer: MCPServer = {
        type: "mcp",
        serverLabel: "string-server",
        serverUrl: "https://string.example.com",
        requireApproval: "never",
      };

      const stringSerialized = mcpServerSerializer(stringServer);
      const stringDeserialized = mcpServerDeserializer(stringSerialized);

      expect(stringDeserialized.requireApproval).toBe("never");

      // Test with object approval
      const objectServer: MCPServer = {
        type: "mcp",
        serverLabel: "object-server",
        serverUrl: "https://object.example.com",
        requireApproval: {
          delete_file: ["admin", "supervisor"],
          write_file: ["admin", "user"],
        },
      };

      const objectSerialized = mcpServerSerializer(objectServer);
      const objectDeserialized = mcpServerDeserializer(objectSerialized);

      expect(objectDeserialized.requireApproval).toEqual({
        delete_file: ["admin", "supervisor"],
        write_file: ["admin", "user"],
      });
    });
  });

  describe("Approval Type Validation", () => {
    it("should handle approval types with special characters in tool names", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "special-chars-server",
        serverUrl: "https://special.example.com",
        requireApproval: {
          "tool-with-dash": ["admin"],
          tool_with_underscore: ["user"],
          "tool.with.dot": ["owner"],
        },
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval["tool-with-dash"]).toEqual(["admin"]);
      expect(serialized.require_approval["tool_with_underscore"]).toEqual(["user"]);
      expect(serialized.require_approval["tool.with.dot"]).toEqual(["owner"]);
    });

    it("should handle approval types with special characters in role names", () => {
      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "special-roles-server",
        serverUrl: "https://special-roles.example.com",
        requireApproval: {
          delete_tool: ["admin-super", "user_admin", "role.special"],
        },
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(serialized.require_approval.delete_tool).toContain("admin-super");
      expect(serialized.require_approval.delete_tool).toContain("user_admin");
      expect(serialized.require_approval.delete_tool).toContain("role.special");
    });

    it("should handle large per-tool approval maps", () => {
      const requireApproval: Record<string, string[]> = {};
      for (let i = 1; i <= 20; i++) {
        requireApproval[`tool_${i}`] = [`role_${i}`, `role_${i}_admin`];
      }

      const mcpServer: MCPServer = {
        type: "mcp",
        serverLabel: "large-approval-map",
        serverUrl: "https://large.example.com",
        requireApproval,
      };

      const serialized = mcpServerSerializer(mcpServer);

      expect(Object.keys(serialized.require_approval)).toHaveLength(20);
      expect(serialized.require_approval.tool_1).toEqual(["role_1", "role_1_admin"]);
      expect(serialized.require_approval.tool_20).toEqual(["role_20", "role_20_admin"]);
    });
  });
});
